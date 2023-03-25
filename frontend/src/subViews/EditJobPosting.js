import React from "react";
import axios from "axios";
import styled from "styled-components";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

/**
 * EditJobPosting View is used to edit the existing job postings.
 * @author Jing Huang 
 */
function EditJobPosting() {

    return (
        <Container fluid style={{ marginTop: "5%"}}>
            <Row style={{ textAlign: "center" }}>SORT BY</Row>
            <Row>Buttons</Row>
            <Row><h1>SHOWING: ALL JOBS</h1></Row>
            <Row>listing all contents</Row>
        </Container>
    );
}

export default EditJobPosting;