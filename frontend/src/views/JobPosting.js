import React from "react";
import styled from "styled-components";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import VerticalBar from "../components/VerticalBar";
import CreateJobPosting from "../subViews/CreateJobPosting";
import Welcome from "./Welcome";
import ViewJobPosting from "../subViews/ViewJobPosting";
import EditJobPosting from "../subViews/EditJobPosting";
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
                <Row>
                    <Col sm={1} style={{ marginTop: '10%' }}>
                        <VerticalBar setMode={setMode} accessRole={props.accessRole} setPView={props.setPView} />
                    </Col>
                    <Col>
                        <CreateJobPosting setMode={setMode} accessRole={props.accessRole} />
                    </Col>
                </Row>
            );
        } else if (mode === 'View' || props.pView === 'See Open Positions') {
            return (
                <Row>
                    <Col sm={1} style={{ marginTop: '10%' }}>
                        <VerticalBar setMode={setMode} accessRole={props.accessRole} setPView={props.setPView} />
                    </Col>
                    <Col>
                        <ViewJobPosting accessRole={props.accessRole} />
                    </Col>
                </Row>
            );
        } else if (mode === 'Welcome' || props.pView === 'Welcome') {
            return (
                <Welcome setMode={setMode}/>
            );
        } else if (mode === 'Edit') {
            return (
                <Row>
                    <Col sm={1} style={{ marginTop: '10%' }}>
                        <VerticalBar setMode={setMode} accessRole={props.accessRole} setPView={props.setPView} />
                    </Col>
                    <Col>
                        <EditJobPosting />
                    </Col>
                </Row>
            );
        }
    }

    return (
        <Container fluid>
            {changeSubView()}
        </Container>
    );

}

export default JobPosting;