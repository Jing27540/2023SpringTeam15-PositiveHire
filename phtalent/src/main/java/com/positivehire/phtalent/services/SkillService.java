package com.positivehire.phtalent.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.positivehire.phtalent.models.Skill;
import com.positivehire.phtalent.repositories.SkillRepository;

import jakarta.transaction.Transactional;

@Component
@Transactional
public class SkillService extends Service<Skill, Long> {

    /** Repository for CRUD tasks */
    @Autowired
    private SkillRepository repository;

    @Override
    protected JpaRepository<Skill, Long> getRepository() {
        return repository;
    }
}