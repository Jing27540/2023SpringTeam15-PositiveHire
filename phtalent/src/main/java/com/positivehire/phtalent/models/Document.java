package com.positivehire.phtalent.models;

import java.io.Serializable;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

/**
 * Document to save resume
 */
@Entity
public class Document extends DomainObject {

    /** Education Id */
    @Id
    @GeneratedValue
    private Long id;

    private int employeeNum;

    @Lob
    @Column(length = 1000000)
    private byte[] data;

    private String docType;

    public Document() {

    }

    public Document(Long id, int employeeNum, byte[] data, String docType) {
        this.id = id;
        this.employeeNum = employeeNum;
        this.data = data;
        this.docType = docType;
    }

    public Document(int employeeNum, byte[] data) {

        this.employeeNum = employeeNum;
        this.docType = "application/pdf";
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

    public String getDocType() {
        return this.docType;
    }

    public void setDocType(String docType) {
        this.docType = docType;
    }
}