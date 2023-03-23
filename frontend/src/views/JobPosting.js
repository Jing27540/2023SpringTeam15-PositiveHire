import React from "react";
import styled from "styled-components";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import VerticalBar from "../components/VerticalBar";
import CreateJobPosting from "../subViews/CreateJobPosting";
import Welcome from "./Welcome";
import ViewJobPosting from "../subViews/ViewJobPosting";
/**
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
const LeftBox = styled.div`
    width: 10%;
    float: left;
    margin-top: 10%;
`;

const RightBox = styled.div`
    width: 90%;
    float: left;
`;

function JobPosting(props) {

    const [mode, setMode] = React.useState('Welcome');

    function changeSubView() {
        if ((mode === 'Create' || props.pView === 'Create/Edit Positions') && props.accessRole === "HR") {
            return (
                <CreateJobPosting accessRole={props.accessRole} />
            );
        } else if (mode === 'View' || props.pView === 'See Open Positions') {
            return (
                <ViewJobPosting accessRole={props.accessRole} />
            );
        } else if (mode === 'Welcome' || mode === 'Edit' ||  props.pView === 'Welcome') {
            return (
                <Welcome />
            );
        }
    }

    return (
        <Container fluid>
            <Row>
                <Col sm={1} style={{ marginTop: '10%' }}>
                    <VerticalBar setMode={setMode} accessRole={props.accessRole} setPView={props.setPView} />
                </Col>
                <Col>
                    {changeSubView()}
                </Col>
            </Row>
        </Container>
    );

}

export default JobPosting;