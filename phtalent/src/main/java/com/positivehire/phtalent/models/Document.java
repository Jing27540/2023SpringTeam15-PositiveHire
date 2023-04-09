package com.positivehire.phtalent.models;

import java.io.Serializable;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Entity;
/**
 * Document to save resume
 */
@Entity
public class Document extends DomainObject {

    /** Education Id */
    @Id
    @GeneratedValue
    private Long                id;

    private int employeeNum;

    @Lob
    private byte[] data;



    public Document() {
    }

    public Document(Long id, int employeeNum, byte[] data) {
        this.id = id;
        this.employeeNum = employeeNum;
        this.data = data;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public int getEmployeeNum() {
        return this.employeeNum;
    }

    public void setEmployeeNum(int employeeNum) {
        this.employeeNum = employeeNum;
    }

    public byte[] getData() {
        return this.data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public Document id(Long id) {
        setId(id);
        return this;
    }

    public Document employeeNum(int employeeNum) {
        setEmployeeNum(employeeNum);
        return this;
    }

    public Document data(byte[] data) {
        setData(data);
        return this;
    }
    
    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", employeeNum='" + getEmployeeNum() + "'" +
            ", data='" + getData() + "'" +
            "}";
    }


    @Override
    public Serializable getId() {
        return id;
    }
    
}