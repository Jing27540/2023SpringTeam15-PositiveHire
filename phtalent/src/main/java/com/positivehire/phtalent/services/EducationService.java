package com.positivehire.phtalent.services;

import org.springframework.data.jpa.repository.JpaRepository;

import com.positivehire.phtalent.models.Education;
import com.positivehire.phtalent.repositories.EducationRepository;
import org.springframework.stereotype.Component;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

@Component
@Transactional
public class EducationService extends Service<Education, Long> {
    
    @Autowired
    private EducationRepository repo;

    @Override
    protected JpaRepository<Education, Long> getRepository() {
       
       return repo;
    }

    public Education findByName(String name) {
        return repo.findByName(name);
    }
    
}
