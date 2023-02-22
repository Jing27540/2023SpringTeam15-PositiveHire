package com.positivehire.phtalent.models;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

/**
 * Represents a job post in the context of creating a feature to see a list of job postings
 * @author Zayda Cummings
 */
@Entity
public class JobPosting extends DomainObject{

    /** PRIVATE JOB POSTING ATTRIBUTES */

    /** Serializable Id associated with a specific Job Posting */
    @Id
    @GeneratedValue
    private Long id;

    /** Title of the job position */
    private String jobTitle;

    /** Salary of the job position */
    private String salary;

    /** Department of the job position */
    private String department;

    /** Metric-tracked Skill (object) job position requirements */
    @OneToMany(cascade = CascadeType.ALL)
    private ArrayList<Skill> skillRequirements;

    /** Metric-tracked Certification (object) job position requirements */
    @OneToMany(cascade = CascadeType.ALL)
    private ArrayList<Certification> certificationRequirements;

    /** Non-metric job position requirements */
    private ArrayList<String> otherRequirements;

    /** Number of available positions for this specific Job Posting */
    private Integer availablePositions;

    /** List of locations where the job position will be stationed */
    private ArrayList<String> location;

    /** Desired meeting type for this Job Posting */
    private String meetingType;

    /** Additional notes associated with the Job Posting */
    private String meetingNotes;

    /** List of hiring processes */
    private ArrayList<String> process;

    /**
     * For Hibernate to use (Must be an empty constructor)
     */
    public JobPosting() {
        
    }

    /**
     * Sets the serializable id for the model 
     * @return the id
     */
    @Override
    public Long getId() {
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

    /** GETTERS & SETTERS */

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
    public ArrayList<Skill> getSkillRequirements() {
        return skillRequirements;
    }

    /**
     * Sets the metric-skill requirements
     * @param skillRequirements
     */
    public void setSkillRequirements(ArrayList<Skill> skillRequirements) {
        this.skillRequirements = skillRequirements;
    }

    /**
     * Get metric-tracked certification requirements
     * @return metric-tracked certification requirements
     */
    public ArrayList<Certification> getCertificationRequirements() {
        return certificationRequirements;
    }

    /**
     * Set metric-tracked certification requirements
     * @param certificationRequirements
     */
    public void setCertificationRequirements(ArrayList<Certification> certificationRequirements) {
        this.certificationRequirements = certificationRequirements;
    }

    /**
     * Get other requirements for the job Position
     * @return
     */
    public ArrayList<String> getOtherRequirements() {
        return otherRequirements;
    }

    /**
     * Sets other requirements for the Job Position
     * @param otherRequirements
     */
    public void setOtherRequirements(ArrayList<String> otherRequirements) {
        this.otherRequirements = otherRequirements;
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
    public ArrayList<String> getLocation() {
        return location;
    }

    /**
     * Set the location(s)
     * @param location
     */
    public void setLocation(ArrayList<String> location) {
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
    public void setProcess(ArrayList<String> process) {
        this.process = process;
    }

    /**
     * Returns the Job Posting as a String
     *
     * @return a Job Posting represented as a String
     */
    @Override
    public String toString () {
        return "JobPosting [jobNumber=" + id + ", jobTitle=" + jobTitle + ", salary=" + salary
                + ", department=" + department + ", skillRequirements=" + skillRequirements + "]";
    }

}
