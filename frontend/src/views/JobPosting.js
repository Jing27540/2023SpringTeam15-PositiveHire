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

function JobPosting() {

    const [mode, setMode] = React.useState('Welcome');
    const [childMode, setChildMode] = React.useState("JobTitle");

    console.log(childMode);
    return (
        <Container fluid>
            <Row>
                <Col sm={1} style={{ marginTop: '10%' }}>
                    <VerticalBar setMode={setMode} setChildMode={setChildMode}/>
                </Col>
                <Col>
                    {mode === 'Create' ?
                        <CreateJobPosting mode={childMode} />
                        :
                        mode === 'Welcome' ?
                            <Welcome />
                            :
                            mode === 'View' ?
                                <ViewJobPosting />
                                :
                                undefined
                    }
                </Col>
            </Row>
        </Container>
    );

}

export default JobPosting;