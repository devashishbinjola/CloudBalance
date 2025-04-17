package com.CLOUDBALANCE.BACKEND.controller;

import com.CLOUDBALANCE.BACKEND.dto.AccountDto;
import com.CLOUDBALANCE.BACKEND.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<AccountDto>> getAllAccounts(){
        return ResponseEntity.ok(accountService.getAllAccounts());
    }
}
