package com.positivehire.phtalent.repositories;

import com.positivehire.phtalent.models.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobPostingRepository<T extends JobPosting> extends JpaRepository<JobPosting, Long> {
    /**
     * Gets the parameter jobNumber and returns the job posting that corresponds to the
     * parameter.
     *
     * @param jobNumber
     *            the number associated with the Job Posting
     * @return Job Posting object
     */
    public JobPosting findByJobNumber ( String jobNumber );
}
