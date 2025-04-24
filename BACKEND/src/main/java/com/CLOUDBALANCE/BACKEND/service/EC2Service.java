package com.CLOUDBALANCE.BACKEND.service;

import com.CLOUDBALANCE.BACKEND.dto.EC2MetaDataDto;

import java.util.List;

public interface EC2Service {
    List<EC2MetaDataDto> getEc2InstancesViaAssumedRole(Long accountId);
}
