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

        return await axios.get(`http://localhost:8080/employees/${id}`).then(result => {
            role = result.data.accessRole;
            if (flag) {
                if ((role === "HR" || role === "DEI") && props.title === "HR/DEI") {
                    navigate(props.destination);
                    auth.login(true, id, "HR");
                } else {
                    navigate("/Home");
                    auth.login(true, id, "Employee");
                }
            } else {
                auth.login(false);
                setResponseMessage("Employee number or password incorrect");
                navigate('/');
            }
        }).catch(err => setResponseMessage(err))
    };

    // login
    const handleLogin = () => {
        checkAuthStatus();
    }

    // Sign up user
    const signUpUser = async () => {
        setResponseMessage("");
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
        console.log(employeeNumber);
        try {
            await axios.get(`http://localhost:8080/employees/${employeeNumber}`);
        } catch (err) {
            // console.log();
            setResponseMessage(err.response.data.message);
            return;
        }

        const account = { employeeID: employeeNumber, hashedPassword: password, employeeEmail: employeeEmail };
        return await axios.post(`http://localhost:8080/accounts`, account).then(result => {
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

    return (
        <Form>
            <h1>{props.title}</h1>
            <Form.Group className="mb-3" controlId="formEmployeeEmail">
                <FloatingLabel controlId="floatingInput" label="Employee Email" className="mb-3" onChange={e => { setEmployeeEmail(e.target.value); }}>
                    <Form.Control placeholder="Enter Employee Email" />
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
                            <Form.Group className="mb-3" controlId="formEmployeeNumber">
                                <FloatingLabel controlId="floatingInput" label="Employee Number" className="mb-3" onChange={e => { setEmployeeNumber(e.target.value); }}>
                                    <Form.Control placeholder="Enter Employee Number" />
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

    // For testing
    // function getAccountData() {
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

    // console.log(employeeNumber);
    // try {
    //     axios.get(`http://localhost:8080/employees/${employeeNumber}`).then(result => {
    //         let resp = result.data;
    //         console.log(resp);
    //     });
    // } catch (err) {
    //     console.log("Recieved error");
    //     setResponseMessage(err.response);
    // }

    // }

    // console.log(props);

    // getAccountData();

    // useEffect(()=>{
    //     axios.get(`http://localhost:8080/accounts/${employeeNumber}`).then(result => {
    //                 setAccountData(result.data);
    //                 console.log(accountData);
    //             });
    // }, []);
}

export default LoginCard;