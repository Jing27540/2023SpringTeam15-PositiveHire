import React from 'react';
import styled from "styled-components";
import FloatingLabel from 'react-bootstrap-floating-label';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getAllEmployees, getEmployeeById } from '../clients/employee';
import { GrDocumentCsv } from "react-icons/gr";
/**
 * Create EditProfile Form for user to update their profile
 * @author Jing Huang
 */
// TODO: hard code, should be remove later
const height = window.innerHeight;

const Box = styled.div`
    margin: 5px;
    overflow: auto;
`

const Content = styled.div`
    width: 90%;
    margin: 2%;
    border: 1px solid #808080;
`;

const TextField = styled.div`
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
    width: 80%;
`;


const jobHistoryFields = ['Role', 'Select', 'StartDate', 'EndDate'];
const EducationFields = ['Institution', 'Address', 'StartDate', 'EndDate'];

function EditProfile() {

    // console.log('Testing')
    // let employees = [];
    // getAllEmployees(employees);
    // console.log('checking get all employees', employees);

    // let employee = [];
    // getEmployeeById(employee, 54645294);
    // console.log(employee);

    // TODO: it works
    // deleteEmployeeById(54645294);

    // employees = [];
    // getAllEmployees(employees);
    // console.log('checking delete employee by id', employees);


    // TODO: hard code 
    const data = [{ name: "c#", level: "Expert", score: "5", }, { name: "Communication", level: "Advanced", score: "3", }];
    const [role, setRole] = React.useState('role');

    return (
        <div>
            <TextField><h4 className="editProfileForm">Edit Profile</h4></TextField>
            <Box>
                <Content>
                    <TextField><h6>Job History</h6></TextField>
                    {
                        jobHistoryFields.map((item, index) => {
                            if (item === 'Role') {
                                return (
                                    <Form.Control
                                        key={index}
                                        as="select"
                                        value={role}
                                        style={{ width: "80%", margin: '10px', height: '50px' }}
                                        onChange={e => { setRole(e.target.value); }}
                                    >
                                        <option value="role1">role1</option>
                                        <option value="role2">role2</option>
                                        <option value="role3">role3</option>
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
                    }
                </Content>
                <Content>
                    <TextField><h6>Education Hisotry</h6></TextField>
                    {
                        EducationFields.map((item, index) => {
                            if (item === 'Institution') {
                                return (
                                    <Form.Control
                                        key={index}
                                        as="select"
                                        value={role}
                                        style={{ width: "80%", margin: '10px', height: '50px' }}
                                        onChange={e => { setRole(e.target.value); }}
                                    >
                                        <option value="role1">role1</option>
                                        <option value="role2">role2</option>
                                        <option value="role3">role3</option>
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
                    }

                </Content>
                <Content>
                    <TextField><h6>Upload Resume</h6></TextField>
                    <div style={{ marginLeft: '10%' }}>
                        <Row className="justify-content-md-center">
                            <Col>
                                <div >
                                    <h1><GrDocumentCsv /></h1>
                                    <p className="text-black">Drag and drop a CSV file here, or click here to select files</p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Content>
            </Box>
        </div>
    );
}

export default EditProfile;