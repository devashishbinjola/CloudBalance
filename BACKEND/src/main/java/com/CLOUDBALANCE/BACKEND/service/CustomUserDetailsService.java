package com.CLOUDBALANCE.BACKEND.service;
import com.CLOUDBALANCE.BACKEND.model.UserAuthEntity;
import com.CLOUDBALANCE.BACKEND.repository.UserAuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@Primary
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserAuthRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserAuthEntity user = userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return new User(user.getUsername(), user.getPassword(),
                Collections.singletonList(() -> "ROLE_" + user.getRole().name()));
    }
}

