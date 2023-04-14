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

        // matchEmployees = []; // employees list with matchScores data
        // TODO: remove this null checking later
        if (jobPostings && employees) {
            let jp = jobPostings[0];
            let e = employees[0];
            console.log(e);
            console.log(jp);
        
            // weight, accurancy, add weight 
            // TODO: matchedScore = skill (#/Total # of JP.skill) * 40% + certificaiton (#/#) * 30% + jobRecord (#/#) * 30%

            

            // create variable to hold the skills
            let jpSkills = []; // techniqueSkills, peopeSkills, workEthic
            // create ..... certification


            // This adds the skills for the job posting
            for (let i = 0; i < jp.skillRequirements.length; i++) {
                let skill = jp.skillRequirements[i];
                jpSkills.push(skill.name);
            }

            console.log(jpSkills);


            let skillCount = 0;
            let certificationCount = 0; 


            // loop each employees and their skill list
            for (let i = 0; i < employees.length; i++) {
                
                let ee = employees[i];

                // Checks if the technical skills array is greater than 0 
                if(ee.technicalSkills.length > 0) {
                    console.log(ee.technicalSkills.length);
                    // compare employee's skill with the jp skill info
                    for (let j = 0; j < ee.technicalSkills.length; j++) {
                        let skill = ee.technicalSkills[j];
                
                        if(jpSkills.includes(skill.name)) {
                            console.log("entered here");
                            skillCount += 1;
                            console.log(skillCount);
                        }
                    }
                }

                // Checks if the people skills array is greater than 0 
                if(ee.peopleSkills.length > 0) {

                    // Loops through the people skills and checks if it is in the jop posting skills
                    for (let i = 0; i < ee.peopleSkills.length; i++) {
                        if(jpSkills.includes(ee.peopleSkills[i].name)) {
                            skillCount += 1;
                        } 
                    }
                }

                console.log(skillCount);

                // TODO: checking certification
                if(ee.certifications.length > 0) {
                    for (let i = 0; i < ee.certifications.length; i++) {

                        if(jpSkills.includes(ee.certifications[i])) {
                            console.log("entered into certifications")
                            certificationCount += 1;
                        }
                    }
                }

                // TODO: checking other requirments
                

            }



            // Used for testing
            for (let i = 0; i < e.technicalSkills.length; i++) {
                let skill = e.technicalSkills[i];

               // console.log(skill.name);
            }

            

            if (e && jp) {
                e.matchScore = "get score";
                matchedEmployees.push(e);
            }
        }

        console.log(matchedEmployees);

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