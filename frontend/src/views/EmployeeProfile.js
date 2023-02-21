import React from "react";
import styled from "styled-components";
import EditProfile from '../subViews/EditProfile';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TabsBar from '../components/TabsBar';

const Box = styled.div`
    display: flex;
    margin: 5px;
    height: 50%;
    width: 100%;
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

function EmployeeProfile() {

    // TODO: it use to testing edit editprofile.
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Box>
                <SideBox></SideBox>
                <MiddleBox>Employee Profile Card</MiddleBox>
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
            <TabsBar />
        </>
    );

}

export default EmployeeProfile;