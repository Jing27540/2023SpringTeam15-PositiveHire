package com.positivehire.phtalent.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

//import org.apache.tomcat.util.http.parser.MediaType;
import org.assertj.core.api.Fail;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.positivehire.phtalent.common.TestUtils;
import com.positivehire.phtalent.models.Account;
import com.positivehire.phtalent.services.AccountService;

import jakarta.transaction.Status;
import jakarta.transaction.Transactional;

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
     * Service class for employees
     */
    @Autowired
    private AccountService accountServ;

    /**
     * Sets up test
     */
    @Before
    public void setup() {
        mvc = MockMvcBuilders.webAppContextSetup(context).build();
        accountServ.deleteAll();
    }

    @Test
    @Transactional
    public void testAccountAPI() {

        try {
            Account acc1 = new Account("iahandy0", "password1", "pssword", 1);
            final String result1 = mvc.perform(
                    post("/accounts").contentType(MediaType.APPLICATION_JSON).content(TestUtils.asJsonString(acc1)))
                    .andExpect(MockMvcResultMatchers.status().isOk()).andReturn().getResponse().getContentAsString();
        } catch (Exception e) {
            Assert.fail();
        }
    }

}
