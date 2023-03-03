import React from "react";
import styled from "styled-components";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap-floating-label';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

/**
 * Skill component to show Employee skill information.
 * @author Jing Huang
 */

// TODO: Dummy Data
const TS = [{ skill: 'C#', level: 'Expert', score: '4' },
{ skill: 'Docker', level: 'Expert', score: '4' },
{ skill: 'JavaScript', level: 'Advanced', score: '3' },
{ skill: 'Microsoft SQL Server', level: 'Advanced', score: '3' },
{ skill: 'Accountability', level: 'Advanced', score: '4' },
];
const PS = [{ skill: 'Communication', level: 'Advanced', score: '2' },
{ skill: 'Mentoring', level: 'Intermediate', score: '2' },
];

const WE = [{ skill: 'Cirtical Thinking', level: 'Advanced', score: '3' },
{ skill: 'Detail-Oriented', level: 'Intermediate', score: '2' },
{ skill: 'Efficiency', level: 'Advanced', score: '3' }
];

const Box = styled.div`
    display: flex;
    height: 100%;
    min-width: 220vh;
    justify-content: center;
`;

const HorizontalLine = styled.div`
    width: 100%;
    height: 1;
    border-top: 0.5px solid #808080;
`;

const VerticleLine = styled.div`
    height: 100%;
    width: 1;
    margin: 2%;
    border-left: 0.5px solid #808080;
`;
function Skill(props) {

    const [employee, setEmployee] = React.useState(props.employee);

    const [mode, setMode] = React.useState();
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [type, setType] = React.useState();
    const [sname, setSName] = React.useState();
    const [level, setLevel] = React.useState();
    const [score, setScore] = React.useState();

    const technicalSkills = props.employee.technicalSkills ? props.employee.technicalSkills : [];
    const peopleSkills = props.employee.peopleSkills ? props.employee.peopleSkills : [];
    const workEthic = props.employee.workEthic ? props.employee.workEthic : [];

    function clear() {
        setType(undefined);
        setSName(undefined);
        setLevel(undefined);
        setScore(undefined);
    }

    function saveSkill(s) {

        if (type !== undefined && sname !== undefined && level !== undefined && score !== undefined) {
            let newSkill = {
                name: s.name,
                level: s.level,
                score: s.score
            };
            console.log(newSkill);

            // TODO: check duplicate case
            if (s.type === 'technicalSkills') {
                technicalSkills.push(newSkill);
                employee.technicalSkills = technicalSkills;

            } else if (s.type === 'peopleSkills') {
                peopleSkills.push(newSkill);
                employee.peopleSkills = peopleSkills;

            } else { //workEthic
                workEthic.push(newSkill);
                employee.workEthic = workEthic;
            }

            console.log(employee);

            // axios.put("http://localhost:8080/employees", employee).then(response => {
            //     console.log(employee);
            //     console.log("update the employee");
            // }).catch(error => {
            //     console.log('can save employee')
            // });
        }
    }

    function deleteSkill(t, sn) {
        if (t === 'technicalSkills') {
            // technicalSkills.push(newSkill);
            technicalSkills = technicalSkills.filter(skill => skill.name !== sn);
            employee.technicalSkills = technicalSkills;
        } else if (t === 'peopleSkills') {
            // peopleSkills.push(newSkill);
            employee.peopleSkills = peopleSkills;
            peopleSkills = peopleSkills.filter(skill => skill.name !== sn);
        } else { //workEthic
            workEthic = workEthic.filter(skill => skill.name !== sn)
            // workEthic.push(newSkill);
            employee.workEthic = workEthic;
        }

        // axios.put("http://localhost:8080/employees", employee).then(response => {
        //     console.log(employee);
        //     console.log("update the employee");
        // }).catch(error => {
        //     console.log('can save employee')
        // });

    }

    return (
        <div>
            <Box>
                <Container style={{ width: "60%", justifyContent: "space-between" }}>
                    <Row style={{ textAlign: 'left' }}>
                        {/* <Col style={{ fontSize: '15px', float: 'left' }}>Updated: Dec 30, 2022</Col> */}
                        <Col>
                            <Button size="sm" style={{ backgroundColor: "#0f123F", borderColor: "#0f123F", float: 'left', width: '100px' }} onClick={() => { handleShow(); setMode(true) }}>
                                Add
                            </Button>
                        </Col>
                        <Col>
                            <Button size="sm" style={{ backgroundColor: "#0f123F", borderColor: "#0f123F", float: 'right', width: '100px' }} onClick={() => { handleShow(); setMode(false) }}>
                                Edit
                            </Button>
                        </Col>
                    </Row>
                    <Row style={{ textAlign: 'left', margin: '2%', backgroundColor: "#0F123F", color: "white", height: "50px", borderRadius: 10, fontWeight: 'bold', alignItems: 'center' }}>
                        <Col>Skills</Col>
                        <Col>Level</Col>
                        <Col>Score</Col>
                    </Row>
                    <Row style={{ fontWeight: 'bold', fontSize: '18px', margin: "10px" }}>Technique Skills</Row>
                    <HorizontalLine></HorizontalLine>
                    {TS.map((item, index) => {
                        return (
                            <Row key={index} style={{ textAlign: 'left', margin: '2%' }}>
                                <Col>{item.skill}</Col>
                                <Col>{item.level}</Col>
                                <Col>{item.score}</Col>
                            </Row>
                        );
                    })}
                    <Row style={{ fontWeight: 'bold', fontSize: '18px', margin: "10px" }}>People Skills</Row>
                    <HorizontalLine></HorizontalLine>
                    {PS.map((item, index) => {
                        return (
                            <Row key={index} style={{ textAlign: 'left', margin: '2%' }}>
                                <Col>{item.skill}</Col>
                                <Col>{item.level}</Col>
                                <Col>{item.score}</Col>
                            </Row>
                        );
                    })}
                    <Row style={{ fontWeight: 'bold', fontSize: '18px', margin: "10px" }}>Work Ethics</Row>
                    <HorizontalLine></HorizontalLine>
                    {WE.map((item, index) => {
                        return (
                            <Row key={index} style={{ textAlign: 'left', margin: '2%' }}>
                                <Col>{item.skill}</Col>
                                <Col>{item.level}</Col>
                                <Col>{item.score}</Col>
                            </Row>
                        );
                    })}
                </Container>
                <VerticleLine></VerticleLine>
                <Container>
                </Container>
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Skill & Certification</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* <EditForm addMode={mode} employee={props.employee} mode={true} /> */}
                        <Form.Select aria-label="Default select example" id="type" onChange={e => setType(e.target.value)} style={{ margin: '2%', width: '95%' }}>
                            <option>Skill Type</option>
                            <option value="technicalSkills">TechnicalSkills</option>
                            <option value="peopleSkills">PeopleSkills</option>
                            <option value="workEthic">WorkEthic</option>
                        </Form.Select>
                        {(mode) ?
                            <FloatingLabel label="Name" id="sname" onChange={e => setSName(e.target.value)} style={{ margin: '2%' }} />
                            :
                            <Form.Select aria-label="Default select example" id="sname" onChange={e => setSName(e.target.value)} style={{ margin: '2%', width: '95%' }}>
                                <option>Skill Name</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        }
                        <FloatingLabel label="Level" id="level" onChange={e => setLevel(e.target.value)} style={{ margin: '2%' }} />
                        <FloatingLabel label="Score" id="score" onChange={e => setScore(e.target.value)} style={{ margin: '2%' }} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="success" onClick={() => { handleClose(); saveSkill({ type: type, name: sname, level: level, score: score }); clear(); }}>
                            Save
                        </Button>
                        {
                            !mode ?
                                <Button variant="secondary" onClick={handleClose}>
                                    Remove
                                </Button>
                                :
                                undefined
                        }
                    </Modal.Footer>
                </Modal>

            </Box>
        </div>

    );
}

export default Skill;