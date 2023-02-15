package com.positivehire.phtalent.models;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.List;
import javax.persistence.OneToMany;
import javax.persistence.CascadeType;

@Entity
public class Employee {
    @Id
    private Long employeeNum;

    private String employeeName;

    private int employmentStatusId;

    private int departmentId;

    private int performanceScoreId;

    private double payRate;

    private String state;

    private int zip;

    private String dateOfHire;

    private int daysEmployeed;

    private String dateOfTermination;

    private String reasonForTermination;

    private String employementStatus;

    private String department;

    private String position;

    private String managerName;

    private String employeeSource;

    private String accessRole;

    private String performanceScore;
    @OneToMany ( cascade = CascadeType.ALL )
    private List<Skill> technicalSkills;
    @OneToMany ( cascade = CascadeType.ALL )
    private List<Skill> peopleSkills;
    @OneToMany ( cascade = CascadeType.ALL )
    private List<Skill> workEthic;
    @OneToMany ( cascade = CascadeType.ALL )
    private List<Certification> certifications;

    private Demographic employeeDemographics;

    private double annualBonus;

    private double ptoHours;

    public Employee (Long i, String employeeName) {
        setEmployeeNum(i);
        setEmployeeName(employeeName);
    }

    public Employee ( Long employeeNum, String employeeName, int employmentStatusId, int departmentId,
        int performanceScoreId, double payRate, String state, int zip, String dateOfHire, int daysEmployeed,
            String dateOfTermination, String reasonForTermination, String employementStatus, String department,
                String position, String managerName, String employeeSource, String accessRole, String performanceScore,
                    List<Skill> technicalSkills, List<Skill> peopleSkills, List<Skill> workEthic,
                        List<Certification> certifications, Demographic employeeDemographics, double annualBonus,
                            double ptoHours ) {
        setEmployeeNum(employeeNum);
        setEmployeeName(employeeName);
        setEmploymentStatusId(employmentStatusId);
        setDepartmentId(departmentId);
        setPerformanceScoreId(performanceScoreId);
        setPayRate(payRate);
        setState(state);
        setZip(zip);
        setDateOfHire(dateOfHire);
        setDaysEmployeed(daysEmployeed);
        setDateOfTermination(dateOfTermination);
        setReasonForTermination(reasonForTermination);
        setEmployementStatus(employementStatus);
        setDepartment(department);
        setPosition(position);
        setManagerName(managerName);
        setEmployeeSource(employeeSource);
        setAccessRole(accessRole);
        setPerformanceScore(performanceScore);
        setTechnicalSkills(technicalSkills);
        setPeopleSkills(peopleSkills);
        setWorkEthic(workEthic);
        setCertifications(certifications);
        setEmployeeDemographics(employeeDemographics);
        setAnnualBonus(annualBonus);
        setPtoHours(ptoHours);
       
    }

    public Long getEmployeeNum () {
        return employeeNum;
    }

    public void setEmployeeNum ( Long employeeNum ) {
        this.employeeNum = employeeNum;
    }

    public String getEmployeeName () {
        return employeeName;
    }

    public void setEmployeeName ( String employeeName ) {
        this.employeeName = employeeName;
    }

    public int getEmploymentStatusId () {
        return employmentStatusId;
    }

    public void setEmploymentStatusId ( int employmentStatusId ) {
        this.employmentStatusId = employmentStatusId;
    }

    public int getDepartmentId () {
        return departmentId;
    }

    public void setDepartmentId ( int departmentId ) {
        this.departmentId = departmentId;
    }

    public int getPerformanceScoreId () {
        return performanceScoreId;
    }

    public void setPerformanceScoreId ( int performanceScoreId ) {
        this.performanceScoreId = performanceScoreId;
    }

    public double getPayRate () {
        return payRate;
    }

    public void setPayRate ( double payRate ) {
        this.payRate = payRate;
    }

    public String getState () {
        return state;
    }

    public void setState ( String state ) {
        this.state = state;
    }

    public int getZip () {
        return zip;
    }

    public void setZip ( int zip ) {
        this.zip = zip;
    }

    public String getDateOfHire () {
        return dateOfHire;
    }

