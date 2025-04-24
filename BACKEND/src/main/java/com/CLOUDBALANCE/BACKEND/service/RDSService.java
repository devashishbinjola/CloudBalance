package com.CLOUDBALANCE.BACKEND.service;

import com.CLOUDBALANCE.BACKEND.dto.RDSMetaDataDto;

import java.util.List;

public interface RDSService {
    List<RDSMetaDataDto> getRdsInstancesViaAssumedRole(Long accountId);
}
