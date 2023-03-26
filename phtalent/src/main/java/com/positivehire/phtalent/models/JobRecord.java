package com.positivehire.phtalent.models;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class JobRecord extends DomainObject {
    /**
     * ID of account object stored in a database
     */
    @Id
    @GeneratedValue
    private long id;

    private String jobTitle;

    private String jobLevel;

    private Date startDate;

    private Date endDate;

    // private String employeeId;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Skill> jobSkills;

    /**
     * Empty constructor for Hibernate
     */
    public JobRecord() {

    }

    // public JobRecord(String title, String level, String start, String end) {

    // }

    public JobRecord(String jobTitle, String jobLevel, Date startDate, Date endDate, List<Skill> jobSkills) {
        this.jobTitle = jobTitle;
        this.jobLevel = jobLevel;
        this.startDate = startDate;
        this.endDate = endDate;
        this.jobSkills = jobSkills;
        // this.employeeId = employeeId;
    }

    public Serializable getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getJobTitle() {
        return this.jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getJobLevel() {
        return this.jobLevel;
    }

    public void setJobLevel(String jobLevel) {
        this.jobLevel = jobLevel;
    }

    public Date getStartDate() {
        return this.startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return this.endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public List<Skill> getJobSkills() {
        return this.jobSkills;
    }

    public void setJobSkills(List<Skill> jobSkills) {
        this.jobSkills = jobSkills;
    }

    // public String getEmployeeId() {
    // return this.employeeId;
    // }

    // public void setEmployeeId(String employeeId) {
    // this.employeeId = employeeId;
    // }

    // Functions for CRUD skills

    // public JobRecord id(long id) {
    // setId(id);
    // return this;
    // }

    // public JobRecord jobTitle(String jobTitle) {
    // setJobTitle(jobTitle);
    // return this;
    // }

    // public JobRecord jobLevel(String jobLevel) {
    // setJobLevel(jobLevel);
    // return this;
    // }

    // public JobRecord startDate(Date startDate) {
    // setStartDate(startDate);
    // return this;
    // }

    // public JobRecord endDate(Date endDate) {
    // setEndDate(endDate);
    // return this;
    // }

    // public JobRecord jobSkills(List<Skill> jobSkills) {
    // setJobSkills(jobSkills);
    // return this;
    // }

    // @Override
    // public boolean equals(Object o) {
    // if (o == this)
    // return true;
    // if (!(o instanceof JobRecord)) {
    // return false;
    // }
    // JobRecord jobRecord = (JobRecord) o;
    // return id == jobRecord.id && Objects.equals(jobTitle, jobRecord.jobTitle)
    // && Objects.equals(jobLevel, jobRecord.jobLevel) && Objects.equals(startDate,
    // jobRecord.startDate)
    // && Objects.equals(endDate, jobRecord.endDate) && Objects.equals(jobSkills,
    // jobRecord.jobSkills);
    // }

    // @Override
    // public int hashCode() {
    // return Objects.hash(id, jobTitle, jobLevel, startDate, endDate, jobSkills);
    // }

    @Override
    public String toString() {
        return "{" +
                " id='" + getId() + "'" +
                ", jobTitle='" + getJobTitle() + "'" +
                ", jobLevel='" + getJobLevel() + "'" +
                ", startDate='" + getStartDate() + "'" +
                ", endDate='" + getEndDate() + "'" +
                ", jobSkills='" + getJobSkills() + "'" +
                "}";
    }

}
