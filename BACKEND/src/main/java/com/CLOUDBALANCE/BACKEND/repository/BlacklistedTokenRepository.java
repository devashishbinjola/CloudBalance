package com.CLOUDBALANCE.BACKEND.repository;

import com.CLOUDBALANCE.BACKEND.model.BlacklistedToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlacklistedTokenRepository extends JpaRepository<BlacklistedToken,Long> {
    boolean existsByToken(String token);
}
