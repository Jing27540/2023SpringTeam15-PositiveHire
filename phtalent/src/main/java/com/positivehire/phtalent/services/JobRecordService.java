package com.positivehire.phtalent.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.positivehire.phtalent.models.JobRecord;
import com.positivehire.phtalent.repositories.JobRecordRepository;

import jakarta.transaction.Transactional;

@Component
@Transactional
public class JobRecordService extends Service<JobRecord, Long> {

    /** Repository for CRUD tasks */
    @Autowired
    private JobRecordRepository repository;

    @Override
    protected JpaRepository<JobRecord, Long> getRepository() {
        return repository;
    }

    // public List<JobRecord> getJobRecordsByEmpId(String employeeId) {
    // List<JobRecord> empJobRecords = new ArrayList<JobRecord>();
    // for (JobRecord jr : repository.findAll()) {
    // if (jr.getEmployeeId().equals(employeeId)) {
    // empJobRecords.add(jr);
    // }
    // }
    // return repository.findAll();
    // }

}
