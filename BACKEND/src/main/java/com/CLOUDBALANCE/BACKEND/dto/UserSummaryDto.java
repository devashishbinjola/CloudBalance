package com.CLOUDBALANCE.BACKEND.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSummaryDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String role;

    private LocalDateTime lastLogin;

}
