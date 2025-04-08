package com.CLOUDBALANCE.BACKEND.repository;

import com.CLOUDBALANCE.BACKEND.model.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RolesRepository extends JpaRepository<Roles,Long> {
    Optional<Roles> findByRoleName(String roleName);
}
