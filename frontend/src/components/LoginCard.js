import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../base/auth';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {sha512} from 'crypto-hash';


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
    const [repeatedPassword, setRepeatedPassword] = useState();
    const [error, setError] = useState('');
    const [accountData, setAccountData] = useState();

    // switch the login and signup state
    const [signup, setSignup] = useState(false);

    // successful to login
    const handleLogin = () => {

        // TODO: Checking if the passward math the data
        let flag = false;

        // if (employeeNumber === EMPLOYEENUM && password === PASSWORD) {
        //     flag = true;
        // }

        //auth.login(flag);
        //navigate('/home'); // Can use useEffect to check value of auth.isAuthenticated
    }

    function changeView() {
        signup ? setSignup(false) : setSignup(true);
    }

    function loginAcc() {
        let finalAccount = {
            employeeID: 1357,
            hashedPassword: sha512("password")
        }

        console.log(finalAccount);

        axios.get(`http://localhost:8080/accounts/login`, finalAccount).then(result => {
            setAccountData(result.data);
            console.log(accountData);
        });
    }

    loginAcc();

    // function getAccountData() {
    //     axios.get(`http://localhost:8080/accounts/${employeeNumber}`).then(result => {
    //         setAccountData(result.data);
    //         console.log(accountData);
    //     });
    // }


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
                            <Button variant="primary" type="submit" onClick={changeView} style={{ width: '200px', height: '50px' }}>
                                Submit
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="primary" type="submit" style={{ width: '200px', height: '50px' }} onClick={handleLogin}>
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