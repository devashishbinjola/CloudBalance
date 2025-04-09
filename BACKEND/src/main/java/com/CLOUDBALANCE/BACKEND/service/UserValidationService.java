package com.CLOUDBALANCE.BACKEND.service;

import com.CLOUDBALANCE.BACKEND.repository.UserAuthRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserValidationService {

    private final UserAuthRepository userRepo;
    public boolean isUserExists(String email){
       return userRepo.findByEmail(email).isPresent();
    }

}
