import React from 'react';
import styled from "styled-components";
import FloatingLabel from 'react-bootstrap-floating-label';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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
    border: 1px solid black;
    overflow: auto;
`

const SubBox = styled.div`
    width: 50%;
    heigth: ${height};
`;

const Content = styled.div`
    align-items: center;
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

function EditProfile() {

    console.log('Testing')
    let response = [];

    let loadData = () => {
        
        axios.get(`http://localhost:8080/employees`).then(result => {
             result.data.forEach(element => {
                 response.push(element);
             })
            
        }

        );
       // console.log(response);

      //  return response.data;
    };

    loadData();
    console.log(response);
    // TODO: hard code 
    let responseT;
    let getData = () => {
        
        axios.get(`http://localhost:8080/employees/54645354`).then( result => {
     //       response.push(result.data);
        });
            
        
        //(responseT);
        
       // console.log(response);

      //  return response.data;
    };
    getData();
    //console.log(responseT);
   
    
    console.log(response);

    const generalFields = ['EmployName', 'Role', 'EmployeeNumber', 'GenderID'];
    const skillFields = ['Name', 'Level', 'Score'];
    const certificationFields = ['Name', 'Institution', 'IssuedDate', 'CredentialID', 'Skils'];

    // TODO: hard code 
    const data = [{ name: "c#", level: "Expert", score: "5", }, { name: "Communication", level: "Advanced", score: "3", }];

    const [mode, setMode] = React.useState(false);

    return (
        <div>
            <TextField><h4 class="editProfileForm">Profile Editing Form</h4></TextField>
            <Box>
                <SubBox>
                    <TextField><h5 class="generalForm">General Profile</h5></TextField>
                    <Content>
                        {
                            generalFields.map(item => {
                                return (
                                    <TextField>
                                        <FloatingLabel key={item} label={item}>
                                            <Form.Control placeholder={item} />
                                        </FloatingLabel>
                                    </TextField>
                                );
                            })
                        }
                    </Content>
                </SubBox>
                <SubBox>
                    <TextField><h5 class="otherForm">Skills and Certification</h5></TextField>
                    <Content>
                        {mode ?
                            certificationFields.map(item => {
                                return (
                                    <TextField>
                                        <FloatingLabel key={item} label={item}>
                                            <Form.Control placeholder={item} />
                                        </FloatingLabel>
                                    </TextField>
                                );
                            })
                            :
                            skillFields.map(item => {
                                return (
                                    <TextField>
                                        <FloatingLabel key={item} label={item}>
                                            <Form.Control placeholder={item} />
                                        </FloatingLabel>
                                    </TextField>
                                );
                            })
                        }
                    </Content>
                    <ButtonDiv>
                        <Button variant="outline-primary" onClick={() => { setMode(false) }}>Add Skill</Button>
                    </ButtonDiv>
                    <ButtonDiv>
                        <Button variant="outline-primary" onClick={() => { setMode(true) }}>Add Certification</Button>
                    </ButtonDiv>

                </SubBox>

            </Box>

        </div>
    );
}

export default EditProfile;