package com.positivehire.phtalent.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

import java.sql.Date;
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
import com.positivehire.phtalent.models.Certification;
import com.positivehire.phtalent.models.Employee;
import com.positivehire.phtalent.models.JobPosting;
import com.positivehire.phtalent.models.Skill;
import com.positivehire.phtalent.services.JobPostingService;

import junit.framework.Assert;
import org.springframework.http.MediaType;

/**
 * Tests the APIEmployeeController class,
 * Employee Service, and Employee Repository class
 * 
 * @author Zayda Cummings
 */
@SuppressWarnings("deprecation")
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class APIJobPostingsControllerTest {

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
	 * Tests all APIJobPostingController methods
	 * 
	 * @throws Exception
	 */
	@Test
	@Transactional
	public void testJobPostingsController() throws Exception {
		mvc = MockMvcBuilders.webAppContextSetup(context).build();
		List<JobPosting> jobPostings = new ArrayList<JobPosting>();

		//Delete all previous job postings from the database before running new tests
		jobPostingServ.deleteAll();

		//Tester locations
		ArrayList<String> locs = new ArrayList<String>();
		locs.add("Raleigh NC");
		locs.add("Remote");

		//Tester skills
		List<Skill> testSkills1 = new ArrayList<Skill>();
		Skill skill1 = new Skill("Team work", "5", 5);
		Skill skill2 = new Skill("Java", "5", 3);

		testSkills1.add(skill1);
		testSkills1.add(skill2);

		//NOTE: ONE JOB POSTING CANNOT HAVE IDENTICAL SKILLS TO ANOTHER JOB POSTING IN THE DATABASE
		List<Skill> testSkills2 = new ArrayList<Skill>();
		Skill skill3 = new Skill("Team work", "5", 5);
		Skill skill4 = new Skill("Java", "5", 3);

		testSkills2.add(skill3);
		testSkills2.add(skill4);
		
		//Tester certifications
		List<Certification> testCerts1 = new ArrayList<Certification>();
		Date date1 = new Date(2009, 2, 26);
		Certification cert1 = new Certification("AWS Certified Cloud Practitioner", "Amazon Web Services", date1, "AWS1938", "Can manage AWS cloud tools");
		Certification cert2 = new Certification("Professional Baker", "Great British Bake Off", date1, "Gordon-Ramsey Approved", "Can make a mean apple pie");

		testCerts1.add(cert1);
		testCerts1.add(cert2);

		//NOTE: ONE JOB POSTING CANNOT HAVE IDENTICAL CERTICATIONS TO ANOTHER IN THE DATABASE
		List<Certification> testCerts2 = new ArrayList<Certification>();
		Certification cert3 = new Certification("AWS Certified Cloud PractitionerB", "Amazon Web ServicesB", date1, "AWS1938B", "Can manage AWS cloud tools.");
		Certification cert4 = new Certification("Professional BakerB", "Great British Bake OffB", date1, "Gordon-Ramsey ApprovedB", "Can make a mean apple pie.");

		testCerts2.add(cert3);
		testCerts2.add(cert4);

		//Tester employee applicants
		//Will test this later after implementing the apply feature and tracking Employee applicants


		//Add the job posting 1 to be tested
		jobPostings.add(jobPosting1 = createJobPosting("A30694", "Software Developer", "$100,000",
		"logistics division", testSkills1, testCerts1, "This is a very easy job I guess",
		"Do you like managing cloud services and baking on the side? Well this is the job for you!",
		4, locs, "Online", "Testing meeting notes", null, "linkedin.com", null));

		jobPostingServ.save(jobPosting1);
		mvc.perform(get("/jobpostings")).andExpect(status().isOk());

		System.out.println(jobPosting1.getId());

		//Returns all of the job postings (Should only show 1 here)
		jobPostings = jobPostingServ.findAll();


		//Add the job posting 2 to be tested
		jobPostings.add(jobPosting2 = createJobPosting("B30694", "Senior Software Developer", "$120,000",
		"logistics division", testSkills2, testCerts2, "This is a slightly harder job",
		"Do you like managing cloud services and baking on the side? Well this is the job for you!",
		4, locs, "Online", "Testing meeting notes", null, "linkedin.com", null));

		jobPostingServ.save(jobPosting2);
		mvc.perform(put("/jobpostings").contentType(MediaType.APPLICATION_JSON)
				.content(TestUtils.asJsonString(jobPosting2)));

		//Returns all of the job postings (Should show 2 here)
		jobPostings = jobPostingServ.findAll();
		Assert.assertEquals(2, jobPostings.size());

		Assert.assertEquals(jobPosting2.getJobTitle(),
				jobPostingServ.findById((long) jobPosting2.getId()).getJobTitle());
		
		//Delete a job posting
		// jobPostingServ.delete(jobPosting1);
		// Assert.assertEquals(1, jobPostingServ.count());

		//Delete all previous job postings from the database before running new tests
		//jobPostingServ.deleteAll();
	}

	/**
	 * Easy way to create a job posting for testing purposes
	 * 
	 * @param jobNumber                 number for job
	 * @param jobTitle                  title of job
	 * @param salary                    salary of job
	 * @param department                department for job
	 * @param skillRequirements         metric-tracked skills needed for job
	 * @param certificationRequirements metric-tracked certifications for job
	 * @param otherRequirements         other requiremnts for the job
	 * @param jobDescription            description of the job
	 * @param availablePositions        number of available positions for the job
	 * @param location                  office location(s) associated with the job
	 * @param meetingType               type of meeting for interviews
	 * @param meetingNotes              notes from the applicant meetings
	 * @param process                   processes required for hiring an applicant
	 * @param applyLink                 external link to apply for the job
	 * @param listofApplicants          list of Employee applicants for the job
	 * @return a created job posting
	 */
	private JobPosting createJobPosting(final String jobNumber, final String jobTitle, final String salary,
			final String department, final List<Skill> skillRequirements,
			final List<Certification> certificationRequirements, final String otherRequirements,
			final String jobDescription, final Integer availablePositions, final List<String> location,
			final String meetingType, final String meetingNotes, final List<String> process,
			final String applyLink, final List<Employee> listofApplicants) {

		final JobPosting posting = new JobPosting();

		posting.setApplyLink(applyLink);
		posting.setAvailablePositions(availablePositions);
		posting.setCertificationRequirements(certificationRequirements);
		posting.setDepartment(department);
		posting.setJobDescription(jobDescription);
		posting.setJobNumber(jobNumber);
		posting.setListofApplicants(listofApplicants);
		posting.setJobTitle(jobTitle);
		posting.setLocation(location);
		posting.setMeetingNotes(meetingNotes);
		posting.setMeetingType(meetingType);
		posting.setOtherRequirements(otherRequirements);
		posting.setProcess(process);
		posting.setSalary(salary);
		posting.setSkillRequirements(skillRequirements);
		return posting;
	}

}