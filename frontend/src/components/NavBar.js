import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import EmployeeProfile from '../views/EmployeeProfile'
import ImportData from './ImportData';
import TabsBar from './TabsBar';
import JobPosting from '../views/JobPosting';
import { useAuth } from '../base/auth';
import ViewMatchAnalytics from '../subViews/ViewMatchAnalytics';
import Alert from 'react-bootstrap/Alert';

/**
 * NavBar class for the header of the application
 * @author Juan Franco Pinilla
 * @author Jing Huang
 * @author Previous Team // Used some code from previous team, like the logo and navigation bar
 */

const TITLE = ['Positions', 'Talent Pipeline', 'Performance Reviews', 'Development Plans', 'Resources', 'Reports'];

export default function NavBar() {

  const auth = useAuth();

  const [key, setKey] = React.useState('home');
  const [mode, setMode] = React.useState('Positions');
  const [pView, setPView] = React.useState('Welcome');
  const [employee, setEmployee] = React.useState({});
  const [accessRole, setAccessRole] = React.useState('');
  // Get the job posting list
  const [jobPostings, setJobPostings] = React.useState();
  // Get the employee list
  const [employees, setEmployees] = React.useState();

  // Get Employee Data
  React.useEffect(() => {

    axios.get(`http://localhost:8080/employees/${auth.user}`).then(res => {
      setEmployee(res.data);
      // setAccessRole(res.data.accessRole);
      setAccessRole(auth.role);
    })
      .catch(err => console.log(err));

    axios.get("http://localhost:8080/jobpostings").then(result => {
      setJobPostings(result.data);
    })

    axios.get("http://localhost:8080/employees").then(result => {
      setEmployees(result.data);
    })

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
            onSelect={(selectedKey) => { setKey(selectedKey); setPView('Welcome'); }}
            style={{ gap: '10px', fontWeight: 'bold', fontSize: '15px' }}
          >
            <Nav.Item>
              <Nav.Link eventKey="home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="profile">Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link2" disabled>Team</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link3" disabled>Employee Experience</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="importData" disabled={!(accessRole === "HR" || accessRole === "DEI")}>Import Data</Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      {
        key === 'profile' ?
          <EmployeeProfile employee={employee} />
          :
          key === 'importData' && accessRole === "HR" ?
            <ImportData />
            :
            key === 'home' ?
              <>
                <TabsBar titles={TITLE} setMode={setMode} setPView={setPView} accessRole={accessRole} />
                {mode === "Positions" ?
                  <JobPosting accessRole={accessRole} pView={pView} setPView={setPView} />
                  :
                  mode === 'Talent Pipeline' ?
                    <ViewMatchAnalytics employees={employees} jobPostings={jobPostings} />
                    :
                    <Alert variant="danger"> Not Implement Yet!</Alert>
                }
              </>
              :
              undefined
      }
    </>
  );

}