package com.CLOUDBALANCE.BACKEND.dto;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    private String username;
    private String password;
}
