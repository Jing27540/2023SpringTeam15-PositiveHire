import React from "react";
import styled from "styled-components";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Table from 'react-bootstrap/Table';


function JobHistory(props) {

    const [employee, setEmployee] = React.useState(props.employee);
    const [edit, setEdit] = React.useState(false);
    // const [remove, setRemove] = React.useState(false);

    console.log(employee.jobRecords);

    // {
    //     "id": 2,
    //     "jobTitle": "firstEmp",
    //     "jobLevel": "newlevel",
    //     "organization": null,
    //     "location": null,
    //     "startDate": null,
    //     "endDate": null,
    //     "jobSkills": []
    //   }

    // {
    //     "id": 161,
    //     "name": "Jings Assistant",
    //     "level": "High",
    //     "score": 6
    //   }

    //const SKTITLE = ['SE', 'Certifications'];

    return (
        <Table striped bordered hover style={{ marginTop: '5%' }}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Job Title</th>
                    <th>Job Level</th>
                    <th>Organization</th>
                    <th>Locaiton</th>
                    <th>Start Date</th>
                    <th>Finish Date</th>
                    <th>Skills</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {employee.jobRecords.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{item.jobTitle}</td>
                            <td>{item.jobLevel}</td>
                            <td>{item.organization}</td>
                            <td>{item.location}</td>
                            <td>{item.startDate}</td>
                            <td>{item.endDate}</td>
                            <td style={{ textAlign: 'center' }}>
                                {item.jobSkills.map((skill, indx) => {
                                    return (
                                        <Row key={indx}>
                                            <Col>
                                                {skill.name}
                                            </Col>
                                            <Col>
                                                {skill.level}
                                            </Col>
                                        </Row>
                                    );
                                })}
                            </td>
                            <td>
                                <Col>
                                    <Button size="sm" style={{ marginTop: "2%", marginRight: "2%", backgroundColor: "#990033", borderColor: "#990033", width: '70px', marginTop: '1%' }} >
                                        Remove
                                    </Button>
                                </Col>

                                <Col>
                                    <Button size="sm" style={{ marginTop: "2%", marginRight: "2%", backgroundColor: "#0f123F", borderColor: "#0f123F", width: '70px', marginTop: '1%' }} >
                                        Edit
                                    </Button>
                                </Col>

                            </td>
                        </tr>
                        // <>
                        //     <Row>
                        //         <Col>Job Title</Col>
                        //         <Col>{item.jobTitle}</Col>
                        //     </Row>
                        //     <Row>
                        //         <Col>Job Level</Col>
                        //         <Col>{item.jobLevel}</Col>
                        //     </Row>
                        //     <Row>
                        //         <Col>Organization</Col>
                        //         <Col>{item.organization}</Col>
                        //     </Row>
                        //     <Row>
                        //         <Col>location</Col>
                        //         <Col>{item.location}</Col>
                        //     </Row>
                        //     <Row>
                        //         <Col>Start Date</Col>
                        //         <Col>{item.startDate}</Col>
                        //     </Row>
                        //     <Row>
                        //         <Col>Finish Date</Col>
                        //         <Col>{item.endDate}</Col>
                        //     </Row>
                        //     <Row>
                        //         <Col>Skills</Col>
                        //         <Col>{item.jobTitle}</Col>
                        //     </Row>
                        // </>
                    );
                })}
            </tbody>
        </Table>
    );
}

export default JobHistory;