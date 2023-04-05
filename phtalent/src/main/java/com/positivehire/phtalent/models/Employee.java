package com.positivehire.phtalent.models;

// import javax.persistence.Entity;
// import javax.persistence.Id;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Employee extends DomainObject {
    @Id
    @GeneratedValue
    private Long id;

    private String employeeName;

    private int employeeNum;

    private int marriedId;

    private int maritalStatusId;

    private int genderId;

    private int employmentStatusId;

    private int departmentId;

    private int performanceScoreId;

    private int age;

    private double payRate;

    private String state;

    private int zip;

    private String DOB;

    private String sex;

    private String maritalDesc;

    private String citizenDesc;

    private String hispanicLatino;

    private String raceDesc;

    private String dateOfHire;

    private int daysEmployed;

    private String dateOfTermination;

    private String reasonForTermination;

    private String employementStatus;

    private String department;

    private String position;

    private String managerName;

    private String employeeSource;

    private String accessRole;

    private String performanceScore;

    private String annualBonus;

    private double ptoHours;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Skill> technicalSkills;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Skill> peopleSkills;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Skill> workEthic;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Certification> certifications;
    @OneToMany(cascade = CascadeType.ALL)
    private List<JobRecord> jobRecords;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Education> education;

    public Employee() {
        this.technicalSkills = new ArrayList<Skill>();
        this.peopleSkills = new ArrayList<Skill>();
        this.workEthic = new ArrayList<Skill>();
        this.certifications = new ArrayList<Certification>();
        this.jobRecords = new ArrayList<JobRecord>();
        this.education = new ArrayList<Education>();
    }

    public Employee(final Long id, final String employeeName, final int employeeNum, final int marriedId,
            final int maritalStatusId, final int genderId, final int employmentStatusId, final int departmentId,
            final int performanceScoreId, final int age, final double payRate, final String state, final int zip,
            final String DOB, final String sex, final String maritalDesc, final String citizenDesc,
            final String hispanicLatino, final String raceDesc, final String dateOfHire, final int daysEmployeed,
            final String dateOfTermination, final String reasonForTermination, final String employementStatus,
            final String department, final String position, final String managerName, final String employeeSource,
            final String accessRole, final String performanceScore, final String annualBonus, final double ptoHours,
            final List<Skill> technicalSkills, final List<Skill> peopleSkills, final List<Skill> workEthic,
            final List<Certification> certifications, final List<JobRecord> jobRecords,
            final List<Education> education) {
        setId(id);
        setEmployeeName(employeeName);
        setEmployeeNum(employeeNum);
        setMarriedId(marriedId);
        setMaritalStatusId(maritalStatusId);
        setGenderId(genderId);
        setEmploymentStatusId(employmentStatusId);
        setDepartmentId(departmentId);
        setPerformanceScoreId(performanceScoreId);
        setAge(age);
        setPayRate(payRate);
        setState(state);
        setZip(zip);
        setDOB(DOB);
        setSex(sex);
        setMaritalDesc(maritalDesc);
        setCitizenDesc(citizenDesc);
        setHispanicLatino(hispanicLatino);
        setRaceDesc(raceDesc);
        setDateOfHire(dateOfHire);
        setDaysEmployed(daysEmployeed);
        setDateOfTermination(dateOfTermination);
        setReasonForTermination(reasonForTermination);
        setEmployementStatus(employementStatus);
        setDepartment(department);
        setPosition(position);
        setManagerName(managerName);
        setEmployeeSource(employeeSource);
        setAccessRole(accessRole);
        setPerformanceScore(performanceScore);
        setAnnualBonus(annualBonus);
        setPtoHours(ptoHours);

        this.technicalSkills = new ArrayList<Skill>();
        this.peopleSkills = new ArrayList<Skill>();
        this.workEthic = new ArrayList<Skill>();
        this.certifications = new ArrayList<Certification>();
        this.jobRecords = new ArrayList<JobRecord>();
        this.education = new ArrayList<Education>();

        setTechnicalSkills(technicalSkills);
        setPeopleSkills(peopleSkills);
        setWorkEthic(workEthic);
        setCertifications(certifications);
        setJobRecords(jobRecords);
        setEducation(education);
    }

    // public Employee ( final long id, final String employeeName ) {
    // setId( id );
    // setEmployeeName( employeeName );
    // }

    public int getEmployeeNum() {
        return this.employeeNum;
    }

    public void setEmployeeNum(final int employeeNum) {
        this.employeeNum = employeeNum;
    }

    @Override
    public Serializable getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(final String employeeName) {
        this.employeeName = employeeName;
    }

    public int getEmploymentStatusId() {
        return employmentStatusId;
    }

    public void setEmploymentStatusId(final int employmentStatusId) {
        this.employmentStatusId = employmentStatusId;
    }

    public int getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(final int departmentId) {
        this.departmentId = departmentId;
    }

    public int getPerformanceScoreId() {
        return performanceScoreId;
    }

    public void setPerformanceScoreId(final int performanceScoreId) {
        this.performanceScoreId = performanceScoreId;
    }

    public double getPayRate() {
        return payRate;
    }

    public void setPayRate(final double payRate) {
        this.payRate = payRate;
    }

    public String getState() {
        return state;
    }

    public void setState(final String state) {
        this.state = state;
    }

    public int getZip() {
        return zip;
    }

    public void setZip(final int zip) {
        this.zip = zip;
    }

    public String getDateOfHire() {
        return dateOfHire;
    }

    public void setDateOfHire(final String dateOfHire) {
        this.dateOfHire = dateOfHire;
    }

    public int getDaysEmployed() {
        return daysEmployed;
    }

    public void setDaysEmployed(final int daysEmployeed) {
        this.daysEmployed = daysEmployeed;
    }

    public String getDateOfTermination() {
        return dateOfTermination;
    }

    public void setDateOfTermination(final String dateOfTermination) {
        this.dateOfTermination = dateOfTermination;
    }

    public String getReasonForTermination() {
        return reasonForTermination;
    }

    public void setReasonForTermination(final String reasonForTermination) {
        this.reasonForTermination = reasonForTermination;
    }

    public String getEmployementStatus() {
        return employementStatus;
    }

    public void setEmployementStatus(final String employementStatus) {
        this.employementStatus = employementStatus;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(final String department) {
        this.department = department;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(final String position) {
        this.position = position;
    }

    public String getManagerName() {
        return managerName;
    }

    public void setManagerName(final String managerName) {
        this.managerName = managerName;
    }

    public String getEmployeeSource() {
        return employeeSource;
    }

    public void setEmployeeSource(final String employeeSource) {
        this.employeeSource = employeeSource;
    }

    public String getAccessRole() {
        return accessRole;
    }

    public void setAccessRole(final String accessRole) {
        this.accessRole = accessRole;
    }

    public String getPerformanceScore() {
        return performanceScore;
    }

    public void setPerformanceScore(final String performanceScore) {
        this.performanceScore = performanceScore;
    }

    public List<Skill> getTechnicalSkills() {
        return technicalSkills;
    }

    public void setTechnicalSkills(final List<Skill> technicalSkills) {
        this.technicalSkills = technicalSkills;
    }

    public List<Skill> getPeopleSkills() {
        return peopleSkills;
    }

    public void setPeopleSkills(final List<Skill> peopleSkills) {
        this.peopleSkills = peopleSkills;
    }

    public List<Skill> getWorkEthic() {
        return workEthic;
    }

    public void setWorkEthic(final List<Skill> workEthic) {
        this.workEthic = workEthic;
    }

    public List<Certification> getCertifications() {
        return certifications;
    }

    public void setCertifications(final List<Certification> certifications) {
        this.certifications = certifications;
    }

    public List<JobRecord> getJobRecords() {
        return jobRecords;
    }

    public void setJobRecords(final List<JobRecord> jobRecords) {
        this.jobRecords = jobRecords;
    }

    // public Demographic getEmployeeDemographics() {
    // return employeeDemographics;
    // }

    // public void setEmployeeDemographics(Demographic employeeDemographics) {
    // this.employeeDemographics = employeeDemographics;
    // }

    public String getAnnualBonus() {
        return annualBonus;
    }

    public void setAnnualBonus(final String annualBonus) {
        this.annualBonus = annualBonus;
    }

    public double getPtoHours() {
        return ptoHours;
    }

    public void setPtoHours(final double ptoHours) {
        this.ptoHours = ptoHours;
    }

    public Integer getMarriedId() {
        return this.marriedId;
    }

    public void setMarriedId(final Integer marriedId) {
        this.marriedId = marriedId;
    }

    public Integer getMaritalStatusId() {
        return this.maritalStatusId;
    }

    public void setMaritalStatusId(final Integer maritalStatusId) {
        this.maritalStatusId = maritalStatusId;
    }

    public Integer getGenderId() {
        return this.genderId;
    }

    public void setGenderId(final Integer genderId) {
        this.genderId = genderId;
    }

    public Integer getAge() {
        return this.age;
    }

    public void setAge(final Integer age) {
        this.age = age;
    }

    public String getDOB() {
        return this.DOB;
    }

    public void setDOB(final String DOB) {
        this.DOB = DOB;
    }

    public String getSex() {
        return this.sex;
    }

    public void setSex(final String sex) {
        this.sex = sex;
    }

    public String getMaritalDesc() {
        return this.maritalDesc;
    }

    public void setMaritalDesc(final String maritalDesc) {
        this.maritalDesc = maritalDesc;
    }

    public String getCitizenDesc() {
        return this.citizenDesc;
    }

    public void setCitizenDesc(final String citizenDesc) {
        this.citizenDesc = citizenDesc;
    }

    public String getHispanicLatino() {
        return this.hispanicLatino;
    }

    public void setHispanicLatino(final String hispanicLatino) {
        this.hispanicLatino = hispanicLatino;
    }

    public String getRaceDesc() {
        return this.raceDesc;
    }

    public void setRaceDesc(final String raceDesc) {
        this.raceDesc = raceDesc;
    }

    public void addTechSkills(final List<Skill> techSkills) {

        for (int i = 0; i < techSkills.size(); i++) {
            if (!this.technicalSkills.contains(techSkills.get(i))) {
                this.technicalSkills.add(techSkills.get(i));
            }
        }
    }

    public void addPeopleSkills(final List<Skill> peopSkills) {
        for (int i = 0; i < peopSkills.size(); i++) {
            if (!this.peopleSkills.contains(peopSkills.get(i))) {
                this.peopleSkills.add(peopSkills.get(i));
            }
        }
    }

    public void addWorkEthic(final List<Skill> workEthticSkill) {
        for (int i = 0; i < workEthticSkill.size(); i++) {
            if (!this.workEthic.contains(workEthticSkill.get(i))) {
                this.workEthic.add(workEthticSkill.get(i));
            }
        }
    }

    public List<Education> getEducation() {
        return this.education;
    }

    public void setEducation(List<Education> education) {
        this.education = education;
    }

    public void addCertifications(final List<Certification> certs) {

        for (int i = 0; i < certs.size(); i++) {
            if (!this.certifications.contains(certs.get(i))) {
                this.certifications.add(certs.get(i));
            }
        }
    }

    public void addJobRecord(final List<JobRecord> jrs) {
        for (int i = 0; i < jrs.size(); i++) {
            if (!this.jobRecords.contains(jrs.get(i))) {
                this.jobRecords.add(jrs.get(i));
            }
        }
    }

    public void updateEmployee(final Employee e) {
        this.setId(e.id);
        this.setEmployeeName(e.employeeName);
        this.setEmploymentStatusId(e.employmentStatusId);
        this.setDepartmentId(e.departmentId);
        this.setPerformanceScoreId(e.performanceScoreId);
        this.setPayRate(e.payRate);
        this.setState(e.state);
        this.setZip(e.zip);
        this.setDateOfHire(e.dateOfHire);
        this.setDaysEmployed(e.daysEmployed);
        this.setDateOfTermination(e.dateOfTermination);
        this.setReasonForTermination(e.reasonForTermination);
        this.setEmployementStatus(e.employementStatus);
        this.setDepartment(e.department);
        this.setPosition(e.position);
        this.setManagerName(e.managerName);
        this.setEmployeeSource(e.employeeSource);
        this.setAccessRole(e.accessRole);
        this.setPerformanceScore(e.performanceScore);

        if (e.getTechnicalSkills().size() <= this.getTechnicalSkills().size()) {
            this.setTechnicalSkills(e.getTechnicalSkills());

        }

        if (e.getPeopleSkills().size() <= this.getPeopleSkills().size()) {
            this.setPeopleSkills(e.getPeopleSkills());
        }

        if (e.getWorkEthic().size() <= this.getWorkEthic().size()) {
            this.setWorkEthic(e.getWorkEthic());
        }

        if (e.getCertifications().size() <= this.getCertifications().size()) {
            this.setCertifications(e.getCertifications());
        }

        // if (e.getJobRecords().size() <= this.getJobRecords().size()) {
        // this.setJobRecords(e.getJobRecords());
        // }
        // this.setJobRecords(e.getJobRecords());

        if (e.getTechnicalSkills().size() > this.getTechnicalSkills().size()) {
            this.addTechSkills(e.getTechnicalSkills());
        }

        if (e.getPeopleSkills().size() > this.getPeopleSkills().size()) {
            this.addPeopleSkills(e.getPeopleSkills());
        }

        if (e.getWorkEthic().size() > this.getWorkEthic().size()) {
            this.addWorkEthic(e.getWorkEthic());
        }

        if (e.getCertifications().size() > this.getCertifications().size()) {
            this.addCertifications(e.getCertifications());
        }

        // if (e.getJobRecords().size() > this.getJobRecords().size()) {
        // this.addJobRecord((e.getJobRecords()));
        // }

        this.setAnnualBonus(annualBonus);
        this.setPtoHours(ptoHours);
    }

    @Override
    public String toString() {
        return "{" + " id='" + getId() + "'" + ", employeeName='" + getEmployeeName() + "'" + ", employeeNum='"
                + getEmployeeNum() + "'" + ", employmentStatusId='" + getEmploymentStatusId() + "'" + ", departmentId='"
                + getDepartmentId() + "'" + ", performanceScoreId='" + getPerformanceScoreId() + "'" + ", payRate='"
                + getPayRate() + "'" + ", state='" + getState() + "'" + ", zip='" + getZip() + "'" + ", dateOfHire='"
                + getDateOfHire() + "'" + ", daysEmployeed='" + getDaysEmployed() + "'" + ", dateOfTermination='"
                + getDateOfTermination() + "'" + ", reasonForTermination='" + getReasonForTermination() + "'"
                + ", employementStatus='" + getEmployementStatus() + "'" + ", department='" + getDepartment() + "'"
                + ", position='" + getPosition() + "'" + ", managerName='" + getManagerName() + "'"
                + ", employeeSource='" + getEmployeeSource() + "'" + ", accessRole='" + getAccessRole() + "'"
                + ", performanceScore='" + getPerformanceScore() + "'" + ", technicalSkills='" + getTechnicalSkills()
                + "'" + ", peopleSkills='" + getPeopleSkills() + "'" + ", workEthic='" + getWorkEthic() + "'"
                + ", certifications='" + getCertifications() + "'" + ", jobRecords='" + getJobRecords() + "'"
                + ", annualBonus='" + getAnnualBonus() + "'"
                + ", ptoHours='" + getPtoHours() + "'" + "}";
    }

}
