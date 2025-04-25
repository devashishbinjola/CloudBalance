package com.CLOUDBALANCE.BACKEND.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlacklistedToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 500)
    private String token;

    @Column(name = "blacklisted_at")
    private LocalDateTime blacklistedAt = LocalDateTime.now();


    public BlacklistedToken(String token) {
        this.token = token;
    }

}

