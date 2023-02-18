package com.positivehire.phtalent.services;

import java.security.NoSuchAlgorithmException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.positivehire.phtalent.models.Account;
import com.positivehire.phtalent.repositories.AccountRepository;

@Component
@Transactional
public class AccountService extends Service<Account, Long> {

    /** Repository for CRUD tasks */
    @Autowired
    private AccountRepository repository;

    @Override
    protected JpaRepository<Account, Long> getRepository() {
        return repository;
    }

    public List<Account> findAll() {
        return repository.findAll();
    }

    public Account saveAccount(Account e) {
        return (Account) repository.save(e);
    }

    private Account findByUsername(String username) {
        List<Account> allAccounts = repository.findAll();
        for (Account account : allAccounts) {
            if (account.getUsername().equals(username)) {
                return account;
            }
        }
        return null;
    }

    public boolean usernameAvailable(String username) {
        if (findByUsername(username) == null) {
            return true;
        } else {
            return false;
        }
    }

    public int login(String username, String password) throws NoSuchAlgorithmException {
        Account acc = findByUsername(username);
        if (acc == null) {
            return -1;
        } else {
            return acc.login(username, password);
        }
    }
}
