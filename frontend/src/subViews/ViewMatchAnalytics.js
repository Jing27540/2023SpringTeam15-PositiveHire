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
    function filter(obj) {

        let matchEmployees = [];
        // TODO: remove this null checking later
        if (jobPostings && employees) {
            let jp = jobPostings[0];
            console.log('given jobPosting', jp);

            // weight, accurancy, add weight 
            // TODO: matchedScore = skill (#/Total # of JP.skill) * 70% + certificaiton (#/#) * 20% + jobRecord (#/#) * 10%

            // 1. Comparable requirement
            let jpSk = jp.skillRequirements.map((item) => {
                return item.name;
            });
            let jpCerts = jp.certificationRequirements.map((item) => {
                return item.name;
            });

            // console.log ('checking skill', jpSk, jpCerts);

            // 2. Loop each employees
            for (let i = 0; i < employees.length; i++) {

                let e = employees[i];

                // Get Comparable Requirements
                let skills = [];
                e.peopleSkills.map((item) => {
                    skills.push(item.name);
                });
                e.technicalSkills.map((item) => {
                    skills.push(item.name);
                });
                e.workEthic.map((item) => {
                    skills.push(item.name);
                });

                let certifications = e.certifications.map((item) => {
                    return item.name;
                });

                let jobRecords = e.jobRecords.map((item) => {
                    return item.jobTitle;
                });

                if (skills.length > 0 || certifications.length > 0 || jobRecords.length > 0) {

                    let skillScore = 0;
                    let certScore = 0;

                    // loop skills, check skill
                    skills.map((item) => {
                        if (jpSk.includes(item)) {
                            skillScore += 1;
                            // console.log('checking skill score', item, skillScore);
                        }
                    });

                    // loop certifications, check certifiacation
                    certifications.map((item) => {
                        if (jpCerts.includes(item)) {
                            certScore += 1;
                            // console.log('checking certifiacation score', item, certScore);
                        }
                    });

                    // calculate the score
                    // console.log('checking skill score', skillScore);
                    let total = 0;
                    if (skills.length > 0) {
                        total += (skillScore / jpSk.length) * 70;
                    }

                    if (certifications.length > 0) {
                        total += (certScore / certifications.length) * 20;
                    }

                    // check job title
                    if (jobRecords.includes(jp.jobTitle)) {
                        console.log(jp.jobTitle);
                        total += 10;
                    }

                    // update score result 
                    // console.log('checking score', total);
                    e.matchedScore = total;
                    matchedEmployees.push(e);
                    console.log(skills, certifications, jobRecords);
                }

            }

        }
        // console.log(matchedEmployees);
        return matchedEmployees;
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
        <Container style={{ margin: "4%" }} fluid>
            <Row>
                <Col sm={4}>
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
                <Col sm={8} style={{ textAlign: 'left', margin: '2%', fontSize: '13px' }}>
                    <Row style={{ fontWeight: 'bold' }}>{jobTitle}</Row>
                    <Row> {department}</Row>
                    <Row>{location}</Row>
                </Col>
                <Col sm={2} style={{ marginTop: "2%" }}>
                    <Button size="sm" onClick={() => props.setSelected(props.jp)} style={{ marginTop: '10%', backgroundColor: "#0f123F", borderColor: "#0f123F", width: '70px' }} >
                        Analyze
                    </Button>
                </Col>
            </Row>
            <HorizontalLine />
        </Row>
    );
}

export default ViewMatchAnalytics;