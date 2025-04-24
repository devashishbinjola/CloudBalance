package com.CLOUDBALANCE.BACKEND.service.ServiceImpl;

import com.CLOUDBALANCE.BACKEND.dto.EC2MetaDataDto;
import com.CLOUDBALANCE.BACKEND.model.Account;
import com.CLOUDBALANCE.BACKEND.repository.AccountRepository;
import com.CLOUDBALANCE.BACKEND.service.EC2Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.AwsSessionCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.ec2.Ec2Client;
import software.amazon.awssdk.services.ec2.model.*;
import software.amazon.awssdk.services.sts.StsClient;
import software.amazon.awssdk.services.sts.model.AssumeRoleRequest;
import software.amazon.awssdk.services.sts.model.AssumeRoleResponse;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class EC2ServiceImpl implements EC2Service {

    private final AccountRepository accountRepository;

    @Override
    public List<EC2MetaDataDto> getEc2InstancesViaAssumedRole(Long accountId) {
        List<EC2MetaDataDto> ec2MetaDataList = new ArrayList<>();

        Account account = accountRepository.findByAccountNo(accountId).orElseThrow(()-> new RuntimeException("Account with this Id is not found."));

        String roleArn = account.getArnNo();
        String region ="us-east-1";
        try {
            StsClient stsClient = StsClient.builder()
                    .region(Region.of(region))
                    .build();

            AssumeRoleRequest assumeRoleRequest = AssumeRoleRequest.builder()
                    .roleArn(roleArn)
                    .roleSessionName("session-cloudbalance")
                    .build();

            AssumeRoleResponse assumeRoleResponse = stsClient.assumeRole(assumeRoleRequest);

            AwsSessionCredentials sessionCredentials = AwsSessionCredentials.create(
                    assumeRoleResponse.credentials().accessKeyId(),
                    assumeRoleResponse.credentials().secretAccessKey(),
                    assumeRoleResponse.credentials().sessionToken()
            );

            Ec2Client ec2Client = Ec2Client.builder()
                    .region(Region.of(region))
                    .credentialsProvider(StaticCredentialsProvider.create(sessionCredentials))
                    .build();

            DescribeInstancesResponse describeInstancesResponse = ec2Client.describeInstances();

            for (Reservation reservation : describeInstancesResponse.reservations()) {
                for (Instance instance : reservation.instances()) {
                    EC2MetaDataDto dto = new EC2MetaDataDto();
                    dto.setResourceId(instance.instanceId());
                    dto.setResourceName(instance.tags().stream()
                            .filter(tag -> "Name".equals(tag.key()))
                            .findFirst()
                            .map(Tag::value)
                            .orElse("Unnamed"));
                    dto.setState(instance.state().nameAsString());
                    dto.setRegion(region);

                    ec2MetaDataList.add(dto);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return ec2MetaDataList;
    }
}
