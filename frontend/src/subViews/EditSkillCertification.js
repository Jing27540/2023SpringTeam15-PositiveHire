import React from 'react';
import styled from "styled-components";
import FloatingLabel from 'react-bootstrap-floating-label';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getAllEmployees, getEmployeeById, deleteEmployeeById, saveEmployee } from '../clients/employee';

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

function EditSkillCertification(props) {

    const skillFields = ['Name', 'Level', 'Score'];
    const certificationFields = ['Name', 'Institution', 'IssuedDate', 'CredentialID', 'Skils'];

    // TODO: hard code 
    const data = [{ name: "c#", level: "Expert", score: "5", }, { name: "Communication", level: "Advanced", score: "3", }];

    const [mode, setMode] = React.useState(false);

    return (
        <div>
            <Box>
                <Content>

                    {
                        mode ?
                            certificationFields.map(item => {
                                if (item === 'Name') {
                                    if (props.addMode) {
                                        return (
                                            <Form.Select aria-label="Default select example">
                                                <option>Name</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        );
                                    } else {
                                        return (
                                            <TextField key={item} >
                                                <FloatingLabel key={item} label={item}>
                                                    <Form.Control placeholder={item} as='select' />
                                                </FloatingLabel>
                                            </TextField>
                                        );
                                    }

                                } else {
                                    return (
                                        <TextField key={item} >
                                            <FloatingLabel key={item} label={item}>
                                                <Form.Control placeholder={item} as='select' />
                                            </FloatingLabel>
                                        </TextField>
                                    );
                                }


                            })
                            :
                            skillFields.map(item => {
                                return (
                                    <TextField key={item}>
                                        <FloatingLabel key={item} label={item}>
                                            <Form.Control placeholder={item} />
                                        </FloatingLabel>
                                    </TextField>
                                );
                            })
                    }
                    <ButtonDiv>
                        <Button variant="outline-primary" onClick={() => { setMode(false) }}>Skill Mode</Button>
                    </ButtonDiv>
                    <ButtonDiv>
                        <Button variant="outline-primary" onClick={() => { setMode(true) }}>Certification Mode</Button>
                    </ButtonDiv>

                </Content>
            </Box>
        </div>
    );
}

export default EditSkillCertification;