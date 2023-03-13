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
            <Row style={{ justifyContent: 'between' }}>
                <Col className="border border-2" style={{ marginTop: '5%', height: '300px', marginRight: '5%' }}>
                    <Row style={{ height: '40px', backgroundColor: "#0f123F", color: 'white', fontWeight: 'bold', justifyContent: 'center', placeItems: 'center' }}>
                        Positions
                    </Row>
                    <Row style={{ marginTop: '20%', justifyContent: 'center', placeItems: 'center' }}>
                        <Col>
                            <Button variant="outline-primary" onClick={() => alert('Not implement yet!')}>
                                Create Position Listings
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="outline-success" onClick={() => alert('Not implement yet!')}>
                                Edit Position Listings
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col className="border border-2" style={{ marginTop: '5%', height: '300px', marginLeft: '5%' }}>
                    <Row style={{ height: '40px', backgroundColor: "#0f123F", color: 'white', fontWeight: 'bold', justifyContent: 'center', placeItems: 'center' }}>
                        Training Program
                    </Row>
                    <Row style={{ marginTop: '20%', justifyContent: 'center', placeItems: 'center' }}>
                        <Col>
                            <Button variant="outline-primary" onClick={() => alert('Not implement yet!')}>
                                Create
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="outline-success" onClick={() => alert('Not implement yet!')}>
                                View
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="outline-warning" onClick={() => alert('Not implement yet!')} >
                                Review and Approve
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{ marginTop: '5%', height: '40px', backgroundColor: "#0f123F", color: 'white', fontWeight: 'bold', justifyContent: 'center', placeItems: 'center' }}>
                Reports
            </Row>
            <Row className="border border-2" style={{ height: '200px' }}>
                <Col>
                    <Button variant="outline-primary" onClick={() => alert('Not implement yet!')} >Create</Button>
                </Col>
                <Col>
                    <Button variant="outline-success" onClick={() => alert('Not implement yet!')} >View</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Welcome;