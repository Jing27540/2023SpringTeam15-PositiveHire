package com.positivehire.phtalent.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.positivehire.phtalent.models.Document;
import com.positivehire.phtalent.repositories.DocumentRepository;

import jakarta.transaction.Transactional;

@Component
@Transactional
public class DocumentService extends Service<Document, Long> {

    @Autowired
    private DocumentRepository repo;

    @Override
    protected JpaRepository<Document, Long> getRepository() {
        return repo;
    }

    public Document findByEmployeeNum(int employeeNum) {
        return repo.findByEmployeeNum(employeeNum);
    }
}
