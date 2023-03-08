package com.positivehire.phtalent.models;

import java.util.ArrayList;
import java.util.List;

import java.io.Serializable;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;

/**
 * Represents a job post in the context of creating a feature to see a list of job postings
 * @author Zayda Cummings
 */
@Entity
public class JobPosting extends DomainObject {

    /** PRIVATE JOB POSTING ATTRIBUTES */

    /** Serializable Id associated with a specific Job Posting */
    @Id
    @GeneratedValue
    private Long id;

    /** Job number associated with the job position (I set this as a String in case its not only 1-9 digits) */

    private String jobNumber;

    /** Title of the job position */
    private String jobTitle;

    /** Salary of the job position */
    private String salary;

    /** Department of the job position */
    private String department;

    /** Metric-tracked Skill (object) job position requirements */
    @OneToMany(cascade = CascadeType.ALL)
    private List<Skill> skillRequirements;

    /** Metric-tracked Certification (object) job position requirements */
    @OneToMany(cascade = CascadeType.ALL)
    private List<Certification> certificationRequirements;

    /** Non-metric job position requirements */
    private String otherRequirements;
    
    @Column( length = 100000 )
    /** Main job description */
    private String jobDescription;

    /** Number of available positions for this specific Job Posting */
    private Integer availablePositions;

    /** List of locations where the job position will be stationed */
    private List<String> location;

    /** Desired meeting type for this Job Posting */
    private String meetingType;

    /** Additional notes associated with the Job Posting */
    private String meetingNotes;

    /** List of hiring processes */
    private List<String> process;

    /** Link to Company-side job description and application */
    private String applyLink;

    /** List of Employees who applied for the position */
    @OneToMany(cascade = CascadeType.ALL)
    private List<Employee> listofApplicants;

    /**
     * For Hibernate to use (Must be an empty constructor)
     */
    public JobPosting() {
        
    }

    /************************************ GETTERS & SETTERS ************************************/

    /**
     * Sets the serializable id for the model 
     * @return the id
     */
    @Override
    public Serializable getId() {
        return id;
    }

    /**
     * Sets the id for the model
     * 
     * @param id The id that is set
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Get the job number
     * @return job number
     */
    public String getJobNumber() {
        return jobNumber;
    }

    /**
     * Set the job number
     * @param jobNumber
     */
    public void setJobNumber(String jobNumber) {
        this.jobNumber = jobNumber;
    }

    /**
     * Get the job title
     * @return job title
     */
    public String getJobTitle() {
        return jobTitle;
    }

    /**
     * Set job title
     * @param jobTitle
     */
    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    /**
     * Get salary for Job Posting
     * @return salary
     */
    public String getSalary() {
        return salary;
    }

    /**
     * Sets the salary for the Job Posting
     * @param salary
     */
    public void setSalary(String salary) {
        this.salary = salary;
    }

    /**
     * Returns the department name
     * @return department name
     */
    public String getDepartment() {
        return department;
    }

    /**
     * Sets the department name
     * @param department name
     */
    public void setDepartment(String department) {
        this.department = department;
    }

    /**
     * Get the metric-skill requirements
     * @return metric-skill requirements
     */
    public List<Skill> getSkillRequirements() {
        return skillRequirements;
    }

    /**
     * Sets the metric-skill requirements
     * @param skillRequirements
     */
    public void setSkillRequirements(List<Skill> skillRequirements) {
        this.skillRequirements = skillRequirements;
    }

    /**
     * Get metric-tracked certification requirements
     * @return metric-tracked certification requirements
     */
    public List<Certification> getCertificationRequirements() {
        return certificationRequirements;
    }

    /**
     * Set metric-tracked certification requirements
     * @param certificationRequirements
     */
    public void setCertificationRequirements(List<Certification> certificationRequirements) {
        this.certificationRequirements = certificationRequirements;
    }

    /**
     * Get the other non-metric tracked requirements for the job
     * @return other job requirements
     */
    public String getOtherRequirements() {
        return otherRequirements;
    }

    /**
     * Get the job description for the job Position
     * @return the job description
     */
    public String getJobDescription() {
        return jobDescription;
    }

    /**
     * Sets other requirements
     * @param otherRequirements other job requirements
     */
    public void setOtherRequirements(String otherRequirements) {
        this.otherRequirements = otherRequirements;   
    }

    /**
     * Sets job description for the Job Position
     * @param jobDescription description of the job
     */
    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }

    /**
     * Get number of available positions
     * @return number of positions
     */
    public Integer getAvailablePositions() {
        return availablePositions;
    }

    /**
     * Set the number of positions
     * @param availablePositions
     */
    public void setAvailablePositions(Integer availablePositions) {
        this.availablePositions = availablePositions;
    }

    /**
     * Get the location(s)
     * @return location
     */
    public List<String> getLocation() {
        return location;
    }

    /**
     * Set the location(s)
     * @param location
     */
    public void setLocation(List<String> location) {
        this.location = location;
    }

    /**
     * Get the meeting type
     * @return meeting type
     */
    public String getMeetingType() {
        return meetingType;
    }

    /**
     * Set the meeting type
     * @param meetingType
     */
    public void setMeetingType(String meetingType) {
        this.meetingType = meetingType;
    }

    /**
     * Get the additional meeting notes
     * @return additional meeting notes
     */
    public String getMeetingNotes() {
        return meetingNotes;
    }

    /**
     * Sets the meeting notes
     * @param meetingNotes
     */
    public void setMeetingNotes(String meetingNotes) {
        this.meetingNotes = meetingNotes;
    }

    /**
     * Get the list of processes for the hiring processes
     * @return processes
     */
    public List<String> getProcess() {
        return process;
    }

    /**
     * Set the list of processes
     * @param process
     */
    public void setProcess(List<String> process) {
        this.process = process;
    }

    /** 
     * Get the application link
     * @return application link
     */
    public String getApplyLink() {
        return applyLink;
    }

    /**
     * Set the application link
     * @param applyLink
     */
    public void setApplyLink(String applyLink) {
        this.applyLink = applyLink;
    }

    /**
     * Get the list of applicants
     * @return list of applicants
     */
    public List<Employee> getListofApplicants() {
        return listofApplicants;
    }

    /**
     * Set the list of applicants
     * @param listofApplicants
     */
    public void setListofApplicants(List<Employee> listofApplicants) {
        this.listofApplicants = listofApplicants;
    }

    /**
     * Returns the Job Posting as a String
     *
     * @return a Job Posting represented as a String
     */
    @Override
    public String toString() {
        return "JobPosting [id=" + id + ", jobNumber=" + jobNumber + ", jobTitle=" + jobTitle + ", salary=" + salary
                + ", department=" + department + ", skillRequirements=" + skillRequirements
                + ", certificationRequirements=" + certificationRequirements + ", jobDescription=" + jobDescription
                + ", availablePositions=" + availablePositions + ", location=" + location + ", meetingType="
                + meetingType + ", meetingNotes=" + meetingNotes + ", process=" + process + ", applyLink=" + applyLink
                + ", listofApplicants=" + listofApplicants + "]";
    }

}
