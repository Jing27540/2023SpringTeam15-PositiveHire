import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../base/auth';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

/**
 * LoginCard component...
 * 
 * @author Isaac Handy
 * @author Jing Huang
 */

// TODO: remove
const EMPLOYEENUM = "1234";
const PASSWORD = '1234';
const LoginCard = (props) => {

    const auth = useAuth();
    const navigate = useNavigate();

    // inputs
    const [employeeNumber, setEmployeeNumber] = useState();
    const [password, setPassword] = useState();
    const [accountData, setAccountData] = useState();
    const [repeatedPassword, setRepeatedPassword] = useState();
    const [error, setError] = useState('');

    // switch the login and signup state
    const [signup, setSignup] = useState(false);
    const [responseMessage, setResponseMessage] = useState("Hi");

    // authenticate user
    const checkAuthStatus = async () => {
        const account = { employeeID: employeeNumber, hashedPassword: password };
        return await axios.post(`http://localhost:8080/accounts/account`, account).then(result => {
            let flag = result.data;
            if (flag) {
                auth.login(true);
                navigate('/home');
            } else {
                auth.login(false);
                navigate('/');
            }
        });
    };

    // login
    const handleLogin = () => {
        checkAuthStatus();
    }

    // authenticate user
    const signUpUser = async () => {
        if (password != repeatedPassword) {
            setResponseMessage("Password and repeat password do not match");
            return (
                <></>
            );
        }

        const account = { employeeID: employeeNumber, hashedPassword: password };
        return await axios.post(`http://localhost:8080/accounts`, account).then(result => {
            let flag = result.data;
            if (flag) {
                // auth.login(true);
                // navigate('/home');
                responseMessage("Account successfully created");
            } else {
                // auth.login(false);
                // navigate('/');
                responseMessage("Account with that employee number already exists");
            }
        });
    };

    //Signup
    const handleSignUp = () => {
        signUpUser();
        changeView();
    }

    function changeView() {
        signup ? setSignup(false) : setSignup(true);
    }

    // For testing
    function getAccountData() {
        // axios.post(`http://localhost:8080/accounts/account`, { employeeID: employeeNumber, hashedPassword: password }).then(result => {
        //     setAccountData(result.data);
        //     console.log(accountData);
        // });

        // axios.get(`http://localhost:8080/accounts`,).then(result => {
        //     setAccountData(result.data);
        //     console.log(accountData);
        // });

        // axios.put(`http://localhost:8080/accounts`, { employeeID: employeeNumber, hashedPassword: password }).then(result => {
        //     setAccountData(result.data);
        //     console.log(accountData);
        // });
    }

    // console.log(props);

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
                <FloatingLabel controlId="floatingInput" label="Employee Number" className="mb-3" onChange={e => { setEmployeeNumber(e.target.value); }}>
                    <Form.Control placeholder="Enter Employee Number" />
                </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmployeePassword">
                <FloatingLabel controlId="floatingPassword" label="Employee Password" onChange={e => { setPassword(e.target.value); }}>
                    <Form.Control size="lg" type="employee password" placeholder="Password" />
                </FloatingLabel>
            </Form.Group>
            {
                signup ?
                    (
                        <>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <FloatingLabel controlId="floatingPasswordRepeat" label="RepeatPassword">
                                    <Form.Control size="lg" type="password" placeholder="RepeatPassword" onChange={e => { setRepeatedPassword(e.target.value); }} />
                                </FloatingLabel>
                            </Form.Group>
                            <Button variant="primary" onClick={handleSignUp} style={{ width: '200px', height: '50px' }}>
                                Submit
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="primary" style={{ width: '200px', height: '50px' }} onClick={handleLogin}>
                                Login
                            </Button>
                            <div style={{ display: 'flex', height: '10px' }}>
                            </div>
                            <Button variant="primary" onClick={changeView} style={{ width: '200px', height: '50px' }}>
                                Sign Up
                            </Button>
                            <div style={{ display: 'flex', height: '10px' }}></div>
                            {/* <label>{responseMessage.value}</label> */}
                        </>
                    )
            }
        </Form>
    );
}

export default LoginCard;