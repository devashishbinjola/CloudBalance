package com.CLOUDBALANCE.BACKEND.repository;


import com.CLOUDBALANCE.BACKEND.model.UserAuthEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserAuthRepository extends JpaRepository<UserAuthEntity, Long> {
    Optional<UserAuthEntity> findByUsername(String username);
}

