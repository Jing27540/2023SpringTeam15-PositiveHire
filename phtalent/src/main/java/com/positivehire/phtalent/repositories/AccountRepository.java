package com.positivehire.phtalent.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.positivehire.phtalent.models.Account;

//import model

public interface AccountRepository extends JpaRepository<Account, Long> {

    public Account findByUsername(String username);

    public Account findByEmployeeID(int id);
}