import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import EmployeeProfile from '../views/EmployeeProfile'
import ImportData from './ImportData';

/**
 * NavBar class for the header of the application
 * @author Juan Franco Pinilla
 * @author Jing Huang
 */
export default function NavBar() {

  const [key, setKey] = React.useState('home');

  return (
    <>
      <Navbar className="navbar" variant="dark">
        <Container fluid style={{position: "absolute", bottom: "5px"}}>
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
            onSelect={(selectedKey) => { setKey(selectedKey) }}
            style={{gap: '10px', fontWeight: 'bold', fontSize: '15px'}}
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
            {/* <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                  ViewEmmployees
                </Nav.Link>
              </Nav.Item> */}
          </Nav>
        </Container>
      </Navbar>
      {
        key === 'profile' ?
          <EmployeeProfile />
          :
          key === 'importData' ?
          <ImportData />
          : 
          undefined
      }
    </>

  );

}