package com.CLOUDBALANCE.BACKEND.controller;


import com.CLOUDBALANCE.BACKEND.dto.UserDetailsDto;
import com.CLOUDBALANCE.BACKEND.dto.UserSummaryDto;
import com.CLOUDBALANCE.BACKEND.model.UserAuthEntity;
import com.CLOUDBALANCE.BACKEND.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/admin/users")
@RequiredArgsConstructor
public class UserManagementController {

    private final UserService userService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody UserDetailsDto dto){
        String result = userService.createUser(dto);
        return ResponseEntity.ok(result);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'READ_ONLY')")
    @GetMapping
    public ResponseEntity<List<UserSummaryDto>> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }
}
