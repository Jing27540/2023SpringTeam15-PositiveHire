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
    const [jobPostings, setJobPostings] = React.useState(props.jobPostings);
    // Get the employee list
    const [employees, setEmployees] = React.useState(props.employees);
    // A list holding employees who match positions
    const [matchedEmployees, setMatchedEmployees] = React.useState([]);
    const [selected, setSelected] = React.useState(props.employees && props.employees[0] ? props.employees[0] : undefined);

    // Call getAll api to load the data
    React.useEffect(() => {
        // load employees
        loadEmployees();
        // load job postings
        loadJobPostings();
        // if(selected && props.jobPostings) {
        //     filter(props.jobPostings[0]);
        // }
    }, []);

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

    // Filter to get the position matched employees. skill, certification, other requirment. job history
    // matchedScore = skill (#/Total # of JP.skill) * 70% + certificaiton (#/#) * 20% + jobRecord (#/#) * 10%
    function filter(jp) {
        let matchedList = [];
        if (employees) {
            // 1. Comparable requirement
            let jpSk = jp.skillRequirements.map((item) => {
                return item.name;
            });
            let jpCerts = jp.certificationRequirements.map((item) => {
                return item.name;
            });

            // 2. Loop each employees
            for (let i = 0; i < employees.length; i++) {

                let e = employees[i];
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
                            skillScore += 1;
                            reqs.push(item);
                            // console.log('checking skill score', item, skillScore);
                        }
                    });

                    // loop certifications, check certifiacation
                    certifications.map((item) => {
                        if (jpCerts.includes(item)) {
                            certScore += 1;
                            reqs.push(item);
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

                    matchedList.push(e);
                }

            }

        }

        setMatchedEmployees(matchedList);
    }

    console.log(matchedEmployees);
    function getJPData(jp) {
        if (jobPostings) {
            let arr = jobPostings.map((item) =>
                <ChildrenJP jp={item} key={item.id} setMatchedEmployees={setMatchedEmployees} employees={employees} jobPostings={jobPostings} setSelected={setSelected} filter={filter} />
            );
            return arr;
        }
        return;
    }

    function getMatchedList() {
        if (matchedEmployees) {
            // console.log('checking matching score', matchedEmployees);
            let arr = matchedEmployees.map((employee, index) =>
                <MatchedChild key={index} employee={employee} setMatchedEmployees={setMatchedEmployees}/>
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
                    {getMatchedList()}
                </Col>
            </Row>
        </Container>
    );
}

const MatchedChild = (props) => {

    const [employee, setEmployee] = React.useState(props.employee);

    function showMatchedReqs() {
        let str = "";
        employee.matchedReqs.map((item) => {
            if (item === employee.matchedReqs[employee.matchedReqs.length - 1]) {
                str += item;
            } else {
                str += item + ", ";
            }
        });
        return str;
    }

    return (
        <>
            <Row style={{ fontSize: '15px', backgroundColor: "white" }}>
                <Col sm={2} className="border border" style={{ textAlign: "center", fontWeight: 'bold' }}>
                    Score
                </Col>
                <Col className="border border" style={{ textAlign: "center", height: "30px", fontWeight: 'bold' }}>
                    Employees Details
                </Col>
            </Row>
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
                        <Col>{showMatchedReqs()}</Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}


const ChildrenJP = (props) => {

    const [jobPosting, setJobPosting] = React.useState(props.jp);
    const [jobTitle, setJobTitle] = React.useState(jobPosting.jobTitle);
    const [department, setDepartment] = React.useState('Department: ' + jobPosting.department);
    const [location, setLocation] = React.useState(jobPosting.location ? jobPosting.location.toString() : "");

    function filter(jp) {
        let matchedList = [];
        if (props.employees) {
            // 1. Comparable requirement
            let jpSk = jp.skillRequirements.map((item) => {
                return item.name;
            });
            let jpCerts = jp.certificationRequirements.map((item) => {
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

                    matchedList.push(e);
                }

            }

        }
        props.setMatchedEmployees(matchedList);
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
                    <Button size="sm" onClick={() => { props.setMatchedEmployees([]); props.setSelected(jobPosting); filter(jobPosting) }} style={{ marginTop: '10%', backgroundColor: "#0f123F", borderColor: "#0f123F", width: '70px' }} >
                        Analyze
                    </Button>
                </Col>
            </Row>
            <HorizontalLine />
        </Row>
    );
}

export default ViewMatchAnalytics;