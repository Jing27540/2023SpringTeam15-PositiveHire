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
 * @author Biniyam
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

    const [message, setMessage] = React.useState('');

    const [mode, setMode] = React.useState();
    const [show, setShow] = React.useState(false);
    const handleClose = () => { setShow(false); setMessage('') };

    const handleShow = () => setShow(true);

    const [type, setType] = React.useState();
    const [sname, setSName] = React.useState();
    const [level, setLevel] = React.useState();
    const [score, setScore] = React.useState();

    const [options, setOptions] = React.useState();

    const [TS, setTS] = React.useState(props.employee.technicalSkills ? props.employee.technicalSkills : []);
    const [PS, setPS] = React.useState(props.employee.peopleSkills ? props.employee.peopleSkills : []);
    const [WE, setWE] = React.useState(props.employee.workEthic ? props.employee.workEthic : []);

    let technicalSkills = props.employee.technicalSkills ? props.employee.technicalSkills : [];
    let peopleSkills = props.employee.peopleSkills ? props.employee.peopleSkills : [];
    let workEthic = props.employee.workEthic ? props.employee.workEthic : [];

    React.useEffect(() => {
        if (mode === false) {
            axios.get(`http://localhost:8080/employees/${props.employee.employeeNum}`).then(result => {
                setEmployee(result.data);
                setTS(employee.technicalSkills);
                setPS(employee.peopleSkills);
                setWE(employee.workEthic);
                technicalSkills = employee.technicalSkills;
                peopleSkills = employee.peopleSkills;
                workEthic = employee.workEthic;
            });
        }
    }, [mode, options, employee]);

    React.useEffect(() => {
        if (type === 'technicalSkills' && !mode) {
            setOptions(technicalSkills);
        }

        if (type === 'peopleSkills' && !mode) {
            setOptions(peopleSkills);
        }

        if (type === 'workEthic' && !mode) { //workEthic
            setOptions(workEthic);
        }
    }, [type, employee]);

    function clear() {
        setType(undefined);
        setSName(undefined);
        setLevel(undefined);
        setScore(undefined);
    }


    function saveSkill(s) {

        let exists = false;
        if (type !== undefined && sname !== undefined && level !== undefined && score !== undefined) {
            let newSkill = {
                name: s.name,
                level: s.level,
                score: s.score
            };
            console.log(newSkill);

            console.log(mode);

            if (s.type === 'technicalSkills') {
                if (mode) { // add mode
                    employee.technicalSkills.forEach(element => {
                        if (element.name === newSkill.name) {
                            exists = true;
                        }
                    });
                    if (exists) {
                        setMessage("Skill Already Exists");
                    } else {
                        employee.technicalSkills.push(newSkill);
                    }
                } else { // edit mode
                    // employee.technicalSkills = [];
                    employee.technicalSkills = technicalSkills.map(obj => {
                        if (obj.name === newSkill.name) {
                            obj = newSkill;
                        }
                        return obj;
                    });
                }
            } else if (s.type === 'peopleSkills') {
                if (mode) {
                    let exists = false;

                    employee.peopleSkills.forEach(element => {
                        if (element.name === newSkill.name) {
                            exists = true;
                        }
                    });
                    if (exists) {
                        setMessage("Skill Already Exists");
                    } else {
                        employee.peopleSkills.push(newSkill);
                    }
                } else {
                    // employee.peopleSkills = [];
                    employee.peopleSkills = peopleSkills.map(obj => {
                        if (obj.name === newSkill.name) {
                            obj = newSkill;
                        }
                        return obj;
                    });
                }
            } else { //workEthic
                if (mode) {
                    let exists = false;

                    employee.workEthic.forEach(element => {
                        if (element.name === newSkill.name) {
                            exists = true;
                        }
                    });
                    if (exists) {
                        setMessage("Skill Already Exists");
                    } else {
                        employee.workEthic.push(newSkill);
                    }
                } else {
                    // employee.workEthic = [];
                    employee.workEthic = workEthic.map(obj => {
                        if (obj.name === newSkill.name) {
                            obj = newSkill;
                        }
                        return obj;
                    });
                }


            }

            // add new skill
            if (!exists) {
                axios.put("http://localhost:8080/employees", employee).then(response => {
                    axios.get(`http://localhost:8080/employees/${props.employee.employeeNum}`).then(res => {
                        setEmployee(res.data);
                        setTS(employee.technicalSkills);
                        setPS(employee.peopleSkills);
                        setWE(employee.workEthic);
                        technicalSkills = employee.technicalSkills;
                        peopleSkills = employee.peopleSkills;
                        workEthic = employee.workEthic;
                        alert("add / edit skill");
                        handleClose();
                    }).catch(err => console.log(err));
                }).catch(error => {
                    setMessage("Error saving");
                    console.log('unable to add / edit skill', employee);
                });
            }
        }

    }

    function deleteSkill(t, sn) {

        technicalSkills = employee.technicalSkills;
        peopleSkills = employee.peopleSkills;
        workEthic = employee.workEthic;

        if (t !== undefined && sn !== undefined) {
            if (t === 'technicalSkills') {
                technicalSkills = technicalSkills.filter(skill => skill.name !== sn);
                employee.technicalSkills = technicalSkills;
                setOptions(technicalSkills);
            } else if (t === 'peopleSkills') {
                peopleSkills = peopleSkills.filter(skill => skill.name !== sn);
                employee.peopleSkills = peopleSkills;
                setOptions(peopleSkills);
            } else { //workEthic
                workEthic = workEthic.filter(skill => skill.name !== sn);
                employee.workEthic = workEthic;
                setOptions(workEthic);
            }
            axios.put("http://localhost:8080/employees", employee).then(response => {
                axios.get(`http://localhost:8080/employees/${props.employee.employeeNum}`).then(res => {
                    setEmployee(res.data);
                    setTS(employee.technicalSkills);
                    setPS(employee.peopleSkills);
                    setWE(employee.workEthic);
                    technicalSkills = employee.technicalSkills;
                    peopleSkills = employee.peopleSkills;
                    workEthic = employee.workEthic;
                    handleClose();
                    console.log("remove the skill");
                }).catch(err => console.log(err));
            }).catch(error => {
                setMessage("Unable to remove skill");
                console.log('unable to remove skill');
            });
        }
    }

    return (
        <Container>
            <Container style={{ marginTop: '3%', justifyContent: "space-between" }}>
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
                <Row style={{ textAlign: 'center', marginTop: '2%', backgroundColor: "#0F123F", color: "white", height: "40px", borderRadius: 5, fontWeight: 'bold', alignItems: 'center' }}>
                    <Col>Skills</Col>
                    <Col>Level</Col>
                    <Col>Score</Col>
                </Row>
                <Row style={{ fontWeight: 'bold', fontSize: '18px', marginTop: '2%', marginLeft: '1%' }}>Technique Skills</Row>
                <HorizontalLine></HorizontalLine>
                {TS.map((item, index) => {
                    return (
                        <Row key={index} style={{ textAlign: 'center', marginTop: '2%' }}>
                            <Col>{item.name}</Col>
                            <Col>{item.level}</Col>
                            <Col>{item.score}</Col>
                        </Row>
                    );
                })}
                <Row style={{ fontWeight: 'bold', fontSize: '18px', marginTop: '2%', marginLeft: '1%' }}>People Skills</Row>
                <HorizontalLine></HorizontalLine>
                {PS.map((item, index) => {
                    return (
                        <Row key={index} style={{ textAlign: 'center', marginTop: '2%' }}>
                            <Col>{item.name}</Col>
                            <Col>{item.level}</Col>
                            <Col>{item.score}</Col>
                        </Row>
                    );
                })}
                <Row style={{ fontWeight: 'bold', fontSize: '18px', marginTop: '2%', marginLeft: '1%' }}>Work Ethics</Row>
                <HorizontalLine></HorizontalLine>
                {WE.map((item, index) => {
                    return (
                        <Row key={index} style={{ textAlign: 'center', marginTop: '2%' }}>
                            <Col>{item.name}</Col>
                            <Col>{item.level}</Col>
                            <Col>{item.score}</Col>
                        </Row>
                    );
                })}
            </Container>
            {/* <Col>
                <VerticleLine></VerticleLine>
            </Col> */}
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
                        <Form.Select aria-label="Default select example" id="sname" onChange={e => { setSName(e.target.value); }} style={{ margin: '2%', width: '95%' }}>
                            <option>Skill Name</option>
                            {
                                options ?
                                    options.map((item, index) => {
                                        return (
                                            <option key={index} value={item.name}>{item.name}</option>
                                        );
                                    })
                                    :
                                    undefined
                            }
                        </Form.Select>
                    }
                    <FloatingLabel label="Level" id="level" onChange={e => setLevel(e.target.value)} style={{ margin: '2%' }} />
                    <FloatingLabel label="Score" id="score" onChange={e => setScore(e.target.value)} style={{ margin: '2%' }} />
                    <div style={{ justifyContent: 'left', alignItems: 'left', fontSize: '15px', margin: "10px", color: 'red' }}>{message}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={() => { saveSkill({ type: type, name: sname, level: level, score: score }); clear(); }}>
                        Save
                    </Button>
                    {
                        !mode ?
                            <Button variant="secondary" onClick={() => { deleteSkill(type, sname); clear(); }} >
                                Remove
                            </Button>
                            :
                            undefined
                    }
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Skill;