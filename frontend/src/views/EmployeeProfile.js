import React from "react";
import styled from "styled-components";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ViewJobPosting from '../subViews/ViewJobPosting'; 
import EditProfile from '../subViews/EditProfile';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TabsBar from '../components/TabsBar';
import General from "../subViews/General";
import Skill from "../subViews/Skill";
import Certification from "../subViews/Certification"
import ProfileCard from "../components/ProfileCard";
import Alert from 'react-bootstrap/Alert';

/**
 * EmployeeProfile component is used to manage profile information.
 * 
 * @author Jing Huang
 */
const ContentBox = styled.div`
    margin-top: 3%;
    width: 100%;
    overflow: auto;
    justify-content: center;
    border: 1px solid #808080;
    min-height: 500px;
`;

const GTITLE = ['General', 'Skills & Certifications', 'Performance Review', 'Career Development Plans', 'Open Positions'];
const SKTITLE = ['Skills', 'Certifications'];
const PRTITLE = ['Reviews', 'Goals', 'Training Resources', 'Schedule'];
const CDPTITLE = ['Goals', 'Training Resources', 'Statistics'];

function EmployeeProfile(props) {

    const [employee, setEmployee] = React.useState(props.employee);

    // TODO: it use to testing edit editprofile.
    const [show, setShow] = React.useState(false);
    const [mode, setMode] = React.useState('General');
    const [title, setTitle] = React.useState(SKTITLE);
    const [tool, setTool] = React.useState('Skills');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    React.useEffect(() => {
        if (mode === GTITLE[1]) { setTitle(SKTITLE); }
        else if (mode === GTITLE[2]) { setTitle(PRTITLE); }
        else if (mode === GTITLE[3]) { setTitle(CDPTITLE); }
        else { setTitle([]) }
    }, [mode]);

    function changeTool(mode) {
        if (mode === 'General') {
            return <General employee={employee} />
        }
        else if (mode === 'Open Positions') {
            return (<ViewJobPosting />);
        }
        else if (mode === 'Skills & Certifications') {
            if (tool === 'Certifications') {
                return (<Certification employee={employee} />);
            } else {
                return (<Skill employee={employee} />);
            }
        } else {
            return (<Alert variant="danger"> Not Implement Yet!</Alert>);
        }
    }

    return (
        <>
            <Container>
                <Row>
                    <Col sm></Col>
                    <Col sm><ProfileCard employee={employee} /></Col>
                    <Col sm>
                        <Button size="sm" style={{ backgroundColor: "#0f123F", borderColor: "#0f123F", marginTop: "5%", marginRight: "10%", float: 'right', width: '150px' }} onClick={handleShow}>
                            Upload Resume
                        </Button>
                    </Col>
                </Row>
                <Modal size="lg" show={show} onHide={handleClose}>
                    <EditProfile />
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
            <TabsBar titles={GTITLE} setMode={setMode} />
            <Container>
                <ContentBox>
                    <TabsBar titles={title} setMode={setTool} />
                    <Container styled={{ marginTop: "10px" }}>
                        {changeTool(mode)}
                    </Container>
                </ContentBox>
            </Container>
        </>
    );

}

export default EmployeeProfile;