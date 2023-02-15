package com.positivehire.phtalent.models;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import javax.validation.constraints.Min;

/**
 * Creates an Skill object for use in arbitrary Skills.
 * 
 * @author Jing Huang
 */
@Entity
public class Skill {
    /** The id of this created Skill object */
    @Id
    @GeneratedValue
    private Long id;
    /** The name of this created Skill object */
    private String name;
    /** The level of this created Skill object */
    private String level;
    /** The score of this created Skill object */
    @Min(0)
    private Integer score;

    /**
     * A basic constructor
     */
    public Skill() {
        // Empty constructor
    }

    /**
     * A basic constructor that uses a specific name, level and score.
     * 
     * @param name  The skill name to set
     * @param level The skill level to set
     * @param score The skill score to set
     */
    public Skill(String name, String level, Integer score) {
        this.name = name;
        this.level = level;
        this.score = score;
    }

    /**
     * Returns the name of skill
     * 
     * @return String the name of skill
     */
    public String getName() {
        return this.name;
    }

    /**
     * Sets the name of the given skill
     * 
     * @param name the given name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Return the level of this skill
     * 
     * @return String the level of this skill
     */
    public String getLevel() {
        return this.level;
    }

    /**
     * Sets the level of the given skill
     * 
     * @param level the given level
     */
    public void setLevel(String level) {
        this.level = level;
    }

    /**
     * Return the score of this skill
     * 
     * @return Integer the score of this skill
     */
    public Integer getScore() {
        return this.score;
    }

    /**
     * Sets the score of the given skill
     * 
     * @param score the given score
     */
    public void setScore(Integer score) {
        this.score = score;
    }

    @Override
    public String toString() {
        return "{" +
                " name='" + getName() + "'" +
                ", level='" + getLevel() + "'" +
                ", score='" + getScore() + "'" +
                "}";
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Skill)) {
            return false;
        }
        Skill skill = (Skill) o;
        return Objects.equals(name, skill.name) && Objects.equals(level, skill.level)
                && Objects.equals(score, skill.score);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, level, score);
    }
}
