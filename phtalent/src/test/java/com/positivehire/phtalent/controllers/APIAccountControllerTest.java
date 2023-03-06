package com.positivehire.phtalent.controllers;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotSame;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.positivehire.phtalent.common.TestUtils;
import com.positivehire.phtalent.models.Account;
import com.positivehire.phtalent.services.AccountService;

import jakarta.transaction.Status;
import jakarta.transaction.Transactional;
import junit.framework.Assert;

/**
 * Tests the APIAccountController class,
 * Account Service, and Account Repository class
 * 
 * @author Isaac Handy
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

        private String empl1Id = "1234", empl2Id = "5678", empl3Id = "0000";
        private String pass1 = "password", pass2 = "amsterdam", pass3 = "observer";

        // /**
        // * Tests GETing using the controller,
        // * and saving using the service class.
        // *
        // * @throws Exception
        // */
        @Test
        @Transactional
        public void testAccountController() throws Exception {

                mvc = MockMvcBuilders.webAppContextSetup(context).build();
                List<Account> accs = new ArrayList();

                accountServ.deleteAll();

                // Create a few test accounts
                try {
                        acc1 = new Account(empl1Id, pass1, pass1);

                        acc2 = new Account(empl2Id, pass2, pass2);

                        acc3 = new Account(empl3Id, pass3, pass3);
                } catch (Exception e) {
                        fail();
                }

                accountServ.save(acc1);
                accountServ.save(acc2);
                accountServ.save(acc3);

                // *************************** */

                // assertTrue(accountServ.employeeIdInUse(empl1Id));

                // // Get employees
                final String content1 = mvc.perform(get("/accounts")).andExpect(status().isOk())
                                .andReturn().getResponse()
                                .getContentAsString();

                // Check that there is an object that has the employee id.
                assertTrue(content1.contains(empl1Id));
                assertTrue(content1.contains(empl2Id));
                assertTrue(content1.contains(empl3Id));
                assertEquals(accountServ.findAll().size(), 3);

                // // *************************** */

                // // Test finding by a specific employee id
                final String content2 = mvc.perform(get("/accounts/" +
                                empl1Id).contentType(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk())
                                .andReturn().getResponse()
                                .getContentAsString();

                assertTrue(content2.contains(empl1Id));

                // Attempt to get account by ID
                // final String content2 = mvc.perform(get("/accounts/" +
                // empl1Id)).andExpect(status().isOk()).andReturn().getResponse()
                // .getContentAsString();

                // assertTrue(content2.contains(empl1Id));
                // Assert.assertEquals(acc1, accountServ.findById((long) acc1.getId()));

                // // *************************** */

                // // Attempt to delete an account
                mvc.perform(delete("/accounts/" +
                                empl1Id).contentType(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk());

                // // Get employees to verify deletion
                final String content3 = mvc.perform(get("/accounts")).andExpect(status().isOk())
                                .andReturn().getResponse()
                                .getContentAsString();

                // // Check that there is an object that has the employee id.
                assertFalse(content3.contains(empl1Id));
                assertTrue(content3.contains(empl2Id));
                assertTrue(content3.contains(empl3Id));
                assertEquals(accountServ.findAll().size(), 2);

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

                // Attempt to update an account
                // acc2.updatePassword(pass2, "newpassword", "newpassword");
                // String s1 = TestUtils.asJsonString(acc2);
                // assertNotNull(acc2.getHashedPassword());
                // final String content5 = mvc.perform(put("/accounts").contentType(MediaType.APPLICATION_JSON)
                //                 .content(s1))
                //                 .andExpect(status().isOk())
                //                 .andReturn().getResponse()
                //                 .getContentAsString();

                // assertTrue(content5.contains(empl2Id + " was updated successfully"));

                // assertEquals(empl2Id, accountServ.findByEmployeeId(acc2.getEmployeeID()).login("newpassword"));

                // *************************** */

                // Attempt to create a new account (sign up)

                Account addAcc = new Account("1357", "12345678", "12345678");
                final String content6 = mvc.perform(post("/accounts").contentType(MediaType.APPLICATION_JSON)
                                .content(TestUtils.asJsonString(addAcc)))
                                .andExpect(status().isOk())
                                .andReturn().getResponse()
                                .getContentAsString();

                assertTrue(content6.contains("Account successfully created"));

                assertEquals("1357", accountServ.findByEmployeeId("1357").getEmployeeID());

                assertEquals("1357", accountServ.findByEmployeeId("1357").login("12345678"));

                // *************************** */

                // Attempt to create a new account with a conflicting employe id

                Account addDupAcc = new Account("0000", "12345678", "12345678");
                final String content7 = mvc.perform(post("/accounts").contentType(MediaType.APPLICATION_JSON)
                                .content(TestUtils.asJsonString(addDupAcc)))
                                .andExpect(status().isConflict())
                                .andReturn().getResponse()
                                .getContentAsString();

                assertTrue(content7.contains("A user with that username already exists."));

                assertEquals("0000", accountServ.findByEmployeeId("0000").getEmployeeID());

                assertNotSame("1357", accountServ.findByEmployeeId("1357").login("12345678"));

                // *************************** */

                // *************************** */

                // *************************** */
        }

}
