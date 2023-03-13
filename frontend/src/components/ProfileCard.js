import Card from 'react-bootstrap/Card';
import styled from "styled-components";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getEmployeeById } from '../clients/employee';
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
    integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
//import Stack from 'react-bootstrap/Stack';

const Box = styled.div`
    display: flex;
    margin: 10px;
    border: none;
    overflow: auto;
`
// const Stack = styled.div`
//     padding: 5px;
//     width: 100%;
//     border: none;
// `
const SideBox = styled.div`
    float: left;
`;

//let hist = "Employed for" + (props.employee.daysEmployed / 365) + "years, " + (props.employee.daysEmployed / 30) + "months";

function ProfileCard(props) {

    //  console.log(props.employee);
    // let currEmployee = [];
    // getEmployeeById(currEmployee, props.employee.employeeNum);
    // console.log(currEmployee);

    let hist = "Employed for ";
    if (props.employee.daysEmployed && props.employee.daysEmployed > 0) {
        if (Math.round(props.employee.daysEmployed / 365) >= 2) {
            hist += Math.round(props.employee.daysEmployed / 365) + " years, ";
        } else {
            hist += Math.round(props.employee.daysEmployed / 365) + " year, "
        }
        if (Math.round((props.employee.daysEmployed % 365) / 30) >= 2) {
            hist += Math.round((props.employee.daysEmployed % 365) / 30) + " months"
        } else {
            hist += Math.round((props.employee.daysEmployed % 365) / 30) + " month";
        }
    } else {
        hist += 0;
    }

    let dept = " " + props.employee.department;
    let name = props.employee['employeeName'].split(" ");

    let firstName = name[1];
    let lastName = name[0];

    let fullName = firstName + " " + lastName;
    return (
        <Card style={{ width: '100%', height: '100%' }} className="col-md-5 mx-auto">
            <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                <img variant="top" src={require("../img/profile_img.png")} style={{ width: '300px', height: '300px' }}></img>
            </Row>
            <Card.Body>
                <Container>
                    <Row style={{ textAlign: 'center' }}>
                        <h3>{fullName}</h3>
                    </Row>
                    <Row style={{ justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>
                        {props.employee.position}
                    </Row>
                    <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                        {hist}
                    </Row>
                    <Row style={{ justifyContent: 'center', alignItems: 'center', marginLeft: '3%' }}>
                        <Row style={{ fontSize: '12px', textAlign: 'left' }}>
                            <Col>
                                Department
                            </Col>
                            <Col style={{ fontWeight: 'bold' }}>
                                {dept}
                            </Col>
                        </Row>
                        <Row style={{ fontSize: '12px', textAlign: 'left' }}>
                            <Col>
                                Office Location
                            </Col>
                            <Col style={{ fontWeight: 'bold' }}>
                                {props.employee.state}
                            </Col>
                        </Row>
                        <Row style={{ fontSize: '12px', textAlign: 'left' }}>
                            <Col>
                                Reports To
                            </Col>
                            <Col style={{ fontWeight: 'bold' }}>
                                {props.employee.managerName}
                            </Col>
                        </Row>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    );
}

export default ProfileCard;