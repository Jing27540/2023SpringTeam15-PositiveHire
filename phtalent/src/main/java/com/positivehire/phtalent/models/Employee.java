package com.positivehire.phtalent.models;

// import javax.persistence.Entity;
// import javax.persistence.Id;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;

import jakarta.persistence.CascadeType;

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

    public Employee() {

    }

    public Employee(Long id, String employeeName, int employeeNum, int marriedId, int maritalStatusId, int genderId, int employmentStatusId, int departmentId,
            int performanceScoreId, int age, double payRate, String state, int zip, String DOB, String sex, String maritalDesc, String citizenDesc, String hispanicLatino, String raceDesc, String dateOfHire, int daysEmployeed,
            String dateOfTermination, String reasonForTermination, String employementStatus, String department,
            String position, String managerName, String employeeSource, String accessRole, String performanceScore, String annualBonus, double ptoHours,
            List<Skill> technicalSkills, List<Skill> peopleSkills, List<Skill> workEthic,
            List<Certification> certifications) {
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

        setTechnicalSkills(technicalSkills);
        setPeopleSkills(peopleSkills);
        setWorkEthic(workEthic);
        setCertifications(certifications);

    }

    public Employee(long id, String employeeName) {
        setId(id);
        setEmployeeName(employeeName);
    }

    public int getEmployeeNum() {
        return this.employeeNum;
    }

    public void setEmployeeNum(int employeeNum) {
        this.employeeNum = employeeNum;
    }

    @Override
    public Serializable getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public int getEmploymentStatusId() {
        return employmentStatusId;
    }

    public void setEmploymentStatusId(int employmentStatusId) {
        this.employmentStatusId = employmentStatusId;
    }

    public int getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(int departmentId) {
        this.departmentId = departmentId;
    }

    public int getPerformanceScoreId() {
        return performanceScoreId;
    }

    public void setPerformanceScoreId(int performanceScoreId) {
        this.performanceScoreId = performanceScoreId;
    }

    public double getPayRate() {
        return payRate;
    }

    public void setPayRate(double payRate) {
        this.payRate = payRate;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public int getZip() {
        return zip;
    }

    public void setZip(int zip) {
        this.zip = zip;
    }

    public String getDateOfHire() {
        return dateOfHire;
    }

    public void setDateOfHire(String dateOfHire) {
        this.dateOfHire = dateOfHire;
    }

    public int getDaysEmployed() {
        return daysEmployed;
    }

    public void setDaysEmployed(int daysEmployeed) {
        this.daysEmployed = daysEmployeed;
    }

    public String getDateOfTermination() {
        return dateOfTermination;
    }

    public void setDateOfTermination(String dateOfTermination) {
        this.dateOfTermination = dateOfTermination;
    }

    public String getReasonForTermination() {
        return reasonForTermination;
    }

    public void setReasonForTermination(String reasonForTermination) {
        this.reasonForTermination = reasonForTermination;
    }

    public String getEmployementStatus() {
        return employementStatus;
    }

    public void setEmployementStatus(String employementStatus) {
        this.employementStatus = employementStatus;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getManagerName() {
        return managerName;
    }

    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }

    public String getEmployeeSource() {
        return employeeSource;
    }

    public void setEmployeeSource(String employeeSource) {
        this.employeeSource = employeeSource;
    }

    public String getAccessRole() {
        return accessRole;
    }

    public void setAccessRole(String accessRole) {
        this.accessRole = accessRole;
    }

    public String getPerformanceScore() {
        return performanceScore;
    }

    public void setPerformanceScore(String performanceScore) {
        this.performanceScore = performanceScore;
    }

    public List<Skill> getTechnicalSkills() {
        return technicalSkills;
    }

    public void setTechnicalSkills(List<Skill> technicalSkills) {
        this.technicalSkills = technicalSkills;
    }

    public List<Skill> getPeopleSkills() {
        return peopleSkills;
    }

    public void setPeopleSkills(List<Skill> peopleSkills) {
        this.peopleSkills = peopleSkills;
    }

    public List<Skill> getWorkEthic() {
        return workEthic;
    }

    public void setWorkEthic(List<Skill> workEthic) {
        this.workEthic = workEthic;
    }

    public List<Certification> getCertifications() {
        return certifications;
    }

    public void setCertifications(List<Certification> certifications) {
        this.certifications = certifications;
    }

    // public Demographic getEmployeeDemographics() {
    //     return employeeDemographics;
    // }

    // public void setEmployeeDemographics(Demographic employeeDemographics) {
    //     this.employeeDemographics = employeeDemographics;
    // }

    public String getAnnualBonus() {
        return annualBonus;
    }

    public void setAnnualBonus(String annualBonus) {
        this.annualBonus = annualBonus;
    }

    public double getPtoHours() {
        return ptoHours;
    }

    public void setPtoHours(double ptoHours) {
        this.ptoHours = ptoHours;
    }

    public Integer getMarriedId() {
        return this.marriedId;
    }

    public void setMarriedId(Integer marriedId) {
        this.marriedId = marriedId;
    }

    public Integer getMaritalStatusId() {
        return this.maritalStatusId;
    }

    public void setMaritalStatusId(Integer maritalStatusId) {
        this.maritalStatusId = maritalStatusId;
    }

    public Integer getGenderId() {
        return this.genderId;
    }

    public void setGenderId(Integer genderId) {
        this.genderId = genderId;
    }

    public Integer getAge() {
        return this.age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getDOB() {
        return this.DOB;
    }

    public void setDOB(String DOB) {
        this.DOB = DOB;
    }

    public String getSex() {
        return this.sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getMaritalDesc() {
        return this.maritalDesc;
    }

    public void setMaritalDesc(String maritalDesc) {
        this.maritalDesc = maritalDesc;
    }

    public String getCitizenDesc() {
        return this.citizenDesc;
    }

    public void setCitizenDesc(String citizenDesc) {
        this.citizenDesc = citizenDesc;
    }

    public String getHispanicLatino() {
        return this.hispanicLatino;
    }

    public void setHispanicLatino(String hispanicLatino) {
        this.hispanicLatino = hispanicLatino;
    }

    public String getRaceDesc() {
        return this.raceDesc;
    }

    public void setRaceDesc(String raceDesc) {
        this.raceDesc = raceDesc;
    }


    public void addTechSkills(List<Skill> techSkills) {
        
        for(int i = 0; i < techSkills.size(); i++) {
            if(!this.technicalSkills.contains(techSkills.get(i))) {
                this.technicalSkills.add(techSkills.get(i));
            }
        }
    }

    public void addPeopleSkills(List<Skill> peopSkills) {
        for(int i = 0; i < peopSkills.size(); i++) {
            if(!this.peopleSkills.contains(peopSkills.get(i))) {
                this.peopleSkills.add(peopSkills.get(i));
            }
        }
    }

    public void addWorkEthic(List<Skill> workEthticSkill) {
        for(int i = 0; i < workEthticSkill.size(); i++) {
            if(!this.workEthic.contains(workEthticSkill.get(i)))
                this.workEthic.add(workEthticSkill.get(i));
        }
    }

    public void addCertifications(List<Certification> certs) {
        
        for(int i = 0; i < certs.size(); i++) {
            if(!this.certifications.contains(certs.get(i)))
                this.certifications.add(certs.get(i));
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

        if(e.getTechnicalSkills().size() < this.getTechnicalSkills().size() || e.getPeopleSkills().size() < this.getPeopleSkills().size() 
        || e.getWorkEthic().size() < this.getWorkEthic().size() || e.getCertifications().size() < this.getCertifications().size()) {
            this.setTechnicalSkills(e.getTechnicalSkills());
            this.setPeopleSkills(e.getPeopleSkills());
            this.setWorkEthic(e.getWorkEthic());
            this.setCertifications(e.getCertifications());
        }
        if(e.getTechnicalSkills().size() > this.getTechnicalSkills().size()) {
            this.addTechSkills(e.getTechnicalSkills());
        } 
        
        if(e.getPeopleSkills().size() > this.getPeopleSkills().size())
            this.addPeopleSkills(e.getPeopleSkills());
        
        if(e.getWorkEthic().size() > this.getWorkEthic().size())
            this.addWorkEthic(e.getWorkEthic());
        
        if(e.getCertifications().size() > this.getCertifications().size())
            this.addCertifications(e.getCertifications());
       
        this.setAnnualBonus(annualBonus );
        this.setPtoHours(ptoHours);
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", employeeName='" + getEmployeeName() + "'" +
            ", employeeNum='" + getEmployeeNum() + "'" +
            ", employmentStatusId='" + getEmploymentStatusId() + "'" +
            ", departmentId='" + getDepartmentId() + "'" +
            ", performanceScoreId='" + getPerformanceScoreId() + "'" +
            ", payRate='" + getPayRate() + "'" +
            ", state='" + getState() + "'" +
            ", zip='" + getZip() + "'" +
            ", dateOfHire='" + getDateOfHire() + "'" +
            ", daysEmployeed='" + getDaysEmployed() + "'" +
            ", dateOfTermination='" + getDateOfTermination() + "'" +
            ", reasonForTermination='" + getReasonForTermination() + "'" +
            ", employementStatus='" + getEmployementStatus() + "'" +
            ", department='" + getDepartment() + "'" +
            ", position='" + getPosition() + "'" +
            ", managerName='" + getManagerName() + "'" +
            ", employeeSource='" + getEmployeeSource() + "'" +
            ", accessRole='" + getAccessRole() + "'" +
            ", performanceScore='" + getPerformanceScore() + "'" +
            ", technicalSkills='" + getTechnicalSkills() + "'" +
            ", peopleSkills='" + getPeopleSkills() + "'" +
            ", workEthic='" + getWorkEthic() + "'" +
            ", certifications='" + getCertifications() + "'" +
            ", annualBonus='" + getAnnualBonus() + "'" +
            ", ptoHours='" + getPtoHours() + "'" +
            "}";
    }

}