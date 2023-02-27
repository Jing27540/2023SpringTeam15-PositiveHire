package com.positivehire.phtalent.controllers;

import java.security.NoSuchAlgorithmException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    public ResponseEntity<String> createAccount(@RequestBody final String employeeId,
            @RequestBody final String password,
            @RequestBody final String repeatPassword) throws NoSuchAlgorithmException {

        if (accountServ.employeeIdInUse(employeeId) == true) {
            return new ResponseEntity<String>(
                    successResponse("A user with either that username already exists."),
                    HttpStatus.CONFLICT);
        } else {
            Account newAccount = null;
            try {
                newAccount = new Account(employeeId, password, repeatPassword);
            } catch (IllegalArgumentException e) {
                return new ResponseEntity<String>(
                        successResponse("Invalid password. Or passwords do not match"),
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
    public String login(@RequestBody final String employeeId, @RequestBody final String password)
            throws NoSuchAlgorithmException {

        // This will return null if login fails; otherwise it will return the employeeId
        return accountServ.login(employeeId, password);
    }

    // Update password
    @PutMapping("/accounts")
    public ResponseEntity<String> updateEmployeePassword(@RequestBody String employeeId,
            @RequestBody String currentPassword, @RequestBody String newPassword,
            @RequestBody String repeateNewPassword) {
        Account acc = accountServ.findByEmployeeId(employeeId);

        // if (null == toEdit) {
        // return new ResponseEntity<String>(errorResponse("No Account found for
        // employee id " + e.getEmployeeId()),
        // HttpStatus.NOT_FOUND);
        // }
        try {
            if (acc.updatePassword(currentPassword, newPassword, repeateNewPassword)) {
                accountServ.save(acc);
                return new ResponseEntity<String>(
                        successResponse(acc.getEmployeeId() + " password was updated successfully"),
                        HttpStatus.OK);
            } else {
                return new ResponseEntity<String>(
                        successResponse("Could not update password with provided values or error logging in."),
                        HttpStatus.OK);
            }
        } catch (NoSuchAlgorithmException e) {
            return new ResponseEntity<String>(
                    successResponse("Unable to update password."),
                    HttpStatus.CONFLICT);
        }
    }

    // Delete an Account
    @DeleteMapping("/accounts/{employeeId}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("employeeId") final String employeeId) {
        Account acc = accountServ.findByEmployeeId(employeeId);

        if (acc == null) {
            return new ResponseEntity<String>(errorResponse("No Account with the given employee number"),
                    HttpStatus.NOT_FOUND);
        }

        accountServ.delete(acc);
        return new ResponseEntity<String>(successResponse("Accounte was deleted successfully"), HttpStatus.OK);
    }
}