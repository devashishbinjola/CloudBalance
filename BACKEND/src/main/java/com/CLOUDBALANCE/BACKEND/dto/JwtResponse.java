package com.CLOUDBALANCE.BACKEND.dto;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String role;
}
