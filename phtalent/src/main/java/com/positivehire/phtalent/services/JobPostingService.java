package com.positivehire.phtalent.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.positivehire.phtalent.models.JobPosting;
import com.positivehire.phtalent.repositories.JobPostingRepository;

import jakarta.transaction.Transactional;

/**
 * Spring service for job Postings
 * 
 * @author Zayda Cummings
 */
@Component
@Transactional
public class JobPostingService extends Service<JobPosting, Long> {

  @Autowired
  private JobPostingRepository<JobPosting> repo;

  @Override
  protected JpaRepository<JobPosting, Long> getRepository() {
    return repo;
  }

  /**
   * Gets the parameter jobNumber and returns the Job Posting that corresponds to
   * the
   * parameter.
   *
   * @param jobNumber
   *                  the number associated with the Job Posting
   * @return Job Posting object
   */
  public JobPosting findByJobNumber(final String jobNumber) {
    return repo.findByJobNumber(jobNumber);
  }

}
