// package com.positivehire.phtalent.models;
//
// import java.util.Objects;
//
// import jakarta.persistence.Entity;
// import jakarta.persistence.Id;
// import jakarta.persistence.GeneratedValue;
//
/// **
// * Creates an Demographic object for use in arbitrary Demographics.
// *
// * @author Jing Huang
// */
// @Entity
// public class Demographic {
// /** The id of this created Demographic object */
// @Id
// @GeneratedValue
// private Long id;
// /** The name of this created Demographic object */
// private String email;
// /** The officeLocations of this created Demographic object */
// private String officeLocations;
// /** The reportsTo of this created Demographic object */
// private String reportsTo;
// /** The gender of this created Demographic object */
// private String gender;
// /** The race of this created Demographic object */
// private String race;
// /** The martialStatus of this created Demographic object */
// private String martialStatus;
// /** The noOfChildren of this created Demographic object */
// private Integer noOfChildren;
// /** The numOfYearsWandOrg of this created Demographic object */
// private Integer numOfYearsWandOrg;
// /** The managerName of this created Demographic object */
// private String managerName;
// /** The divisionAndBusinessUnit of this created Demographic object */
// private String divisionAndBusinessUnit;
// /** The education of this created Demographic object */
// private String education;
// /** The militartyYearsOfService of this created Demographic object */
// private String militartyYearsOfService;
// /** The education of this created Demographic object */
// private String careerGoal;
// /** The militartyYearsOfService of this created Demographic object */
// private String trainingHistory;
// /** The mentor of this created Demographic object */
// private String mentor;
// /** The sponsor of this created Demographic object */
// private String sponsor;
//
// public Demographic() {
// }
//
// public Demographic(String email, String officeLocations, String reportsTo,
// String gender, String race,
// String martialStatus, Integer noOfChildren, Integer numOfYearsWandOrg, String
// managerName,
// String divisionAndBusinessUnit, String education, String
// militartyYearsOfService, String careerGoal,
// String trainingHistory, String mentor, String sponsor) {
// this.email = email;
// this.officeLocations = officeLocations;
// this.reportsTo = reportsTo;
// this.gender = gender;
// this.race = race;
// this.martialStatus = martialStatus;
// this.noOfChildren = noOfChildren;
// this.numOfYearsWandOrg = numOfYearsWandOrg;
// this.managerName = managerName;
// this.divisionAndBusinessUnit = divisionAndBusinessUnit;
// this.education = education;
// this.militartyYearsOfService = militartyYearsOfService;
// this.careerGoal = careerGoal;
// this.trainingHistory = trainingHistory;
// this.mentor = mentor;
// this.sponsor = sponsor;
// }
//
// public String getEmail() {
// return this.email;
// }
//
// public void setEmail(String email) {
// this.email = email;
// }
//
// public String getOfficeLocations() {
// return this.officeLocations;
// }
//
// public void setOfficeLocations(String officeLocations) {
// this.officeLocations = officeLocations;
// }
//
// public String getReportsTo() {
// return this.reportsTo;
// }
//
// public void setReportsTo(String reportsTo) {
// this.reportsTo = reportsTo;
// }
//
// public String getGender() {
// return this.gender;
// }
//
// public void setGender(String gender) {
// this.gender = gender;
// }
//
// public String getRace() {
// return this.race;
// }
//
// public void setRace(String race) {
// this.race = race;
// }
//
// public String getMartialStatus() {
// return this.martialStatus;
// }
//
// public void setMartialStatus(String martialStatus) {
// this.martialStatus = martialStatus;
// }
//
// public Integer getNoOfChildren() {
// return this.noOfChildren;
// }
//
// public void setNoOfChildren(Integer noOfChildren) {
// this.noOfChildren = noOfChildren;
// }
//
// public Integer getNumOfYearsWandOrg() {
// return this.numOfYearsWandOrg;
// }
//
// public void setNumOfYearsWandOrg(Integer numOfYearsWandOrg) {
// this.numOfYearsWandOrg = numOfYearsWandOrg;
// }
//
// public String getManagerName() {
// return this.managerName;
// }
//
// public void setManagerName(String managerName) {
// this.managerName = managerName;
// }
//
// public String getDivisionAndBusinessUnit() {
// return this.divisionAndBusinessUnit;
// }
//
// public void setDivisionAndBusinessUnit(String divisionAndBusinessUnit) {
// this.divisionAndBusinessUnit = divisionAndBusinessUnit;
// }
//
// public String getEducation() {
// return this.education;
// }
//
// public void setEducation(String education) {
// this.education = education;
// }
//
// public String getMilitartyYearsOfService() {
// return this.militartyYearsOfService;
// }
//
// public void setMilitartyYearsOfService(String militartyYearsOfService) {
// this.militartyYearsOfService = militartyYearsOfService;
// }
//
// public String getCareerGoal() {
// return this.careerGoal;
// }
//
// public void setCareerGoal(String careerGoal) {
// this.careerGoal = careerGoal;
// }
//
// public String getTrainingHistory() {
// return this.trainingHistory;
// }
//
// public void setTrainingHistory(String trainingHistory) {
// this.trainingHistory = trainingHistory;
// }
//
// public String getMentor() {
// return this.mentor;
// }
//
// public void setMentor(String mentor) {
// this.mentor = mentor;
// }
//
// public String getSponsor() {
// return this.sponsor;
// }
//
// public void setSponsor(String sponsor) {
// this.sponsor = sponsor;
// }
//
// @Override
// public boolean equals(Object o) {
// if (o == this)
// return true;
// if (!(o instanceof Demographic)) {
// return false;
// }
// Demographic demographic = (Demographic) o;
// return Objects.equals(email, demographic.email) &&
// Objects.equals(officeLocations, demographic.officeLocations)
// && Objects.equals(reportsTo, demographic.reportsTo) && Objects.equals(gender,
// demographic.gender)
// && Objects.equals(race, demographic.race) && Objects.equals(martialStatus,
// demographic.martialStatus)
// && Objects.equals(noOfChildren, demographic.noOfChildren)
// && Objects.equals(numOfYearsWandOrg, demographic.numOfYearsWandOrg)
// && Objects.equals(managerName, demographic.managerName)
// && Objects.equals(divisionAndBusinessUnit,
// demographic.divisionAndBusinessUnit)
// && Objects.equals(education, demographic.education)
// && Objects.equals(militartyYearsOfService,
// demographic.militartyYearsOfService)
// && Objects.equals(careerGoal, demographic.careerGoal)
// && Objects.equals(trainingHistory, demographic.trainingHistory)
// && Objects.equals(mentor, demographic.mentor) && Objects.equals(sponsor,
// demographic.sponsor);
// }
//
// @Override
// public int hashCode() {
// return Objects.hash(email, officeLocations, reportsTo, gender, race,
// martialStatus, noOfChildren,
// numOfYearsWandOrg, managerName, divisionAndBusinessUnit, education,
// militartyYearsOfService, careerGoal,
// trainingHistory, mentor, sponsor);
// }
//
// @Override
// public String toString() {
// return "{" +
// " email='" + getEmail() + "'" +
// ", officeLocations='" + getOfficeLocations() + "'" +
// ", reportsTo='" + getReportsTo() + "'" +
// ", gender='" + getGender() + "'" +
// ", race='" + getRace() + "'" +
// ", martialStatus='" + getMartialStatus() + "'" +
// ", noOfChildren='" + getNoOfChildren() + "'" +
// ", numOfYearsWandOrg='" + getNumOfYearsWandOrg() + "'" +
// ", managerName='" + getManagerName() + "'" +
// ", divisionAndBusinessUnit='" + getDivisionAndBusinessUnit() + "'" +
// ", education='" + getEducation() + "'" +
// ", militartyYearsOfService='" + getMilitartyYearsOfService() + "'" +
// ", careerGoal='" + getCareerGoal() + "'" +
// ", trainingHistory='" + getTrainingHistory() + "'" +
// ", mentor='" + getMentor() + "'" +
// ", sponsor='" + getSponsor() + "'" +
// "}";
// }
//
// }
