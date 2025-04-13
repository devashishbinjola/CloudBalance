package com.CLOUDBALANCE.BACKEND.exception;

public class AccessDeniedException extends RuntimeException{
    public AccessDeniedException(){
        super("You are not authorized to create user");
    }
}
