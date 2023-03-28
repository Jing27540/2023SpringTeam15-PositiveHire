package com.positivehire.phtalent.controllers;

import java.io.Serializable;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.positivehire.phtalent.services.EmployeeService;
import com.positivehire.phtalent.services.JobRecordService;
import com.positivehire.phtalent.services.SkillService;
import com.positivehire.phtalent.models.Education;
import com.positivehire.phtalent.models.Employee;
import com.positivehire.phtalent.models.JobRecord;
import com.positivehire.phtalent.models.Skill;

/**
 * API Employee class
 */
@RestController
@CrossOrigin("http://localhost:3000/")
public class APIEmployeeController extends APIController {

    @Autowired
    private EmployeeService employeeServ;

    @Autowired
    private SkillService skillServ;

    @Autowired
    private JobRecordService jrServ;

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
     * 
     * @param id the id of the employee to return
     * @return the employee with the given id
     */
    // @GetMapping("/employees/{id}")
    // public ResponseEntity<Employee> getEmployeeByNumber(@PathVariable Long id) {

    // Employee emp = employeeServ.findById(id);

    // return null == emp
    // ? new ResponseEntity( errorResponse( "No employee with the id found" ),
    // HttpStatus.NOT_FOUND )
    // : new ResponseEntity<Employee>( emp, HttpStatus.OK );

    // }

    /**
     * Adds an employee to the database
     * 
     * @param e employee being added to database
     * @return response entity from the database
     */
    @PostMapping("/employees")
    public ResponseEntity<String> createEmployee(@RequestBody Employee e) {
        if (e.getId() != null) {
            return new ResponseEntity<String>(
                    successResponse("Employee with the name " + e.getEmployeeName() + " already exists"),
                    HttpStatus.CONFLICT);
        } else {
            employeeServ.save(e);
            return new ResponseEntity<String>(successResponse(e.getEmployeeName() + "successfully created"),
                    HttpStatus.OK);
        }

    }

    /**
     * Delete employee with the given id
     * 
     * @param id the id of the employee to be deleted
     * @return resonse entity status
     */
    @DeleteMapping("/employees/{employeeNum}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("employeeNum") final int employeeNum) {

        Employee employee = employeeServ.findByEmployeeNum(employeeNum);

        if (employee == null) {
            return new ResponseEntity<String>(errorResponse("No employee with the given number"), HttpStatus.NOT_FOUND);
        }

        employeeServ.delete(employee);
        return new ResponseEntity<String>(successResponse("Employee was deleted successfully"), HttpStatus.OK);
    }

    /**
     * Updates the employee with a given id with the given employee
     * 
     * @param e the employee to update by
     * @return status
     */
    @PutMapping("/employees")
    public ResponseEntity<String> updateEmployee(@RequestBody Employee e) {
        final Employee toEdit = employeeServ.findById((long) e.getId());

        if (null == toEdit) {
            return new ResponseEntity<String>(errorResponse("No employee found for name " + e.getEmployeeName()),
                    HttpStatus.NOT_FOUND);
        }
        toEdit.updateEmployee(e);
        employeeServ.save(toEdit);

        return new ResponseEntity<String>(successResponse(toEdit.getEmployeeName() + " was updated successfully"),
                HttpStatus.OK);
    }

    /**
     * Returns the employee with the given employeeNumber
     * 
     * @param employeeNum employee number to look for
     * @return response entity with employee
     */
    @GetMapping("/employees/{employeeNum}")
    public ResponseEntity<Employee> findByEmployeeNum(@PathVariable("employeeNum") final int employeeNum) {
        final Employee emp = employeeServ.findByEmployeeNum(employeeNum);

        return null == emp
                ? new ResponseEntity(errorResponse("No employee with the id found"),
                        HttpStatus.NOT_FOUND)
                : new ResponseEntity<Employee>(emp, HttpStatus.OK);
    }

    @PostMapping("/employees/{employeeNum}/education")
    public ResponseEntity<String> createEducation(@PathVariable("employeeNum") final int employeeNum,
            @RequestBody Education edu) {
        final Employee emp = employeeServ.findByEmployeeNum(employeeNum);

        if (edu.getId() != null) {
            return new ResponseEntity<String>(
                    successResponse("Education with the name " + edu.getName() + " already exists"),
                    HttpStatus.CONFLICT);
        } else {
            // emp;
            employeeServ.save(emp);
            return new ResponseEntity<String>(successResponse(edu.getName() + "successfully created"),
                    HttpStatus.OK);
        }

    }

