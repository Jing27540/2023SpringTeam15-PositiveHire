package com.positivehire.phtalent.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.positivehire.phtalent.services.EmployeeService;
import com.positivehire.phtalent.models.Employee;
/**
 * API Employee class
 */
public class APIEmployeeController extends APIController {

    @Autowired
    private EmployeeService employeeServ;

    /**
     * Gets a list of saved employees from the database
     * 
     * @return list of saved employees
     */
    @GetMapping("/employees")
    public List<Employee> getEmployees() {
        return employeeServ.findAll();

    }
    /**
     * Get the employee with the given id
     * @param id the id of the employee to return
     * @return the employee with the given id
     */
    @GetMapping("/employees/{id}")
    public Employee getEmployeeByNumber(@PathVariable Long id) {

        Employee emp =  employeeServ.findByEmployeeNum(id);

        // return null == emp
        // ? new ResponseEntity( errorResponse( "No employee with the id found" ), HttpStatus.NOT_FOUND )
        // : new ResponseEntity<Employee>( emp, HttpStatus.OK );
        return emp;
    }

    /**
     * Adds an employee to the database
     * 
     * @param e employee being added to database
     * @return response entity from the database
     */
    @PostMapping("/employees")
    public ResponseEntity<String> createEmployee(@RequestBody Employee e) {
        if (employeeServ.findByEmployeeNum(e.getEmployeeNum()) != null) {
            return new ResponseEntity<String> (
                    successResponse("Recipe with the name " + e.getEmployeeName() + " already exists"),
                    HttpStatus.CONFLICT);
        } else {
            employeeServ.saveEmployee(e);
            return new ResponseEntity<String> (successResponse(e.getEmployeeName() + "successfully created"), HttpStatus.OK);
        }

    }

    /**
     * Delete employee with the given id
     * 
     * @param id the id of the employee to be deleted
     * @return resonse entity status
     */
    @DeleteMapping("/employees/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") final Long id) {

        Employee employee = employeeServ.findByEmployeeNum(id);

        if (employee == null) {
            return new ResponseEntity<String> (errorResponse("No employee with the given number"), HttpStatus.NOT_FOUND);
        }

        employeeServ.deleteEmployee(id);
        return new ResponseEntity<String> (successResponse("Employee was deleted successfully"), HttpStatus.OK);
    }
    /**
     * Updates the employee with a given id with the given employee
     * @param e the employee to update by
     * @return status
     */
    @PutMapping("/employees")
    public ResponseEntity<String> updateEmployee(@RequestBody Employee e) {
        final Employee toEdit = employeeServ.findByEmployeeNum(e.getEmployeeNum());

        if ( null == toEdit ) {
            return new ResponseEntity<String> ( errorResponse( "No employee found for name " + e.getEmployeeName() ),
                    HttpStatus.NOT_FOUND );
        }
        toEdit.updateEmployee(e);
        employeeServ.saveEmployee(toEdit);

        return new ResponseEntity<String> ( successResponse( toEdit.getEmployeeName() + " was updated successfully" ), HttpStatus.OK );
    }

}
