package com.positivehire.phtalent.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;

/**
 * Education data type
 */
@Entity
public class Education extends DomainObject {
    /** Education Id */
    @Id
    @GeneratedValue
    private Long id;
    /** Name of education */
    private String name;
    /** Institution education was recieved from */
    private String institution;
    /** Type of education */
    private String type;
    /** date achieved */
    private String dateAchieved;

    /** Skills associated with education */
    @OneToMany(cascade = CascadeType.ALL)
    private List<Skill> skills;

    public Education() {
        this.skills = new ArrayList<Skill>();
    }

    /**
     * Construct an education
     * 
     * @param name        of education
     * @param institution of education
     * @param type        of education
     * @param skills      of education
     */
    public Education(String name, String institution, String type, String datAchieved, List<Skill> skills) {
        setName(name);
        setInstitution(institution);
        setType(type);
        this.skills = new ArrayList<Skill>();
        setSkills(skills);
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

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<Skill> getSkills() {
        return this.skills;
    }

    public void setSkills(List<Skill> skills) {
        this.skills = skills;
    }

    public void setDateAchieved(String dateAchieved) {
        this.dateAchieved = dateAchieved;
    }

    public String getDateAchieved() {
        return this.dateAchieved;
    }

    /**
     * Returns Id of the education
     * 
     * @return education Id
     */
    @Override
    public Serializable getId() {

        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
