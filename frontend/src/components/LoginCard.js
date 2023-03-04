import {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import React from 'react';
import axios from 'axios';
import account from '../clients/account';

const LoginCard = (props) => {

const [signup, setSignup] = useState(false);

const [employeeNumber, setEmployeeNumber] = useState("1357");

const [password, setPassword] = useState();

console.log(employeeNumber, password);

const [accountData, setAccountData] = useState();

function changeView() {
    signup ? setSignup(false) : setSignup(true);
}

function getAccountData() {
    axios.get(`http://localhost:8080/accounts/${employeeNumber}`).then(result => {
                setAccountData(result.data);
                console.log(accountData);
            });
}

function autheticateUser() {
    //Check if text field is empty or not

    //When text fields are not empty
    getAccountData();
    // if (accountData.password) {

    // }

    props.setIsLoggedIn(true);
}

console.log(props);

// getAccountData();

// useEffect(()=>{
//     axios.get(`http://localhost:8080/accounts/${employeeNumber}`).then(result => {
//                 setAccountData(result.data);
//                 console.log(accountData);
//             });
// }, []);

    return (
        <Form>

            <h1>{props.title}</h1>

            <Form.Group className="mb-3" controlId="formEmployeeNumber">
              <FloatingLabel controlId="floatingInput" label="Employee Number" className="mb-3" 
              onChange={e => setEmployeeNumber(e.target.value)}>
                <Form.Control type="employee number" placeholder="0123456789" />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmployeePassword">
              <FloatingLabel controlId="floatingPassword" label="Employee Password" 
              onChange={e => setPassword(e.target.value)}>
                <Form.Control size="lg" type="employee password" placeholder="Password" />
              </FloatingLabel>
            </Form.Group>

            {
                signup ?
                (
                    <>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <FloatingLabel controlId="floatingPasswordRepeat" label="RepeatPassword">
                                <Form.Control size="lg" type="password" placeholder="RepeatPassword" />
                            </FloatingLabel>
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={changeView} style={{ width: '200px', height: '50px' }}>
                        Submit
                        </Button>

                    </>
                ) : (
                    <>
                        <Button variant="primary" type="submit" style={{ width: '200px', height: '50px' }} onClick={props.handleChange(true)}>
                        Login
                        </Button>
                        <div style={{ display: 'flex', height: '10px' }}>

                        </div>
                        <Button variant="primary" onClick={changeView} style={{ width: '200px', height: '50px' }}>
                        Sign Up
                        </Button>
                    </>
                )
            }
        </Form>
    );
}

export default LoginCard;