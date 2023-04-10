import React from "react";
import axios from "axios";
import styled from "styled-components";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const HorizontalLine = styled.div`
    width: 100%;
    height: 1;
    border-top: 0.5px solid #808080;
`;

/**
 * ViewMatchAnalytics has all of the components to show candidates with the match scores sorted from highest to lowest score.
 * 
 * @author Zayda Cummings
 * @author Juan Franco Pinilla
 */
function ViewMatchAnalytics(props) {

    // Get the job posting list
    const [jobPostings, setJobPostings] = React.useState();
    // Get the employee list
    const [employees, setEmployees] = React.useState();
    // A list holding employees who match positions
    const [matchedEmployees, setMatchedEmployees] = React.useState([]);

    // Call getAll api to load the data
    React.useEffect(() => {
        // load job postings
        loadJobPostings();
        // load employees
        loadEmployees();
    }, []);

    // TODO: remove this api call, pass from NavBar
    //Loading the job postings from the database
    const loadJobPostings = () => {
        axios.get("http://localhost:8080/jobpostings").then(result => {
            setJobPostings(result.data);
        })
    };
    //Loading the employees from the database
    const loadEmployees = () => {
        axios.get("http://localhost:8080/employees").then(result => {
            setEmployees(result.data)
        })
    };

    // TODO: skill, certification, other requirment. job history
    function filter() {

        // TODO: remove this null checking later
        if (jobPostings && employees) {
            let jp = jobPostings[0];
            let e = employees[0];
            console.log(e);
            console.log(jp);

            // TODO: checking skill

            // TODO: checking certification

            // TODO: checking other requirments

            if (e && jp) {
                matchedEmployees.push(e);
            }
        }

        console.log(matchedEmployees);

    }

    function getJPData() {
        if (jobPostings) {
            let arr = jobPostings.map((item) =>
                <ChildrenJP jp={item} key={item.id} />
            );
            return arr;
        }
        return;
    }

    return (
        <Container style={{ marginTop: "4%" }}>
            <Row>
                <Col sm={5}>
                    <Row style={{ height: '40px', backgroundColor: "#0f123F", color: 'white', fontWeight: 'bold', justifyContent: 'center', placeItems: 'center', marginRight: "2%" }}>
                        OPEN POSITIONS
                    </Row>
                    {getJPData()}
                </Col>
                <Col sm={7}>
                    <Row style={{ height: '40px', backgroundColor: "#0f123F", color: 'white', fontWeight: 'bold', justifyContent: 'center', placeItems: 'center' }}>
                        MATCHED EMPLOYEES
                    </Row>
                </Col>
            </Row>
            <Button onClick={() => filter()}>Testing</Button>
        </Container>
    );
}


const ChildrenJP = (props) => {

    const [jobPosting, setJobPosting] = React.useState(props.jp);
    const [jobTitle, setJobTitle] = React.useState(jobPosting.jobTitle);
    const [department, setDepartment] = React.useState('Department: ' + jobPosting.department);
    const [location, setLocation] = React.useState(jobPosting.location ? jobPosting.location.toString() : "");

    return (
        <Row style={{ itemAlign: 'center' }}>
            <Row>
                <Col sm={9} style={{ textAlign: 'left', margin: '2%', fontSize: '13px' }}>
                    <Row style={{ fontWeight: 'bold' }}>{jobTitle}</Row>
                    <Row> {department}</Row>
                    <Row>{location}</Row>
                </Col>
                <Col sm={2} style={{ itemAlign: 'right', marginTop: "2%" }}>
                    <Button size="sm" onClick={() => props.setSelected(props.jp)} style={{ marginTop: '10%', backgroundColor: "#0f123F", borderColor: "#0f123F", width: '70px' }} >
                        Details
                    </Button>
                </Col>
            </Row>
            <HorizontalLine />
        </Row>
    );
}

export default ViewMatchAnalytics;