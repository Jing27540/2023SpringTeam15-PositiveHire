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
        employee.matchedReqs.map(function (item) {
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

    console.log('checking', selected);

    function getMatchedList() {
        if (selected) {
            // console.log('checking matching score', matchedEmployees);
            let arr = selected.map((employee, index) =>
                <>
                    {/* <Row style={{ fontSize: '15px', backgroundColor: "white" }}>
                        <Col sm={2} className="border border" style={{ textAlign: "center", fontWeight: 'bold' }}>
                            Score
                        </Col>
                        <Col className="border border" style={{ textAlign: "center", height: "30px", fontWeight: 'bold' }}>
                            Employees Details
                        </Col>
                    </Row> */}
                    <Row style={{ fontSize: '15px', float: "center" }}>
                        <Col sm={2} className="border border" style={{ textAlign: "center" }}>
                            {employee.matchedScore.toFixed(1) + "%"}
                        </Col>
                        <Col className="border border">
                            <Row style={{ textAlign: 'left', justifyContent: "space-between" }}>
                                <Col sm={4}>EmployeeName:</Col>
                                <Col>{employee.employeeName}</Col>
                            </Row>
                            <Row style={{ textAlign: 'left', justifyContent: "space-between" }}>
                                <Col sm={4}>EmployeeNumber:</Col>
                                <Col>{employee.employeeNum}</Col>
                            </Row>
                            <Row style={{ textAlign: 'left', justifyContent: "space-between" }}>
                                <Col sm={4}>MatchedRequirements:</Col>
                                <Col>{showMatchedReqs(employee)}</Col>
                            </Row>
                        </Col>
                    </Row>
                </>
            );
            return arr;
        } else {
            return;
        }
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
        // let matchedList = [];

        // 1. Comparable requirement
        let jpSk = jp.skillRequirements.map(function (item) {
            return item.name;
        });
        let jpCerts = jp.certificationRequirements.map(function (item) {
            return item.name;
        });

        // 2. Loop each employees
        for (let i = 0; i < props.employees.length; i++) {

            let e = props.employees[i];
            let reqs = [];

            // Get Comparable Requirements
            let skills = [];
            let total = 0;

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

            // 3. calculate score 
            if (skills.length > 0 || certifications.length > 0 || jobRecords.length > 0) {

                let skillScore = 0;
                let certScore = 0;

                // loop skills, check skill
                skills.map((item) => {
                    if (jpSk.includes(item)) {
                        reqs.push(item);
                        skillScore += 1;
                        // console.log('checking skill score', item, skillScore);
                    }
                });

                // loop certifications, check certifiacation
                certifications.map((item) => {
                    if (jpCerts.includes(item)) {
                        reqs.push(item);
                        certScore += 1;
                        // console.log('checking certifiacation score', item, certScore);
                    }
                });

                // calculate the score
                // console.log('checking skill score', skillScore);
                if (skills.length > 0) {
                    total += (skillScore / jpSk.length) * 70;
                }

                if (certifications.length > 0) {
                    total += (certScore / certifications.length) * 20;
                }

                // check job title
                if (jobRecords.includes(jp.jobTitle)) {
                    total += 10;
                }

                e.matchedScore = total;
                e.matchedReqs = reqs;

                matchedEmployees.push(e);
                // console.log(total, e, matchedEmployees);
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