package com.positivehire.phtalent.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import java.util.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.junit.Before;
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

	/** The list of vaccines to use when testing */
    private List<JobPosting> jobPostings;

	/**
	 * Tests all APIJobPostingController methods
	 * 
	 * @throws Exception
	 */
	@Test
	@Transactional
	public void testGetJobPostings() throws Exception {

		mvc = MockMvcBuilders.webAppContextSetup( context ).build();

		jobPostings = new ArrayList<JobPosting>();

		//Delete all previous job postings from the database before running new tests
        jobPostingServ.deleteAll();

		//Tester post and close dates
		Date postDate = new Date();
		Date closeDate = new Date();

        //Tester locations
		List<String> locs = new ArrayList<String>();
		locs.add("Raleigh, NC");
		locs.add("Remote");

		//Tester process
		List<String> processes = new ArrayList<String>();
		Collections.addAll(processes, "1. Outreach", "2. Phone Interview", "3. HackerRank coding assessment", "Final Offer");

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
		Date date1 = new Date();
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

		//Add Job Posting 1 to the database
		JobPosting job1 = null;
		JobPosting job2 = null;

        jobPostings.add(job1 = createJobPosting("A30694", "Software Developer", "$100,000",
		"logistics division", testSkills1, testCerts1, "This is a very easy job I guess",
		"Do you like managing cloud services and baking on the side? Well this is the job for you!",
		4, locs, "Online", "Testing meeting notes", processes, "https://www.linkedin.com", null, postDate, closeDate));

		jobPostingServ.save(job1);

		//Add the job posting 2 to be tested
		jobPostings.add(job2 = createJobPosting("B30694", "Senior Software Developer", "$120,000",
		"logistics division", testSkills2, testCerts2, "This is a slightly harder job",
		"Do you like managing cloud services and baking on the side? Well this is the job for you!",
		4, locs, "Online", "Testing meeting notes", processes, "https://www.linkedin.com", null, postDate, closeDate));

		jobPostingServ.save(job2);

        jobPostingServ.saveAll(jobPostings);

		System.out.println("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII IM HERE");

		System.out.println("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII IM HERE");

		System.out.println("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII IM HERE");

		System.out.println("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII IM HERE");

		System.out.println("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII IM HERE");

		System.out.println("\n Number of job postings in database = " + jobPostingServ.count());

		for (int i = 0; i < jobPostingServ.count(); i++) {
			System.out.println("\n" + jobPostingServ.findAll().get(i).toString());
		}
		
		System.out.println("\n Number of job postings in database = " + jobPostingServ.count());

		//Makes sure that the number of job postings is correct in the database
		assertEquals(2, jobPostingServ.findAll().size());

		//Add the job posting 1 to be tested
		mvc.perform(get("/jobpostings")).andExpect(status().isOk());

		//Returns all of the job postings (Should show 2 here)

		for (int i = 0; i < jobPostingServ.count(); i++) {
			System.out.println(jobPostingServ.findAll().get(i).toString());
		}
	}

	/**
	 * Tests adding a job posting to the database
	 * 
	 * @throws Exception
	 */
	@Test
	@Transactional
	public void testCreateJobPosting() throws Exception {
		mvc = MockMvcBuilders.webAppContextSetup( context ).build();

		jobPostings = new ArrayList<JobPosting>();

		//Delete all previous job postings from the database before running new tests
        jobPostingServ.deleteAll();

		//Tester post and close dates
		//DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		//Setting all dates to new Date() which would be the current time
		Date postDate = new Date();
		Date closeDate = new Date();

        //Tester locations
		ArrayList<String> locs = new ArrayList<String>();
		locs.add("Raleigh, NC");
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
		Date date1 = new Date();

		System.out.println("\n THIS IS THE CERTIFICATION DATE: " + date1);

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

		//Add Job Posting 1 to the database
		JobPosting job1 = null;
		JobPosting job2 = null;

        jobPostings.add(job1 = createJobPosting("A30694", "Software Developer", "$100,000",
		"logistics division", testSkills1, testCerts1, "This is a very easy job I guess",
		"Do you like managing cloud services and baking on the side? Well this is the job for you!",
		4, locs, "Online", "Testing meeting notes", null, "linkedin.com", null, postDate, closeDate));

		//jobPostingServ.save(job1);

		System.out.println("\nTHIS IS FOR CREATEJOBPOSTING TEST \nHIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII IM HERE");

		System.out.println("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII IM HERE");

		System.out.println("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII IM HERE");

		System.out.println("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII IM HERE");

		System.out.println("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII IM HERE");

		System.out.println("\n Number of job postings in database = " + jobPostingServ.count());

        mvc.perform(post("/jobpostings")
	      .content(TestUtils.asJsonString(job1))
	      .contentType(MediaType.APPLICATION_JSON)
	      .accept(MediaType.APPLICATION_JSON))
      .andExpect(status().isOk());

		assertEquals("Software Developer", jobPostingServ.findByJobNumber("A30694").getJobTitle());

        //assertEquals(job1, jobPostingServ.findByJobNumber("A30694") );
	}

	/**
	 * Tests editing a pre-existing job posting in the database
	 * 
	 * @throws Exception
	 */
	@Test
	@Transactional
	public void testEditJobPosting() throws Exception {

	}

	/**
	 * Tests deleting a job posting from the database
	 * 
	 * @throws Exception
	 */
	@Test
	@Transactional
	public void testDeleteJobPosting() throws Exception {

	}

	/**
	 * Tests the accuracy of the toString method
	 * 
	 * @throws Exception
	 */
	@Test
	@Transactional
	public void testJobPostingsToString() throws Exception {

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
	 * @param postDate					Date when the Job was posted
	 * @param closeDate					Date when the Job is closed
	 * @return a created job posting
	 */
	private JobPosting createJobPosting(final String jobNumber, final String jobTitle, final String salary,
			final String department, final List<Skill> skillRequirements,
			final List<Certification> certificationRequirements, final String otherRequirements,
			final String jobDescription, final Integer availablePositions, final List<String> location,
			final String meetingType, final String meetingNotes, final List<String> process,
			final String applyLink, final List<Employee> listofApplicants, final Date postDate,
			final Date closeDate) {

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
		posting.setPostDate(postDate);
		posting.setCloseDate(closeDate);
		return posting;
	}

}