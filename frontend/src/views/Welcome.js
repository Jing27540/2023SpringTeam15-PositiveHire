import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
/**
 * Welcome component is the first screen the user see when they is directed to the PHBalanced app.
 * @author Jing Huang
 */
function Welcome() {

    //className="border border-secondary" 
    return (
        <Container style={{ marginTop: '5%', height: '500px', width: '90%' }}>
            <Row style={{ height: '40px', backgroundColor: "#0f123F", color: 'white', fontWeight: 'bold', justifyContent: 'center', placeItems: 'center' }}>
                WELCOME BACK!
            </Row>
            <Row className="justify-content-between" style={{ height: 'auto' }}>
                <Col sm={5} className="border border-2" style={{ marginTop: '5%' }}>
                    <Row style={{ height: '40px', backgroundColor: "#0f123F", color: 'white', fontWeight: 'bold', justifyContent: 'center', placeItems: 'center' }}>
                        Positions
                    </Row>
                    <img variant="top" src={require("../img/openPositions.png")} style={{ width: "100%" }}></img>
                    <Button variant="outline-success" style={{ margin: "2%" }} onClick={() => alert('Not implement yet!')}>
                        View Open Positions
                    </Button>
                </Col>
                <Col sm={5} className="border border-2" style={{ marginTop: '5%' }}>
                    <Row style={{ height: '40px', backgroundColor: "#0f123F", color: 'white', fontWeight: 'bold', justifyContent: 'center', placeItems: 'center' }}>
                        Training Program
                    </Row>
                    <img variant="top" src={require("../img/trainingProgram.jpeg")} style={{ width: "100%" }}></img>
                    <Button variant="outline-success" style={{ margin: "2%" }} onClick={() => alert('Not implement yet!')}>
                        View Training Programs
                    </Button>
                </Col>
            </Row>
            <Row style={{ marginTop: '5%', height: '40px', backgroundColor: "#0f123F", color: 'white', fontWeight: 'bold', justifyContent: 'center', placeItems: 'center' }}>
                Reports
            </Row>
            <img variant="top" src={require("../img/report2.png")} style={{ width: "100%" }}></img>
            <Button variant="outline-success" style={{ margin: "2%" }} onClick={() => alert('Not implement yet!')}>
                View Reports
            </Button>
        </Container>
    );
}

export default Welcome;