package com.CLOUDBALANCE.BACKEND.repository;

import com.CLOUDBALANCE.BACKEND.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account,Long> {

}
