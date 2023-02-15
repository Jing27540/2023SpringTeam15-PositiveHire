package com.positivehire.phtalent.models;

import java.security.PrivateKey;
import java.util.ArrayList;

/**
 * Represents a job post in the context of creating a feature to see a list of job postings
 * @author Zayda Cummings
 */
public class JobPosting {

    /** PRIVATE JOB POSTING ATTRIBUTES */

    /** Serializable PrivateKey associated with a specific Job Posting */
    private PrivateKey jobNumber;

    /** Title of the job position */
    private String jobTitle;

    /** Salary of the job position */
    private String salary;

    /** Metric-tracked Skill (object) job position requirements */
    private ArrayList<Skill> skillRequirements;

    /** Metric-tracked Certification (object) job position requirements */
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

    /** GETTERS & SETTERS */

    public PrivateKey getJobNumber() {
        return jobNumber;
    }

    public void setJobNumber(PrivateKey jobNumber) {
        this.jobNumber = jobNumber;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }

    public ArrayList<Skill> getSkillRequirements() {
        return skillRequirements;
    }

    public void setSkillRequirements(ArrayList<Skill> skillRequirements) {
        this.skillRequirements = skillRequirements;
    }

    public ArrayList<Certification> getCertificationRequirements() {
        return certificationRequirements;
    }

    public void setCertificationRequirements(ArrayList<Certification> certificationRequirements) {
        this.certificationRequirements = certificationRequirements;
    }

    public ArrayList<String> getOtherRequirements() {
        return otherRequirements;
    }

    public void setOtherRequirements(ArrayList<String> otherRequirements) {
        this.otherRequirements = otherRequirements;
    }

    public Integer getAvailablePositions() {
        return availablePositions;
    }

    public void setAvailablePositions(Integer availablePositions) {
        this.availablePositions = availablePositions;
    }

    public ArrayList<String> getLocation() {
        return location;
    }

    public void setLocation(ArrayList<String> location) {
        this.location = location;
    }

    public String getMeetingType() {
        return meetingType;
    }

    public void setMeetingType(String meetingType) {
        this.meetingType = meetingType;
    }

    public String getMeetingNotes() {
        return meetingNotes;
    }

    public void setMeetingNotes(String meetingNotes) {
        this.meetingNotes = meetingNotes;
    }

    public ArrayList<String> getProcess() {
        return process;
    }

    public void setProcess(ArrayList<String> process) {
        this.process = process;
    }

}
