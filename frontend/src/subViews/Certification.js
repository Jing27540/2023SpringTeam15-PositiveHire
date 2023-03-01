import React from "react";
import styled from "styled-components";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import EditForm from './EditForm';
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

function Certification() {
    return (
        <div>
            <Box>
                <Container style={{ width: "60%", justifyContent: "space-between" }}>
                    <Row style={{ textAlign: 'left' }}>
                        {/* <Col style={{ fontSize: '15px', float: 'left' }}>Updated: Dec 30, 2022</Col> */}
                        <Col>
                            <Button size="sm" style={{ backgroundColor: "#0f123F", borderColor: "#0f123F", float: 'left', width: '100px' }} >
                                Add
                            </Button>
                        </Col>
                        <Col>
                            <Button size="sm" style={{ backgroundColor: "#0f123F", borderColor: "#0f123F", float: 'right', width: '100px' }}>
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
            </Box>
        </div>

    );
}

export default Certification;