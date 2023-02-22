import React from "react";
import styled from "styled-components";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * Skill component to show Employee skill information.
 * @author Jing Huang
 */

// TODO: Dummy Data
const TS = [{ skill: 'C#', level: 'Expert', score: '4' },
{ skill: 'Docker', level: 'Expert', score: '4' },
{ skill: 'JavaScript', level: 'Advanced', score: '3' },
{ skill: 'Microsoft SQL Server', level: 'Advanced', score: '3' },
{ skill: 'Accountability', level: 'Advanced', score: '4' },
];
const PS = [{ skill: 'Communication', level: 'Advanced', score: '2' },
{ skill: 'Mentoring', level: 'Intermediate', score: '2' },
];

const WE = [{ skill: 'Cirtical Thinking', level: 'Advanced', score: '3' },
{ skill: 'Detail-Oriented', level: 'Intermediate', score: '2' },
{ skill: 'Efficiency', level: 'Advanced', score: '3' }
];

const Box = styled.div`
    display: flex;
    height: 100%;
    min-width: 220vh;
    justify-content: center;
   // border: 1px solid black;
`;

const SideBoxB = styled.div`
    width: 40%
    float: left;
    margin: 1%;
    border: 1px solid black;
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

function Skill() {
    return (
        <div>
            <Box>
                <Container style={{ width: "60%", justifyContent: "space-between", alignItems: 'left' }}>
                    <Row style={{ marginBottom: "10px", fontSize: '15px' }}>Updated: Dec 30, 2022</Row>
                    <Row style={{ textAlign: 'left', margin: '2%', backgroundColor: "#0F123F", color: "white", height: "50px", borderRadius: 10, fontWeight: 'bold', alignItems: 'center' }}>
                        <Col>Skills</Col>
                        <Col>Level</Col>
                        <Col>Score</Col>
                    </Row>
                    <Row style={{ fontWeight: 'bold', fontSize: '18px', margin: "10px" }}>Technique Skills</Row>
                    <HorizontalLine></HorizontalLine>
                    {TS.map((item) => {
                        return (
                            <Row key={item} style={{ textAlign: 'left', margin: '2%' }}>
                                <Col>{item.skill}</Col>
                                <Col>{item.level}</Col>
                                <Col>{item.score}</Col>
                            </Row>
                        );
                    })}
                    <Row style={{ fontWeight: 'bold', fontSize: '18px', margin: "10px" }}>People Skills</Row>
                    <HorizontalLine></HorizontalLine>
                    {PS.map((item) => {
                        return (
                            <Row key={item} style={{ textAlign: 'left', margin: '2%' }}>
                                <Col>{item.skill}</Col>
                                <Col>{item.level}</Col>
                                <Col>{item.score}</Col>
                            </Row>
                        );
                    })}
                    <Row style={{ fontWeight: 'bold', fontSize: '18px', margin: "10px" }}>Work Ethics</Row>
                    <HorizontalLine></HorizontalLine>
                    {WE.map((item) => {
                        return (
                            <Row key={item} style={{ textAlign: 'left', margin: '2%' }}>
                                <Col>{item.skill}</Col>
                                <Col>{item.level}</Col>
                                <Col>{item.score}</Col>
                            </Row>
                        );
                    })}
                </Container>
                <VerticleLine></VerticleLine>
                <Container>
                    <Row>
                        <Col xs>Skill</Col>
                        <Col xs>Level</Col>
                        <Col xs>Score</Col>
                    </Row>

                </Container>

            </Box>
        </div>

    );
}

export default Skill;