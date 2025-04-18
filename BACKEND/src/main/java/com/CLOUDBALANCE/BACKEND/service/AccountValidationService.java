package com.CLOUDBALANCE.BACKEND.service;

import com.CLOUDBALANCE.BACKEND.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountValidationService {

    private final AccountRepository accountRepository;

    public boolean isAccountExists(Long id){
        return accountRepository.findById(id).isPresent();
    }
}
