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

    /**
     * Retrieve a list of all Accounts
     */
    public List<Account> findAll() {
        return repository.findAll();
    }

    /**
     * Saves a new account to the repo
     * 
     * @param e the Account to save
     * @return the Account e
     */
    // public Account saveAccount(Account e) {
    // return (Account) repository.save(e);
    // }

    public Account findByEmployeeId(String employeeId) {
        List<Account> allAccounts = repository.findAll();
        for (Account account : allAccounts) {
            if (account.getEmployeeID().equals(employeeId)) {
                return account;
            }
        }

        return null;
    }

    public Account findByEmployeeEmail(String employeeEmail) {
        List<Account> allAccounts = repository.findAll();
        for (Account account : allAccounts) {
            if (account.getEmployeeEmail().equals(employeeEmail)) {
                return account;
            }
        }

        return null;
    }

    public boolean employeeIdInUse(String employeeId) {
        if (findByEmployeeId(employeeId) == null) {
            return false;
        } else {
            return true;
        }
    }

    public String login(String employeeId, String password) throws NoSuchAlgorithmException {
        Account acc = findByEmployeeId(employeeId);
        if (acc == null) {
            return null;
        } else {
            return acc.login(password);
        }
    }
}
