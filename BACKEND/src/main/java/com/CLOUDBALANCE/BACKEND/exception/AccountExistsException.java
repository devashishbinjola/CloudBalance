package com.CLOUDBALANCE.BACKEND.exception;

public class AccountExistsException extends RuntimeException{
    public AccountExistsException(){
        super("Account Already exists");
    }
}
