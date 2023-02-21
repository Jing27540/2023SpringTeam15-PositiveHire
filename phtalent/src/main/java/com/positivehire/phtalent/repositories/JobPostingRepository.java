package com.positivehire.phtalent.repositories;

import com.positivehire.phtalent.models.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobPostingRepository<T extends JobPosting> extends JpaRepository<JobPosting, Long> {  
}
