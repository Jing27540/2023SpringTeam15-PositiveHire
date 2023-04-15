import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import FloatingLabel from 'react-bootstrap-floating-label';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from "axios";

function JobHistory(props) {

    const [mode, setMode] = React.useState();
    const [employee, setEmployee] = React.useState(props.employee);

    // skill
    const [sname, setSName] = React.useState();
    const [level, setLevel] = React.useState();
    const [score, setScore] = React.useState();


    const [show, setShow] = React.useState(false);
    const [secShow, setSecShow] = React.useState();

    const handleShow = () => setShow(true);
    const handlesecShow = () => setSecShow(true);
    const handleClose = () => { setShow(false); setSecShow(false) };

    const [secmode, setsecMode] = React.useState([]);
    const [selectedJobRecord, setSelectedJobRecord] = React.useState("N/A");

    const [currid, setId] = React.useState();
    const [currName, setName] = React.useState();

    //Data fields for a new Job Record
    const [jobTitle, setJobTitle] = React.useState();
    const [jobLevel, setJobLevel] = React.useState();
    const [organization, setOrganization] = React.useState();
    const [location, setLocation] = React.useState();
    const [startDate, setStartDate] = React.useState();
    const [endDate, setEndDate] = React.useState();
    const [jobSkills, setJobSkills] = React.useState();

    const [responseMessage, setResponseMessage] = React.useState('');
    const [fields, setFields] = React.useState(true);

    React.useEffect(() => {
        // props.employee
        axios.get(`http://localhost:8080/employees/${props.employee.employeeNum}`).then(res => {
            setEmployee(res.data);
            console.log('checking', res.data);
        });

    }, []);

    React.useEffect(() => {
        // Update the document title using the browser API
        setJobTitle(selectedJobRecord.jobTitle);
        setJobLevel(selectedJobRecord.jobLevel);
        setOrganization(selectedJobRecord.organization);
        setLocation(selectedJobRecord.location);
        setStartDate(selectedJobRecord.startDate);
        setEndDate(selectedJobRecord.endDate);
        setJobSkills(selectedJobRecord.jobSkills);
        // console.log("Fields changed");
    }, [selectedJobRecord]);

    function clear() {
        setSName(undefined);
        setLevel(undefined);
        setScore(undefined);
    }

    function clearJR() {

        // setJobTitle(undefined);
        // setJobLevel(undefined);
        // setOrganization(undefined);
        // setLocation(undefined);
        // setStartDate(undefined);
        // setEndDate(undefined);
        // setJobSkills(undefined);
        let emptyRecord = {
            jobTitle: "",
                jobLevel: "",
                organization: "",
                location: "",
                startDate: "",
                endDate: "",
                jobSkills: []
        }
        setSelectedJobRecord(emptyRecord);
    }

    function addJobRecord() {

        let jrToAdd = null;
        let jrToEdit = null;
        if (mode) {
            jrToAdd = {
                jobTitle: jobTitle,
                jobLevel: jobLevel,
                organization: organization,
                location: location,
                startDate: startDate,
                endDate: endDate,
                jobSkills: []
            };
        } else {
            jrToEdit = {
                id: currid,
                jobTitle: jobTitle,
                jobLevel: jobLevel,
                organization: organization,
                location: location,
                startDate: startDate,
                endDate: endDate,
                jobSkills: []
            };
        }

        if (mode) {
            axios.post(`http://localhost:8080/employees/${props.employee.employeeNum}/jobrecords`, jrToAdd).then(response => {
                axios.get(`http://localhost:8080/employees/${props.employee.employeeNum}`).then(res => {
                    setEmployee(res.data);
                    console.log('checking', res.data);
                    if (response.data.message !== undefined) {
                        setResponseMessage(response.data.message);
                    }
                })
            }).catch(err => setResponseMessage(err.data.message));
        } else {
            axios.put(`http://localhost:8080/employees/${props.employee.employeeNum}/jobrecords/${currid}`, jrToEdit).then(response => {
                axios.get(`http://localhost:8080/employees/${props.employee.employeeNum}`).then(res => {
                    setEmployee(res.data);
                    if (response.data.message !== undefined) {
                        setResponseMessage(response.data);
                    }
                })
            })
        }
    }

    const deleteJobRecord = async (jr) => {
        // When this jobrecord have no skill error
        await axios.delete(`http://localhost:8080/employees/${employee.employeeNum}/jobrecords/${jr.id}`).then(response => {
            setResponseMessage(response.data.message);
            axios.get(`http://localhost:8080/employees/${employee.employeeNum}`).then(res => {
                setEmployee(res.data);
            })
        });
    }

    function saveSkill() {
        if (secmode) {
            let duplicate = false;

            if (jobSkills !== undefined) {
                jobSkills.forEach(element => {
                    if (element.name === sname) {
                        duplicate = true;
                    }
                });
            }

            let newSkill = {
                name: sname,
                level: level,
                score: score
            };
            if (!duplicate) {
                axios.post(`http://localhost:8080/employees/${props.employee.employeeNum}/jobrecords/${currid}/skills`, newSkill).then(response => {
                    axios.get(`http://localhost:8080/employees/${props.employee.employeeNum}`).then(res => {
                        setEmployee(res.data);
                        if (response.data.message !== undefined) {
                            setResponseMessage(response.data.message);
                        }
                    })
                })
            }
        } else {
            let skiId = 0;
            jobSkills.forEach(element => {
                if (element.name === sname) {
                    skiId = element.id;
                }
            });
            let nSkill = {
                id: skiId,
                name: sname,
                level: level,
                score: score
            }

            axios.put(`http://localhost:8080/employees/${props.employee.employeeNum}/jobrecords/${currid}/skills/${skiId}`, nSkill).then(response => {
                axios.get(`http://localhost:8080/employees/${props.employee.employeeNum}`).then(res => {
                    setEmployee(res.data);
                    if (response.data.message !== undefined) {
                        setResponseMessage(response.data.message);
                    }
                })
            })

        }
    }

    function deleteSkill() {
        let skiId = 0;
        jobSkills.forEach(element => {
            if (element.name === sname) {
                skiId = element.id;
            }
        });

        axios.delete(`http://localhost:8080/employees/${props.employee.employeeNum}/jobrecords/${currid}/skills/${skiId}`).then(response => {
            axios.get(`http://localhost:8080/employees/${props.employee.employeeNum}`).then(res => {
                setEmployee(res.data);
                if (response.data.message !== undefined) {
                    setResponseMessage(response.data.message);
                }
            })
        })
    }

    return (
        <>
            <Button size="sm" style={{ backgroundColor: "#0f123F", borderColor: "#0f123F", float: 'left', width: '70px', marginTop: "2%" }} onClick={() => { clearJR(); handlesecShow(); setMode(true); }}>
                Add
            </Button>
            <Form.Label style={{color: "green", marginTop: "2%"}}>{responseMessage}</Form.Label>
            <Table striped bordered hover style={{ marginTop: '2%' }}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Job Title</th>
                        <th>Job Level</th>
                        <th>Organization</th>
                        <th>Location</th>
                        <th>Start Date</th>
                        <th>End Date</th>
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
                                <td>{new Date(Date.parse(item.startDate)).toISOString().slice(0, 10)}</td>
                                <td>{new Date(Date.parse(item.endDate)).toISOString().slice(0, 10)}</td>
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
                                        <Button size="sm" onClick={() => { setSelectedJobRecord(item); deleteJobRecord(item); }} style={{ marginTop: "2%", marginRight: "2%", backgroundColor: "#990033", borderColor: "#990033", width: '70px'}} >
                                            Remove
                                        </Button>
                                    </Col>

                                    <Col>
                                        <Button size="sm" onClick={() => { setSelectedJobRecord(item); handlesecShow(); setMode(false); setId(item.id); }} style={{ marginTop: "2%", marginRight: "2%", backgroundColor: "#0f123F", borderColor: "#0f123F", width: '70px' }} >
                                            Edit
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button size="sm" style={{ marginTop: "2%", marginRight: "2%", backgroundColor: "#0f123F", borderColor: "#0f123F", width: '70px' }} onClick={() => { handleShow(); setsecMode(true); setId(item.id); setJobSkills(item.jobSkills) }}>
                                            Add Skill
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button size="sm" style={{ marginTop: "2%", marginRight: "2%", backgroundColor: "#0f123F", borderColor: "#0f123F", width: '70px' }} onClick={() => { handleShow(); setsecMode(false); setId(item.id); setName(item.name); setJobSkills(item.jobSkills); setSelectedJobRecord(employee.jobRecords[index]); setFields(); }}>
                                            Edit Skill
                                        </Button>
                                    </Col>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>

                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Skill</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* <EditForm addMode={mode} employee={props.employee} mode={true} /> */}

                        {(secmode) ?
                            <FloatingLabel label="Name" id="sname" onChange={e => setSName(e.target.value)} style={{ margin: '2%' }} />
                            :
                            <>
                                <Modal.Title>Editing Job History Skills for:{" " + selectedJobRecord.jobTitle}</Modal.Title>
                                <Form.Select aria-label="Default select example" id="sname" onChange={e => { setSName(e.target.value); }} style={{ margin: '2%', width: '95%' }}>
                                    <option>Skill Name</option>
                                    {
                                        jobSkills ?
                                            jobSkills.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.name}>{item.name}</option>
                                                );
                                            })
                                            :
                                            undefined
                                    }
                                </Form.Select>
                            </>
                        }
                        <FloatingLabel label="Level" id="level" onChange={e => setLevel(e.target.value)} style={{ margin: '2%' }} />
                        <FloatingLabel label="Score" id="score" onChange={e => setScore(e.target.value)} style={{ margin: '2%' }} />
                        {/* <div style={{ justifyContent: 'left', alignItems: 'left', fontSize: '15px', margin: "10px", color: 'red' }}>{message}</div> */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Close
                        </Button>

                        <Button variant="success" onClick={() => { saveSkill(); handleClose(); clear(); clearJR(); }}>
                            Save
                        </Button>
                        {
                            !secmode ?
                                <Button variant="secondary" onClick={() => { deleteSkill(sname); clear(); handleClose(); clearJR(); }} >
                                    Remove
                                </Button>
                                :
                                undefined
                        }
                    </Modal.Footer>
                </Modal>
                <Modal show={secShow} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Job History</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {(!mode) ?
                            <Modal.Title>Editing Job History:{" " + selectedJobRecord.jobTitle}</Modal.Title>
                            :
                            undefined
                        }
                        <FloatingLabel label="Job Title" id="jname" onChange={e => setJobTitle(e.target.value)} style={{ margin: '2%' }} />
                        <FloatingLabel label="Job Level" id="jlev" onChange={e => setJobLevel(e.target.value)} style={{ margin: '2%' }} />
                        <FloatingLabel label="Organization" id="org" onChange={e => setOrganization(e.target.value)} style={{ margin: '2%' }} />
                        <FloatingLabel label="Location" id="loc" onChange={e => setLocation(e.target.value)} style={{ margin: '2%' }} />
                        <Form.Label className="text-center">Start Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="startDate"
                            placeholder="DateRange"
                            style={{ margin: '2%', width: '95%' }}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <Form.Label>Finish Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="finishDate"
                            placeholder="DateRange"
                            style={{ margin: '2%', width: '95%' }}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => { handleClose(); clearJR(); }}>
                            Close
                        </Button>
                        <Button variant="success" onClick={() => { addJobRecord(); handleClose(); clear(); clearJR(); }}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Table>
        </>);
}

export default JobHistory;