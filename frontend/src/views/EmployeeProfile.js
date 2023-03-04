import React from "react";
import styled from "styled-components";
import EditProfile from '../subViews/EditProfile';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TabsBar from '../components/TabsBar';
import General from "../subViews/General";
import Skill from "../subViews/Skill";
import Certification from "../subViews/Certification"
import ProfileCard from "../components/ProfileCard";

/**
 * EmployeeProfile component is used to manage profile information.
 * 
 * @author Jing Huang
 */
const Box = styled.div`
    display: flex;
    margin: 10px;
    height: ${({ height = '50%' }) => height};
    width: 100%;
    justify-content: center;
    overflow: auto;
`
const SideBox = styled.div`
    width: 40%;
    float: left;
`;

const MiddleBox = styled.div`
    width: 30%;
    border: 1px solid black;
    height: 400px;
    justify-content: space-between;
`;

const ContentBox = styled.div`
    margin: 20px;
    width: 90%;
    overflow: auto;
    justify-content: center;
    border: 1px solid #808080;
`;

const InnerContentBox = styled.div`
    display: flex;
    margin: 20px;
    width: 90%;
    height: 700px;
    overflow: auto;
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
        else if (mode === 'Skills & Certifications') {
            if (tool === 'Certifications') {
                return (<Certification employee={employee} />);
            } else {
                return (<Skill employee={employee} />);
            }
        } else {
            return undefined;
        }
    }

    return (
        <>
            <Box>
                <SideBox></SideBox>
                <MiddleBox><ProfileCard /></MiddleBox>
                <SideBox>
                    <Button size="sm" style={{ backgroundColor: "#0f123F", borderColor: "#0f123F", marginTop: "5%", marginRight: "10%", float: 'right', width: '100px' }} onClick={handleShow}>
                        Edit
                    </Button>
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
                </SideBox>
            </Box>
            <TabsBar titles={GTITLE} setMode={setMode} />
            <Box>
                <ContentBox>
                    <TabsBar titles={title} setMode={setTool} />
                    <InnerContentBox>
                        {changeTool(mode)}
                    </InnerContentBox>
                </ContentBox>
            </Box>
        </>
    );

}

export default EmployeeProfile;