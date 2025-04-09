package com.CLOUDBALANCE.BACKEND.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserAuthEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String first_name;
    private String last_name;
    @Column(unique = true)
    private String email;

    private String password;


    @Enumerated(EnumType.STRING)
    private Role role;
}
