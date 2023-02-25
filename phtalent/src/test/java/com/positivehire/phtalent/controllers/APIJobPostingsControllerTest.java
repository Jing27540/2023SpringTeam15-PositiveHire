package com.positivehire.phtalent.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import com.positivehire.phtalent.common.TestUtils;
import com.positivehire.phtalent.models.JobPosting;
import com.positivehire.phtalent.services.JobPostingService;

import junit.framework.Assert;
import org.springframework.http.MediaType;

/**
 * Tests the APIEmployeeController class,
 * Employee Service, and Employee Repository class
 * 
 * @author Jing Huang
 * @author Biniyam Sima
 */
@SuppressWarnings("deprecation")
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class APIJobPostingsControllerTest {

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
	private JobPostingService jobPostingServ;

	private static JobPosting jobPosting1;

	private static JobPosting jobPosting2;


	/**
	 * Tests GETing using the controller,
	 * and saving using the service class.
	 * 
	 * @throws Exception
	 */
	@Test
	@Transactional
	public void testJobPostingsController() throws Exception {
		mvc = MockMvcBuilders.webAppContextSetup(context).build();
		List<JobPosting> jobPostings = new ArrayList();

		jobPostingServ.deleteAll();
		// }

    ArrayList<String> locs = new ArrayList<String>();

		locs.add("Raleigh, NC");

		jobPosting1 = new JobPosting();
		jobPosting1.setJobTitle("Software Developer");
		jobPosting1.setDepartment("logistics division");
		jobPosting1.setLocation(locs);
		jobPosting1.setSalary("60000");
		jobPosting1.setMeetingNotes("Testing meeting notes");

		jobPostingServ.save(jobPosting1);

		mvc.perform(get("/jobpostings")).andExpect(status().isOk());
		System.out.println(jobPosting1.getId());

		jobPostings = jobPostingServ.findAll();
		
		jobPosting2.setJobTitle("Second Software Developer");
		jobPosting2.setDepartment("logistics division");
		jobPosting2.setLocation(locs);
		jobPosting2.setSalary("60000");
		jobPosting2.setMeetingNotes("Testing meeting notes");
		mvc.perform(put("/jobpostings").contentType(MediaType.APPLICATION_JSON)
				.content(TestUtils.asJsonString(jobPosting2)));

		jobPostings = jobPostingServ.findAll();
		Assert.assertEquals(3, jobPostings.size());

		Assert.assertEquals(jobPosting2.getJobTitle(),
				jobPostingServ.findById((long) jobPosting2.getId()).getJobTitle());
	}

}