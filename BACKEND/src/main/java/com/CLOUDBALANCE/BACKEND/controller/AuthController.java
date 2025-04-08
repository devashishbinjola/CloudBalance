package com.CLOUDBALANCE.BACKEND.controller;
import com.CLOUDBALANCE.BACKEND.config.JwtUtil;
import com.CLOUDBALANCE.BACKEND.dto.JwtResponse;
import com.CLOUDBALANCE.BACKEND.dto.LoginRequest;
import com.CLOUDBALANCE.BACKEND.model.UserAuthEntity;
import com.CLOUDBALANCE.BACKEND.repository.UserAuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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

//    @PostMapping("/login")
//    public JwtResponse login(@RequestBody LoginRequest loginRequest) {
//        authManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        loginRequest.getUsername(), loginRequest.getPassword()
//                )
//        );
//
//        UserAuthEntity user = userRepo.findByUsername(loginRequest.getUsername())
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
//        return new JwtResponse(token, user.getRole().name());
//    }
@PostMapping("/login")
public JwtResponse login(@RequestBody LoginRequest loginRequest) {
    System.out.println("Attempting login for: " + loginRequest.getUsername());

    Authentication auth = authManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(), loginRequest.getPassword()
            )
    );

    System.out.println("Authentication success: " + auth.isAuthenticated());

    UserAuthEntity user = userRepo.findByUsername(loginRequest.getUsername())
            .orElseThrow(() -> new RuntimeException("User not found"));

    String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
    return new JwtResponse(token, user.getRole().name());
  }
}

