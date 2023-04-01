package com.positivehire.phtalent.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;

import java.util.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
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

import org.springframework.http.MediaType;

/**
 * Tests the APIEmployeeController class,
 * Employee Service, and Employee Repository class
 * 
 * @author Zayda Cummings
 */
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

		System.out.println("************************************** VIEW / GET JOB POSTINGS TEST ***************************************");

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

        jobPostings.add(job1 = createJobPosting(null, "A30694", "Software Developer", "$100,000",
		"logistics division", testSkills1, testCerts1, "This is a very easy job I guess",
		"Do you like managing cloud services and baking on the side? Well this is the job for you!",
		4, locs, "Online", "Testing meeting notes", processes, "https://www.linkedin.com", null, postDate, closeDate));

		jobPostingServ.save(job1);

		//Add the job posting 2 to be tested
		jobPostings.add(job2 = createJobPosting(null, "B30694", "Senior Software Developer", "$120,000",
		"logistics division", testSkills2, testCerts2, "This is a slightly harder job",
		"Do you like managing cloud services and baking on the side? Well this is the job for you!",
		4, locs, "Online", "Testing meeting notes", processes, "https://www.linkedin.com", null, postDate, closeDate));

		jobPostingServ.save(job2);

        jobPostingServ.saveAll(jobPostings);

		//Makes sure that the number of job postings is correct in the database
		assertEquals(2, jobPostingServ.findAll().size());

		//Try to perform a get for the created job postings
		mvc.perform(get("/jobpostings")).andExpect(status().isOk());

		//Try to perform getting a specific job posting by its id
		mvc.perform(get("/jobpostings/A30694")).andExpect(status().isOk());
		mvc.perform(get("/jobpostings/B30694")).andExpect(status().isOk());
	}

	/**
	 * Tests adding a job posting to the database
	 * 
	 * @throws Exception
	 */
	@Test
	@Transactional
	public void testCreateJobPosting() throws Exception {

		/************************************** START OF CREATE JOB POSTINGS TEST SET UP ***************************************/

		System.out.println("************************************** CREATE JOB POSTINGS TEST ***************************************");

		mvc = MockMvcBuilders.webAppContextSetup( context ).build();

		jobPostings = new ArrayList<JobPosting>();

		//Delete all previous job postings from the database before running new tests
    jobPostingServ.deleteAll();

		//Tester post and close dates
		DateFormat dateFormat = new SimpleDateFormat("MMM d, yyyy, hh:mm:ss a");
		//Setting all dates to new Date() which would be the current time
		Date postDate = dateFormat.parse("Mar 14, 2023, 12:05:55 PM");
		Date closeDate = dateFormat.parse("May 26, 2023, 12:05:55 PM");

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
		Date date1 = dateFormat.parse("May 26, 2016, 12:15:55 PM");

		System.out.println("\n THIS IS THE CERTIFICATION DATE (CREATE JOB POSTING TEST): " + date1);

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

        jobPostings.add(job1 = createJobPosting(null, "A30694", "Software Developer", "$100,000",
		"logistics division", testSkills1, testCerts1, "This is a very easy job I guess",
		"Do you like managing cloud services and baking on the side? Well this is the job for you!",
		4, locs, "Online", "Testing meeting notes", null, "linkedin.com", null, postDate, closeDate));

		//TEST THE POST API METHOD

        mvc.perform(post("/jobpostings")
	      .content(TestUtils.asJsonString(job1))
	      .contentType(MediaType.APPLICATION_JSON)
	      .accept(MediaType.APPLICATION_JSON))
      .andExpect(status().isOk());

		assertEquals("Software Developer", jobPostingServ.findByJobNumber("A30694").getJobTitle());

	   //Returns all of the job postings (Should show 2 here)

		for (int i = 0; i < jobPostingServ.count(); i++) {
			System.out.println(jobPostingServ.findAll().get(i).toString());
		}

		String expectedString = "JobPosting [id=null, jobNumber=A30694, jobTitle=Software Developer, salary=$100,000, department=logistics division, skillRequirements=[{ name='Team work', level='5', score='5'}, { name='Java', level='5', score='3'}], certificationRequirements=[{ name='AWS Certified Cloud Practitioner', institution='Amazon Web Services', issuedDate='Thu May 26 12:15:55 EDT 2016', credentialID='AWS1938', skills='Can manage AWS cloud tools'}, { name='Professional Baker', institution='Great British Bake Off', issuedDate='Thu May 26 12:15:55 EDT 2016', credentialID='Gordon-Ramsey Approved', skills='Can make a mean apple pie'}], otherRequirements=This is a very easy job I guess, jobDescription=Do you like managing cloud services and baking on the side? Well this is the job for you!, availablePositions=4, location=[Raleigh, NC, Remote], meetingType=Online, meetingNotes=Testing meeting notes, process=null, applyLink=linkedin.com, listofApplicants=null, postDate=Tue Mar 14 12:05:55 EDT 2023, closeDate=Fri May 26 12:05:55 EDT 2023]";

		//Checking the toString method accurancy
		assertEquals(expectedString, job1.toString());

		//INVALID CREATE CHECK: Check for duplicate job postings error
		mvc.perform(post("/jobpostings")
	      .content(TestUtils.asJsonString(job1))
	      .contentType(MediaType.APPLICATION_JSON)
	      .accept(MediaType.APPLICATION_JSON))
      .andExpect(status().isConflict());
	}

	/**
	 * Tests editing a pre-existing job posting in the database
	 * 
	 * @throws Exception
	 */
	@Test
	@Transactional
	public void testEditJobPosting() throws Exception {
		/******************************************* START OF TESTING SET UP ********************************************/
		System.out.println("************************************** EDIT / UPDATE JOB POSTINGS TEST ***************************************");

		mvc = MockMvcBuilders.webAppContextSetup( context ).build();

		// Job postings array list
		jobPostings = new ArrayList<JobPosting>();

		//Delete all previous job postings from the database before running new tests
    jobPostingServ.deleteAll();

		//Tester post and close dates
		DateFormat dateFormat = new SimpleDateFormat("MMM d, yyyy, hh:mm:ss a");
		//Setting all dates to new Date() which would be the current time
		Date postDate = dateFormat.parse("Mar 14, 2023, 12:05:55 PM");
		Date closeDate = dateFormat.parse("May 26, 2023, 12:05:55 PM");

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
		Date date1 = dateFormat.parse("May 26, 2016, 12:15:55 PM");

		System.out.println("\n THIS IS THE CERTIFICATION DATE (EDIT JOB POSTING TEST): " + date1);

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

        jobPostings.add(job1 = createJobPosting(null, "A30694", "Software Developer", "$100,000",
		"logistics division", testSkills1, testCerts1, "This is a very easy job I guess",
		"Do you like managing cloud services and baking on the side? Well this is the job for you!",
		4, locs, "Online", "Testing meeting notes", null, "linkedin.com", null, postDate, closeDate));
 
        mvc.perform(post("/jobpostings")
	      .content(TestUtils.asJsonString(job1))
	      .contentType(MediaType.APPLICATION_JSON)
	      .accept(MediaType.APPLICATION_JSON))
      .andExpect(status().isOk());

		assertEquals("Software Developer", jobPostingServ.findByJobNumber("A30694").getJobTitle());

		/******************************************* END OF SET UP ********************************************/

		//Create an invalid job posting
		JobPosting invalidJob = createJobPosting(null, "U30694", "Software Developer", "$100,000",
		"logistics division", testSkills1, testCerts1, "This is a very easy job I guess",
		"Do you like managing cloud services and baking on the side? Well this is the job for you!",
		4, locs, "Online", "Testing meeting notes", null, "linkedin.com", null, postDate, closeDate);

		System.out.println(job1.toString());


		//Test invalid update, should output 404
		invalidJob.setJobTitle("Really Super Cool Software Developer");

		// mvc.perform(put("/jobpostings")
	  //     .content(TestUtils.asJsonString(invalidJob))
	  //     .contentType(MediaType.APPLICATION_JSON)
	  //     .accept(MediaType.APPLICATION_JSON))
    //     .andExpect(status().isNotFound());

		//Test valid update
		job1.setJobTitle("testing1"); //Changing the job title

		System.out.println("TOTAL NUMBER OF JOB POSTINGS IN THE DATABASE: " + jobPostingServ.count());
		System.out.println("JOB NUMBER: " + jobPostingServ.findByJobNumber("A30694").toString());


		JobPosting job2 = jobPostingServ.findByJobNumber("A30694");

		job2.setJobTitle("ABCDEF");

		mvc.perform(put("/jobpostings")
	     .content(TestUtils.asJsonString(job2))
	     .contentType(MediaType.APPLICATION_JSON)
	     .accept(MediaType.APPLICATION_JSON))
       .andExpect(status().isOk());

	  System.out.println(job1.toString());
	}

	/**
	 * Tests deleting a job posting from the database
	 * 
	 * @throws Exception
	 */
	@Test
	@Transactional
	public void testDeleteJobPosting() throws Exception {

		/************************************** START OF DELETE JOB POSTINGS TEST SET UP ***************************************/

		System.out.println("************************************** DELETE JOB POSTINGS TEST ***************************************");

		mvc = MockMvcBuilders.webAppContextSetup( context ).build();

		jobPostings = new ArrayList<JobPosting>();

		//Delete all previous job postings from the database before running new tests
        jobPostingServ.deleteAll();

		//Tester post and close dates
		DateFormat dateFormat = new SimpleDateFormat("MMM d, yyyy, hh:mm:ss a");
		//Setting all dates to new Date() which would be the current time
		Date postDate = dateFormat.parse("Mar 14, 2023, 12:05:55 PM");
		Date closeDate = dateFormat.parse("May 26, 2023, 12:05:55 PM");

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
		Date date1 = dateFormat.parse("May 26, 2016, 12:15:55 PM");

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

        jobPostings.add(job1 = createJobPosting(null, "A30694", "Software Developer", "$100,000",
		"logistics division", testSkills1, testCerts1, "This is a very easy job I guess",
		"Do you like managing cloud services and baking on the side? Well this is the job for you!",
		4, locs, "Online", "Testing meeting notes", null, "linkedin.com", null, postDate, closeDate));

        mvc.perform(post("/jobpostings")
	      .content(TestUtils.asJsonString(job1))
	      .contentType(MediaType.APPLICATION_JSON)
	      .accept(MediaType.APPLICATION_JSON))
      .andExpect(status().isOk());

		assertEquals("Software Developer", jobPostingServ.findByJobNumber("A30694").getJobTitle());

		/******************************************* END OF SET UP ********************************************/
		//Time to test the delete job Posting

		//Test invalid delete
		mvc.perform(delete("/jobpostings/{jobNumber}", "Z40694") )
        .andExpect(status().isNotFound());

		//Test valid delete
		mvc.perform(delete("/jobpostings/{jobNumber}", "A30694") )
        .andExpect(status().isOk());

		assertEquals(0, jobPostingServ.count());
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
	private JobPosting createJobPosting(final Long id, final String jobNumber, final String jobTitle, final String salary,
			final String department, final List<Skill> skillRequirements,
			final List<Certification> certificationRequirements, final String otherRequirements,
			final String jobDescription, final Integer availablePositions, final List<String> location,
			final String meetingType, final String meetingNotes, final List<String> process,
			final String applyLink, final List<Employee> listofApplicants, final Date postDate,
			final Date closeDate) {

		final JobPosting posting = new JobPosting();
		
		posting.setId(id);
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