    public void setDateOfHire ( String dateOfHire ) {
        this.dateOfHire = dateOfHire;
    }

    public int getDaysEmployeed () {
        return daysEmployeed;
    }

    public void setDaysEmployeed ( int daysEmployeed ) {
        this.daysEmployeed = daysEmployeed;
    }

    public String getDateOfTermination () {
        return dateOfTermination;
    }

    public void setDateOfTermination ( String dateOfTermination ) {
        this.dateOfTermination = dateOfTermination;
    }

    public String getReasonForTermination () {
        return reasonForTermination;
    }

    public void setReasonForTermination ( String reasonForTermination ) {
        this.reasonForTermination = reasonForTermination;
    }

    public String getEmployementStatus () {
        return employementStatus;
    }

    public void setEmployementStatus ( String employementStatus ) {
        this.employementStatus = employementStatus;
    }

    public String getDepartment () {
        return department;
    }

    public void setDepartment ( String department ) {
        this.department = department;
    }

    public String getPosition () {
        return position;
    }

    public void setPosition ( String position ) {
        this.position = position;
    }

    public String getManagerName () {
        return managerName;
    }

    public void setManagerName ( String managerName ) {
        this.managerName = managerName;
    }

    public String getEmployeeSource () {
        return employeeSource;
    }

    public void setEmployeeSource ( String employeeSource ) {
        this.employeeSource = employeeSource;
    }

    public String getAccessRole () {
        return accessRole;
    }

    public void setAccessRole ( String accessRole ) {
        this.accessRole = accessRole;
    }

    public String getPerformanceScore () {
        return performanceScore;
    }

    public void setPerformanceScore ( String performanceScore ) {
        this.performanceScore = performanceScore;
    }

    public List<Skill> getTechnicalSkills () {
        return technicalSkills;
    }

    public void setTechnicalSkills ( List<Skill> technicalSkills ) {
        this.technicalSkills = technicalSkills;
    }

    public List<Skill> getPeopleSkills () {
        return peopleSkills;
    }

    public void setPeopleSkills ( List<Skill> peopleSkills ) {
        this.peopleSkills = peopleSkills;
    }

    public List<Skill> getWorkEthic () {
        return workEthic;
    }

    public void setWorkEthic ( List<Skill> workEthic ) {
        this.workEthic = workEthic;
    }

    public List<Certification> getCertifications () {
        return certifications;
    }

    public void setCertifications ( List<Certification> certifications ) {
        this.certifications = certifications;
    }

    public Demographic getEmployeeDemographics () {
        return employeeDemographics;
    }

    public void setEmployeeDemographics ( Demographic employeeDemographics ) {
        this.employeeDemographics = employeeDemographics;
    }

    public double getAnnualBonus () {
        return annualBonus;
    }

    public void setAnnualBonus ( double annualBonus ) {
        this.annualBonus = annualBonus;
    }

    public double getPtoHours () {
        return ptoHours;
    }

    public void setPtoHours ( double ptoHours ) {
        this.ptoHours = ptoHours;
    }

    public void updateEmployee(final Employee e) {
        this.setEmployeeNum(employeeNum);
        this.setEmployeeName(employeeName);
        this.setEmploymentStatusId(employmentStatusId);
        this.setDepartmentId(departmentId);
        this.setPerformanceScoreId(performanceScoreId);
        this.setPayRate(payRate);
        this.setState(state);
        this.setZip(zip);
        this.setDateOfHire(dateOfHire);
        this.setDaysEmployeed(daysEmployeed);
        this.setDateOfTermination(dateOfTermination);
        this.setReasonForTermination(reasonForTermination);
        this.setEmployementStatus(employementStatus);
        this.setDepartment(department);
        this.setPosition(position);
        this.setManagerName(managerName);
        this.setEmployeeSource(employeeSource);
        this.setAccessRole(accessRole);
        this.setPerformanceScore(performanceScore);
        this.setTechnicalSkills(technicalSkills);
        this.setPeopleSkills(peopleSkills);
        this.setWorkEthic(workEthic);
        this.setCertifications(certifications);
        this.setEmployeeDemographics(employeeDemographics);
        this.setAnnualBonus(annualBonus);
        this.setPtoHours(ptoHours);
    }
}