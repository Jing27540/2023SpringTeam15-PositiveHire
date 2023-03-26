package com.positivehire.phtalent.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.positivehire.phtalent.models.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    // public Account findByUsername(String username);

    Account findByEmployeeEmail(String employeeEmail);
}