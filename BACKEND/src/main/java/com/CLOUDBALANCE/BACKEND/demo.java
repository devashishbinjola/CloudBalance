package com.CLOUDBALANCE.BACKEND;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class demo {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "admin";
        String encodedPassword = encoder.encode(rawPassword);
        System.out.println(encodedPassword);
    }
}
