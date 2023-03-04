import {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import React from 'react';

const LoginCard = (props) => {

const [signup, setSignup] = useState(false);

function changeView() {
    signup ? setSignup(false) : setSignup(true);
}

    return (
        <Form>

            <h1>{props.title}</h1>

            <Form.Group className="mb-3" controlId="formEmployeeNumber">
              <FloatingLabel controlId="floatingInput" label="Employee Number" className="mb-3">
                <Form.Control type="employee number" placeholder="0123456789" />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmployeePassword">
              <FloatingLabel controlId="floatingPassword" label="Employee Password">
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
                        <Button variant="primary" type="submit" style={{ width: '200px', height: '50px' }}>
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