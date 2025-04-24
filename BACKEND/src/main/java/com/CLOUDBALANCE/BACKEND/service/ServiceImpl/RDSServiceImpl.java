package com.CLOUDBALANCE.BACKEND.service.ServiceImpl;

import com.CLOUDBALANCE.BACKEND.dto.RDSMetaDataDto;
import com.CLOUDBALANCE.BACKEND.model.Account;
import com.CLOUDBALANCE.BACKEND.repository.AccountRepository;
import com.CLOUDBALANCE.BACKEND.service.RDSService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.AwsSessionCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.rds.RdsClient;
import software.amazon.awssdk.services.rds.model.DBInstance;
import software.amazon.awssdk.services.rds.model.DescribeDbInstancesRequest;
import software.amazon.awssdk.services.rds.model.DescribeDbInstancesResponse;
import software.amazon.awssdk.services.rds.model.RdsException;
import software.amazon.awssdk.services.sts.StsClient;
import software.amazon.awssdk.services.sts.model.AssumeRoleRequest;
import software.amazon.awssdk.services.sts.model.AssumeRoleResponse;
import software.amazon.awssdk.services.sts.model.StsException;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RDSServiceImpl implements RDSService {

    private final AccountRepository accountRepository;
    @Override
    public List<RDSMetaDataDto> getRdsInstancesViaAssumedRole(Long accountId) {
        List<RDSMetaDataDto> rdsMetaDataList = new ArrayList<>();
        String region="us-east-1";
        Account account = accountRepository.findByAccountNo(accountId).orElseThrow(()-> new RuntimeException("Account with this id does not exists."));
        String roleArn= account.getArnNo();
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

            RdsClient rdsClient = RdsClient.builder()
                    .region(Region.of(region))
                    .credentialsProvider(StaticCredentialsProvider.create(tempCredentials))
                    .build();

            DescribeDbInstancesRequest request = DescribeDbInstancesRequest.builder().build();
            DescribeDbInstancesResponse response = rdsClient.describeDBInstances(request);

            for (DBInstance dbInstance : response.dbInstances()) {
                RDSMetaDataDto dto = new RDSMetaDataDto();
                dto.setResourceId(dbInstance.dbInstanceArn());
                dto.setResourceName(dbInstance.dbInstanceIdentifier());
                dto.setEngine(dbInstance.engine());
                dto.setRegion(region);
                dto.setStatus(dbInstance.dbInstanceStatus());

                rdsMetaDataList.add(dto);
            }

        } catch (StsException e) {
            e.printStackTrace();
        } catch (RdsException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return rdsMetaDataList;
    }
}
