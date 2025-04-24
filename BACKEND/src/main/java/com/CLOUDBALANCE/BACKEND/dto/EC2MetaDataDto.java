package com.CLOUDBALANCE.BACKEND.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EC2MetaDataDto {
    private String resourceId;
    private String resourceName;
    private String state;
    private String region;
}
