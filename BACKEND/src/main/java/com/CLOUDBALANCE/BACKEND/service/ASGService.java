package com.CLOUDBALANCE.BACKEND.service;

import com.CLOUDBALANCE.BACKEND.dto.ASGMetaDataDto;

import java.util.List;

public interface ASGService {
    List<ASGMetaDataDto> getAsgInstancesViaAssumedRole(Long accountId);
}
