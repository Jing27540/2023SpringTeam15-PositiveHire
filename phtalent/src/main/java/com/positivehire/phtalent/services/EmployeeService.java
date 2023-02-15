package com.positivehire.phtalent.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.positivehire.phtalent.models.Employee;
import com.positivehire.phtalent.repositories.EmployeeRepository;

/**
 * Service class to do crud operations for an employee
 */
@Service
public class EmployeeService {
	/* EmployeeRepository Instance */
	@Autowired
	private EmployeeRepository<Employee> repo;

	/**
	 * Returns all the employees currently
	 * in the repo
	 * 
	 * @return list of employees
	 */
	public List<Employee> findAll() {
		return repo.findAll();
	}

	/**
	 * Saves a new employee to the repo
	 * 
	 * @param e employee added
	 * @return Employee added
	 */
	public Employee saveEmployee(Employee e) {
		return (Employee) repo.save(e);
	}

	/**
	 * Deletes a given employee
	 * 
	 * @param e employee being deleted
	 */
	public void deleteEmployee(final Long employeeNum) {
		Employee e = findByEmployeeNum(employeeNum);
		repo.delete(e);
	}

	/**
	 * Find singluar employee by id
	 * 
	 * @param id of employee needed
	 * @return employee from repo with given id
	 */
	public Employee findByEmployeeNum(final Long employeeNum) {
		return repo.findById(employeeNum).get();
	}

}
