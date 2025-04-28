package com.CLOUDBALANCE.BACKEND.service;

import com.CLOUDBALANCE.BACKEND.dto.JwtResponse;
import com.CLOUDBALANCE.BACKEND.dto.LoginRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    JwtResponse login(LoginRequest loginRequest);

    ResponseEntity<?> logout(HttpServletRequest request);
}
