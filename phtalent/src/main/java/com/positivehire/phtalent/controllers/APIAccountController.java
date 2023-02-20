package com.positivehire.phtalent.controllers;

import java.security.NoSuchAlgorithmException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.positivehire.phtalent.models.Account;
import com.positivehire.phtalent.services.AccountService;

public class APIAccountController extends APIController {

    @Autowired
    private AccountService accountServ;

    // @Autowired
    // private EmployeeService employeeServ;

    // private static final String BASE_PATH = "";

    @PostMapping("/accounts")
    public ResponseEntity<String> createAccount(@RequestBody final String username, @RequestBody final String password,
            @RequestBody final String repeatPassword,
            @RequestBody final int employeeID) throws NoSuchAlgorithmException {

        if (accountServ.usernameAvailable(username) == false) {
            return new ResponseEntity<String>(
                    successResponse("A user with either that username already exists."),
                    HttpStatus.CONFLICT);
        } else {
            Account newAccount = null;
            try {
                newAccount = new Account(username, password, repeatPassword,
                        employeeID);
            } catch (IllegalArgumentException e) {
                return new ResponseEntity<String>(
                        successResponse("Invalid username or password. Or passwords do not match"),
                        HttpStatus.OK);
            } catch (NoSuchAlgorithmException e1) {
                return new ResponseEntity<String>(successResponse("Error creating Account"),
                        HttpStatus.OK);
            }

            accountServ.saveAccount(newAccount);
            return new ResponseEntity<String>(successResponse("Account successfully created"),
                    HttpStatus.OK);

        }

    }

    @GetMapping("/accounts")
    public int login(@RequestBody final String username, @RequestBody final String password)
            throws NoSuchAlgorithmException {
        return accountServ.login(username, password);
    }
}