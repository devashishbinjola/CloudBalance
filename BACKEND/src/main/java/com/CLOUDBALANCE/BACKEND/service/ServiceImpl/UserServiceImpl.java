package com.CLOUDBALANCE.BACKEND.service.ServiceImpl;

import com.CLOUDBALANCE.BACKEND.dto.UserDetailsDto;
import com.CLOUDBALANCE.BACKEND.dto.UserSummaryDto;
import com.CLOUDBALANCE.BACKEND.exception.InvalidRoleException;
import com.CLOUDBALANCE.BACKEND.exception.UserAlreadyExistsException;
import com.CLOUDBALANCE.BACKEND.model.Role;
import com.CLOUDBALANCE.BACKEND.model.UserAuthEntity;
import com.CLOUDBALANCE.BACKEND.repository.RolesRepository;
import com.CLOUDBALANCE.BACKEND.repository.UserAuthRepository;
import com.CLOUDBALANCE.BACKEND.service.ServiceImpl.mapper.UserMapper;
import com.CLOUDBALANCE.BACKEND.service.UserService;
import com.CLOUDBALANCE.BACKEND.service.UserValidationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


    private final UserAuthRepository userAuthRepository;
    private final RolesRepository rolesRepository;
    private final UserValidationService userValidationService;
    private final UserMapper userMapper;
    @Override
    public String createUser(UserDetailsDto userDto) {
        if(userValidationService.isUserExists(userDto.getEmail())){
            throw new UserAlreadyExistsException();
        }

        if(userDto.getRole()==null || userDto.getRole().isBlank()){
            throw new InvalidRoleException();
        }

        UserAuthEntity user = userMapper.toEntity(userDto);
        userAuthRepository.save(user);
        return "User Saved Successfully";
    }

    @Override
    public List<UserSummaryDto> getAllUsers() {
        return userAuthRepository.findAll().stream()
                .map(userMapper::toSummaryDto)
                .collect(Collectors.toList());
    }

//    @Override
//    public String assignRole(Long userId, String roleName) {
//        Optional<UserAuthEntity> userOpt = userAuthRepository.findById(userId);
//        if (userOpt.isEmpty()) {
//            return "User not found.";
//        }
//            UserAuthEntity user = userOpt.get();
//            user.setRole(Role.valueOf(roleName.toUpperCase()));
//            userAuthRepository.save(user);
//            return "Role updated";
//
//    }
}
