package com.CLOUDBALANCE.BACKEND.service.ServiceImpl;

import com.CLOUDBALANCE.BACKEND.dto.AccountDto;
import com.CLOUDBALANCE.BACKEND.repository.AccountRepository;
import com.CLOUDBALANCE.BACKEND.service.AccountService;
import com.CLOUDBALANCE.BACKEND.service.ServiceImpl.mapper.AccountMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AccountMapper accountMapper;
    @Override
    public List<AccountDto> getAllAccounts() {
        return accountRepository.findAll().stream()
                .map(accountMapper::toDto)
                .collect(Collectors.toList());
    }
}
