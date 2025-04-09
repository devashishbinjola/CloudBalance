package com.CLOUDBALANCE.BACKEND.exception;

public class UserAlreadyExistsException extends RuntimeException{
    public UserAlreadyExistsException(){
        super("User Already Exists");
    }
}
