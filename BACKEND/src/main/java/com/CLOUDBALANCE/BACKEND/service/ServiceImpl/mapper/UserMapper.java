package com.CLOUDBALANCE.BACKEND.service.ServiceImpl.mapper;

import com.CLOUDBALANCE.BACKEND.dto.UserDetailsDto;
import com.CLOUDBALANCE.BACKEND.dto.UserSummaryDto;
import com.CLOUDBALANCE.BACKEND.model.Role;
import com.CLOUDBALANCE.BACKEND.model.UserAuthEntity;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserAuthEntity toEntity(UserDetailsDto dto){
        UserAuthEntity user = new UserAuthEntity();
        user.setFirst_name(dto.getFirstName());
        user.setLast_name(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setRole(Role.valueOf(dto.getRole().toUpperCase()));
        return user;
    }
    public UserDetailsDto toDto(UserAuthEntity user){
        UserDetailsDto dto=new UserDetailsDto();
        dto.setEmail(user.getEmail());
        dto.setId(user.getId());
        dto.setFirstName(user.getFirst_name());
        dto.setLastName(user.getLast_name());
        dto.setPassword(null);
        dto.setRole(user.getRole().name());
        return dto;
    }
    public UserSummaryDto toSummaryDto(UserAuthEntity user){
        UserSummaryDto dto = new UserSummaryDto(
                user.getId(),
                user.getFirst_name(),
                user.getLast_name(),
                user.getEmail(),
                user.getRole().name());
                return dto;
    }
}
