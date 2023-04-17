package com.positivehire.phtalent.models;

import java.util.Date;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

/**
 * Creates an Certification object for use in arbitrary Certifications.
 */
@Entity
public class Certification {
    /** The id of this created Certification object */
    @Id
    @GeneratedValue
    private Long   id;
    /** The name of this created Certification object */
    private String name;
    /** The institution of this created Certification object */
    private String institution;
    /** The issuedDate of this created Certification object */
    // @JsonFormat(shape = JsonFormat.Shape.STRING, pattern="MMM d, yyyy, hh:mm:ss a")
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date   issuedDate;
    /** The credentialID of this created Certification object */
    private String credentialID;
    /** The skills of this created Certification object */
    private String skills;

    public Certification () {
    }

    public Certification ( final String name, final String institution, final Date issuedDate,
            final String credentialID, final String skills ) {
        setName( name );
        setInstitution( institution );
        setIssuedDate( issuedDate );
        setCredentialID( credentialID );
        setSkills( skills );
    }

    public String getName () {
        return this.name;
    }

    public void setName ( final String name ) {
        this.name = name;
    }

    public String getInstitution () {
        return this.institution;
    }

    public void setInstitution ( final String institution ) {
        this.institution = institution;
    }

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern="MMM d, yyyy, hh:mm:ss a")
    public Date getIssuedDate () {
        return this.issuedDate;
    }

    public void setIssuedDate ( final Date issuedDate ) {
        this.issuedDate = issuedDate;
    }

    public String getCredentialID () {
        return this.credentialID;
    }

    public void setCredentialID ( final String credentialID ) {
        this.credentialID = credentialID;
    }

    public String getSkills () {
        return this.skills;
    }

    public void setSkills ( final String skills ) {
        this.skills = skills;
    }

    // @Override
    // public boolean equals ( final Object o ) {
    // if ( o == this ) {
    // return true;
    // }
    // if ( ! ( o instanceof Certification ) ) {
    // return false;
    // }
    // final Certification certification = (Certification) o;
    // return Objects.equals( name, certification.name ) && Objects.equals(
    // institution, certification.institution )
    // && Objects.equals( issuedDate, certification.issuedDate )
    // && Objects.equals( credentialID, certification.credentialID )
    // && Objects.equals( skills, certification.skills );
    // }

    @Override
    public int hashCode () {
        return Objects.hash( name, institution, issuedDate, credentialID, skills );
    }

    @Override
    public String toString () {
        return "{" + " name='" + getName() + "'" + ", institution='" + getInstitution() + "'" + ", issuedDate='"
                + getIssuedDate() + "'" + ", credentialID='" + getCredentialID() + "'" + ", skills='" + getSkills()
                + "'" + "}";
    }
}
