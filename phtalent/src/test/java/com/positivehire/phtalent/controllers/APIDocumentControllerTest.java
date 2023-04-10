package com.positivehire.phtalent.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.multipart.MultipartFile;

import com.positivehire.phtalent.common.TestUtils;
import com.positivehire.phtalent.models.Document;
import com.positivehire.phtalent.services.DocumentService;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class APIDocumentControllerTest {
     /**
         * Creates a mock web application beans for testing
         */
        private MockMvc mvc;

        /**
         * Web application context
         */
        @Autowired
        private WebApplicationContext context;

        @Autowired
        private DocumentService docService; 

        @Test
        @Transactional
        public void testDocumentController() throws Exception {
            docService.deleteAll();
            mvc = MockMvcBuilders.webAppContextSetup(context).build();
            byte[] bytes = new byte[3];
            Document doc = new Document( 7878787, bytes);
            MultipartFile mpf = new MockMultipartFile("Name", bytes);

            String str = TestUtils.asJsonString(mpf);
            mvc.perform(post("/documents/" + doc.getEmployeeNum()).contentType(MediaType.APPLICATION_JSON)
            .content(str)).andExpect(status().isOk());

            assertEquals(1, docService.findAll().size());
            
            mvc.perform(delete("/documents/" + doc.getEmployeeNum()).contentType(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk());

            assertEquals(0, docService.findAll().size());

        }
}
