import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TabsBar from '../components/TabsBar';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import NavBar from "../components/NavBar";

const WhiteSpace = styled.div`
    display: flex;
    height: 10px;
`

const Box = styled.div`
    display: flex;
    margin: 5px;
    height: 50%;
    width: 100%;
    overflow: auto;
`

const SideBox = styled.div`
    width: 20%;
    float: left;
`;

function BasicLoginPage() {

const [signup, setSignup] = React.useState(false);

  return (
    <>
    <NavBar/>
    <Box>
      <SideBox></SideBox>

      <Form>

        <h1>Employee</h1>

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

        <Form.Group className="mb-3" controlId="formPassword">
            <FloatingLabel controlId="floatingPasswordRepeat" label="RepeatPassword">
                <Form.Control size="lg" type="password" placeholder="RepeatPassword" disabled />
            </FloatingLabel>
        </Form.Group>
        
        <Button variant="primary" type="submit" style={{ width: '200px', height: '50px' }}>
          Login
        </Button>
        <WhiteSpace></WhiteSpace>
        <Button variant="primary" type="submit" style={{ width: '200px', height: '50px' }}>
          Sign Up
        </Button>
      </Form>

      <SideBox></SideBox>

      <Form>

      <h1>HR/DEI</h1>

        <Form.Group className="mb-3" controlId="formHREmail">
          <FloatingLabel controlId="floatingInput" label="HR Number" className="mb-3">
            <Form.Control type="hr number" placeholder="0123456789" />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formHRPassword">
          <FloatingLabel controlId="floatingPassword" label="HR Password">
            <Form.Control size="lg" type="hr password" placeholder="Password" />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
            <FloatingLabel controlId="floatingPasswordRepeat" label="RepeatPassword">
                <Form.Control size="lg" type="password" placeholder="RepeatPassword" disabled />
            </FloatingLabel>
        </Form.Group>
        
        <Button variant="primary" type="submit" style={{ width: '200px', height: '50px' }}>
          Login
        </Button>
        <WhiteSpace></WhiteSpace>
        <Button variant="primary" type="submit" style={{ width: '200px', height: '50px' }}>
          Sign Up
        </Button>
      </Form>
    </Box>

    </>
  );
}

export default BasicLoginPage;