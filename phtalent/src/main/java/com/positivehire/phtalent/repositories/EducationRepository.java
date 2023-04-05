package com.positivehire.phtalent.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.positivehire.phtalent.models.Education;
/**
 * Repository class that extends jpa repository
 */
@Repository
public interface EducationRepository extends JpaRepository<Education, Long> {
    
    /** Return the education with the given name */
    Education findByName(String name);
}
