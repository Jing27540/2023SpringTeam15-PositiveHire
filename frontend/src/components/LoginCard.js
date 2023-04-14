import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../base/auth';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';

/**
 * LoginCard component...
 * 
 * @author Isaac Handy
 * @author Jing Huang
 */

// TODO: remove
const LoginCard = (props) => {

    const auth = useAuth();
    const navigate = useNavigate();

    // inputs
    const [employeeNumber, setEmployeeNumber] = useState();
    const [password, setPassword] = useState();
    const [employeeEmail, setEmployeeEmail] = useState();
    const [repeatedPassword, setRepeatedPassword] = useState();

    // switch the login and signup state
    const [signup, setSignup] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");

    // authenticate user
    const checkAuthStatus = async () => {
        setResponseMessage("");
        let role = "";
        let flag;
        let id;

        // await axios.get(`http://localhost:8080/employees/${employeeNumber}`).then(result => {
        //     role = result.data.accessRole;
        // }).catch(err => console.log(err));

        const account = { employeeID: 0, hashedPassword: password, employeeEmail: employeeEmail };
        await axios.post(`http://localhost:8080/accounts/account`, account).then(result => {
            flag = result.data;
            id = result.data.employeeID
        }).catch(err => console.log(err));

        if (id === undefined) {
            auth.login(false);
            setResponseMessage("Employee email or password incorrect");
            // navigate('/');
            return;
        }
        return await axios.get(`http://localhost:8080/employees/${id}`).then(result => {
            role = result.data.accessRole;
            if (flag) {
                if ((props.title === "HR/DEI" && (role === "HR" || role === "DEI"))) {
                    navigate(props.destination);
                    auth.login(true, id, "HR");
                } else if (props.title === "HR/DEI" && (role !== "HR" || role !== "DEI")) {
                    setResponseMessage("This is Not a HR/DEI Account!");
                }
                // else if (props.title === "HR/DEI") {
                //     setResponseMessage("Employee email or password incorrect");
                // } 
                else {
                    navigate("/Home");
                    auth.login(true, id, "Employee");
                }
            }
            // else {
            //     auth.login(false);
            //     setResponseMessage("Employee number or password incorrect");
            //     navigate('/');
            // }
        }).catch(err => setResponseMessage(err))
    };

    // login
    const handleLogin = () => {
        checkAuthStatus();
    }

    // Sign up user
    const signUpUser = async () => {
        setResponseMessage("");

        if (!verifyEmailFormat()) {
            setResponseMessage("Email must have the format 'text@text.text'");
            return (
                <></>
            );
        }

        if (password != repeatedPassword) {
            setResponseMessage("Password and repeat password do not match");
            return (
                <></>
            );
        }

        if (password.length < 8) {
            setResponseMessage("Passwords must be 8 or more characters");
            return (
                <></>
            );
        }

        //Check if there is an employee with the employee number already. If not, do not create new Account
        try {
            await axios.get(`http://localhost:8080/employees/${employeeNumber}`).then(res => {
                //Check if the correct logincard is selected
                if (props.title === "HR/DEI" && res.data.accessRole !== "HR") {
                    setResponseMessage("Employee email or password incorrect");
                    return (<></>);
                } else {
                    const account = { employeeID: employeeNumber, hashedPassword: password, employeeEmail: employeeEmail };
                    axios.post(`http://localhost:8080/accounts`, account).then(result => {
                        let flag = result.data;
                        if (flag) {
                            // auth.login(true);
                            // navigate('/home');
                            setResponseMessage("Account successfully created");
                        } else {
                            // auth.login(false);
                            // navigate('/');
                            setResponseMessage("Account with that employee number already exists");
                        }
                    });
                }
            }).then();
        } catch (err) {
            // console.log();
            setResponseMessage(err.response.data.message);
            return;
        }
    };

    //Signup
    const handleSignUp = () => {
        signUpUser();
        changeView();
    }

    function changeView() {
        signup ? setSignup(false) : setSignup(true);
        // getAccountData();
    }

    function verifyEmailFormat() {
        var valid = false;
        var atSymbol = false;
        let str = employeeEmail;
        for (let i = 0; i < str.length; i++) {
            if (str[i] === "." && atSymbol === false) {
                break;
            } else if (atSymbol === false && str[i] === "@") {
                if (str[i + 1] === ".") {
                    break;
                }
                atSymbol = true;
            } else {
                if (str[i] === "." && atSymbol === true) {
                    if ((i + 1) === str.length) {
                        break;
                    }
                    valid = true;
                    break;
                }
            }
        }

        return valid;
    }

    return (
        <Form>
            <h1>{props.title}</h1>
            <Form.Group className="mb-3" controlId="formEmployeeEmail">
                <FloatingLabel controlId="floatingInput" label="Employee@Email.com" className="mb-3" onChange={e => { setEmployeeEmail(e.target.value); }}>
                    <Form.Control placeholder="Enter Employee Email" />
                </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmployeePassword">
                <FloatingLabel controlId="floatingPassword" label="Employee Password" onChange={e => { setPassword(e.target.value); }}>
                    <Form.Control size="lg" type="password" placeholder="Password" />
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
                            <Form.Group className="mb-3" controlId="formEmployeeNumber">
                                <FloatingLabel controlId="floatingInput" label="Employee Number" className="mb-3" onChange={e => { setEmployeeNumber(e.target.value); }}>
                                    <Form.Control type="password" placeholder="Enter Employee Number" />
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
                            <label>{responseMessage}</label>
                        </>
                    )
            }
        </Form>
    );
}

export default LoginCard;