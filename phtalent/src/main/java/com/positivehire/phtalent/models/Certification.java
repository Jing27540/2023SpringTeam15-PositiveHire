package com.positivehire.phtalent.models;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

/**
 * Creates an Certification object for use in arbitrary Certifications.
 */
@Entity
public class Certification {
    /** The id of this created Certification object */
    @Id
    @GeneratedValue
    private Long id;
    /** The name of this created Certification object */
    private String name;
    /** The institution of this created Certification object */
    private String institution;
    /** The issuedDate of this created Certification object */
    private Date issuedDate;
    /** The credentialID of this created Certification object */
    private String credentialID;
    /** The skils of this created Certification object */
    private String skils;

    public Certification() {
    }

    public Certification(String name, String institution, Date issuedDate, String credentialID, String skils) {
        this.name = name;
        this.institution = institution;
        this.issuedDate = issuedDate;
        this.credentialID = credentialID;
        this.skils = skils;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getInstitution() {
        return this.institution;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public Date getIssuedDate() {
        return this.issuedDate;
    }

    public void setIssuedDate(Date issuedDate) {
        this.issuedDate = issuedDate;
    }

    public String getCredentialID() {
        return this.credentialID;
    }

    public void setCredentialID(String credentialID) {
        this.credentialID = credentialID;
    }

    public String getSkils() {
        return this.skils;
    }

    public void setSkils(String skils) {
        this.skils = skils;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Certification)) {
            return false;
        }
        Certification certification = (Certification) o;
        return Objects.equals(name, certification.name) && Objects.equals(institution, certification.institution)
                && Objects.equals(issuedDate, certification.issuedDate)
                && Objects.equals(credentialID, certification.credentialID)
                && Objects.equals(skils, certification.skils);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, institution, issuedDate, credentialID, skils);
    }

    @Override
    public String toString() {
        return "{" +
                " name='" + getName() + "'" +
                ", institution='" + getInstitution() + "'" +
                ", issuedDate='" + getIssuedDate() + "'" +
                ", credentialID='" + getCredentialID() + "'" +
                ", skils='" + getSkils() + "'" +
                "}";
    }
}
