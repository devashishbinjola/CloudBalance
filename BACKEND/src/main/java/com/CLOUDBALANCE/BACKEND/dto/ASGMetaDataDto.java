package com.CLOUDBALANCE.BACKEND.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ASGMetaDataDto {
    private String resourceId;
    private String resourceName;
    private String region;
    private Integer desiredCapacity;
    private Integer minSize;
    private Integer maxSize;
    private String status;
}
