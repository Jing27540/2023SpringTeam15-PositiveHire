import Card from 'react-bootstrap/Card';
import styled from "styled-components";
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
const Stack = styled.div`
    padding: 5px;
    width: 100%;
    border: none;
`
const SideBox = styled.div`
    float: left;
`;
let currEmployee = [];

getEmployeeById(currEmployee, 1103024456);
console.log(currEmployee);


//let hist = "Employed for" + (currEmployee[0].daysEmployed / 365) + "years, " + (currEmployee[0].daysEmployed / 30) + "months";



function ProfileCard() {
    let hist = "Employed for ";
    if(Math.round(currEmployee[0].daysEmployed / 365) >= 2) {
        hist += Math.round(currEmployee[0].daysEmployed / 365) + " years, ";
    } else {
        hist += Math.round(currEmployee[0].daysEmployed / 365) + " year, "
    }
    if(Math.round((currEmployee[0].daysEmployed % 365) / 30) >= 2) {
        hist += Math.round((currEmployee[0].daysEmployed % 365) / 30) + " months"
    } else {
        hist += Math.round((currEmployee[0].daysEmployed % 365) / 30) + " month";
    }

    let dept = " " + currEmployee[0].department;

  return (
    <Card style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} className="col-md-5 mx-auto">
      <Card.Img variant="top" src="../../public/PHBalancedLogo.png" />
      <Card.Body style={{width: '105'}}>
        <h3>{currEmployee[0]['employeeName']}</h3>
            <Box>
                <Stack style={{width: '110%'}}>
                    <Stack gap={2}>
                        <h5>{currEmployee[0].position}</h5>
                        <h6>{hist}</h6>
                    </Stack>
                    <Stack>
                        <Stack direction="horizontal" gap={2}>
                            <SideBox>
                                <div>Department</div>
                            </SideBox>
                            <div style={{width: '100%'}}><b>{dept}</b></div>
                        </Stack>
                        <Stack direction="horizontal" gap={2}>
                            <SideBox>
                                <div>Office Location</div>
                            </SideBox>
                            <div style={{width: '100%'}}><b>{currEmployee[0].state}</b></div>
                        </Stack>
                        <Stack direction="horizontal" gap={1}>
                            <SideBox>
                                <p>Reports To</p>
                            </SideBox>
                            <div style={{width: '100%'}}><b>{currEmployee[0].managerName}</b></div>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
      </Card.Body>
    </Card>
  );
}

export default ProfileCard;


// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import { getEmployeeById } from '../clients/employee';
// import { useState } from 'react';

// function ProfileCard() {

//     const [currname, setName] = useState("Hello");
//     const [position, setPosition] = useState("abc");
//     const [department, setDepartment] = useState("efc");
//     const [location, setLocation] = useState("ddd");
//     const [reportsTo, setReportsTo] = useState("dd");

//     // let employee = [];
//     // getEmployeeById(employee, "54645494");
  
//     // setName(employee[0].employeeName);
//     // setPosition(employee[0].position);
//     // setDepartment(employee[0].department);
//     // setLocation(employee[0].state);
//     // setReportsTo(employee[0].manager);


//     // let currDepartment = "Department/t" + department;
//     // let officeLocation = "Office Locations/t" + location;
//     // let currManager = "Reports to/t" + reportsTo;

//     return (
//     <Card style={{ width: '18rem' }}>
//       <Card.Img variant="top" src="/PHBalancedLogo.png" />
//       <Card.Body>
//         <Card.Title value = {currname}></Card.Title>
//         <Card.Text value = {position}> 
//         </Card.Text>
//         <Card.Text value = {department}></Card.Text>
//         <Card.Text value = {location}></Card.Text>
//         <Card.Text value = {reportsTo}></Card.Text>
//       </Card.Body>
//     </Card>
//   );

    
//}

// export default ProfileCard;