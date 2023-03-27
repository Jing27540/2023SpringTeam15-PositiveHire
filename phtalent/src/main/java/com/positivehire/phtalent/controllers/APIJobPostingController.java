package com.positivehire.phtalent.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.positivehire.phtalent.models.JobPosting;
import com.positivehire.phtalent.services.JobPostingService;

/**
 * API Job Posting Class that handles the REST APIs for the JobPosting model
 * 
 * @author Zayda Cummings
 * @author Juan Franco Pinilla
 */
@RestController
@CrossOrigin("http://localhost:3000/")
public class APIJobPostingController extends APIController {

  @Autowired
  private JobPostingService jobPostingService;

  /**
   * Get a list of saved job postings
   * 
   * @return the list of saved job postings
   */
  @GetMapping("/jobpostings")
  public List<JobPosting> getJobPostings() {
    return jobPostingService.findAll();
  }

  /**
   * Get the job posting with the job number
   * 
   * @param jobNumber The job number associated with the job posting to return
   * @return the job posting with the corresponding job number
   */
  @GetMapping("/jobpostings/{jobNumber}")
  public JobPosting getJobPostingByNumber(@PathVariable String jobNumber) {

    JobPosting jp = jobPostingService.findByJobNumber(jobNumber);
    return jp;
  }

  /**
   * Creates the job posting and adds it to the database
   * 
   * @param e Job Posting entity
   * @return that the Job Posting was successfully created or a conflict error
   */
  @PostMapping("/jobpostings")
  public ResponseEntity<String> createJobPosting(@RequestBody JobPosting e) {

    final JobPosting jp = jobPostingService.findByJobNumber(e.getJobNumber());

    if (jp != null) {
      return new ResponseEntity<String>(
          successResponse("Job Posting with the job number + " + e.getJobNumber() + "already exists."),
          HttpStatus.CONFLICT);
    } else {
      jobPostingService.save(e);
      return new ResponseEntity<>(successResponse(e.getJobNumber() + "successfully created."), HttpStatus.OK);
    }
  }

  /**
   * Deletes a job posting given the job number
   * 
   * @param jobNumber job Number associated with the Job Posting
   * @return Whether or not the job posting was successfully deleted
   */
  @DeleteMapping("/jobpostings/{jobNumber}")
  public ResponseEntity<String> deleteJobPosting(@PathVariable("jobNumber") final String jobNumber) {
    JobPosting jp = jobPostingService.findByJobNumber(jobNumber);

    if (jp == null) {
      return new ResponseEntity<String>(
          errorResponse("There is no job posting with the given job number: " + jobNumber + "."), HttpStatus.NOT_FOUND);
    }
    jobPostingService.delete(jp);

    return new ResponseEntity<String>(successResponse("Job Posting " + jobNumber + "was deleted successfully"),
        HttpStatus.OK);
  }

  /**
   * Updates a job posting
   * 
   * @param posting to be edited
   * @return Whether or not the job posting was edited successfully
   */
  @PutMapping("/jobpostings/{jobNumber}")
  public ResponseEntity<String> editJobPosting(@RequestBody JobPosting newJobPosting,
      @PathVariable("jobNumber") final String jobNumber) {
    try {

      // Try and find a job posting with the same job number
      final JobPosting jp = jobPostingService.findByJobNumber(jobNumber);

      // If no job posting with the same job number exists in the database
      if (jp == null) {

        // Return a bad request with an error message
        return new ResponseEntity<String>(
            errorResponse("No job posting in system associated with the job number: " + newJobPosting.getJobNumber()),
            HttpStatus.NOT_FOUND);
      } else {

        // Update and save it to the database
        jp.setApplyLink(newJobPosting.getApplyLink());
        jp.setAvailablePositions(newJobPosting.getAvailablePositions());
        jp.setCertificationRequirements(newJobPosting.getCertificationRequirements());
        jp.setCloseDate(newJobPosting.getCloseDate());
        jp.setDepartment(newJobPosting.getDepartment());
        jp.setJobDescription(newJobPosting.getJobDescription());
        //jp.setJobNumber(newJobPosting.getJobNumber());
        jp.setJobTitle(newJobPosting.getJobTitle());
        jp.setListofApplicants(newJobPosting.getListofApplicants());
        jp.setLocation(newJobPosting.getLocation());
        jp.setMeetingNotes(newJobPosting.getMeetingNotes());
        jp.setMeetingType(newJobPosting.getMeetingType());
        jp.setOtherRequirements(newJobPosting.getOtherRequirements());
        jp.setPostDate(newJobPosting.getPostDate());
        jp.setProcess(newJobPosting.getProcess());
        jp.setSalary(newJobPosting.getSalary());
        jp.setSkillRequirements(newJobPosting.getSkillRequirements());

        // Job posting is saved
        jobPostingService.save(newJobPosting);

        // Return a ok status with the new job posting that was created
        return new ResponseEntity<String>(
            successResponse(super.toJson(jobPostingService.findByJobNumber(newJobPosting.getJobNumber()))),
            HttpStatus.OK);
      }

      // Catch for internal server errors
    } catch (Exception | Error e) {
      return new ResponseEntity<String>(
          errorResponse("Unexpected " + e.getClass().getSimpleName() + " with message: " + e.getMessage()),
          HttpStatus.INTERNAL_SERVER_ERROR);

    }

  }

}
