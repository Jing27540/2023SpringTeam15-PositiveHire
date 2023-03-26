package com.positivehire.phtalent.services;

//import java.util.List;
//import com.positivehire.phtalent.services.Service;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.positivehire.phtalent.models.Employee;
import com.positivehire.phtalent.repositories.EmployeeRepository;

/**
 * Service class to do crud operations for an employee
 */
@Component
@Transactional
public class EmployeeService extends Service<Employee, Long> {
	/* EmployeeRepository Instance */
	@Autowired
	private EmployeeRepository<Employee> repo;

	@Override
    protected JpaRepository<Employee, Long> getRepository () {
        return repo;
    }

	/**
	 * Finds employee by the given employee number
	 * @param employeeNum the employee number to use
	 * @return the employee found
	 */
	public Employee findByEmployeeNum(final int employeeNum) {
		return repo.findByEmployeeNum(employeeNum);
	}

}
