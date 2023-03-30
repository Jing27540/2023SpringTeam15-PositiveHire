import React from "react";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';

import Table from 'react-bootstrap/Table';
import FloatingLabel from 'react-bootstrap-floating-label';
import { Container } from "react-bootstrap";
import { Input } from "@mui/material";

import Form from 'react-bootstrap/Form';
import axios from "axios";

function JobHistory(props) {

    const [employee, setEmployee] = React.useState(props.employee);
    const [edit, setEdit] = React.useState(false);
    const [disable, setDisable] = React.useState(false);
    const [selectedJobRecord, setSelectedJobRecord] = React.useState();
    const [selectedId, setSelectedid] = React.useState();

    React.useEffect(() => { console.log(edit) }, [edit]);

    // const [remove, setRemove] = React.useState(false);

    console.log(employee.jobRecords);
    console.log(edit);

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

    const saveJobRecord = async () => {
        let createMe = {
            jobTitle: "title",
            jobLevel: "levevl",
            organization: "org",
            location: "loc",
            startDate: null,
            endDate: null,
            jobSkills: null
        }

        await axios.post(`http://localhost:8080/employees/${employee.employeeNum}/jobrecords`, createMe).then(response => {
            axios.get(`http://localhost:8080/employees/${employee.employeeNum}`).then(res => {
                setEmployee(res.data);
            })
        });
    }

    const deleteJobRecord = async () => {

        await axios.delete(`http://localhost:8080/employees/${employee.employeeNum}/jobrecords/${selectedJobRecord.id}`).then(response => {
            axios.get(`http://localhost:8080/employees/${employee.employeeNum}`).then(res => {
                setEmployee(res.data);
            })
        });
    }

    const updateJobRecord = async () => {

        // const newSkill = {
        //     name: "Skillz",
        //     level: "epic",
        //     score: "25"
        // }
        const updateMe = {
            jobTitle: "Def New Title",
            jobLevel: "Totally Changed Level",
            organization: "org might be diff",
            location: "loc the same :(",
            startDate: null,
            endDate: null,
            jobSkills: selectedJobRecord.jobSkills
        }

        await axios.put(`http://localhost:8080/employees/${employee.employeeNum}/jobrecords/${selectedJobRecord.id}`, updateMe).then(response => {
            axios.get(`http://localhost:8080/employees/${employee.employeeNum}`).then(res => {
                setEmployee(res.data);
            })
        });
    }

    if (!edit) {
        return (
            <Table striped bordered hover style={{ marginTop: '5%' }}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Job Title</th>
                        <th>Job Level</th>
                        <th>Organization</th>
                        <th>Location</th>
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
                                        <Button size="sm" onClick={() => { setSelectedJobRecord(employee.jobRecords[index]); setSelectedid(index); deleteJobRecord(); }} style={{ marginTop: "2%", marginRight: "2%", backgroundColor: "#990033", borderColor: "#990033", width: '70px', marginTop: '1%' }} >
                                            Remove
                                        </Button>
                                    </Col>

                                    <Col>
                                        <Button size="sm" onClick={() => { setEdit(true); setSelectedJobRecord(employee.jobRecords[index]); setSelectedid(index); }} style={{ marginTop: "2%", marginRight: "2%", backgroundColor: "#0f123F", borderColor: "#0f123F", width: '70px', marginTop: '1%' }} >
                                            Edit
                                        </Button>
                                    </Col>

                                    <Col>
                                        <Button size="sm" onClick={() => { saveJobRecord(); }} style={{ marginTop: "2%", marginRight: "2%", backgroundColor: "#0f123F", borderColor: "#0f123F", width: '70px', marginTop: '1%' }} >
                                            TestSave
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button size="sm" onClick={() => { setSelectedJobRecord(employee.jobRecords[index]); setSelectedid(index); updateJobRecord(); }} style={{ marginTop: "2%", marginRight: "2%", backgroundColor: "#0f123F", borderColor: "#0f123F", width: '70px', marginTop: '1%' }} >
                                            TestUpdate
                                        </Button>
                                    </Col>

                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    } else {
        return (
            <>
                <Button className="justify-content-end" size="sm" onClick={() => { setEdit(false) }} style={{ marginTop: "2%", marginRight: "2%", backgroundColor: "#0f123F", borderColor: "#0f123F", width: '70px', marginTop: '1%' }} >
                    Back
                </Button>
                <Button className="justify-content-end" size="sm" onClick={() => { setEdit(false) }} style={{ marginTop: "2%", marginRight: "2%", backgroundColor: "#0f123F", borderColor: "#0f123F", width: '70px', marginTop: '1%' }} >
                    Save
                </Button>
                {/* {employee.jobRecords.map((item, index) => { */}
                {/* return ( */}
                <>
                    <div style={{ margin: '3%' }}>Job History Fields for Job Record # {selectedId}</div>

                    {/* <Container style={{ marginTop: '3%' }}>
                        <Row style={{ marginTop: '1%', marginRight: '2%', marginLeft: '2%' }}>
                            <Col>Job Title</Col>
                            <Col>{selectedJobRecord.jobTitle}</Col>
                        </Row>
                        <Row style={{ marginTop: '1%', marginRight: '2%', marginLeft: '2%' }}>
                            <Col>Job Level</Col>
                            <Col>{selectedJobRecord.jobLevel}</Col>
                        </Row>
                        <Row style={{ marginTop: '1%', marginRight: '2%', marginLeft: '2%', marginBottom: '1%' }}>
                            <Col>Organization</Col>
                            <Col>{selectedJobRecord.organization}</Col>
                        </Row>
                        <Row style={{ marginTop: '1%', marginRight: '2%', marginLeft: '2%', marginBottom: '1%' }}>
                            <Col>Organization</Col>
                            <Col>{selectedJobRecord.organization}</Col>
                        </Row>
                        <Row style={{ marginTop: '1%', marginRight: '2%', marginLeft: '2%', marginBottom: '1%' }}>
                            <Col>Location</Col>
                            <Col>{selectedJobRecord.location}</Col>
                        </Row>
                        <Row style={{ marginTop: '1%', marginRight: '2%', marginLeft: '2%', marginBottom: '1%' }}>
                            <Col>Start Date</Col>
                            <Col>{selectedJobRecord.startDate}</Col>
                        </Row>
                        <Row style={{ marginTop: '1%', marginRight: '2%', marginLeft: '2%', marginBottom: '1%' }}>
                            <Col>Finish Date</Col>
                            <Col>{selectedJobRecord.endDate}</Col>
                        </Row>
                        <Row>
                            <Col>Skills</Col>

                            {selectedJobRecord.jobSkills.map((skill, indx) => {
                                return (
                                    <Container className="border border-2">
                                        <Row key={indx}>
                                            <Col>
                                                {skill.name}
                                            </Col>
                                            <Col>
                                                {skill.level}
                                            </Col>
                                        </Row>
                                    </Container>
                                );
                            })}

                        </Row>
                    </Container> */}

                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Row>
                                <Col>
                                    <Form.Label>Job Title</Form.Label>
                                    <Form.Control type="jtitle" placeholder={selectedJobRecord.jobTitle} />
                                </Col>
                                <Col>
                                    <Form.Label>Job Level</Form.Label>
                                    <Form.Control type="jlevel" placeholder={selectedJobRecord.jobLevel} />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Label>Organization</Form.Label>
                                    <Form.Control type="jorg" placeholder={selectedJobRecord.organization} />
                                </Col>
                                <Col>
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control type="jloc" placeholder={selectedJobRecord.location} />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Label>Start Date</Form.Label>
                                    <Form.Control type="jsdate" placeholder={selectedJobRecord.startDate} />
                                </Col>
                                <Col>
                                    <Form.Label>Finish Date</Form.Label>
                                    <Form.Control type="jedate" placeholder={selectedJobRecord.endDate} />
                                </Col>
                            </Row>
                            <Row>
                                <Form.Label style={{ marginTop: '2%', marginBottom: '2%' }}>Skills</Form.Label>
                                {selectedJobRecord.jobSkills.map((skill, indx) => {
                                    return (
                                        <Row>
                                            <Col>
                                                <Form.Control type="skillname" placeholder={skill.name} />
                                            </Col>
                                            <Col>
                                                <Form.Control type="skilllevel" placeholder={skill.level} />
                                            </Col>
                                        </ Row>
                                    );
                                })}
                            </Row>

                        </Form.Group>
                    </Form>
                </>

                {/* {employee.jobRecords.map((item, index) => {
                return (<>
                
                </>);
            } 

            <Row>
                    <Col>Job Title</Col>
                    <Col>{item.jobTitle}</Col>
                </Row>
                <Row>
                    <Col>Job Level</Col>
                    <Col>{item.jobLevel}</Col>
                </Row>
                <Row>
                    <Col>Organization</Col>
                    <Col>{item.organization}</Col>
                </Row>
                <Row>
                    <Col>location</Col>
                    <Col>{item.location}</Col>
                </Row>
                <Row>
                    <Col>Start Date</Col>
                    <Col>{item.startDate}</Col>
                </Row>
                <Row>
                    <Col>Finish Date</Col>
                    <Col>{item.endDate}</Col>
                </Row>
                <Row>
                    <Col>Skills</Col>
                    <Col>{item.jobTitle}</Col>
                </Row> */}
            </>
        );
    }
}

export default JobHistory;