    @PostMapping("/employees/{employeeNum}/jobrecords")
    public ResponseEntity<String> createJobRecord(@PathVariable("employeeNum") final int employeeNum,
            @RequestBody JobRecord rec) {
        final Employee emp = employeeServ.findByEmployeeNum(employeeNum);

        // if (rec.getId().toString() != 0) {
        // return new ResponseEntity<String>(
        // successResponse("Job record with the name " + rec.getJobTitle() + " already
        // exists"),
        // HttpStatus.CONFLICT);
        // } else
        if (emp != null) {
            emp.getJobRecords().add(rec);
            employeeServ.save(emp);
            return new ResponseEntity<String>(successResponse(rec.getJobTitle() + "successfully created"),
                    HttpStatus.OK);
        } else {
            return new ResponseEntity<String>(successResponse("Error employee does not exist"),
                    HttpStatus.BAD_REQUEST);
        }

    }

    @PutMapping("/employees/{employeeNum}/jobrecords")
    public ResponseEntity<String> updateJobRecord(@PathVariable("employeeNum") final int employeeNum,
            @RequestBody JobRecord rec) {

        final Employee emp = employeeServ.findByEmployeeNum(employeeNum);

        JobRecord jobRecordToUpdate = null;

        if (emp != null) {
            // Get the job record
            for (JobRecord jr : emp.getJobRecords()) {
                if (jr.getJobTitle().equals(rec.getJobTitle())) {
                    jobRecordToUpdate = jr;
                    break;
                }
            }

            // check if JobRecord was found
            if (jobRecordToUpdate != null) {
                // Update base fields
                jobRecordToUpdate.setJobLevel(rec.getJobLevel());
                jobRecordToUpdate.setOrganization((rec.getOrganization()));
                jobRecordToUpdate.setlocation(rec.getlocation());
                jobRecordToUpdate.setStartDate(rec.getStartDate());
                jobRecordToUpdate.setEndDate(rec.getEndDate());

                // Update skills
                boolean newSkill = true;

                List<Skill> jrSkills = jobRecordToUpdate.getJobSkills();
                if (rec.getJobSkills() != null) {

                    for (Skill updated : rec.getJobSkills()) {
                        for (Skill old : jrSkills) {
                            if (updated.getName().equals(old.getName())) {
                                newSkill = false;
                                jrSkills.remove(old);
                                jrSkills.add(updated);
                                skillServ.delete(old);
                                break;
                            }
                        }
                        if (newSkill) {
                            // skillServ.save(updated);
                            jrSkills.add(updated);
                            newSkill = false;
                        } else {
                            newSkill = true;
                        }
                    }
                }

                jobRecordToUpdate.setJobSkills(jrSkills);
                jrServ.save(jobRecordToUpdate);

            } else {
                // If no JobRecord found
                return new ResponseEntity<String>(successResponse("Error: Job Record does not exist"),
                        HttpStatus.BAD_REQUEST);
            }
            // Save employee to push changes
            // emp.getJobRecords().remove(jobRecordToUpdate);
            // employeeServ.save(emp);
        } else {
            return new ResponseEntity<String>(successResponse("Error: employee does not exist"),
                    HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<String>(successResponse(rec.getJobTitle() + "successfully updated"),
                HttpStatus.OK);
    }

    @DeleteMapping("/employees/{employeeNum}/jobrecords")
    public ResponseEntity<String> deleteJobRecord(@PathVariable("employeeNum") final int employeeNum,
            @RequestBody JobRecord rec) {
        final Employee emp = employeeServ.findByEmployeeNum(employeeNum);

        JobRecord employeeJobRecordToBeDeleted = null;

        if (emp != null) {
            // Get the job record
            for (JobRecord jr : emp.getJobRecords()) {
                if (jr.getJobTitle().equals(rec.getJobTitle())) {
                    employeeJobRecordToBeDeleted = jr;
                    break;
                }
            }

            // check if JobRecord was found
            if (employeeJobRecordToBeDeleted != null) {
                // Remove all skills associated with the JobRecord

                for (Skill x : employeeJobRecordToBeDeleted.getJobSkills()) {
                    skillServ.delete(x);
                }

                // Remove the JobRecord object from the DB
                // jrServ.save(employeeJobRecordToBeDeleted);
                jrServ.delete(employeeJobRecordToBeDeleted);

            } else {
                // If no JobRecord found
                return new ResponseEntity<String>(successResponse("Error: Job Record does not exist"),
                        HttpStatus.BAD_REQUEST);
            }
            // Save employee to push changes
            emp.getJobRecords().remove(employeeJobRecordToBeDeleted);
            employeeServ.save(emp);
        } else {
            return new ResponseEntity<String>(successResponse("Error: employee does not exist"),
                    HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<String>(successResponse(rec.getJobTitle() + "successfully removed"),
                HttpStatus.OK);
    }

}
