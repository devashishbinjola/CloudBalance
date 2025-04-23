package com.CLOUDBALANCE.BACKEND.exception;

public class ArnAlreadyExistException extends RuntimeException{
    public ArnAlreadyExistException(){
        super("Arn number already Exists");
    }
}
