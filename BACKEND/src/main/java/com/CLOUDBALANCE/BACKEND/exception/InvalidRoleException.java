package com.CLOUDBALANCE.BACKEND.exception;

public class InvalidRoleException extends RuntimeException{
    public InvalidRoleException(){
        super("Role is mandatory");
    }
}
