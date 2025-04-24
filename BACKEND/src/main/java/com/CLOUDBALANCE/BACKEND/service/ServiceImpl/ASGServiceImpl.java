package com.CLOUDBALANCE.BACKEND.service.ServiceImpl;

import com.CLOUDBALANCE.BACKEND.dto.ASGMetaDataDto;
import com.CLOUDBALANCE.BACKEND.model.Account;
import com.CLOUDBALANCE.BACKEND.repository.AccountRepository;
import com.CLOUDBALANCE.BACKEND.service.ASGService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.AwsSessionCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.autoscaling.AutoScalingClient;
import software.amazon.awssdk.services.autoscaling.model.*;
import software.amazon.awssdk.services.sts.StsClient;
import software.amazon.awssdk.services.sts.model.AssumeRoleRequest;
import software.amazon.awssdk.services.sts.model.AssumeRoleResponse;
import software.amazon.awssdk.services.sts.model.StsException;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ASGServiceImpl implements ASGService {
    private final AccountRepository accountRepository;

    @Override
    public List<ASGMetaDataDto> getAsgInstancesViaAssumedRole(Long accountId) {
        List<ASGMetaDataDto> asgMetaDataList = new ArrayList<>();
        String region = "us-east-1";
        Account account = accountRepository.findByAccountNo(accountId).orElseThrow(()-> new RuntimeException("Account with this id does not exists."));

        String roleArn = account.getArnNo();
        try {
            StsClient stsClient = StsClient.builder()
                    .region(Region.of(region))
                    .build();

            AssumeRoleRequest assumeRoleRequest = AssumeRoleRequest.builder()
                    .roleArn(roleArn)
                    .roleSessionName("session-name")
                    .build();

            AssumeRoleResponse assumeRoleResponse = stsClient.assumeRole(assumeRoleRequest);

            AwsSessionCredentials tempCredentials = AwsSessionCredentials.create(
                    assumeRoleResponse.credentials().accessKeyId(),
                    assumeRoleResponse.credentials().secretAccessKey(),
                    assumeRoleResponse.credentials().sessionToken()
            );

            AutoScalingClient autoScalingClient = AutoScalingClient.builder()
                    .region(Region.of(region))
                    .credentialsProvider(StaticCredentialsProvider.create(tempCredentials))
                    .build();

            DescribeAutoScalingGroupsRequest describeAutoScalingGroupsRequest = DescribeAutoScalingGroupsRequest.builder().build();
            DescribeAutoScalingGroupsResponse response = autoScalingClient.describeAutoScalingGroups(describeAutoScalingGroupsRequest);

            for (AutoScalingGroup asg : response.autoScalingGroups()) {
                ASGMetaDataDto dto = new ASGMetaDataDto();
                dto.setResourceId(asg.autoScalingGroupARN());
                dto.setResourceName(asg.autoScalingGroupName());
                dto.setRegion(region);
                dto.setDesiredCapacity(asg.desiredCapacity());
                dto.setMinSize(asg.minSize());
                dto.setMaxSize(asg.maxSize());
                dto.setStatus(asg.status());

                asgMetaDataList.add(dto);
            }

        } catch (StsException e) {
            e.printStackTrace();
        } catch (AutoScalingException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return asgMetaDataList;
    }
}
