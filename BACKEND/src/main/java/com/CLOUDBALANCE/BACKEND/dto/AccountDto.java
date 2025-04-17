package com.CLOUDBALANCE.BACKEND.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountDto {
    private Long id;
    private Long accountNo;
    private String name;
    private String arnNo;
}
