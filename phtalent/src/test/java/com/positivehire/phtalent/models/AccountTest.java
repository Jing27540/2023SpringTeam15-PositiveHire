package com.positivehire.phtalent.models;

import org.junit.Test;

import jakarta.xml.bind.PrintConversionEvent;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.fail;
import static org.junit.Assert.assertNotSame;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.security.NoSuchAlgorithmException;

import org.junit.Before;

public class AccountTest {

    private Account acc1, acc2, acc3;

    private String empEmail1 = "hms@email.com", empEmail2 = "re@email.com", empEmail3 = "fff@email.com";
    private String empl1Id = "1234", empl2Id = "5678", empl3Id = "0000";
    private String pass1 = "password", pass2 = "amsterdam", pass3 = "observer";

    @Before
    public void setup() {
        // Setup accounts

        try {
            acc1 = new Account(empl1Id, pass1, pass1, empEmail1);

            acc2 = new Account(empl2Id, pass2, pass2, empEmail2);

            acc3 = new Account(empl3Id, pass3, pass3, empEmail3);
        } catch (Exception e) {
            fail();
        }

    }

    @Test
    public void test() {

        // assertEquals(acc1.getId(), empl1Id);
        // assertEquals(acc2.getId(), empl2Id);
        // assertEquals(acc2.getId(), empl3Id);

        // assertNotSame(acc1.getHashedPassword(), "password".getBytes());
        // assertNotSame(acc2.getHashedPassword(), "amsterdam".getBytes());
        // assertNotSame(acc3.getHashedPassword(), "observer".getBytes());

        // Create an account with password less than 8 characters

        try {
            Account badAcc = new Account("9876", "pass", "pass", "hel@email.com");
        } catch (IllegalArgumentException e) {
            assertEquals("Passwords must be 8 or more characters.", e.getMessage());
        } catch (NoSuchAlgorithmException e1) {
            fail();
        }

        // Create an account with mismatched passwords

        try {
            Account badAcc = new Account("9876", "password", "password1", "hel@email.com");
        } catch (IllegalArgumentException e) {
            assertEquals("Password values do not match. Please retype password and repeat password.", e.getMessage());
        } catch (NoSuchAlgorithmException e1) {
            fail();
        }

        // Valid login

        try {
            assertEquals(empl1Id, acc1.login(pass1));
            assertEquals(empl2Id, acc2.login(pass2));
            assertEquals(empl3Id, acc3.login(pass3));
        } catch (Exception e) {
            fail();
        }

        // Invalid login

        try {
            assertNull(empl1Id, acc1.login("bad pass"));
            assertNull(empl2Id, acc2.login("bad pass"));
            assertNull(empl3Id, acc3.login("bad pass"));
        } catch (Exception e) {
            fail();
        }

        // Test updating the password with invalid login
        try {
            acc1.updatePassword("bad pass", "newpassword", "newpassword");
            acc2.updatePassword("bad pass", "newpassword", "newpassword");
            acc3.updatePassword("bad pass", "newpassword", "newpassword");
        } catch (Exception e) {
            fail();
        }

        // Validate login

        try {
            assertEquals(empl1Id, acc1.login(pass1));
            assertEquals(empl2Id, acc2.login(pass2));
            assertEquals(empl3Id, acc3.login(pass3));
        } catch (Exception e) {
            fail();
        }

        // Test updating the password with valid login

        try {
            acc1.updatePassword(pass1, "newpassword", "newpassword");
            acc2.updatePassword(pass2, "newpassword", "newpassword");
            acc3.updatePassword(pass3, "newpassword", "newpassword");
        } catch (Exception e) {
            fail();
        }

        // Validate login

        try {
            assertEquals(empl1Id, acc1.login("newpassword"));
            assertEquals(empl2Id, acc2.login("newpassword"));
            assertEquals(empl3Id, acc3.login("newpassword"));
        } catch (Exception e) {
            fail();
        }

        // Update with password too short

        try {
            acc1.updatePassword("newpassword", "small", "small");
        } catch (IllegalArgumentException e) {
            assertEquals("Passwords must be at least 8 characters long.", e.getMessage());
        } catch (NoSuchAlgorithmException e1) {
            fail();
        }

        try {
            acc2.updatePassword("newpassword", "small", "small");
        } catch (IllegalArgumentException e) {
            assertEquals("Passwords must be at least 8 characters long.", e.getMessage());
        } catch (NoSuchAlgorithmException e1) {
            fail();
        }

        try {
            acc3.updatePassword("newpassword", "small", "small");
        } catch (IllegalArgumentException e) {
            assertEquals("Passwords must be at least 8 characters long.", e.getMessage());
        } catch (NoSuchAlgorithmException e1) {
            fail();
        }

        // Validate login

        try {
            assertEquals(empl1Id, acc1.login("newpassword"));
            assertEquals(empl2Id, acc2.login("newpassword"));
            assertEquals(empl3Id, acc3.login("newpassword"));
        } catch (Exception e) {
            fail();
        }
    }
}
