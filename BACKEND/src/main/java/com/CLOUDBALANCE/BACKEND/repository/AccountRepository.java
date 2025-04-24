package com.CLOUDBALANCE.BACKEND.repository;

import com.CLOUDBALANCE.BACKEND.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account,Long> {
    boolean existsByAccountNo(Long accountNo);
//    boolean existsByArn(String arn)
boolean existsByArnNo(String arnNo);

Optional<Account> findByAccountNo(Long accountNo);
}
