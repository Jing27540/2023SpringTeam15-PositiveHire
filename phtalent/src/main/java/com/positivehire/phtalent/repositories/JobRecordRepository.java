package com.positivehire.phtalent.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.positivehire.phtalent.models.JobRecord;

@Repository
public interface JobRecordRepository extends JpaRepository<JobRecord, Long> {

}