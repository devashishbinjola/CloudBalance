package com.CLOUDBALANCE.BACKEND.config;

import com.CLOUDBALANCE.BACKEND.exception.UnauthorizedException;
import com.CLOUDBALANCE.BACKEND.repository.BlacklistedTokenRepository;
import com.CLOUDBALANCE.BACKEND.service.CustomUserDetailsService;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthFilter extends GenericFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;
    @Autowired
    private BlacklistedTokenRepository blacklistedTokenRepository;


    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpReq = (HttpServletRequest) request;
        String path = httpReq.getServletPath();

        System.out.println("Incoming request path: " + path);

        if (path.equals("/api/auth/login")) {
            chain.doFilter(request, response);
            return;
        }

        String authHeader = httpReq.getHeader("Authorization");
        String username = null;
        String token = null;

        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);

                if (blacklistedTokenRepository.existsByToken(token)) {
                    throw new UnauthorizedException("Token is blacklisted.");
                }

                username = jwtUtil.extractUsername(token);

                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    if (jwtUtil.validateToken(token)) {
                        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                        String role = jwtUtil.extractRole(token);
                        List<SimpleGrantedAuthority> authorities = List.of(
                                new SimpleGrantedAuthority("ROLE_" + role)
                        );

                        UsernamePasswordAuthenticationToken auth =
                                new UsernamePasswordAuthenticationToken(userDetails, null, authorities);
                        auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpReq));
                        SecurityContextHolder.getContext().setAuthentication(auth);
                    } else {
                        throw new UnauthorizedException("Invalid JWT token.");
                    }
                }
            } else {
                throw new UnauthorizedException("Missing or invalid Authorization header.");
            }

            chain.doFilter(request, response);

        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            throw new UnauthorizedException("JWT token has expired.");
        } catch (io.jsonwebtoken.JwtException e) {
            throw new UnauthorizedException("Invalid JWT token.");
        }
    }




}

