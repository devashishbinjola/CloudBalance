package com.CLOUDBALANCE.BACKEND.dto;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String role;
    private List<String> permission;
}
