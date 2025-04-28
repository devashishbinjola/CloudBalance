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
import com.CLOUDBALANCE.BACKEND.service.AuthService;
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
    private AuthService authService;

    @PostMapping("/login")
    public JwtResponse login(@RequestBody LoginRequest loginRequest) {
        return authService.login(loginRequest);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        return authService.logout(request);
    }
}
