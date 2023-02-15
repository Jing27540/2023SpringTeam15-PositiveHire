package com.positivehire.phtalent.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.positivehire.phtalent.models.Employee;

/**
 * Repository class for employee that implements jpa repository interface
 */
@Repository
public interface EmployeeRepository<T extends Employee> extends JpaRepository<Employee, Long> {

}
