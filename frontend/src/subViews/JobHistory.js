import React from "react";
import styled from "styled-components";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function JobHistory(props) {

    const [employee, setEmployee] = React.useState(props.employee);

    console.log(employee.jobRecords);

    return (
        <>
            <Container fluid style={{ alignItems: 'left', marginTop: "2%", marginLeft: "2%" }}>
            <Row style={{marginBottom: "15px", fontSize: '25px' }}>General Employee Information</Row>
            {
                (employee !== undefined) ?
                    Object.keys(employee.jobRecords).map((item, index) => {
                        if (item !== 'id' && item !== 'jobSkills') {
                            return (
                                <Row key={index} style={{ textAlign: 'left', justifyContent: "space-between" }}>
                                    <Col>
                                        <h6>{item[0].toUpperCase() + item.substring(1)}</h6>
                                    </Col>
                                    <Col>
                                        <h6>{employee[item]}</h6>
                                    </Col>
                                </Row>
                            );
                        } else {
                            return;
                        }
                    })
                    :
                    undefined
            }
            </Container>
        </>
    );
}

export default JobHistory;