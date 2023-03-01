import React from 'react';
import styled from "styled-components";
import FloatingLabel from 'react-bootstrap-floating-label';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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

function EditForm(props) {

    const skillFields = ['Name', 'Level', 'Score'];
    const certificationFields = ['Name', 'Institution', 'IssuedDate', 'CredentialID', 'Skils'];

    // TODO: hard code 
    const data = [{ name: "c#", level: "Expert", score: "5", }, { name: "Communication", level: "Advanced", score: "3", }];
    const [skill, setSkill] = React.useState('Name');
    const [certification, setCertification] = React.useState('Name');
    // To switch between certification or skill mode
    const [mode, setMode] = React.useState(false);

    return (
        <div>
            <Box>
                <Content>
                    {
                        mode ? // skill mode
                            (
                                skillFields.map((item, index) => {
                                    if (item === 'Name' && !props.addMode) {
                                        return (
                                            <Form.Control
                                                key={index}
                                                as="select"
                                                value={skill}
                                                style={{ width: "390px", margin: '10px', height: '50px' }}
                                                onChange={e => { setSkill(e.target.value); }}
                                            >
                                                <option value="Skill1">Skill1</option>
                                                <option value="Skill2">Skill2</option>
                                                <option value="Skill3">Skill3</option>
                                            </Form.Control>
                                        );
                                    } else {
                                        return (

                                            <TextField key={index}>
                                                <FloatingLabel label={item}>
                                                    <Form.Control placeholder={item} />
                                                </FloatingLabel>
                                            </TextField>

                                        );
                                    }
                                })
                            )
                            :
                            (   // certification mode
                                certificationFields.map((item, index) => {
                                    if (item === 'Name' && !props.addMode) {
                                        return (
                                            <Form.Control
                                                as="select"
                                                key={index}
                                                value={certification}
                                                style={{ width: "390px", margin: '10px', height: '50px' }}
                                                onChange={e => { setCertification(e.target.value); }}
                                            >
                                                <option value="Certificiation1">Certificiation1</option>
                                                <option value="Certificiation2">Certificiation2</option>
                                                <option value="Certificiation3">Certificiation3</option>
                                            </Form.Control>
                                        );
                                    } else {
                                        return (
                                            <TextField key={index}>
                                                <FloatingLabel label={item}>
                                                    <Form.Control placeholder={item} />
                                                </FloatingLabel>
                                            </TextField>
                                        );
                                    }
                                })
                            )
                    }
                    {
                        (mode) ?
                            <ButtonDiv>
                                <Button variant="outline-primary" onClick={() => { setMode(false) }}>Skill Mode</Button>
                            </ButtonDiv>
                            :
                            <ButtonDiv>
                                <Button variant="outline-primary" onClick={() => { setMode(true) }}>Certification Mode</Button>
                            </ButtonDiv>

                    }
                </Content>
            </Box>
        </div >
    );
}

export default EditForm;