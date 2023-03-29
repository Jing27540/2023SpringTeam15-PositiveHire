import React from "react";
import styled from "styled-components";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap-floating-label';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

function Education(props) {
    const [mode, setMode] = React.useState();
    const [employee, setEmployee] = React.useState(props.employee);
    const [sname, setSName] = React.useState();
    const [level, setLevel] = React.useState();
    const [score, setScore] = React.useState();
    const [show, setShow] = React.useState(false);
    const [currid, setId] = React.useState();
    const handleShow = () => setShow(true);
    const handleClose = () => { setShow(false);};
    const [edit, setEdit] = React.useState(false);
    // const [remove, setRemove] = React.useState(false);

    function clear() {
        
        setSName(undefined);
        setLevel(undefined);
        setScore(undefined);
    }

    function saveSkill(s) {

        let newSkill = {
            name: s.name,
            level: s.level,
            score:s.score
        };
        axios.post(`http://localhost:8080/employees/${props.employee.employeeNum}/education/${currid}/skills`, newSkill).then(
            axios.get(`http://localhost:8080/employees/${props.employee.employeeNum}`).then(res => {
                setEmployee(res.data);
            })
        )

    }
    console.log(employee.education);
    function deleteEdu(thid) {
        axios.delete(`http://localhost:8080/employees/${props.employee.employeeNum}/education/${thid}`).then(response => {
            axios.get(`http://localhost:8080/employees/${props.employee.employeeNum}`).then(res => {
                setEmployee(res.data);
            })
        }).catch(error => {
            console.log("Unable to remove education");
        })
    }
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
                    <th>Name</th>
                    <th>Institution</th>
                    <th>Type</th>
                    <th>Date Achieved</th>
                    <th>Skills</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {employee.education.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{item.name}</td>
                            <td>{item.institution}</td>
                            <td>{item.type}</td>
                            <td>{item.dateAchieved}</td>
                            <td style={{ textAlign: 'center' }}>
                                {item.skills.map((skill, indx) => {
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
                                    <Button size="sm" style={{ marginTop: "2%", marginRight: "2%", backgroundColor: "#990033", borderColor: "#990033", width: '70px', marginTop: '1%' }} onClick={() => { deleteEdu(item.id); }} >
                                        Remove
                                    </Button>
                                </Col>

                                <Col>
                                    <Button size="sm" style={{ marginTop: "2%", marginRight: "2%", backgroundColor: "#0f123F", borderColor: "#0f123F", width: '70px', marginTop: '1%' }} >
                                        Edit
                                    </Button>
                                </Col>
                                <Col>
                                    <Button size="sm" style={{ marginTop: "2%", marginRight: "2%", backgroundColor: "#0f123F", borderColor: "#0f123F", width: '70px', marginTop: '1%' }} onClick={() => { handleShow(); setMode(true); setId(item.id) }}>Add Skill</Button>
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
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Skills</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <EditForm addMode={mode} employee={props.employee} mode={true} /> */}
                    
                    {(mode) ?
                        <FloatingLabel label="Name" id="sname" onChange={e => setSName(e.target.value)} style={{ margin: '2%' }} />
                        :
                        <Form.Select aria-label="Default select example" id="sname" onChange={e => { setSName(e.target.value); }} style={{ margin: '2%', width: '95%' }}>
                            <option>Skill Name</option>
                            {/* {
                                options ?
                                    options.map((item, index) => {
                                        return (
                                            <option key={index} value={item.name}>{item.name}</option>
                                        );
                                    })
                                    :
                                    undefined
                            } */}
                        </Form.Select>
                    }
                    <FloatingLabel label="Level" id="level" onChange={e => setLevel(e.target.value)} style={{ margin: '2%' }} />
                    <FloatingLabel label="Score" id="score" onChange={e => setScore(e.target.value)} style={{ margin: '2%' }} />
                    {/* <div style={{ justifyContent: 'left', alignItems: 'left', fontSize: '15px', margin: "10px", color: 'red' }}>{message}</div> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={() => { saveSkill({name: sname, level: level, score: score }); handleClose(); clear();}}>
                        Save
                    </Button>
                    {/* {
                        !mode ?
                            <Button variant="secondary" onClick={() => { deleteSkill(type, sname); clear(); }} >
                                Remove
                            </Button>
                            :
                            undefined
                    } */}
                </Modal.Footer>
            </Modal>
        </Table>
    );
}

export default Education;