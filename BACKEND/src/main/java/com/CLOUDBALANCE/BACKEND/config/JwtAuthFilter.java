package com.CLOUDBALANCE.BACKEND.config;

import com.CLOUDBALANCE.BACKEND.exception.UnauthorizedException;
import com.CLOUDBALANCE.BACKEND.repository.BlacklistedTokenRepository;
import com.CLOUDBALANCE.BACKEND.service.CustomUserDetailsService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private BlacklistedTokenRepository blacklistedTokenRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String path = request.getServletPath();

        System.out.println("Incoming request path: " + path);

        // Skip filter for login and register paths
        if (path.equals("/api/auth/login") || path.startsWith("/api/auth/register")) {
            chain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");
        String username = null;
        String token = null;

        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);

                if (blacklistedTokenRepository.existsByToken(token)) {
                    handleAuthError(response, "Token is blacklisted.");
                    return;
                }

                try {
                    username = jwtUtil.extractUsername(token);
                } catch (io.jsonwebtoken.ExpiredJwtException e) {
                    handleAuthError(response, "JWT token has expired.");
                    return;
                } catch (io.jsonwebtoken.JwtException e) {
                    handleAuthError(response, "Invalid JWT token: " + e.getMessage());
                    return;
                }

                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    if (jwtUtil.validateToken(token)) {
                        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                        String role = jwtUtil.extractRole(token);
                        List<SimpleGrantedAuthority> authorities = List.of(
                                new SimpleGrantedAuthority("ROLE_" + role)
                        );

                        UsernamePasswordAuthenticationToken auth =
                                new UsernamePasswordAuthenticationToken(userDetails, null, authorities);
                        auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(auth);

                    } else {
                        handleAuthError(response, "Invalid JWT token.");
                        return;
                    }
                }
            } else {
                handleAuthError(response, "Missing or invalid Authorization header.");
                return;
            }

            chain.doFilter(request, response);

        } catch (Exception e) {
            // Catch any other exceptions and return 401
            handleAuthError(response, "Authentication error: " + e.getMessage());
        }
    }

    private void handleAuthError(HttpServletResponse response, String message) throws IOException {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        Map<String, String> error = new HashMap<>();
        error.put("error", message);

        response.getWriter().write(objectMapper.writeValueAsString(error));
    }
}