package com.positivehire.phtalent.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.positivehire.phtalent.models.Skill;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {

}
