package com.positivehire.phtalent.services;

import java.security.NoSuchAlgorithmException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.positivehire.phtalent.models.Account;
import com.positivehire.phtalent.repositories.AccountRepository;

@Service
public class AccountService {

    /** Repository for CRUD tasks */
    @Autowired
    private AccountRepository repository;

    // @Override
    protected JpaRepository<Account, Long> getRepository() {
        return repository;
    }

    public List<Account> findAll() {
        return repository.findAll();
    }

    public Account findByUsername(String username) {
        return repository.findByUsername(username);

    }

    public Account findByEmployeeID(int id) {
        return repository.findByEmployeeID(id);

    }

    public Account saveAccount(Account e) {
        return (Account) repository.save(e);
    }

    // public Account login(String username, String password) throws
    // NoSuchAlgorithmException {
    // Account accountToLogin = findByUsername(username);
    // if (accountToLogin.login(username, password) != -1) {
    // return accountToLogin;
    // }
    // return null;
    // }

}
