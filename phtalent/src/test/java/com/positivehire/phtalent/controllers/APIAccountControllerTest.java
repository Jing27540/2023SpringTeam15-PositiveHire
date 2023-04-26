package com.positivehire.phtalent.controllers;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotSame;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.positivehire.phtalent.common.TestUtils;
import com.positivehire.phtalent.models.Account;
import com.positivehire.phtalent.services.AccountService;

import jakarta.transaction.Transactional;

/**
 * Tests the APIAccountController class,
 * Account Service, and Account Repository class
 * 
 * @author Isaac Handy
 * @author Zayda Cummings
 */
@SuppressWarnings("deprecation")
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class APIAccountControllerTest {

        /**
         * Creates a mock web application beans for testing
         */
        private MockMvc mvc;

        /**
         * Web application context
         */
        @Autowired
        private WebApplicationContext context;

        /**
         * Service class for accounts
         */
        @Autowired
        private AccountService accountServ;

        private Account acc1, acc2, acc3;

        private String empEmail1 = "hms@email.com", empEmail2 = "re@email.com", empEmail3 = "fff@email.com";
        private String empl1Id = "1234", empl2Id = "5678", empl3Id = "0000";
        private String pass1 = "password", pass2 = "amsterdam", pass3 = "observer";

        @Before
        public void setup() throws Exception {
                mvc = MockMvcBuilders.webAppContextSetup(context).build();
                // List<Account> accs = new ArrayList();

                accountServ.deleteAll();

                // Create a few test accounts
                try {
                        acc1 = new Account(empl1Id, pass1, pass1, empEmail1);

                        acc2 = new Account(empl2Id, pass2, pass2, empEmail2);

                        acc3 = new Account(empl3Id, pass3, pass3, empEmail3);
                } catch (Exception e) {
                        fail();
                }

                accountServ.save(acc1);
                accountServ.save(acc2);
                accountServ.save(acc3);

                assertEquals(3, accountServ.findAll().size());
        }

        /**
         * Test the GET API call that returns a list of Accounts
         */
        @Test
        @Transactional
        public void testGetAllAccounts() throws Exception {
                // // Get employees
                final String content1 = mvc.perform(get("/accounts")).andExpect(status().isOk())
                                .andReturn().getResponse()
                                .getContentAsString();

                // Check that there is an object that has the employee id, email, and password
                assertTrue(content1.contains(empl1Id));
                assertTrue(content1.contains(empl2Id));
                assertTrue(content1.contains(empl3Id));

                assertTrue(content1.contains(empEmail1));
                assertTrue(content1.contains(empEmail2));
                assertTrue(content1.contains(empEmail3));

                assertTrue(content1.contains(pass1));
                assertTrue(content1.contains(pass2));
                assertTrue(content1.contains(pass3));
                assertEquals(accountServ.findAll().size(), 3);

                accountServ.deleteAll();
        }

        /**
         * Test the GET API call that returns a single account
         */
        @Test
        @Transactional
        public void testGetAccount() throws Exception {
                // Test finding by a specific employee email (username)
                final String content2 = mvc.perform(get("/accounts/" +
                                empEmail1).contentType(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk())
                                .andReturn().getResponse()
                                .getContentAsString();

                assertTrue(content2.contains(empl1Id));
                assertTrue(content2.contains(empEmail1));
                assertTrue(content2.contains(pass1));

                accountServ.deleteAll();
        }

        /**
         * Test the POST API call that creates a new Account
         */
        @Test
        @Transactional
        public void testPostAccount() throws Exception {
                // Attempt to create a new account (sign up)

                Account addAcc = new Account("1357", "12345678", "12345678", "hello@email.com");
                final String content6 = mvc.perform(post("/accounts").contentType(MediaType.APPLICATION_JSON)
                                .content(TestUtils.asJsonString(addAcc)))
                                .andExpect(status().isOk())
                                .andReturn().getResponse()
                                .getContentAsString();

                assertTrue(content6.contains("1357"));

                assertEquals("1357", accountServ.findByEmployeeId("1357").getEmployeeID());

                assertEquals("1357", accountServ.findByEmployeeId("1357").login("12345678"));

                // *************************** */

                // Attempt to create a new account with a conflicting employe id

                Account addDupAcc = new Account("0000", "12345678", "12345678", "hello@email.com");
                final String content7 = mvc.perform(post("/accounts").contentType(MediaType.APPLICATION_JSON)
                                .content(TestUtils.asJsonString(addDupAcc)))
                                .andReturn().getResponse()
                                .getContentAsString();

                // assertTrue(content7.contains("A user with that username already exists."));
                assertEquals(content7, "");

                assertEquals("0000", accountServ.findByEmployeeId("0000").getEmployeeID());

                assertNotSame("1357", accountServ.findByEmployeeId("1357").login("12345678"));

                // *************************** */

                accountServ.deleteAll();
        }

        /**
         * Test the POST API call that returns an Account if login is successful
         */
        @Test
        @Transactional
        public void testLogin() throws Exception {
                // Attempt to login to an Account stored in the database
                String content8 = mvc.perform(post("/accounts/account").contentType(MediaType.APPLICATION_JSON)
                                .content(TestUtils.asJsonString(acc3))).andReturn().getResponse().getContentAsString();

                assertTrue(content8.contains(acc3.getEmployeeID()));
                assertTrue(content8.contains(acc3.getHashedPassword()));

                // Attempt to login to an Account not stored in the database
                Account accountNotStored = new Account("user", "ohioman7", "ohioman7", "ohio@email.com");

                String content9 = mvc.perform(post("/accounts/account").contentType(MediaType.APPLICATION_JSON)
                                .content(TestUtils.asJsonString(accountNotStored))).andReturn().getResponse()
                                .getContentAsString();

                assertEquals(content9, "");

                // *************************** */

                accountServ.deleteAll();
        }

        // /**
        // * Test the PUT API call that updates an Account
        // */
        // @Test
        // @Transactional
        // public void testUpdateAccount() {
        // accountServ.deleteAll();
        // }

        /**
         * Test the DELETE API call that deletes an Account
         */
        @Test
        @Transactional
        public void testDeleteAccount() throws Exception {
                mvc.perform(delete("/accounts/" +
                                empl1Id).contentType(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk());

                List<Account> accs = accountServ.findAll();
                assertEquals(accountServ.findAll().size(), 2);

                Account foundAcc1 = accs.get(0);
                Account foundAcc2 = accs.get(1);

                if (foundAcc1.getEmployeeID().equals(empl2Id)) {
                        assertEquals(empEmail2, foundAcc1.getEmployeeEmail());
                        assertEquals(empEmail3, foundAcc2.getEmployeeEmail());

                        assertEquals(pass2, foundAcc1.getHashedPassword());
                        assertEquals(pass3, foundAcc2.getHashedPassword());
                } else {
                        assertEquals(empEmail3, foundAcc1.getEmployeeEmail());
                        assertEquals(empEmail2, foundAcc2.getEmployeeEmail());

                        assertEquals(pass3, foundAcc1.getHashedPassword());
                        assertEquals(pass2, foundAcc2.getHashedPassword());
                }

                // // *************************** */

                // // Attempt to delete an non-existent account
                mvc.perform(delete("/accounts/" +
                                "acorn").contentType(MediaType.APPLICATION_JSON))
                                .andExpect(status().isNotFound());

                // // Get employees to verify deletion
                final String content4 = mvc.perform(get("/accounts")).andExpect(status().isOk())
                                .andReturn().getResponse()
                                .getContentAsString();

                // // Check that there is an object that has the employee id.
                assertFalse(content4.contains(empl1Id));
                assertTrue(content4.contains(empl2Id));
                assertTrue(content4.contains(empl3Id));
                assertEquals(accountServ.findAll().size(), 2);

                // *************************** */

                accountServ.deleteAll();

        }

        // /**
        // * Tests GETing using the controller,
        // * and saving using the service class.
        // *
        // * @throws Exception
        // */
        @Test
        @Transactional
        public void testAccountController() throws Exception {
                // mvc = MockMvcBuilders.webAppContextSetup(context).build();
                // List<Account> accs = new ArrayList();

                // accountServ.deleteAll();

                // // Create a few test accounts
                // try {
                // acc1 = new Account(empl1Id, pass1, pass1, empEmail1);

                // acc2 = new Account(empl2Id, pass2, pass2, empEmail2);

                // acc3 = new Account(empl3Id, pass3, pass3, empEmail3);
                // } catch (Exception e) {
                // fail();
                // }

                // accountServ.save(acc1);
                // accountServ.save(acc2);
                // accountServ.save(acc3);

                // *************************** */

                // assertTrue(accountServ.employeeIdInUse(empl1Id));

                // // // Get employees
                // final String content1 =
                // mvc.perform(get("/accounts")).andExpect(status().isOk())
                // .andReturn().getResponse()
                // .getContentAsString();

                // // Check that there is an object that has the employee id, email, and
                // password
                // assertTrue(content1.contains(empl1Id));
                // assertTrue(content1.contains(empl2Id));
                // assertTrue(content1.contains(empl3Id));

                // assertTrue(content1.contains(empEmail1));
                // assertTrue(content1.contains(empEmail2));
                // assertTrue(content1.contains(empEmail3));

                // assertTrue(content1.contains(pass1));
                // assertTrue(content1.contains(pass2));
                // assertTrue(content1.contains(pass3));
                // assertEquals(accountServ.findAll().size(), 3);

                // // *************************** */

                // // Test finding by a specific employee id
                // final String content2 = mvc.perform(get("/accounts/" +
                // empl1Id).contentType(MediaType.APPLICATION_JSON))
                // .andExpect(status().isOk())
                // .andReturn().getResponse()
                // .getContentAsString();

                // assertTrue(content2.contains(empl1Id));

                // // Test finding by a specific employee email (username)
                // final String content2 = mvc.perform(get("/accounts/" +
                // empEmail1).contentType(MediaType.APPLICATION_JSON))
                // .andExpect(status().isOk())
                // .andReturn().getResponse()
                // .getContentAsString();

                // assertTrue(content2.contains(empl1Id));
                // assertTrue(content2.contains(empEmail1));
                // assertTrue(content2.contains(pass1));

                // *************************** */

                // // Attempt to delete an account
                // mvc.perform(delete("/accounts/" +
                // empl1Id).contentType(MediaType.APPLICATION_JSON))
                // .andExpect(status().isOk());

                // // // Get employees to verify deletion
                // final String content3 =
                // mvc.perform(get("/accounts")).andExpect(status().isOk())
                // .andReturn().getResponse()
                // .getContentAsString();

                // // // Check that there is an object that has the employee id.
                // assertFalse(content3.contains(empl1Id));
                // assertTrue(content3.contains(empl2Id));
                // assertTrue(content3.contains(empl3Id));
                // assertEquals(accountServ.findAll().size(), 2);

                // *************************** */

                // // Attempt to delete an non-existent account
                // mvc.perform(delete("/accounts/" +
                // "acorn").contentType(MediaType.APPLICATION_JSON))
                // .andExpect(status().isNotFound());

                // // Get employees to verify deletion
                // final String content4 =
                // mvc.perform(get("/accounts")).andExpect(status().isOk())
                // .andReturn().getResponse()
                // .getContentAsString();

                // // Check that there is an object that has the employee id.
                // assertFalse(content4.contains(empl1Id));
                // assertTrue(content4.contains(empl2Id));
                // assertTrue(content4.contains(empl3Id));
                // assertEquals(accountServ.findAll().size(), 2);

                // *************************** */

                // Attempt to update an account
                // acc2.updatePassword(pass2, "newpassword", "newpassword");
                // String s1 = TestUtils.asJsonString(acc2);
                // assertNotNull(acc2.getHashedPassword());
                // final String content5 =
                // mvc.perform(put("/accounts").contentType(MediaType.APPLICATION_JSON)
                // .content(s1))
                // .andExpect(status().isOk())
                // .andReturn().getResponse()
                // .getContentAsString();

                // assertTrue(content5.contains(empl2Id + " was updated successfully"));

                // assertEquals(empl2Id,
                // accountServ.findByEmployeeId(acc2.getEmployeeID()).login("newpassword"));

                // *************************** */

                // // Attempt to create a new account (sign up)

                // Account addAcc = new Account("1357", "12345678", "12345678",
                // "hello@email.com");
                // final String content6 =
                // mvc.perform(post("/accounts").contentType(MediaType.APPLICATION_JSON)
                // .content(TestUtils.asJsonString(addAcc)))
                // .andExpect(status().isOk())
                // .andReturn().getResponse()
                // .getContentAsString();

                // assertTrue(content6.contains("1357"));

                // assertEquals("1357", accountServ.findByEmployeeId("1357").getEmployeeID());

                // assertEquals("1357", accountServ.findByEmployeeId("1357").login("12345678"));

                // // *************************** */

                // // Attempt to create a new account with a conflicting employe id

                // Account addDupAcc = new Account("0000", "12345678", "12345678",
                // "hello@email.com");
                // final String content7 =
                // mvc.perform(post("/accounts").contentType(MediaType.APPLICATION_JSON)
                // .content(TestUtils.asJsonString(addDupAcc)))
                // .andReturn().getResponse()
                // .getContentAsString();

                // // assertTrue(content7.contains("A user with that username already
                // exists."));
                // assertEquals(content7, "");

                // assertEquals("0000", accountServ.findByEmployeeId("0000").getEmployeeID());

                // assertNotSame("1357",
                // accountServ.findByEmployeeId("1357").login("12345678"));

                // // *************************** */

                // // Attempt to login to an Account stored in the database
                // String content8 =
                // mvc.perform(post("/accounts/account").contentType(MediaType.APPLICATION_JSON)
                // .content(TestUtils.asJsonString(acc3))).andReturn().getResponse().getContentAsString();

                // assertTrue(content8.contains(acc3.getEmployeeID()));
                // assertTrue(content8.contains(acc3.getHashedPassword()));

                // // Attempt to login to an Account not stored in the database
                // Account accountNotStored = new Account("user", "ohioman7", "ohioman7",
                // "ohio@email.com");

                // String content9 =
                // mvc.perform(post("/accounts/account").contentType(MediaType.APPLICATION_JSON)
                // .content(TestUtils.asJsonString(accountNotStored))).andReturn().getResponse()
                // .getContentAsString();

                // assertEquals(content9, "");

                // *************************** */

                // *************************** */
                // accountServ.deleteAll();
        }

}
