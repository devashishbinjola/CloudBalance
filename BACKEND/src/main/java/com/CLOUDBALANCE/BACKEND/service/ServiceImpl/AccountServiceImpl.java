package com.CLOUDBALANCE.BACKEND.service.ServiceImpl;

import com.CLOUDBALANCE.BACKEND.dto.AccountDto;
import com.CLOUDBALANCE.BACKEND.exception.AccountExistsException;
import com.CLOUDBALANCE.BACKEND.exception.ArnAlreadyExistException;
import com.CLOUDBALANCE.BACKEND.model.Account;
import com.CLOUDBALANCE.BACKEND.repository.AccountRepository;
import com.CLOUDBALANCE.BACKEND.service.AccountService;
import com.CLOUDBALANCE.BACKEND.service.AccountValidationService;
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
    @Autowired
    private AccountValidationService accountValidationService;
    @Override
    public List<AccountDto> getAllAccounts() {
        return accountRepository.findAll().stream()
                .map(accountMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public String createAccount(AccountDto dto) {
        if(accountValidationService.isAccountExists(dto.getAccountNo())){
            throw new AccountExistsException();
        }
        if(accountValidationService.isArnExists(dto.getArnNo())){
            throw new ArnAlreadyExistException();
        }

        Account newAcc=
        accountMapper.toEntity(dto);
        accountRepository.save(newAcc);
        return "Account Successfully Created...";
    }
}
