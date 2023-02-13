package com.positivehire.phtalent.controllers;

import java.security.NoSuchAlgorithmException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.positivehire.phtalent.models.Account;
import com.positivehire.phtalent.services.AccountService;

public class APIAccountController extends APIController {

    @Autowired
    private AccountService accountServ;

    private static final String BASE_PATH = "";

    @PostMapping(BASE_PATH + "/accounts")
    public ResponseEntity<String> createAccount(@RequestBody final String username, @RequestBody final String password,
            @RequestBody final String repeatPassword,
            @RequestBody final int employeeID) throws NoSuchAlgorithmException {
        if (accountServ.findByUsername(username) != null && accountServ.findByEmployeeID(employeeID) != null) {
            return new ResponseEntity<String>(
                    successResponse("A user with either the ID or username already exists."),
                    HttpStatus.CONFLICT);
        } else {
            Account newAccount = new Account(username, password, repeatPassword, employeeID);
            accountServ.saveAccount(newAccount);
            return new ResponseEntity<String>(successResponse("Account successfully created"),
                    HttpStatus.OK);
        }
    }
}