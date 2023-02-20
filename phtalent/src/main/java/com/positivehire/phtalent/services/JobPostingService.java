package com.positivehire.phtalent.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.positivehire.phtalent.models.Employee;
import com.positivehire.phtalent.models.JobPosting;
import com.positivehire.phtalent.repositories.EmployeeRepository;
import com.positivehire.phtalent.repositories.JobPostingRepository;

import jakarta.transaction.Transactional;

/**
 * Spring service for job Postings
 * @author Zayda Cummings
 */
@Component
@Transactional
public class JobPostingService extends Service<JobPosting, Long> {
    
  @Autowired
  private JobPostingRepository<JobPosting> repo; 

  public List<JobPosting> findAll() {
    return repo.findAll();
  }


  public JobPosting saveJobpoPosting(JobPosting e ) {
    return (JobPosting) repo.save(e);
  }


  public JobPosting findbyJobNum(final Long jobPostingNum) {
    return repo.findById(jobPostingNum).get();
  }


  public void deleteJobPosting(final Long jobPostingNum) { 
    JobPosting e = findbyJobNum(jobPostingNum);
    repo.delete(e);
  }
}
