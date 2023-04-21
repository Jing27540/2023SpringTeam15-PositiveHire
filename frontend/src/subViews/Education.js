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
    const [education, setEducation] = React.useState(props.employee.education);
    const [sname, setSName] = React.useState();
    const [level, setLevel] = React.useState();
    const [score, setScore] = React.useState();
    const [show, setShow] = React.useState(false);
    const [currid, setId] = React.useState();
    const [secShow, setSecShow] = React.useState();
    const handleShow = () => setShow(true);
    const handlesecShow = () => setSecShow(true);
    const handleClose = () => { setShow(false); setSecShow(false) };
    const [edit, setEdit] = React.useState(false);
    const [currEdu, setCurrEdu] = React.useState();
    const [edname, setedName] = React.useState();
    const [inst, setInstitution] = React.useState();
    const [type, setType] = React.useState();
    const [issuedDate, setIssuedDate] = React.useState();
    const [currName, setName] = React.useState();
    const [secmode, setsecMode] = React.useState([]);
    const [currskills, setCurrSkills] = React.useState();
    // const [remove, setRemove] = React.useState(false);
    const [responseMessage, setResponseMessage] = React.useState('');

    React.useEffect(() => {
        axios.get(`http://localhost:8080/employees/${employee.employeeNum}`).then(res => {
            setEducation(res.data.education);
            // setAccessRole(res.data.accessRole);
            // setAccessRole(auth.role);
            //console.log(education);
        })
            .catch(err => console.log(err));
            clear();
    }, [employee]);

  
    function clear() {

        setSName(undefined);
        setLevel(undefined);
        setScore(undefined);
        setedName(undefined);
        setInstitution(undefined);
        setType(undefined);
        setIssuedDate(undefined);
       
    }



    function deleteSkill(sn) {

        let skiId = 0;
        currskills.forEach(element => {
            if (element.name === sn) {
                skiId = element.id;
            }
        });

        axios.delete(`http://localhost:8080/employees/${props.employee.employeeNum}/education/${currid}/skills/${skiId}`).then(response => {
            axios.get(`http://localhost:8080/employees/${props.employee.employeeNum}`).then(res => {
                setEmployee(res.data);
               
                
            })
        //    alert("Sucessfully to delete")
        })
    }

    function saveSkill(s) {
        if (secmode) {
            let duplicate = false;

            currskills.forEach(element => {
                if (element.name === s.name) {
                    duplicate = true;
                }
            });
            let newSkill = {
                name: s.name,
                level: s.level,
                score: s.score
            };
            if (!duplicate) {
                let suc = false;
                axios.post(`http://localhost:8080/employees/${props.employee.employeeNum}/education/${currid}/skills`, newSkill).then(response => {
                    axios.get(`http://localhost:8080/employees/${props.employee.employeeNum}`).then(res => {
                        setEmployee(res.data);
                        console.log(res.data);
                        suc = true;
                    })
                    
                })
                if(suc) {
              //      alert("Sucessfully to save")
                }
            }
        } else {
          //  let suc = false;
            let skiId = 0;
            let lastSk = null;
            currskills.forEach(element => {
                if (element.name === s.name) {
                    skiId = element.id;
                    lastSk = element;
                }
            });
            if(s.name === undefined) {
                s.name = lastSk.name;
            }
            if(s.level === undefined) {
                s.level = lastSk.level;
            }
            if(s.score === undefined) {
                s.score = lastSk.score;
            }
            let nSkill = {
                id: skiId,
                name: s.name,
                level: s.level,
                score: s.score
            }

            axios.put(`http://localhost:8080/employees/${props.employee.employeeNum}/education/${currid}/skills/${skiId}`, nSkill).then(response => {
                axios.get(`http://localhost:8080/employees/${props.employee.employeeNum}`).then(res => {
                    setEmployee(res.data);
                    
                   // suc = true;
                })
                
            })
            // if(suc) {
            //     alert("Sucessfully to update")
            // }
        }
    }
    //  console.log(employee.education);
    function deleteEdu(thid) {
        setResponseMessage("");
        axios.delete(`http://localhost:8080/employees/${props.employee.employeeNum}/education/${thid}`).then(response => {
            axios.get(`http://localhost:8080/employees/${props.employee.employeeNum}`).then(res => {
                setEmployee(res.data);
           //     alert("Sucessfully to delete")
                setResponseMessage("Education deleted successfully");
            })
        }).catch(error => {
            console.log("Unable to remove education");
        })
        setResponseMessage("");
    }

    function addEducation(ed) {
        setResponseMessage("");
        let edToAdd = null;
        if(!parseInt(ed.name) && !parseInt(ed.institution)) {
            if (mode) {
                edToAdd = {
                    name: ed.name,
                    institution: ed.institution,
                    type: ed.type,
                    dateAchieved: ed.issuedDate,
                    skills: []
                };
            } else {
            edToAdd = {
                id: currid,
                name: currEdu.name,
                institution: currEdu.institution,
                type: currEdu.type,
                dateAchieved: currEdu.dateAchieved,
                skills: []
            };

            if(ed.name !== undefined) {
                edToAdd.name = ed.name;
            }
            if(ed.institution !== undefined) {
                edToAdd.institution = ed.institution; 
            }
            if(ed.type !== undefined) {
                edToAdd.type = ed.type;
            }
            if(ed.issuedDate !== undefined) {
                console.log(ed.issuedDate);
                edToAdd.dateAchieved = ed.issuedDate;
            }
            
            
        }

        if (mode) {
            axios.post(`http://localhost:8080/employees/${props.employee.employeeNum}/education`, edToAdd).then(response => {
                axios.get(`http://localhost:8080/employees/${props.employee.employeeNum}`).then(res => {
                    setEmployee(res.data);
                    
                })
               // alert("Sucessfully to save")
               setResponseMessage("Education Created Successfully");
            })
        } else {
            axios.put(`http://localhost:8080/employees/${props.employee.employeeNum}/education`, edToAdd).then(response => {
                axios.get(`http://localhost:8080/employees/${props.employee.employeeNum}`).then(res => {
                    setEmployee(res.data);
                   
                })
                setResponseMessage("Education Updated Successfully");
               // alert("Sucessfully to update")
            })
        }
    } else {
        alert("Cannot be a number");
    }
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
        <>
        <Form.Label style={{color: "green", marginTop: "2%"}}>{responseMessage}</Form.Label>
       
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
                {education.map((item, index) => {
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
                                    <Button size="sm" style={{ marginTop: "2%", marginRight: "2%", backgroundColor: "#990033", borderColor: "#990033", width: '70px' }} onClick={() => { deleteEdu(item.id); }} >
                                        Remove
                                    </Button>
                                </Col>

                                <Col>
                                    <Button size="sm" style={{ marginTop: "2%", marginRight: "2%", backgroundColor: "#0f123F", borderColor: "#0f123F", width: '70px' }} onClick={() => { handlesecShow(); setMode(false); setId(item.id); setName(item.name); setCurrEdu(item);}}>
                                        Edit
                                    </Button>
                                </Col>
                                <Col>
                                    <Button size="sm" style={{ marginTop: "2%", marginRight: "2%", backgroundColor: "#0f123F", borderColor: "#0f123F", width: '70px' }} onClick={() => { handleShow(); setsecMode(true); setId(item.id); setCurrSkills(item.skills) }}>Add Skill</Button>
                                </Col>
                                <Col>
                                    <Button size="sm" style={{ marginTop: "2%", marginRight: "2%", backgroundColor: "#0f123F", borderColor: "#0f123F", width: '70px' }} onClick={() => { handleShow(); setsecMode(false); setId(item.id); setName(item.name); setCurrSkills(item.skills) }}>
                                        Edit Skill
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
                         //
                    );
                })}

            </tbody>
            <Button size="sm" style={{ backgroundColor: "#0f123F", borderColor: "#0f123F", float: 'left', width: '100px' }} onClick={() => { handlesecShow(); setMode(true) }}>
                Add
            </Button>


            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Skill</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <EditForm addMode={mode} employee={props.employee} mode={true} /> */}

                    {(secmode) ?
                        <FloatingLabel label="Name" id="sname" onChange={e => setSName(e.target.value)} style={{ margin: '2%' }} />
                        :
                        <Form.Select aria-label="Default select example" id="sname" onChange={e => { setSName(e.target.value); }} style={{ margin: '2%', width: '95%' }}>
                            <option>Skill Name</option>
                            {
                                currskills ?
                                    currskills.map((item, index) => {
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
                    {/* <div style={{ justifyContent: 'left', alignItems: 'left', fontSize: '15px', margin: "10px", color: 'red' }}>{message}</div> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>

                    <Button variant="success" onClick={() => { saveSkill({ name: sname, level: level, score: score }); handleClose(); clear(); }}>
                        Save
                    </Button>
                    {
                        !secmode ?
                            <Button variant="secondary" onClick={() => { deleteSkill(sname); clear(); handleClose() }} >
                                Remove
                            </Button>
                            :
                            undefined
                    }
                </Modal.Footer>
            </Modal>
            <Modal show={secShow} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Education</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <EditForm addMode={mode} employee={props.employee} mode={true} /> */}

                    {(!mode) ?
                        <Modal.Title>Editing Education{" " + currName}</Modal.Title>
                        :
                        undefined
                    }
                    <FloatingLabel label="Name" id="sname" onChange={e => setedName(e.target.value)} style={{ margin: '2%' }} />
                    {/* // :
                        // <Form.Select aria-label="Default select example" id="sname" onChange={e => { setedName(e.target.value); }} style={{ margin: '2%', width: '95%' }}>
                        //     <option>Select</option>
                        //     { 
                                 */}
                    {/* //         employee.education.map((item, index) => { */}
                    {/* //                 return (
                        //                     <option key={index} value={item.name}>{item.name}</option>
                        //                 ); */}
                    {/* //             })
                                    
                        //             //undefined
                        //     } */}
                    {/* // </Form.Select> */}

                    <FloatingLabel label="Institution" id="inst" onChange={e => setInstitution(e.target.value)} style={{ margin: '2%' }} />
                    {/* <FloatingLabel label="Type" id="type" onChange={e => setType(e.target.value)} style={{ margin: '2%' }} /> */}
                    <Form.Select aria-label="Default select example" id="sname" onChange={e => { setType(e.target.value); }} style={{ margin: '2%', width: '95%' }}>
                        <option>Education type</option>
                        {/* { 
                                currskills ?
                                    currskills.map((item, index) => {
                                        return (
                                            <option key={index} value={item.name}>{item.name}</option>
                                        );
                                    })
                                    :
                                    undefined
                            } */}
                        <option>Trade</option>
                        <option>Vocational</option>
                        <option>Apprenticeship</option>
                        <option>Union</option>
                        <option>College</option>
                    </Form.Select>
                    <Form.Control
                        type="date"
                        name="issuedDate"
                        placeholder="DateRange"
                        style={{ margin: '2%', width: '95%' }}
                        onChange={(e) => setIssuedDate(e.target.value)}
                    />


                    {/* <div style={{ justifyContent: 'left', alignItems: 'left', fontSize: '15px', margin: "10px", color: 'red' }}>{message}</div> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {handleClose(); clear();}}>
                        Close
                    </Button>

                    <Button variant="success" onClick={() => { addEducation({ name: edname, institution: inst, type: type, issuedDate: issuedDate }); handleClose(); clear(); }}>
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
        </>
    );
}

export default Education;