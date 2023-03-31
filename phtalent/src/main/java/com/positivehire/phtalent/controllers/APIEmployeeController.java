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

import com.positivehire.phtalent.services.EducationService;
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

    @Autowired
    private EducationService eduServ;

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

    @PutMapping("/employees/{employeeNum}/jobrecords/{id}")
    public ResponseEntity<String> updateJobRecord(@PathVariable("employeeNum") final int employeeNum,
            @PathVariable("id") Long id, @RequestBody JobRecord rec) {

        final Employee emp = employeeServ.findByEmployeeNum(employeeNum);

        JobRecord jobRecordToUpdate = jrServ.findById(id);

        if (emp != null) {
            // Get the job record
            // for (JobRecord jr : emp.getJobRecords()) {
            // if (jr.getJobTitle().equals(rec.getJobTitle())) {
            // jobRecordToUpdate = jr;
            // break;
            // }
            // }

            // check if JobRecord was found
            if (jobRecordToUpdate != null) {
                // Update base fields
                jobRecordToUpdate.setJobTitle(rec.getJobTitle());
                jobRecordToUpdate.setJobLevel(rec.getJobLevel());
                jobRecordToUpdate.setOrganization((rec.getOrganization()));
                jobRecordToUpdate.setlocation(rec.getlocation());
                jobRecordToUpdate.setStartDate(rec.getStartDate());
                jobRecordToUpdate.setEndDate(rec.getEndDate());

                // // Update skills
                // boolean newSkill = true;

                // List<Skill> jrSkills = jobRecordToUpdate.getJobSkills();
                // if (rec.getJobSkills() != null) {

                // for (Skill updated : rec.getJobSkills()) {
                // for (Skill old : jrSkills) {
                // if (updated.getName().equals(old.getName())) {
                // newSkill = false;
                // jrSkills.remove(old);
                // jrSkills.add(updated);
                // skillServ.delete(old);
                // break;
                // }
                // }
                // if (newSkill) {
                // // skillServ.save(updated);
                // jrSkills.add(updated);
                // newSkill = false;
                // } else {
                // newSkill = true;
                // }
                // }
                // }

                // jobRecordToUpdate.setJobSkills(jrSkills);
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

    @DeleteMapping("/employees/{employeeNum}/jobrecords/{id}")
    public ResponseEntity<String> deleteJobRecord(@PathVariable("employeeNum") final int employeeNum,
            @PathVariable("id") Long id) {
        final Employee emp = employeeServ.findByEmployeeNum(employeeNum);

        JobRecord deleteJR = jrServ.findById(id);

        if (emp != null) {

            // check if JobRecord was found
            if (deleteJR != null) {
                // Remove all skills associated with the JobRecord

                for (Skill x : deleteJR.getJobSkills()) {
                    skillServ.delete(x);
                }

                // Remove the JobRecord object from the DB
                // jrServ.save(employeeJobRecordToBeDeleted);
                jrServ.delete(deleteJR);

            } else {
                // If no JobRecord found
                return new ResponseEntity<String>(successResponse("Error: Job Record does not exist"),
                        HttpStatus.BAD_REQUEST);
            }
            // Save employee to push changes
            emp.getJobRecords().remove(deleteJR);
            employeeServ.save(emp);
        } else {
            return new ResponseEntity<String>(successResponse("Error: employee does not exist"),
                    HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<String>(successResponse(deleteJR.getJobTitle() + "successfully removed"),
                HttpStatus.OK);
    }

    /**
     * Add Job Record Skill
     * 
     * @param employeeNum employee id
     * @param jrId        id of the job record to add the new skill to
     * @param newSkill    the skill to create
     * @return HttpStatus 200 on success or 400 if no employee found
     */
    @PostMapping("/employees/{employeeNum}/jobrecords/{id}/skills")
    public ResponseEntity<String> createJobRecordSkill(@PathVariable("employeeNum") final int employeeNum,
            @PathVariable("id") Long jrId, @RequestBody Skill newSkill) {
        if (employeeServ.findByEmployeeNum(employeeNum) != null) {

            JobRecord toAdd = jrServ.findById(jrId);

            if (toAdd != null) {
                toAdd.getJobSkills().add(newSkill);
                jrServ.save(toAdd);
            } else {
                return new ResponseEntity<String>(
                        successResponse("Job record does not exist"),
                        HttpStatus.BAD_REQUEST);
            }

        } else {
            return new ResponseEntity<String>(
                    successResponse("Employee with the name does not exist"),
                    HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<String>(
                successResponse(jrServ.findById(jrId).getJobTitle() + " was updated successfully"),
                HttpStatus.OK);
    }

    @PutMapping("/employees/{employeeNum}/jobrecords/{id}/skills/{skillId}")
    public ResponseEntity<String> updateJobRecordSkill(@PathVariable("employeeNum") final int employeeNum,
            @PathVariable("id") Long jrId, @PathVariable("skillId") Long skillId, @RequestBody Skill editedSkill) {
        if (employeeServ.findByEmployeeNum(employeeNum) != null) {
            // Education toEdit = eduServ.findById(eduId);
            Skill stoEdit = skillServ.findById(skillId);

            if (stoEdit != null) {
                // toEdit.getSkills().remove(stoEdit);
                stoEdit.setLevel(editedSkill.getLevel());
                stoEdit.setName(editedSkill.getName());
                stoEdit.setScore(editedSkill.getScore());
                skillServ.save(stoEdit);
            } else {
                return new ResponseEntity<String>(
                        successResponse("Job record does not exist"),
                        HttpStatus.BAD_REQUEST);
            }

        } else {
            return new ResponseEntity<String>(
                    successResponse("Employee with the name does not exist"),
                    HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<String>(
                successResponse(jrServ.findById(jrId).getJobTitle() + " was updated successfully"),
                HttpStatus.OK);
    }

    @DeleteMapping("/employees/{employeeNum}/jobrecords/{id}/skills/{skillId}")
    public ResponseEntity<String> deleteJobRecordSkill(@PathVariable("employeeNum") final int employeeNum,
            @PathVariable("id") Long jrId, @PathVariable("skillId") Long skillId) {
        if (employeeServ.findByEmployeeNum(employeeNum) != null) {

            JobRecord jr = jrServ.findById(jrId);
            if (jr != null) {
                Skill toDelete = skillServ.findById(skillId);
                skillServ.delete(toDelete);

                // //Object will not be the same
                // Skill id = null;
                // for (Skill x : jr.getJobSkills()) {
                // if (x.getName().equals(toDelete.getName())) {
                // jr.getJobSkills().remove(x);
                // }
                // }
                jr.getJobSkills().remove(toDelete);

                jrServ.save(jr);
            } else {
                return new ResponseEntity<String>(
                        successResponse("Job record does not exist"),
                        HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<String>(
                    successResponse("Employee with the name does not exist"),
                    HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<String>(successResponse("successful deletion"),
                HttpStatus.OK);
    }

    /********************************************************************* */

    @PostMapping("/employees/{employeeNum}/education")
    public ResponseEntity<String> createEducation(@PathVariable("employeeNum") final int employeeNum,
            @RequestBody Education edu) {
        final Employee emp = employeeServ.findByEmployeeNum(employeeNum);

        if (edu.getId() != null) {
            return new ResponseEntity<String>(
                    successResponse("Education with the name " + edu.getName() + " already exists"),
                    HttpStatus.CONFLICT);
        } else {
            emp.getEducation().add(edu);
            employeeServ.save(emp);
            return new ResponseEntity<String>(successResponse(edu.getName() + "successfully created"),
                    HttpStatus.OK);
        }

    }

    /**
     * Deletes an education associated with an employee
     * 
     * @param employeeNum the employee number to delete an education from
     * @param name        the name of education to delete
     * @return response
     */
    @DeleteMapping("/employees/{employeeNum}/education/{id}")
    public ResponseEntity<String> deleteEducation(@PathVariable("employeeNum") final int employeeNum,
            @PathVariable("id") Long id) {
        final Employee emp = employeeServ.findByEmployeeNum(employeeNum);
        Education toDelete = eduServ.findById(id);
        if (emp != null) {

            for (Skill s : toDelete.getSkills()) {
                skillServ.delete(s);
            }

            eduServ.delete(toDelete);

            emp.getEducation().remove(toDelete);
            employeeServ.save(emp);
        } else {
            return new ResponseEntity<String>(
                    successResponse("Employee with the name does not exist"),
                    HttpStatus.CONFLICT);
        }
        return new ResponseEntity<String>(successResponse(toDelete.getName() + "successfully removed"),
                HttpStatus.OK);
    }

    @PutMapping("/employees/{employeeNum}/education")
    public ResponseEntity<String> updateEducation(@PathVariable("employeeNum") final int employeeNum,
            @RequestBody Education newEd) {
        if (employeeServ.findByEmployeeNum(employeeNum) != null) {
            Education toEdit = eduServ.findById((long) newEd.getId());
            toEdit.setName(newEd.getName());
            toEdit.setDateAchieved(newEd.getDateAchieved());
            toEdit.setInstitution(newEd.getInstitution());
            toEdit.setSkills(newEd.getSkills());
            toEdit.setType(newEd.getType());
            eduServ.save(toEdit);
        } else {
            return new ResponseEntity<String>(
                    successResponse("Employee with the name does not exist"),
                    HttpStatus.CONFLICT);
        }

        return new ResponseEntity<String>(successResponse(newEd.getName() + " was updated successfully"),
                HttpStatus.OK);
    }

    @PostMapping("/employees/{employeeNum}/education/{id}/skills")
    public ResponseEntity<String> addSkillToEdu(@PathVariable("employeeNum") final int employeeNum,
            @PathVariable("id") Long eduId, @RequestBody Skill newskill) {
        if (employeeServ.findByEmployeeNum(employeeNum) != null) {
            Education toAdd = eduServ.findById(eduId);
            toAdd.getSkills().add(newskill);
            eduServ.save(toAdd);

        } else {
            return new ResponseEntity<String>(
                    successResponse("Employee with the name does not exist"),
                    HttpStatus.CONFLICT);
        }

        return new ResponseEntity<String>(
                successResponse(eduServ.findById(eduId).getName() + " was updated successfully"),
                HttpStatus.OK);
    }

    @PutMapping("/employees/{employeeNum}/education/{id}/skills/{skillId}")
    public ResponseEntity<String> editSkillInEdu(@PathVariable("employeeNum") final int employeeNum,
            @PathVariable("id") Long eduId, @PathVariable("skillId") Long skillId, @RequestBody Skill editedSkill) {
        if (employeeServ.findByEmployeeNum(employeeNum) != null) {
            // Education toEdit = eduServ.findById(eduId);
            Skill stoEdit = skillServ.findById(skillId);
            // toEdit.getSkills().remove(stoEdit);
            stoEdit.setLevel(editedSkill.getLevel());
            stoEdit.setName(editedSkill.getName());
            stoEdit.setScore(editedSkill.getScore());
            skillServ.save(stoEdit);
        } else {
            return new ResponseEntity<String>(
                    successResponse("Employee with the name does not exist"),
                    HttpStatus.CONFLICT);
        }
        return new ResponseEntity<String>(
                successResponse(eduServ.findById(eduId).getName() + " was updated successfully"),
                HttpStatus.OK);
    }

    @DeleteMapping("/employees/{employeeNum}/education/{id}/skills/{skillId}")
    public ResponseEntity<String> deleteSkillFromEducation(@PathVariable("employeeNum") final int employeeNum,
            @PathVariable("id") Long eduId, @PathVariable("skillId") Long skillId) {
        if (employeeServ.findByEmployeeNum(employeeNum) != null) {
            skillServ.delete(skillServ.findById(skillId));
        } else {
            return new ResponseEntity<String>(
                    successResponse("Employee with the name does not exist"),
                    HttpStatus.CONFLICT);
        }

        return new ResponseEntity<String>(successResponse("successful deletion"),
                HttpStatus.OK);
    }
}
