package com.CLOUDBALANCE.BACKEND.dto;


import jakarta.persistence.SecondaryTable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailsDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String role;
    private Set<Long> accountIds;
}
