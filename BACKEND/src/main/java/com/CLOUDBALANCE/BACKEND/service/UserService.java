package com.CLOUDBALANCE.BACKEND.service;

import com.CLOUDBALANCE.BACKEND.dto.UserDetailsDto;
import com.CLOUDBALANCE.BACKEND.dto.UserSummaryDto;
import com.CLOUDBALANCE.BACKEND.model.UserAuthEntity;
import com.CLOUDBALANCE.BACKEND.repository.RolesRepository;
import com.CLOUDBALANCE.BACKEND.repository.UserAuthRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UserService {
    String createUser (UserDetailsDto userDto);
    List<UserSummaryDto> getAllUsers();
//    String assignRole(Long userId,String roleName);

}
