package com.CLOUDBALANCE.BACKEND.controller;

import com.CLOUDBALANCE.BACKEND.dto.EC2MetaDataDto;
import com.CLOUDBALANCE.BACKEND.dto.RDSMetaDataDto;
import com.CLOUDBALANCE.BACKEND.dto.ASGMetaDataDto;
import com.CLOUDBALANCE.BACKEND.service.EC2Service;
import com.CLOUDBALANCE.BACKEND.service.RDSService;
import com.CLOUDBALANCE.BACKEND.service.ASGService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/aws")
@RequiredArgsConstructor
public class AwsController {

    private final EC2Service ec2Service;
    private final RDSService rdsService;
    private final ASGService asgService;


    @PreAuthorize("hasRole('ADMIN') or hasRole('READ_ONLY') or hasRole('CUSTOMER')")
    @GetMapping("ec2")
    public List<EC2MetaDataDto> getEc2Instances(@RequestParam(name = "id") Long accountId) {
        return ec2Service.getEc2InstancesViaAssumedRole(accountId);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('READ_ONLY') or hasRole('CUSTOMER')")
    @GetMapping("rds")
    public List<RDSMetaDataDto> getRdsInstances(@RequestParam(name = "id")  Long accountId){
        return rdsService.getRdsInstancesViaAssumedRole(accountId);
    }


    @PreAuthorize("hasRole('ADMIN') or hasRole('READ_ONLY') or hasRole('CUSTOMER')")
    @GetMapping("asg")
    public List<ASGMetaDataDto> getAsgInstances(@RequestParam(name="id") Long accountId) {
        return asgService.getAsgInstancesViaAssumedRole(accountId);
    }
}
