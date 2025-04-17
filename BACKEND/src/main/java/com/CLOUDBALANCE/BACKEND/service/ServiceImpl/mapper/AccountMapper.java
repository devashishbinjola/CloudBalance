package com.CLOUDBALANCE.BACKEND.service.ServiceImpl.mapper;

import com.CLOUDBALANCE.BACKEND.dto.AccountDto;
import com.CLOUDBALANCE.BACKEND.model.Account;
import org.springframework.stereotype.Component;

import java.util.HashSet;

@Component
public class AccountMapper {
    public Account toEntity(AccountDto dto){
        Account acc = new Account(
             dto.getId(),
             dto.getAccountNo(),
             dto.getName(),
             dto.getArnNo(),
                new HashSet<>()

        );
        return acc;
    }

    public AccountDto toDto(Account entity){
        AccountDto dto = new AccountDto(
                entity.getId(),
                entity.getAccountNo(),
                entity.getName(),
                entity.getArnNo()
        );
        return dto;
    }
}
