import React from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Availability, JobTitle, Processes, Requirements } from "./CreateJobPosting";

/**
 * EditJobPosting View is used to edit the existing job postings.
 * @author Jing Huang 
 */
function EditJobPosting() {

    const [jobPostings, setJobPostings] = React.useState([]);

    //Loading the job postings from the database
    const loadCurrentData = () => {
        axios.get("http://localhost:8080/jobpostings").then(result => {
            setJobPostings(result.data);
        })
    };

    React.useEffect(() => {
        loadCurrentData(); // action
    }, []);

    // children component to hold the single job posting from the list
    function showProjectList() {
        let arr = jobPostings.map((item, index) => {
            return <ChildrenJP jp={item} key={index} jobPostings={jobPostings} setJobPostings={setJobPostings} />
        }
        );
        return arr;
    }

    return (
        <Container style={{ marginTop: '5%', height: '500px', width: '90%' }}>
            <Row style={{ height: '40px', backgroundColor: "#0f123F", color: 'white', fontWeight: 'bold', justifyContent: 'center', placeItems: 'center' }}>
                SHOWING: ALL JOBS
            </Row>
            {/* {show job posting} */}
            {showProjectList()}
        </Container>
    );
}



const ChildrenJP = (props) => {

    const [jobPosting, setJobPosting] = React.useState(props.jp);
    const [remove, setRemove] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const [index, setIndex] = React.useState(props.jp.salary && props.jp.salary !== "" ? props.jp.salary.indexOf("~") : undefined);
    const [min, setMin] = React.useState(index ? props.jp.salary.substr(0, index) : "");
    const [max, setMax] = React.useState(index ? props.jp.salary.substr(index + 1) : "");

    function getSCsData(r, flag) {
        let arr = undefined
        if (flag) {
            arr = r.map((item, index) =>
                <Row key={index} style={{ marginLeft: '10px', fontSize: '13px' }}>{"* " + item.name}</Row>
            );
        } else {
            arr = r.map((item, index) =>
                <Row key={index} style={{ marginLeft: '10px', fontSize: '13px' }}>{"* " + item.name + " (" + item.level + ")"}</Row>
            );
        }
        return arr;
    }

    function removeJPFromList() {
        const result = props.jobPostings.filter(item => item.id !== props.jp.id);
        props.setJobPostings(result);
        axios.delete(`http://localhost:8080/jobpostings/${props.jp.jobNumber}`).then(result => {
            alert("Delete Successfully!");
        }).catch(err => alert("Delete Unsuccessfully!"));
    }

    return (
        !edit ?
            <>
                <Row style={{ height: '40px', marginTop: '4%', backgroundColor: "#0f123F", color: 'white', fontWeight: 'bold', justifyContent: 'center', placeItems: 'center' }}>
                    <Col>JOB TITLE</Col>
                    <Col>REQUIREMENTS</Col>
                    <Col>AVAILABILITY</Col>
                    <Col>PROCESS</Col>
                    <Col sm={1}>Options</Col>
                </Row>
                <Row className="border border-2" style={{ fontSize: '13px' }}>
                    <Col className="border border-1">
                        <Row style={{ textAlign: "left" }}>
                            <Col style={{ fontWeight: 'bold' }}>Department</Col>
                            <Col>{props.jp.department}</Col>
                        </Row>
                        <Row style={{ textAlign: "left" }}>
                            <Col style={{ fontWeight: 'bold' }}>Salary</Col>
                            <Col>{"$" + props.jp.salary}</Col>
                        </Row>
                        <Row style={{ textAlign: "left" }}>
                            <Col style={{ fontWeight: 'bold' }}>JobTitle</Col>
                            <Col>{props.jp.jobTitle}</Col>
                        </Row>
                        <Row style={{ textAlign: "left" }}>
                            <Col style={{ fontWeight: 'bold' }}>Position #</Col>
                            <Col>{props.jp.jobNumber}</Col>
                        </Row>
                    </Col>
                    <Col className="border border-1">
                        <Row style={{ textAlign: "left", fontWeight: 'bold' }}>
                            <Col style={{ fontWeight: 'bold' }}>Certifications</Col>
                        </Row>
                        {getSCsData(props.jp.certificationRequirements, true)}
                        <Row style={{ textAlign: "left" }}>
                            <Col style={{ fontWeight: 'bold' }}>Skills</Col>
                        </Row>
                        {getSCsData(props.jp.skillRequirements, false)}
                        <Row style={{ textAlign: "left" }}>
                            <Col style={{ fontWeight: 'bold' }}>Others</Col>
                        </Row>
                        <Row style={{ textAlign: "left" }}>
                            <Col>{"* " + props.jp.otherRequirements}</Col>
                        </Row>
                    </Col>
                    <Col className="border border-1" style={{ fontSize: '13px' }}>
                        <Row style={{ textAlign: "left" }}>
                            <Col style={{ fontWeight: 'bold' }}># of Available</Col>
                            <Col>{props.jp.availablePositions}</Col>
                        </Row>
                        <Row style={{ textAlign: "left" }}>
                            <Col style={{ fontWeight: 'bold' }}>Locations</Col>
                            <Col>
                                {props.jp.location ?
                                    props.jp.location.map((item, index) =>
                                        <Row key={index} style={{ fontSize: '13px' }}>{"  * " + item}</Row>
                                    )
                                    :
                                    'N/A'
                                }
                            </Col>
                        </Row>
                        <Row style={{ textAlign: "left" }}>
                            <Col style={{ fontWeight: 'bold' }}>Meeting Type</Col>
                            <Col>{props.jp.meetingType}</Col>
                        </Row>
                    </Col>
                    <Col className="border border-1">
                        <Row className="justify-content-between">
                            <Col sm={8}>
                                {
                                    props.jp && props.jp.process ?
                                        props.jp.process.map((item, index) => {
                                            if (item === "") { item = "N/A" }
                                            return (
                                                <Row key={index} style={{ textAlign: "left" }}>
                                                    <Col>{index + 1}. {item}</Col>
                                                </Row>
                                            );
                                        })
                                        :
                                        <>[N/A]</>
                                }
                            </Col>
                        </Row>
                    </Col>
                    <Col className="border border-1" sm={1}>
                        <Row className="justify-content-center">
                            <Button size="sm" onClick={removeJPFromList} style={{ marginTop: "2%", marginRight: "2%", backgroundColor: "#990033", borderColor: "#990033", width: '70px'}} >
                                Remove
                            </Button>
                        </Row>
                        <Row className="justify-content-center">
                            <Button size="sm" onClick={() => setEdit(true)} style={{ marginTop: "4%", marginRight: "2%", backgroundColor: "#0f123F", borderColor: "#0f123F", width: '70px'}} >
                                Edit
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </>
            :
            <Row className="border border-2 border-dark" style={{ marginTop: '4%' }}>
                <Container style={{ justifyContent: 'center', placeItems: 'center' }}>
                    <Row style={{ height: '40px', backgroundColor: "#0f123F", color: 'white', fontWeight: 'bold', justifyContent: 'center', placeItems: 'center' }}>
                        Edit Form
                    </Row>
                    <Container>
                        <Row className="justify-content-between">
                            <Button size="sm" onClick={() => setEdit(false)} style={{ margin: "1%", backgroundColor: "#0f123F", borderColor: "#0f123F", width: '70px', marginTop: '1%' }} >
                                Back
                            </Button>
                        </Row>
                    </Container>
                    <Container className="border border-1">
                        <Row className="square border-bottom border-dark" style={{ height: '40px', backgroundColor: "#0f123F", color: 'white', fontWeight: 'bold', justifyContent: 'center', placeItems: 'center' }}>
                            Job Title
                        </Row>
                        <JobTitle
                            jobPosting={props.jp}
                            setJobPosting={setJobPosting}
                            saveMode={false}
                        />
                    </Container>
                    <Container className="border border-1" style={{ marginTop: "2%" }}>
                        <Row style={{ height: '40px', backgroundColor: "#0f123F", color: 'white', fontWeight: 'bold', justifyContent: 'center', placeItems: 'center' }}>
                            Requirements
                        </Row>
                        <Requirements
                            jobPosting={props.jp}
                            setJobPosting={setJobPosting}
                            saveMode={false}
                        />
                    </Container>
                    <Container className="border border-1" style={{ marginTop: "2%" }}>
                        <Row style={{ height: '40px', backgroundColor: "#0f123F", color: 'white', fontWeight: 'bold', justifyContent: 'center', placeItems: 'center' }}>
                            Availability
                        </Row>
                        <Availability
                            jobPosting={props.jp}
                            setJobPosting={setJobPosting}
                            saveMode={false}
                        />
                    </Container>
                    <Container className="border border-1" style={{ margin: "2%" }}>
                        <Row style={{ height: '40px', backgroundColor: "#0f123F", color: 'white', fontWeight: 'bold', justifyContent: 'center', placeItems: 'center' }}>
                            Processes
                        </Row>
                        <Processes
                            jobPosting={props.jp}
                            setJobPosting={setJobPosting}
                            saveMode={false}
                        />
                    </Container>
                </Container>
            </Row>
    );
}

export default EditJobPosting;