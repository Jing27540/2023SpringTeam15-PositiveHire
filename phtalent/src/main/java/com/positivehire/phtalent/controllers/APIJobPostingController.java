package com.positivehire.phtalent.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.positivehire.phtalent.models.JobPosting;
import com.positivehire.phtalent.services.JobPostingService;

/**
 * API Job Posting Class that handles the REST APIs for the JobPosting model
 */
public class APIJobPostingController extends APIController {
    
 @Autowired
 private JobPostingService jobPostingService;


 /**
  * Get a list of saved job postings 
  * @return the list of saved job postings 
  */
 @GetMapping("/jobpostings")
 public List<JobPosting> getJobPostings() {

  return jobPostingService.findAll();
 }

 /**
  * Get the job posting with the id 
  * @param id The id of the job posting to return 
  * @return the job posting with the id
  */
 @GetMapping("/jobpostings/{id}")
 public JobPosting getJobPostingByNumber(@PathVariable Long id) { 

  JobPosting jp = jobPostingService.findByJobNum(id);
  return jp;
 }


 /**
  * Creates a job postings and adds it to the database 
  * 
  */
  @PostMapping("/jobpostings")
  public ResponseEntity<String> createJobPosting(@RequestBody JobPosting e) {
    if (jobPostingService.findByJobNum(e.getJobNumber()) != null) {
      return new ResponseEntity<String>(successResponse("Job Posting with the job number + " + e.getJobNumber() + "already exists."), HttpStatus.CONFLICT);
    }
    else {
      jobPostingService.save(e);
      return new ResponseEntity<>(successResponse(e.getJobNumber() + "successfully created"), HttpStatus.OK);
    }
  }


  @DeleteMapping("jobpostings/{jobPostingNum}")
  public ResponseEntity<String> deleteJobPosting(@PathVariable("jobPostingNum") final Long jobPostingNum) {
    JobPosting jp = jobPostingService.findByJobNum(jobPostingNum);

    if (jp == null) {
      return new ResponseEntity<String>(errorResponse("No job posting with given number"), HttpStatus.NOT_FOUND);
    }
    jobPostingService.delete(jp);

    return new ResponseEntity<String>(successResponse("Job POsting was deleted successfully"), HttpStatus.OK);
  }

  






}
