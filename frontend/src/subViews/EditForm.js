import React from 'react';
import styled from "styled-components";
import FloatingLabel from 'react-bootstrap-floating-label';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

/**
 * Create EditProfile Form for user to update their profile
 * @author Jing Huang
 */
// TODO: hard code, should be remove later
const height = window.innerHeight;

const Box = styled.div`
    display: flex;
    margin: 5px;
    overflow: auto;
`

const Content = styled.div`
    align-items: center;
    width: 100%;
`;

const TextField = styled.div`
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
    width: 85%;
`;

const ButtonDiv = styled.div`
    margin: 10px;
    justify-content: space-btween;
`;

const skillFields = ['Name', 'Level', 'Score'];
const data = [{ name: "c#", level: "Expert", score: "5", }, { name: "Communication", level: "Advanced", score: "3", }];
const certificationFields = ['Name', 'Institution', 'IssuedDate', 'CredentialID', 'Skils'];
function EditForm(props) {

    const [employee, setEmployee] = React.useState(props.employee);
    const [mode, setMode] = React.useState(props.mode); // To switch between certification or skill mode
    const [type, setType] = React.useState();
    const [sname, setSName] = React.useState();
    const [level, setLevel] = React.useState();
    const [score, setScore] = React.useState();
    
    const [cname, setCName] = React.useState();
    const [institution, setInstitution] = React.useState();
    const [issuedDate, setIssuedDate] = React.useState();
    const [credentialID, setCredentialID] = React.useState();
    const [skils, setSkils] = React.useState();

    function addNewSkill() {
        if (type !== undefined && sname !== undefined && level !== undefined && score !== undefined) {
            let newSkill = {
                name: sname,
                level: level,
                score: score
            }

            console.log(newSkill);
        }
    }
    
    return (
        <div>
            <Box>
                <Content>
                    {
                        (mode) ?
                            <>
                                <Form.Select aria-label="Default select example" id="type" onChange={e => setType(e.target.value)} style={{ margin: '2%', width: '95%' }}>
                                    <option>Skill Type</option>
                                    <option value="technicalSkills">TechnicalSkills</option>
                                    <option value="peopleSkills">PeopleSkills</option>
                                    <option value="workEthic">WorkEthic</option>
                                </Form.Select>
                                {(props.addMode) ?
                                    <FloatingLabel label="Name" id="sname" onChange={e => setSName(e.target.value)} style={{ margin: '2%' }} />
                                    :
                                    <Form.Select aria-label="Default select example" id="sname" onChange={e => setSName(e.target.value)} style={{ margin: '2%', width: '95%' }}>
                                        <option>Skill Name</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                }
                                <FloatingLabel label="Level" id="level" onChange={e => setLevel(e.target.value)} style={{ margin: '2%' }} />
                                <FloatingLabel label="Score" id="score" onChange={e => setScore(e.target.value)} style={{ margin: '2%' }} />
                            </>
                            :
                            //'Name', 'Institution', 'IssuedDate', 'CredentialID', 'Skils'
                            <>
                                {(props.addMode) ?
                                    <FloatingLabel label="Name" id="cname" onChange={e => setCName(e.target.value)} style={{ margin: '2%' }} />
                                    :
                                    <Form.Select aria-label="Default select example" id="cname" onChange={e => setCName(e.target.value)} style={{ margin: '2%', width: '95%' }}>
                                        <option>Certification Name</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                }
                                <FloatingLabel label="Institution" id="institution" onChange={e => setInstitution(e.target.value)} style={{ margin: '2%' }} />
                                <FloatingLabel label="IssuedDate" id="issuedDate" onChange={e => setIssuedDate(e.target.value)} style={{ margin: '2%' }} />
                                <FloatingLabel label="CredentialID" id="credentialID" onChange={e => setCredentialID(e.target.value)} style={{ margin: '2%' }} />
                                <FloatingLabel label="Skils" id="skils" onChange={e => setSkils(e.target.value)} style={{ margin: '2%' }} />
                            </>
                    }
                </Content>
            </Box >
        </div >
    );
}

export default EditForm;