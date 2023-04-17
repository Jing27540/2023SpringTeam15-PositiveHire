import React from "react";
import axios from "axios";
import styled from "styled-components";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const HorizontalLine = styled.div`
    width: 95%;
    height: 1;
    justify-content: center;
    border-top: 0.5px solid #808080;
`;

/**
 * ViewMatchAnalytics has all of the components to show candidates with the match scores sorted from highest to lowest score.
 * 
 * @author Zayda Cummings
 * @author Juan Franco Pinilla
 * @author Jing Huang
 */
function ViewMatchAnalytics(props) {

    const [jobPostings, setJobPostings] = React.useState(props.jobPostings);
    const [employees, setEmployees] = React.useState(props.employees);
    const [selected, setSelected] = React.useState([]);
    const [color, setColor] = React.useState(['red', 'green', 'blue']);

    //Loading the job postings from the database
    const loadJobPostings = () => {
        axios.get("http://localhost:8080/jobpostings").then(result => {
            setJobPostings(result.data);
        })
    };
    //Loading the employees from the database
    const loadEmployees = () => {
        axios.get("http://localhost:8080/employees").then(result => {
            setEmployees(result.data);
        })
    };

    // display the matched requirement
    function showMatchedReqs(employee) {
        let str = "";
        employee.matchedReqs.forEach(function (item) {
            if (item === employee.matchedReqs[employee.matchedReqs.length - 1]) {
                str += item;
            } else {
                str += item + ", ";
            }
        });
        return str;
    }

    // Loading all jobPostings and employees from the database
    React.useEffect(() => {
        loadEmployees();
        loadJobPostings();
    }, []);

    function getJPData() {
        if (jobPostings && employees) {
            let arr = jobPostings.map((item, index) =>
                <ChildrenJP key={index} jp={item} setSelected={setSelected} employees={employees} jobPostings={jobPostings} />
            );
            return arr;
        }
    }

    function getMatchedList() {
        // console.log('checking matching score', matchedEmployees);
        let arr = selected.map((employee, index) =>
            <Row style={{ fontSize: '15px', float: "center" }} key={index}>
                <Col sm={2} className="border border" style={{ textAlign: "center", fontWeight: 'bold', color: employee.matchedScore.toFixed(1) <= 33 ? "red" : employee.matchedScore.toFixed(1) <= 66 ? "blue" : "green" }}>
                    {employee.matchedScore.toFixed(1) + "%"}
                </Col>
                <Col className="border border">
                    <Row style={{ textAlign: 'left', justifyContent: "space-between", fontSize: '13px' }}>
                        <Col sm={4}>EmployeeName:</Col>
                        <Col>{employee.employeeName}</Col>
                    </Row>
                    <Row style={{ textAlign: 'left', justifyContent: "space-between", fontSize: '13px' }}>
                        <Col sm={4}>EmployeeNumber:</Col>
                        <Col>{employee.employeeNum}</Col>
                    </Row>
                    <Row style={{ textAlign: 'left', justifyContent: "space-between", fontSize: '13px' }}>
                        <Col sm={4}>MatchedRequirements:</Col>
                        <Col>{showMatchedReqs(employee)}</Col>
                    </Row>
                </Col>
            </Row>
        );
        return arr;
    }

    return (
        <Container style={{ marginLeft: "3%", marginRight: "3%", marginTop: "2%" }} fluid>
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
                    <Row style={{ fontSize: '15px', backgroundColor: "white" }}>
                        <Col sm={2} className="border border" style={{ textAlign: "center", fontWeight: 'bold' }}>
                            Score
                        </Col>
                        <Col className="border border" style={{ textAlign: "center", height: "30px", fontWeight: 'bold' }}>
                            Employees Details
                        </Col>
                    </Row>
                    {getMatchedList()}
                </Col>
            </Row>
        </Container>
    );
}

const ChildrenJP = (props) => {

    const [jobPosting, setJobPosting] = React.useState(props.jp);
    const [jobTitle, setJobTitle] = React.useState(jobPosting.jobTitle);
    const [department, setDepartment] = React.useState('Department: ' + jobPosting.department);
    const [location, setLocation] = React.useState(jobPosting.location ? jobPosting.location.toString() : "");

    const [matchedEmployees, setMatchedEmployees] = React.useState([]);

    async function filter(jp) {

        // 1. Comparable requirements
        let jpSk = jp.skillRequirements.map(function (item) {
            return item.name;
        });
        let jpCerts = jp.certificationRequirements.map(function (item) {
            return item.name;
        });

        // 2. Loop each employees 
        for (let i = 0; i < props.employees.length; i++) {

            let e = props.employees[i];
            const reqs = [];

            let matchedSkills = [];
            e.peopleSkills.forEach(function (item) {
                if (jpSk.includes(item.name)) {
                    matchedSkills.push(item.name);
                    reqs.push(item.name);
                }
                return;
            });
            e.technicalSkills.forEach(function (item) {
                if (jpSk.includes(item.name)) {
                    matchedSkills.push(item.name);
                    reqs.push(item.name);
                }
                return;
            });

            e.workEthic.forEach(function (item) {
                if (jpSk.includes(item.name)) {
                    matchedSkills.push(item.name);
                    reqs.push(item.name);
                }
                return;
            });

            let matchedCertifications = e.certifications.map(function (item) {
                if (jpCerts.includes(item.name)) {
                    reqs.push(item.name);
                    return item.name;
                }
            });

            // job title
            let jobRecords = e.jobRecords.map((item) => {
                return item.jobTitle;
            });

            if (jobRecords.includes(jp.jobTitle)) {
                reqs.push(jp.jobTitle + " (Job Record)");
            }

            let skillScore = (matchedSkills.length / jpSk.length) * 70;
            let certScore = (matchedCertifications.length / jpCerts.length) * 20;
            let jrScore = jobRecords.includes(jp.jobTitle) ? 10 : 0;

            // 3. calculate score 
            if (reqs.length > 0) {
                e.matchedScore = skillScore + certScore + jrScore;
                e.matchedReqs = reqs;
                console.log('checking req', e.matchedReqs);
                matchedEmployees.push(e);
            }

        }
        props.setSelected(matchedEmployees);
        setMatchedEmployees([]);
    }

    return (
        <Row style={{ itemAlign: 'center' }}>
            <Row>
                <Col sm={8} style={{ textAlign: 'left', margin: '2%', fontSize: '13px' }}>
                    <Row style={{ fontWeight: 'bold' }}>{jobTitle}</Row>
                    <Row> {department}</Row>
                    <Row>{location}</Row>
                </Col>
                <Col sm={2} style={{ marginTop: "2%" }}>
                    <Button size="sm" onClick={() => { filter(props.jp); }} style={{ marginTop: '10%', backgroundColor: "#0f123F", borderColor: "#0f123F", width: '70px' }} >
                        Analyze
                    </Button>
                </Col>
            </Row>
            <HorizontalLine />
        </Row>
    );
}

export default ViewMatchAnalytics;