package com.CLOUDBALANCE.BACKEND.service;

import com.CLOUDBALANCE.BACKEND.dto.AccountDto;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Service
public interface AccountService {

    List<AccountDto> getAllAccounts();
    String createAccount(AccountDto dto);
}