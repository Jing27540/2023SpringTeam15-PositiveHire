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
	/**
	 * Returns all the employees currently
	 * in the repo
	 * 
	 * @return list of employees
	 */
	// public List<Employee> findAll() {
	// 	return repo.findAll();
	// }

	/**
	 * Saves a new employee to the repo
	 * 
	 * @param e employee added
	 * @return Employee added
	 */
	// public Employee saveEmployee(Employee e) {
	// 	return (Employee) repo.save(e);
	// }

	/**
	 * Deletes a given employee
	 * 
	 * @param e employee being deleted
	 */
	// public void deleteEmployee(final Long id) {
	// 	Employee e = findByEmploye(id);
		
	// 	repo.delete(e);
	// }

	/**
	 * Find singluar employee by id
	 * 
	 * @param id of employee needed
	 * @return employee from repo with given id
	 */
	// public Employee findById(final Long id) {
	// 	return repo.findById(id).get();
	// }

	// public void deleteAllEmployees() {
	// 	repo.deleteAll();
	// }

}
