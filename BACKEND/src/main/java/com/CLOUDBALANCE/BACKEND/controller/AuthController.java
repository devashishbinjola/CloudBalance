package com.CLOUDBALANCE.BACKEND.controller;
import com.CLOUDBALANCE.BACKEND.config.JwtUtil;
import com.CLOUDBALANCE.BACKEND.dto.JwtResponse;
import com.CLOUDBALANCE.BACKEND.dto.LoginRequest;
import com.CLOUDBALANCE.BACKEND.model.BlacklistedToken;
import com.CLOUDBALANCE.BACKEND.model.Permission;
import com.CLOUDBALANCE.BACKEND.model.Roles;
import com.CLOUDBALANCE.BACKEND.model.UserAuthEntity;
import com.CLOUDBALANCE.BACKEND.repository.BlacklistedTokenRepository;
import com.CLOUDBALANCE.BACKEND.repository.RolesRepository;
import com.CLOUDBALANCE.BACKEND.repository.UserAuthRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
   private JwtUtil jwtUtil;

    @Autowired
    private UserAuthRepository userRepo;

    @Autowired
    private BlacklistedTokenRepository blacklistedTokenRepository;

    @Autowired
    private RolesRepository rolesRepo;

    @PostMapping("/login")
    public JwtResponse login(@RequestBody LoginRequest loginRequest) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(), loginRequest.getPassword()
                )
        );


        UserAuthEntity user = userRepo.findByEmail(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

//     Set last login time
        user.setLastLogin(LocalDateTime.now());
        userRepo.save(user);

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        Roles roleEntity = rolesRepo.findByRoleName(user.getRole().name())
                .orElseThrow(() -> new RuntimeException("Role entity not found"));

        List<String> permissionNames = roleEntity.getPermissions()
                .stream()
                .map(Permission::getPermissionName)
                .collect(Collectors.toList());


        return new JwtResponse(token, user.getRole().name(), permissionNames,user.getFirst_name(),user.getLast_name());
//        return new JwtResponse(token, user.getRole().name());

    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        String token = extractToken(request);
        if (token != null && !blacklistedTokenRepository.existsByToken(token)) {
            blacklistedTokenRepository.save(new BlacklistedToken(token));
        }
        return ResponseEntity.ok("Logged out successfully.");
    }

    private String extractToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        return null;
    }


}

