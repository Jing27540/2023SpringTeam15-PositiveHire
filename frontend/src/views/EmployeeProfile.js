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
    border: 1px solid black;
    overflow: auto;
`

const SideBox = styled.div`
    width: 30%;
    border: 1px solid black;
    justify-content: space-btween;
`;

function EmployeeProfile() {

    // TODO: it use to testing edit editprofile.
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Box>
                <SideBox>Hahaha</SideBox>
                <SideBox>Employee Profile Card</SideBox>
                <SideBox>
                    <Button variant="primary" onClick={handleShow}>
                        Edit Profile
                    </Button>
                    <Modal  size="lg" show={show} onHide={handleClose}>
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
            <Box>
                <TabsBar />
            </Box>

        </>
    );

}

export default EmployeeProfile;