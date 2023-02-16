package com.positivehire.phtalent.models;

import java.security.SecureRandom;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.io.Serializable;
import java.nio.charset.StandardCharsets;

/**
 * This class represents a "user" account. An account stores username and
 * password data for authentication purposes. This object is used to
 * authenticate a user when they attempt to login to PH Balance. Successful
 * login will return the Employee object stored in it.
 */
@Entity
public class Account extends DomainObject {

    /**
     * ID of account object stored in a database
     */
    @Id
    @GeneratedValue
    private long id;

    private int employeeID;

    /**
     * Username associated with an account for authenticaiton purposes.
     */
    private String username;
    // private byte[] hashedUsername;

    /**
     * Password associated with an account for authentication purposes.
     */
    private byte[] hashedPassword;

    /**
     * Salt used to hash usernmae and password
     */
    private static byte[] salt;

    // /**
    // * The employee associated with this account
    // */
    // private Employee employee;

    /**
     * Empty constructor for hibernate
     */
    public Account() {

    }

    /**
     * Constructor for an Account object. Generates a salt and uses it to hash the
     * username and password. The hashed results are stored.
     * 
     * @param username       Used to set the username for the account
     * @param password       Used to set the password for the account
     * @param repeatPassword Used to ensure the user inputted the correct password
     * @throws NoSuchAlgorithmException If there is an error using the SHA-512
     *                                  hashing algorithm
     * @throws IllegalArgumentException If the username or password is less than 8
     *                                  characters long
     */
    public Account(String username, String password, String repeatPassword, int employeeID)
            throws NoSuchAlgorithmException {
        // Check if username and password is valid
        if (username.length() < 8 && password.length() < 8) {
            throw new IllegalArgumentException("Username and passwords must be at least 8 characters long.");
        }

        // Check for matching password
        if (!password.equals(repeatPassword)) {
            // Might need to change/create a new exception for this error
            throw new IllegalArgumentException(
                    "Password values do not match. Please retype password and repeat password.");
        }

        // random object to generate salts
        SecureRandom random = new SecureRandom();
        byte[] ransalt = new byte[16];
        random.nextBytes(ransalt);
        salt = ransalt;

        // Hash the password
        hashedPassword = generateSHA512Hash(password);
        // Hash the username
        // hashedUsername = generateSHA512Hash(username);
        this.username = username;

        // Set the Employee Id
        this.employeeID = employeeID;
    }

    /**
     * The login method processes login attempts. It takes a username and password
     * provided to it, hashes them with the stored salt, and then compares the
     * result to the stored hash. The method returns null on failed login; returns
     * an Employee object on successful login
     * 
     * @param usernameAttempt username submitted for comparison
     * @param passwordAttempt password submitted for comparison
     * @throws NoSuchAlgorithmException If there is an error using the SHA-512
     *                                  hashing algorithm
     */
    public int login(String usernameAttempt, String passwordAttempt) throws NoSuchAlgorithmException {

        if (!usernameAttempt.equals(getUsername())) {
            return -1;
        }

        byte[] hashedPasswordResult = generateSHA512Hash(passwordAttempt);

        if (!hashedPasswordResult.equals(getPassword())) {
            return -1;
        }

        // return the Employee object or something equivalent
        return getEmployeeID();
    }

    /**
     * Updates the username of the account, provided that the current username and
     * password can be provided.
     * 
     * @param currentUsername current, valid username of the account
     * @param currentPassword current, valid password of the account
     * @param newUsername     new username to assign the account
     * @return true if the username was changed; false otherwise.
     */
    public boolean setUsername(String currentUsername, String currentPassword, String newUsername)
            throws NoSuchAlgorithmException {
        // Check if username is valid
        if (newUsername.length() < 8) {
            throw new IllegalArgumentException("Username must be at least 8 characters long.");
        }

        // Check if the Account has a current username
        if (getUsername() == null) {
            return false;
        }

        // Verify login credentials
        if (login(currentUsername, currentPassword) == -1) {
            return false;
        }

        // Update username
        this.username = newUsername;

        // Confirm change
        return true;
    }

    /**
     * Updates the password of the account, provided that the current username and
     * password can be provided.
     * 
     * @param currentUsername current, valid username of the account
     * @param currentPassword current, valid password of the account
     * @param newPassword     new password to assign the account
     * @return true if the password was changed; false otherwise.
     */
    public boolean updatePassword(String currentUsername, String currentPassword, String newPassword)
            throws NoSuchAlgorithmException {
        // Check if password is valid
        if (newPassword.length() < 8) {
            throw new IllegalArgumentException("Passwords must be at least 8 characters long.");
        }

        // Check if the Account has a current password
        if (getPassword() == null) {
            return false;
        }

        // attempt to authenticate user for changing their password
        if (login(currentUsername, currentPassword) == -1) {
            return false;
        }

        // Update password
        hashedPassword = generateSHA512Hash(newPassword);

        // Confirm change
        return true;
    }

    /**
     * Returns the stored hash of the Account's associated username
     * 
     * @return String containing the username
     */
    public String getUsername() {
        return username;
    }

    /**
     * Returns the stored hash of the Account's associated password
     * 
     * @return byte array containing the hash of the password
     */
    public byte[] getPassword() {
        return hashedPassword;
    }

    /**
     * Returns the stored Employee ID number of the Account
     *
     * @return an integer representing the EmployeeID of the user associated with
     *         this account object
     */
    private int getEmployeeID() {
        return employeeID;
    }

    /**
     * Returns the salt used to hash the password and username of the account
     * 
     * @return The salt as a byte array. Used in a Message Digest object for
     *         hashing.
     */
    public byte[] getSalt() {
        return salt;
    }

    /**
     * Helper function for generating a SHA512 hash from the given value
     * 
     * @param value the value to hash
     * @return the value hashed with the Account's salt
     * @throws NoSuchAlgorithmException if there is an error trying to use the
     *                                  SHA512 hash algorithm
     */
    private byte[] generateSHA512Hash(String value) throws NoSuchAlgorithmException {
        try {
            // Hash the given String with the Account's salt
            MessageDigest md = MessageDigest.getInstance("SHA-512");
            md.update(getSalt());
            byte[] hashedResult = md.digest(value.getBytes(StandardCharsets.UTF_8));
            return hashedResult;
        } catch (NoSuchAlgorithmException e) {
            throw new NoSuchAlgorithmException(
                    "ERROR: hashing algorithm is not available for use. Could not perform the action that required hashing.");
        }
    }

    @Override
    public Serializable getId() {
        return id;
    }

}