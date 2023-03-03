import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import EmployeeProfile from '../views/EmployeeProfile'
import ImportData from './ImportData';
import TabsBar from './TabsBar';
import JobPosting from '../views/JobPosting';

/**
 * NavBar class for the header of the application
 * @author Juan Franco Pinilla
 * @author Jing Huang
 * @author Previous Team // Used some code from previous team, like the logo and navigation bar
 */

const TITLE = ['Positions', 'Talent Pipeline', 'Performance Reviews', 'Development Plans', 'Resources', 'Reports'];
// TODO: hard code
const EMPLOYEENUM = 1103024456;
export default function NavBar() {

  const [key, setKey] = React.useState('home');
  const [mode, setMode] = React.useState('');
  const [employee, setEmployee] = React.useState({});

  // Get Employee Data
  React.useEffect(() => {
    axios.get(`http://localhost:8080/employees/${EMPLOYEENUM}`).then(res => { setEmployee(res.data); })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <Navbar className="navbar" variant="dark">
        <Container fluid style={{ position: "absolute", bottom: "5px" }}>
          <Navbar.Brand href="/home">
            <img
              src="/PHBalancedLogo.png"
              width="110"
              height="40"
              hspace="10"
              className="d-inline-block align-top"
              alt="logo"
            />
          </Navbar.Brand>
          <Nav
            defaultActiveKey="home"
            className="me-auto"
            onSelect={(selectedKey) => { setKey(selectedKey); setMode(selectedKey); }}
            style={{ gap: '10px', fontWeight: 'bold', fontSize: '15px' }}
          >
            <Nav.Item>
              <Nav.Link eventKey="home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="profile">Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link2">Team</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link3">Employee Experience</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="importData">Import Data</Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      {
        key === 'profile' ?
          <EmployeeProfile employee={employee} />
          :
          key === 'importData' ?
            <ImportData />
            :
            key === 'home' ?
              <TabsBar titles={TITLE} setMode={setMode} />
              :
              undefined
      }
      {
        mode === 'Positions' ?
          <JobPosting />
          :
          undefined
      }
    </>
  );

}