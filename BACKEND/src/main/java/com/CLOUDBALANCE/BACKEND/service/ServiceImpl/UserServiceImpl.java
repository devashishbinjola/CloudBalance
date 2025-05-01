package com.CLOUDBALANCE.BACKEND.service.ServiceImpl;

import com.CLOUDBALANCE.BACKEND.dto.UserDetailsDto;
import com.CLOUDBALANCE.BACKEND.dto.UserSummaryDto;
import com.CLOUDBALANCE.BACKEND.exception.InvalidRoleException;
import com.CLOUDBALANCE.BACKEND.exception.UserAlreadyExistsException;
import com.CLOUDBALANCE.BACKEND.model.Account;
import com.CLOUDBALANCE.BACKEND.model.Role;
import com.CLOUDBALANCE.BACKEND.model.UserAuthEntity;
import com.CLOUDBALANCE.BACKEND.repository.AccountRepository;
import com.CLOUDBALANCE.BACKEND.repository.RolesRepository;
import com.CLOUDBALANCE.BACKEND.repository.UserAuthRepository;
import com.CLOUDBALANCE.BACKEND.service.ServiceImpl.mapper.UserMapper;
import com.CLOUDBALANCE.BACKEND.service.UserService;
import com.CLOUDBALANCE.BACKEND.service.UserValidationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
import java.util.stream.Collectors;


@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserAuthRepository userAuthRepository;
    private final RolesRepository rolesRepository;
    private final UserValidationService userValidationService;
    private final UserMapper userMapper;
    private final AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String createUser(UserDetailsDto userDto) {
        log.info("Attempting to create user ");

        if (userValidationService.isUserExists(userDto.getEmail())) {
            log.warn("User already exists with email");
            throw new UserAlreadyExistsException();
        }

        if (userDto.getRole() == null || userDto.getRole().isBlank()) {
            log.error("Invalid role provided");
            throw new InvalidRoleException();
        }

        UserAuthEntity user = userMapper.toEntity(userDto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        if (userDto.getAccountIds() != null && !userDto.getAccountIds().isEmpty()) {
            Set<Account> accounts = userDto.getAccountIds().stream()
                    .map(id -> accountRepository.findById(id)
                            .orElseThrow(() -> {
                                log.error("Account not found ");
                                return new RuntimeException("Account not found with id");
                            }))
                    .collect(Collectors.toSet());

            for (Account account : accounts) {
                user.getAccounts().add(account);
                account.getUsers().add(user);
            }
        }

        userAuthRepository.save(user);
        log.info("User created successfully with email");
        return "User Saved Successfully";
    }

    @Override
    public List<UserSummaryDto> getAllUsers() {
        log.info("Get all users");
        return userAuthRepository.findAll().stream()
                .map(userMapper::toSummaryDto)
                .toList();
    }

    @Override
    @Transactional
    public String updateUser(Long userId, UserDetailsDto userDto) {
        log.info("Updating user with ID: {}", userId);

        UserAuthEntity existingUser = userAuthRepository.findById(userId)
                .orElseThrow(() -> {
                    log.error("User not found with ID: {}", userId);
                    return new RuntimeException("User not found with ID: " + userId);
                });

        if (userDto.getFirstName() != null) existingUser.setFirst_name(userDto.getFirstName());
        if (userDto.getLastName() != null) existingUser.setLast_name(userDto.getLastName());
        if (userDto.getRole() != null && !userDto.getRole().isBlank()) {
            existingUser.setRole(Role.valueOf(userDto.getRole()));
        }

        // Handle accounts for CUSTOMER role
        if ("CUSTOMER".equalsIgnoreCase(userDto.getRole()) && userDto.getAccountIds() != null) {
            // Clear existing accounts
            existingUser.getAccounts().clear();

            // Add new accounts
            Set<Account> accounts = userDto.getAccountIds().stream()
                    .map(id -> accountRepository.findById(id)
                            .orElseThrow(() -> {
                                log.error("Account not found with id: {}", id);
                                return new RuntimeException("Account not found with id: " + id);
                            }))
                    .collect(Collectors.toSet());

            for (Account account : accounts) {
                existingUser.getAccounts().add(account);
                account.getUsers().add(existingUser);
            }
        } else if (!"CUSTOMER".equalsIgnoreCase(userDto.getRole())) {
            // If role is not CUSTOMER, clear all accounts
            existingUser.getAccounts().clear();
        }

        userAuthRepository.save(existingUser);
        log.info("User updated successfully with ID: {}", userId);
        return "User updated successfully!";
    }
}
