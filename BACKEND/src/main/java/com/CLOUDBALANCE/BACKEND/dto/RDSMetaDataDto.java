package com.CLOUDBALANCE.BACKEND.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RDSMetaDataDto {
    private String resourceId;
    private String resourceName;
    private String engine;
    private String region;
    private String status;
}
