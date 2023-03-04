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
 * 
 * @author Jing Huang
 */
// TODO: Dummy Data
const CF = [{ name: 'Certification Name', Institution: 'Institution', IssuedDate: 'IssuedDate', id: 'Cerdential ID abcde' },
{ name: 'Certification Name', Institution: 'Institution', IssuedDate: 'IssuedDate', id: 'Cerdential ID abcde' },
{ name: 'Certification Name', Institution: 'Institution', IssuedDate: 'IssuedDate', id: 'Cerdential ID abcde' }
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

function Certification(props) {

    const [employee, setEmployee] = React.useState(props.employee);

    const [mode, setMode] = React.useState();
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [cname, setCName] = React.useState();
    const [institution, setInstitution] = React.useState('');
    const [issuedDate, setIssuedDate] = React.useState();

    const [credentialID, setCredentialID] = React.useState();
    const [skils, setSkils] = React.useState();

    const [certifications, setCertifications] = React.useState(props.employee.certifications ? props.employee.certifications : []);

    React.useEffect(() => {
        if (mode === false) {
            axios.get(`http://localhost:8080/employees/${props.employee.employeeNum}`).then(result => {
                setEmployee(result.data);
            });
            setCertifications(employee.certifications);
        }
    }, [mode, employee]);

    function clear() {
        setCName(undefined);
        setInstitution(undefined);
        setIssuedDate(undefined);
        setCredentialID(undefined);
        setSkils(undefined);
    }

    function saveCertification(certification) {
        if (cname !== undefined && institution !== undefined && issuedDate !== undefined && credentialID !== undefined && skils !== undefined) {
            let newCertification = {
                name: cname,
                institution: institution,
                issuedDate: issuedDate,
                credentialID: credentialID,
                skils: skils,
            };

            if (mode) {
                employee.certifications.push(newCertification);
            } else {
                employee.certifications = certifications.map(obj => {
                    if (obj.name === newCertification.name) {
                        obj = newCertification;
                    }
                    return obj;
                });
            }

            axios.put("http://localhost:8080/employees", employee).then(response => {
                axios.get(`http://localhost:8080/employees/${props.employee.employeeNum}`).then(res => {
                    setEmployee(res.data);
                    setCertifications(employee.certifications);
                    console.log("add / edit certification");
                }).catch(err => console.log(err));
            }).catch(error => {
                console.log('unable to add / edit certifications');
            });
        }
    }

    function deleteCertification(cn) {

        setCertifications(employee.certifications);

        let temp = certifications.filter(certification => certification.name !== cn);
        setCertifications(temp);
        employee.certifications = temp;

        axios.put("http://localhost:8080/employees", employee).then(response => {
            axios.get(`http://localhost:8080/employees/${props.employee.employeeNum}`).then(res => {
                setEmployee(res.data);
                setCertifications(employee.certifications);
                console.log("remove the certifciation");
            }).catch(err => console.log(err));
        }).catch(error => {
            console.log('unable to remove certifciation')
        });
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
                    <Row style={{ textAlign: 'left', marginTop: '2%', backgroundColor: "#0F123F", color: "white", height: "50px", borderRadius: 10, fontWeight: 'bold', alignItems: 'center' }}>
                        <Col>Certifications</Col>
                    </Row>

                    {CF.map((item, index) => {
                        return (
                            <div key={index}>
                                <Row key={item.name + index} style={{ textAlign: 'left', margin: '4%' }}>
                                    {item.name}
                                </Row>
                                <Row key={item.Institution + index} style={{ textAlign: 'left', margin: '4%' }}>
                                    {item.Institution}
                                </Row>
                                <Row key={item.IssuedDate + index} style={{ textAlign: 'left', margin: '4%' }}>
                                    {item.IssuedDate}
                                </Row>
                                <Row key={item.id + index} style={{ textAlign: 'left', margin: '4%' }}>
                                    {item.id}
                                </Row>
                                <HorizontalLine></HorizontalLine>
                            </div>
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
                        {/* <EditForm addMode={mode} employee={props.employee} mode={false}/> */}
                        {(mode) ?
                            <FloatingLabel label="Name" id="cname" onChange={e => setCName(e.target.value)} style={{ margin: '2%' }} />
                            :
                            <Form.Select aria-label="Default select example" id="cname" onChange={e => setCName(e.target.value)} style={{ margin: '2%', width: '95%' }}>
                                <option>Certification Name</option>
                                {
                                    certifications ?
                                        certifications.map((item, index) => {
                                            return (
                                                <option key={index} value={item.name}>{item.name}</option>
                                            );
                                        })
                                        :
                                        undefined
                                }
                            </Form.Select>
                        }
                        <FloatingLabel label="Institution" id="institution" onChange={e => setInstitution(e.target.value)} style={{ margin: '2%' }} />
                        <Form.Control
                            type="date"
                            name="issuedDate"
                            placeholder="DateRange"
                            style={{ margin: '2%', width: '95%' }}
                            onChange={(e) => setIssuedDate(e.target.value)}
                        />
                        <FloatingLabel label="CredentialID" id="credentialID" onChange={e => setCredentialID(e.target.value)} style={{ margin: '2%' }} />
                        <FloatingLabel label="Skils" id="skils" onChange={e => setSkils(e.target.value)} style={{ margin: '2%' }} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="success" onClick={() => { handleClose(); saveCertification({ name: cname, institution: institution, issuedDate: issuedDate, credentialID: credentialID, skils: skils }); clear(); }}>
                            Save
                        </Button>
                        {
                            !mode ?
                                <Button variant="secondary"
                                    onClick={() => { handleClose(); deleteCertification(cname); clear(); }}>
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

export default Certification;