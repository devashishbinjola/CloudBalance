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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


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
        if(userValidationService.isUserExists(userDto.getEmail())){
            throw new UserAlreadyExistsException();
        }

        if(userDto.getRole()==null || userDto.getRole().isBlank()){
            throw new InvalidRoleException();
        }

        UserAuthEntity user = userMapper.toEntity(userDto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        if (userDto.getAccountIds() != null && !userDto.getAccountIds().isEmpty()) {
            Set<Account> accounts = userDto.getAccountIds().stream()
                    .map(id -> accountRepository.findById(id)
                            .orElseThrow(() -> new RuntimeException("Account not found with id: " + id)))
                    .collect(Collectors.toSet());
//            user.setAccounts(accounts);
            for (Account account : accounts) {
                user.getAccounts().add(account);
                account.getUsers().add(user);  // if Account has 'users' field
            }
        }
        userAuthRepository.save(user);
        return "User Saved Successfully";
    }

    @Override
    public List<UserSummaryDto> getAllUsers() {
        return userAuthRepository.findAll().stream()
                .map(userMapper::toSummaryDto)
                .toList();
    }

    @Override
    @Transactional
    public String updateUser(Long userId, UserDetailsDto userDto) {
        UserAuthEntity existingUser = userAuthRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        if (userDto.getFirstName() != null) existingUser.setFirst_name(userDto.getFirstName());
        if (userDto.getLastName() != null) existingUser.setLast_name(userDto.getLastName());
        if (userDto.getRole() != null && !userDto.getRole().isBlank()) {
            existingUser.setRole(Role.valueOf(userDto.getRole()));
        }

        if (userDto.getPassword() != null && !userDto.getPassword().isBlank()) {
            existingUser.setPassword(passwordEncoder.encode(userDto.getPassword()));
        }

        existingUser.getAccounts().clear();
        if ("CUSTOMER".equalsIgnoreCase(userDto.getRole()) && userDto.getAccountIds() != null) {
            Set<Account> accounts = userDto.getAccountIds().stream()
                    .map(id -> accountRepository.findById(id)
                            .orElseThrow(() -> new RuntimeException("Account not found with id: " + id)))
                    .collect(Collectors.toSet());

            for (Account account : accounts) {
                existingUser.getAccounts().add(account);
                account.getUsers().add(existingUser);
            }
        }

        userAuthRepository.save(existingUser);
        return "User updated successfully!";
    }


}
