package com.positivehire.phtalent.models;

import java.security.SecureRandom;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.nio.charset.StandardCharsets;
import javax.persistence.*;

/**
 * This class represents a "user" account. An account stores username and
 * password data for authentication purposes. This object is used to
 * authenticate a user when they attempt to login to PH Balance. Successful
 * login will return the Employee object stored in it.
 */
@Entity
public class Account {

    /**
     * ID of account object stored in a database
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    // @Length(max = 64)
    private int employeeID;

    /**
     * Username associated with an account for authenticaiton purposes.
     */
    // @Length(max = 1024)
    private byte[] hashedUsername;

    /**
     * Password associated with an account for authentication purposes.
     */
    // @Length(max = 1024)
    private byte[] hashedPassword;

    /**
     * Salt used to hash usernmae and password
     */
    // @Length(max = 1024)
    private static byte[] salt;

    // private static Employee;

    /**
     * Constructor for an Account object. Generates a salt and uses it to hash the
     * username and password. The hashed results are stored.
     * 
     * @param username Used to set the username for the account
     * @param password Used to set the password for the account
     * @throws NoSuchAlgorithmException If there is an error using the SHA-512
     *                                  hashing algorithm
     */
    public Account(String username, String password) throws NoSuchAlgorithmException {
        // random object to generate salts
        SecureRandom random = new SecureRandom();
        byte[] ransalt = new byte[16];
        random.nextBytes(ransalt);
        salt = ransalt;

        try {
            // Hash the password
            MessageDigest md = MessageDigest.getInstance("SHA-512");
            md.update(salt);
            byte[] hashedPasswordResult = md.digest(password.getBytes(StandardCharsets.UTF_8));
            hashedPassword = hashedPasswordResult;

            md = MessageDigest.getInstance("SHA-512");
            md.update(salt);
            byte[] hashedUsernameResult = md.digest(username.getBytes(StandardCharsets.UTF_8));
            hashedUsername = hashedUsernameResult;
        } catch (NoSuchAlgorithmException excep) {
            throw new NoSuchAlgorithmException(
                    "ERROR: hashing algorithm is not available for use. No new account has been created.");
        }

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
    public void login(String usernameAttempt, String passwordAttempt) throws NoSuchAlgorithmException {
        // Check if username and password is valid
        // TODO

        try {
            // Hash the usernameAttempt and compare to username
            MessageDigest md = MessageDigest.getInstance("SHA-512");
            md.update(getSalt());
            byte[] hashedUsernameResult = md.digest(usernameAttempt.getBytes(StandardCharsets.UTF_8));

            if (!hashedUsernameResult.equals(this.getUsername())) {
                // return null;
            }

            md = MessageDigest.getInstance("SHA-512");
            md.update(getSalt());
            byte[] hashedPasswordResult = md.digest(passwordAttempt.getBytes(StandardCharsets.UTF_8));

            if (!hashedPasswordResult.equals(this.getPassword())) {
                // return null;
            }

        } catch (NoSuchAlgorithmException excep) {
            throw new NoSuchAlgorithmException(
                    "ERROR: hashing algorithm is not available for use. Unable to process login attempt");
        }

        // return the Employee object or something equivalent
    }

    /**
     * Updates the username of the account, provided that the current username and
     * password can be provided.
     * 
     * @param currentUsername current, valid username of the account
     * @param currentPassword current, valid password of the account
     * @param newUsername     new username to assign the account
     */
    public void updateUsername(String currentUsername, String currentPassword, String newUsername) {
        // Check if username is valid
        // TODO

        try {
            login(currentUsername, currentPassword);

            // Update username
            MessageDigest md = MessageDigest.getInstance("SHA-512");
            md.update(getSalt());
            byte[] hashedUsernameResult = md.digest(newUsername.getBytes(StandardCharsets.UTF_8));
            hashedUsername = hashedUsernameResult;

            // Confirm change
        } catch (Exception e) {
            System.out.println("Unable to authenticate user. Cannot change employee ID");
        }
    }

    /**
     * Updates the password of the account, provided that the current username and
     * password can be provided.
     * 
     * @param currentUsername current, valid username of the account
     * @param currentPassword current, valid password of the account
     * @param newPassword     new password to assign the account
     */
    public void updatePassword(String currentUsername, String currentPassword, String newPassword) {
        // Check if password is valid
        // TODO

        // attempt to authenticate user for changing their password
        try {
            login(currentUsername, currentPassword);

            // Update password
            MessageDigest md = MessageDigest.getInstance("SHA-512");
            md.update(getSalt());
            byte[] hashedPasswordResult = md.digest(newPassword.getBytes(StandardCharsets.UTF_8));
            hashedPassword = hashedPasswordResult;

            // Confirm change
        } catch (Exception e) {
            System.out.println("Unable to authenticate user. Cannot change employee ID");
        }
    }

    /**
     * Updates the EmployeeID of the account, provided that the current username and
     * password can be provided.
     * 
     * @param currentUsername current, valid username of the account
     * @param currentPassword current, valid password of the account
     * @param newEmployeeID   new employeeID to assign the account
     */
    public void updateEmployeeID(String currentUsername, String currentPassword, int newEmployeeID) {
        // Check if new EmployeeID is a valid ID
        // TODO

        // attempt to authenticate user for changing their ID?
        try {
            login(currentUsername, currentPassword);

            // Update EmployeeID
            employeeID = newEmployeeID;

            // Return new employee ID?
        } catch (Exception e) {
            System.out.println("Unable to authenticate user. Cannot change employee ID");
        }
    }

    /**
     * Returns the stored hash of the Account's associated username
     * 
     * @return byte array containing the hash of the username
     */
    public byte[] getUsername() {
        return hashedUsername;
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
    public int getEmployeeID() {
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

}