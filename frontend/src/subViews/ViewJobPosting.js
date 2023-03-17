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
 * ViewJobPositng components to show open positions information.
 * 
 * @author Jing 
 * @author Zayda 
 */
function ViewJobPosting() {

    // variable to hold the list of job posting.
    const [jobPostings, setJobPostings] = React.useState([]);
    const [selected, setSelected] = React.useState();

    //Loading the job postings from the database
    const loadCurrentData = () => {
        axios.get("http://localhost:8080/jobpostings").then(result => {
            setJobPostings(result.data);
            setSelected(result.data[0]);
        })
    };

    React.useEffect(() => {
        loadCurrentData(); // actio
    }, []);

    // console.log(selected);

    // children component to hold the single job posting from the list
    function getListData() {

        let arr = jobPostings.map((item) =>
            <ChildrenJP jp={item} key={item.id} setSelected={setSelected} />
        );

        return arr;
    }

    return (
        <Container fluid>
            <Row>
                <Col sm={4} className="border border" style={{ marginTop: '2%', height: '100%', marginLeft: '3%' }}>
                    <Row style={{ height: '40px', backgroundColor: "#0f123F", color: 'white', fontWeight: 'bold', justifyContent: 'center', placeItems: 'center' }}>
                        OPEN POSITIONS
                    </Row>
                    {getListData()}
                </Col>
                <Col sm={7} className="border border" style={{ marginTop: '2%', height: '100%' }}>
                    <Row style={{ height: '40px', backgroundColor: "#0f123F", color: 'white', fontWeight: 'bold', justifyContent: 'center', placeItems: 'center' }}>
                        POSITION DETAILS
                    </Row>
                    <Row>
                        <ChildrenJPContent jp={selected} />
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

const ChildrenJP = (props) => {

    const [jobPosting, setJobPosting] = React.useState(props.jp);
    const [jobTitle, setJobTitle] = React.useState(jobPosting.jobTitle);
    const [department, setDepartment] = React.useState('Department: ' + jobPosting.department);
    const [location, setLocation] = React.useState(jobPosting.location.toString());

    return (
        <Row style={{ itemAlign: 'center' }}>
            <Row>
                <Col sm={9} style={{ textAlign: 'left', margin: '2%', fontSize: '13px' }}>
                    <Row style={{ fontWeight: 'bold' }}>{jobTitle}</Row>
                    <Row> {department}</Row>
                    <Row>{location}</Row>
                </Col>
                <Col sm={2} style={{ itemAlign: 'right' }}>
                    <Button size="sm" onClick={() => props.setSelected(props.jp)} style={{ marginTop: '10%', backgroundColor: "#0f123F", borderColor: "#0f123F", width: '70px' }} >
                        Details
                    </Button>
                </Col>
            </Row>
            <HorizontalLine />
        </Row>
    );
}

const ChildrenJPContent = (props) => {

    console.log(props.jp)

    const [jobPosting, setJobPosting] = React.useState(props.jp);
    // const [jobTitle, setJobTitle] = React.useState(props.jp ? props.jp.jobTitle : '');
    // const [department, setDepartment] = React.useState(props.jp ? 'Department: ' + props.jp.department : '');
    // const [location, setLocation] = React.useState(props.jp ? 'Location: ' + props.jp.location.toString() : '');
    // const [jobNumber, setJobNumber] = React.useState(props.jp ? 'Position #: ' + props.jp.jobNumber : '');
    // const [applyLink, setApplyLink] = React.useState(props.jp ? 'Apply Link: ' + props.jp.applyLink : '');

    // const [jobDescription, setJobDescription] = React.useState(props.jp ? props.jp.jobDescription : '');
    // const [certificationRequirements, setCertificationRequirements] = React.useState(jobPosting.certificationRequirements);
    // const [skillRequirements, setSkillRequirements] = React.useState(jobPosting.skillRequirements);
    // const [otherRequirements, setOtherRequirements] = React.useState(jobPosting.otherRequirements);

    // const [salary, setSalary] = React.useState(props.jp ? props.jp.salary : '');
    // const [process, setProcess] = React.useState(props.jp ? props.jp.process : '');

    // const [availablePositions, setAvailablePositions] = React.useState(jobPosting.availablePositions);
    // const [meetingNotes, setMeetingNotes] = React.useState(jobPosting.meetingNotes);
    // const [meetingType, setMeetingType] = React.useState(jobPosting.meetingType);
    console.log(jobPosting);

    function getProcessData() {
        if (props.jp.process) {
            let arr = props.jp.process.map((item, index) =>
                <Row key={index} style={{ marginLeft: '10px', fontSize: '15px' }}>{"* " + item}</Row>
            );
            return arr;
        }
        return;
    }


    function getSCsData(r, flag) {
        // console.log(props.jp.skillRequirements);
        // console.log(props.jp.certificationRequirements);
        console.log(r)
        let arr = undefined
        if (flag) {
            arr = r.map((item, index) =>
                <Row key={index} style={{ marginLeft: '10px', fontSize: '15px' }}>{"* " + item.name}</Row>
            );
        } else {
            arr = r.map((item, index) =>
                <Row key={index} style={{ marginLeft: '10px', fontSize: '15px' }}>{"* " + item.name + " (" + item.level + ")"}</Row>
            );
        }
        return arr;
    }

    // React.useEffect(() => {
    //     if (props.jp) {
    //         getSCsData();
    //     }
    // }, [props.jp])

    return (
        props.jp ?
            <Container style={{ itemAlign: 'center', margin: '5%', height: '100%' }}>
                <Row style={{ marginTop: '1%' }}>
                    <Col sm={9}>
                        <Row style={{ fontWeight: 'bold', fontSize: '30px' }}>{props.jp.jobTitle}</Row>
                        <Row>{'Department: ' + props.jp.department}</Row>
                        <Row>{'Location: ' + props.jp.location}</Row>
                        <Row>{'Position #: ' + props.jp.jobNumber}</Row>
                        <Row sytle={{ marginTop: '2%' }}>
                            {/* <Button size="sm" onClick={props.jp.applyLink} style={{ marginTop: '10%', backgroundColor: "#0f123F", borderColor: "#0f123F", width: '100px' }} >
                                Apply Link
                            </Button> */}
                            <a className="btn btn-primary" href={props.jp.applyLink} role="button" style={{ backgroundColor: "#0f123F", borderColor: "#0f123F", width: '110px' }}>Apply Link</a>
                        </Row>
                    </Col>
                    <Col sm={2}>
                        <Button size="sm" style={{ marginTop: '10%', backgroundColor: "#0f123F", borderColor: "#0f123F", width: '70px' }} >
                            Edit
                        </Button>
                    </Col>
                </Row >
                <Row style={{ marginTop: '5%' }}>
                    <Row style={{ fontWeight: 'bold', fontSize: '20px' }}>Job Description</Row>
                    <Row>{props.jp.jobDescription}</Row>
                </Row>
                <Row style={{ marginTop: '5%' }}>
                    <Row style={{ fontWeight: 'bold', fontSize: '20px' }}> Required Qualifications</Row>
                    <Row>{props.jp.otherRequirements}</Row>
                </Row>
                <Row style={{ marginTop: '5%' }}>
                    <Row style={{ fontWeight: 'bold', fontSize: '20px' }}>Preferred Qualifications and Skills</Row>
                    {/* <Row>I am Preferred Qualifications and Skills</Row> */}
                    <Row style={{ fontWeight: 'bold', fontSize: '15px', marginTop: '1%' }}>Certifications</Row>
                    {getSCsData(props.jp.certificationRequirements, true)}
                    <Row style={{ fontWeight: 'bold', fontSize: '15px', marginTop: '1%' }}>Skills</Row>
                    {getSCsData(props.jp.skillRequirements, false)}
                </Row>
                <Row style={{ marginTop: '5%' }}>
                    <Row style={{ fontWeight: 'bold', fontSize: '20px' }}>Base Pay/Salary</Row>
                    <Row>{props.jp.salary}</Row>
                </Row>
                <Row style={{ marginTop: '5%' }}>
                    <Row style={{ fontWeight: 'bold', fontSize: '20px' }}>Application Process</Row>
                    {getProcessData()}
                    <Row>I am Application Process</Row>
                </Row>
            </Container >
            :
            undefined
    );
}

export default ViewJobPosting;