import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import FloatingLabel from 'react-bootstrap-floating-label';
import ListGroup from 'react-bootstrap/ListGroup';

/**
 * This view will show the form allow user to create a job posting
 * @author Jing 
 */
function CreateJobPosting() {

    const [jobPosting, setJobPosting] = React.useState({});
    const titles = ['JobTitle', 'Requirements', 'Availabliltiy', 'Process']
    const [colors, setColors] = React.useState(["warning", "secondary", "secondary", "secondary"]);
    const [mode, setMode] = React.useState('JobTitle');

    // Job Title
    // const [jobTitle, setjobTitle] = React.useState();
    // const [applyLink, setApplyLink] = React.useState();
    // const [jobDescription, setJobDescription] = React.useState();
    // const [department, setDepartment] = React.useState();
    // const [salary, setSalary] = React.useState();

    // Requirements
    // const [skillRequirements, setSkillRequirements] = React.useState(); // Skill []
    // const [cerificationRequirements, setCertificationRequirements] = React.useState(); // Certification []
    // const [otherRequirements, setOtherRequirements] = React.useState(); // String

    // Availability
    const [availablePositions, setAvailablePositions] = React.useState(); // Integer
    const [locations, setLocations] = React.useState([]); // String []
    const [meetingType, setMeetingType] = React.useState();
    const [meetingNotes, setMeetingNotes] = React.useState();

    // Process
    const [process, setProcess] = React.useState([]); // String []
    const [processData, setProcessData] = React.useState([]); // String []

    function handleContinueClick() {
        if (mode === titles[0]) {
            setMode(titles[1]);
            setColors(["secondary", "warning", "secondary", "secondary"]);
            // console.log(jobPosting);
        } else if (mode === titles[1]) {
            setMode(titles[2]);
            setColors(["secondary", "secondary", "warning", "secondary"]);
            // console.log(skillRequirements, cerificationRequirements, otherRequirements);
        } else if (mode === titles[2]) {
            setMode(titles[3]);
            setColors(["secondary", "secondary", "secondary", "warning"]);
            // console.log(availablePositions, locations, meetingType, meetingNotes);
        }
    }

    React.useEffect(() => {
        if (mode === titles[0]) {
            setColors(["warning", "secondary", "secondary", "secondary"]);
        } else if (mode === titles[1]) {
            setColors(["secondary", "warning", "secondary", "secondary"]);
        } else if (mode === titles[2]) {
            setColors(["secondary", "secondary", "warning", "secondary"]);
        } else if (mode === titles[3]) {
            setColors(["secondary", "secondary", "secondary", "warning"]);
        }
    }, [mode]);

    function handleSaveClick() {
        // update value as user input
        // input validation checking
        let newJobPosting = {
            // "jobNumber": jobNumber,
            "jobTitle": jobPosting.jobTitle,
            "salary": jobPosting.salary,
            "department": jobPosting.department,
            "skillRequirements": jobPosting.skillRequirements,
            "certificationRequirements": jobPosting.certificationRequirements,
            "otherRequirements": jobPosting.otherRequirements,
            "jobDescription": jobPosting.jobDescription,
            "availablePositions": availablePositions,
            "location": locations,
            "meetingType": meetingType,
            "meetingNotes": meetingNotes,
            "process": null,
            "applyLink": jobPosting.applyLink,
            "listofApplicants": null
        };
        console.log(newJobPosting);

        // call api
        axios.post("http://localhost:8080/jobpostings", newJobPosting).then(response => {
            console.log("Successful to create a job posting");
        }).catch(error => {

        });
    }

    React.useEffect(() => {
        let temp = process;
        for (let i = 0; i < processData.length; i++) {
            let item = processData[i];
            if (item) {
                temp[i] = item;
            }
        }
        setProcess(temp);
    }, [processData]);

    return (
        <Container fluid>
            <Row style={{ marginTop: '5%' }}>
                {
                    titles.map((item, index) => {
                        return (
                            <Col key={index}>
                                <Button
                                    variant={colors[index]}
                                    style={{ width: '200px' }}
                                    onClick={() => setMode(item)}
                                >
                                    {item}
                                </Button>
                            </Col>
                        );
                    })
                }
            </Row>
            <Row style={{ marginTop: '5%' }}>
                {
                    mode === titles[0] ?
                        <JobTitle
                            jobPosting={jobPosting}
                            setJobPosting={setJobPosting}
                            handleContinueClick={handleContinueClick}
                        // setjobTitle={setjobTitle}
                        // setDepartment={setDepartment}
                        // setJobDescription={setJobDescription}
                        // setSalary={setSalary}
                        // setApplyLink={setApplyLink}
                        />
                        :
                        mode === titles[1] ?
                            <Requirements
                                jobPosting={jobPosting}
                                setJobPosting={setJobPosting}
                                handleContinueClick={handleContinueClick}
                            // setOtherRequirements={setOtherRequirements}
                            // setCertificationRequirements={setCertificationRequirements}
                            // setSkillRequirements={setSkillRequirements}
                            />
                            :
                            mode === titles[2] ?
                                <Availability
                                    setAvailablePositions={setAvailablePositions}
                                    setLocations={setLocations}
                                    setMeetingType={setMeetingType}
                                    setMeetingNotes={setMeetingNotes}
                                />
                                :
                                mode === titles[3] ?
                                    <Processes
                                        setProcessData={setProcessData}
                                    />
                                    :
                                    undefined
                }
            </Row>
            {/* <Row className="justify-content-end">
                {mode !== 'Process' ?
                    <Col>
                        <Button variant={'warning'} style={{ width: '200px', marginRight: '5%' }} onClick={handleContinueClick}>Continue</Button>
                    </Col>
                    :
                    <Col>
                        <Button style={{ width: '200px', marginRight: '5%' }} onClick={handleSaveClick}>Saved Jobs</Button>
                    </Col>
                }
            </Row> */}
        </Container>

    );
}

// job title
const JobTitle = (props) => {

    const [jobPostingData, setJobPostingData] = React.useState(props.jobPosting);
    const [jobTitle, setjobTitle] = React.useState(props.jobPosting.jobTitle ? props.jobPosting.jobTitle : "");
    const [applyLink, setApplyLink] = React.useState(props.jobPosting.applyLink ? props.jobPosting.applyLink : "");
    const [jobDescription, setJobDescription] = React.useState(props.jobPosting.jobDescription ? props.jobPosting.jobDescription : "");
    const [department, setDepartment] = React.useState(props.jobPosting.department ? props.jobPosting.department : "");
    const [salary, setSalary] = React.useState(props.jobPosting.salary ? props.jobPosting.salary : "");

    // console.log(jobTitle, applyLink, jobDescription, department, salary);

    function handleSaveClick() {
        jobPostingData.jobTitle = jobTitle;
        jobPostingData.applyLink = applyLink;
        jobPostingData.jobDescription = jobDescription;
        jobPostingData.department = department;
        jobPostingData.salary = salary;
        // TODO: check input validation
        // save data
        props.setJobPosting(jobPostingData);
        // switch to next
        props.handleContinueClick();
    }

    return (
        <Container>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> Official Position Title </Form.Label>
                <Col sm={7}> <Form.Control as="textarea" rows={3} placeholder="Type here..." value={jobTitle} onChange={e => setjobTitle(e.target.value)} /></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> Job Description </Form.Label>
                <Col sm={7}> <Form.Control as="textarea" rows={3} placeholder="Type here..." value={jobDescription} onChange={e => setJobDescription(e.target.value)} /></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> Apply Link </Form.Label>
                <Col sm={7}> <Form.Control rows={1} placeholder="Type here..." value={applyLink} onChange={e => setApplyLink(e.target.value)} /></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> Department </Form.Label>
                <Col sm={7}> <Form.Control as="textarea" rows={3} placeholder="Type here..." value={department} onChange={e => setDepartment(e.target.value)} /></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> Median Salary (varies based on location)</Form.Label>
                <Col sm={7}> <Form.Control as="textarea" rows={3} placeholder="Type here..." value={salary} onChange={e => setSalary(e.target.value)} /> </Col>
            </Form.Group>
            <Row className="justify-content-end">
                <Button variant={'warning'} style={{ width: '200px', marginRight: '5%' }} onClick={handleSaveClick}>Save & Continue</Button>
            </Row>
        </Container>
    );
}

// requirements
const Requirements = (props) => {

    console.log(props);
    const [jobPostingData, setJobPostingData] = React.useState(props.jobPosting);
    const [sName, setSName] = React.useState();
    const [yearExperience, setYearExperience] = React.useState();
    const [cName, setCName] = React.useState();
    const [comment1, setComment1] = React.useState();
    const [skillRequirements, setSkillRequirements] = React.useState(props.jobPosting.skillRequirements ? props.jobPosting.skillRequirements : []); // Skill []
    const [comment2, setComment2] = React.useState();
    const [certificationRequirements, setCertificationRequirements] = React.useState(props.jobPosting.certificationRequirements ? props.jobPosting.certificationRequirements : []); // Certification []
    const [otherRequirements, setOtherRequirements] = React.useState(props.jobPosting.otherRequirements ? props.jobPosting.otherRequirements : ''); // String


    // TODO: The list is not Undate
    function addSkill() {
        let exists = false;

        if (skillRequirements === undefined) {
            skillRequirements = [];
        }

        // TODO: input validation
        let newSkill = {
            name: sName,
            level: comment1, // string
            score: yearExperience
        }

        skillRequirements.forEach(element => {
            if (element.name === newSkill.name) {
                exists = true;
            }
        });

        if (!exists) {
            skillRequirements.push(newSkill);
        }

        console.log(skillRequirements);
    }

    function addCertification() {

        let exists = false;

        if (certificationRequirements === undefined) {
            certificationRequirements = [];
        }

        // TODO: input validation
        let newCertification = {
            name: cName,
            institution: '',
            issuedDate: null,
            credentialID: '',
            skills: comment2,
        }

        certificationRequirements.forEach(element => {
            if (element.name === newCertification.name) {
                exists = true;
            }
        });

        if (!exists) {
            certificationRequirements.push(newCertification);
        }

        console.log(certificationRequirements);

    }

    function handleSaveClick() {

        jobPostingData.skillRequirements = skillRequirements;
        jobPostingData.certificationRequirements = certificationRequirements;
        jobPostingData.otherRequirements = otherRequirements;
        // TODO: check input validation
        // save data
        props.setJobPosting(jobPostingData);
        // switch to next
        props.handleContinueClick();
    }

    return (
        <Container>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Col sm={2}><Button variant="outline-primary" onClick={addSkill}>Add Skill</Button></Col>
                <Col sm={2}><FloatingLabel label="Name" id="name" value={sName} onChange={e => setSName(e.target.value)} /></Col>
                <Col sm={2}><FloatingLabel label="Year Experience" id="YearExperience" value={yearExperience} onChange={(e) => { setYearExperience(e.target.value) }} style={{ marginRight: '10px' }} /></Col>
                <Col sm={5}><FloatingLabel as="textarea" rows={3} label="Comments" id="comments1" value={comment1} onChange={(e) => { setComment1(e.target.value) }} style={{ marginRight: '10px' }} /></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> SKILL REQUIREMENETS </Form.Label>
                <Col sm={9}>
                    {skillRequirements.length > 0 ?
                        <ListGroup>
                            {skillRequirements.map((item, index) => {
                                // TODO: generate String with missing value, the list is not updated
                                let combine = item.name + " with " + item.score + " Years Experience : " + item.level;
                                return (
                                    <ListGroup.Item key={index}>{combine}</ListGroup.Item>
                                );
                            })}
                        </ListGroup>
                        :
                        <Form.Control as="textarea" disabled={true} rows={2} placeholder="No Skill Requirements..." />
                    }
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Col sm={2}><Button variant="outline-primary" onClick={addCertification}>Add Certification</Button></Col>
                <Col sm={3}><FloatingLabel label="Name" id="name" value={sName} onChange={e => setCName(e.target.value)} /></Col>
                <Col sm={6}><FloatingLabel as="textarea" rows={3} label="Comments" id="comment2" value={comment2} onChange={(e) => { setComment2(e.target.value) }} style={{ marginRight: '10px' }} /></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> CERTIFICATION REQUIREMENETS </Form.Label>
                <Col sm={9}>
                    {certificationRequirements.length > 0 ?
                        <ListGroup>
                            {certificationRequirements.map((item, index) => {
                                // TODO: generate String with missing value, the list is not updated
                                let combine = item.name + " : " + item.skills;
                                return (
                                    <ListGroup.Item key={index}>{combine}</ListGroup.Item>
                                );
                            })}
                        </ListGroup>
                        :
                        <Form.Control as="textarea" disabled={true} rows={2} placeholder="No Certification Requirements..." />
                    }
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> OTHER REQUIREMENETS</Form.Label>
                <Col sm={9}> <Form.Control as="textarea" rows={3} placeholder="Type here..." value={otherRequirements} onChange={e => setOtherRequirements(e.target.value)} /> </Col>
            </Form.Group>
            <Row className="justify-content-end">
                <Button variant={'warning'} style={{ width: '200px', marginRight: '5%' }} onClick={handleSaveClick}>Save & Continue</Button>
            </Row>
        </Container>
    );
}

// availability
const Availability = (props) => {

    const [state, setState] = React.useState();
    const [city, setCity] = React.useState();
    const [country, setCountry] = React.useState();
    const [zipcode, setZipcode] = React.useState();
    // const [location, setLocation] = React.useState({ state: '', city: '', country: '' });
    let locations = props.locationsList;

    function addLocation() {
        if (state !== undefined && city !== undefined && country !== undefined && zipcode !== undefined) {
            let location = city + ' ' + state + ' ' + zipcode + ' ' + country;
            locations.push(location);
            console.log(location, locations);
            props.setLocationsList(locations);
        }
    }

    return (
        <Container>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> # of Positions Available </Form.Label>
                <Col sm={7}> <Form.Control as="textarea" rows={3} placeholder="Type here..." onChange={e => props.setAvailablePositions(e.target.value)} /> </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Col sm={2}><Button variant="outline-primary" onClick={addLocation}>Add Location</Button></Col>
                <Col sm={2}><FloatingLabel label="Country" id="country" onChange={e => setCountry(e.target.value)} /></Col>
                <Col sm={2}><FloatingLabel label="State" id="state" onChange={(e) => { setState(e.target.value) }} style={{ marginRight: '10px' }} /></Col>
                <Col sm={2}><FloatingLabel label="City" id="city" onChange={e => setCity(e.target.value)} /></Col>
                <Col sm={2}><FloatingLabel label="Zipcode" id="zipcode" onChange={e => setZipcode(e.target.value)} /></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> Locations </Form.Label>
                <Col sm={7}> <Form.Control as="textarea" rows={3} placeholder={locations} onChange={e => props.setLocation(e.target.value)} /> </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> Meeting Type</Form.Label>
                <Col sm={7}>
                    <Row>
                        <div className="mb-3" onClick={e => props.setMeetingType(e.target.value)}>
                            <Form.Check inline label="in persion" name="group1" type='radio' value="inPersion" />
                            <Form.Check inline label="Online" name="group1" type='radio' value="Online" />
                            <Form.Check inline label="Hybrid" name="group1" type='radio' value="Hybrid" />
                        </div>
                    </Row>
                    <Row><Form.Control as="textarea" rows={3} placeholder="Type here..." onChange={e => props.setMeetingNotes(e.target.value)} /></Row>
                </Col>
            </Form.Group>
        </Container>
    );
}

// processes
const Processes = (props) => {

    // const [arr, setArr] = React.useState([]);
    let arr = [];

    return (
        <Container>
            {
                [1, 2, 3, 4, 5].map((e, index) => {
                    return (
                        <Form.Group as={Row} key={index} className="mb-3" style={{ marginTop: '20px' }}>
                            <Form.Label column sm={2}>Step {e}</Form.Label>
                            <Col sm={7}> <Form.Control as="textarea" rows={3} placeholder="Type here..." onChange={e => { arr[index] = e.target.value; props.setProcessData(arr); }} /> </Col>
                        </Form.Group>
                    );
                })
            }
            <Col>
                <Button style={{ width: '200px', marginRight: '5%' }} onClick={props.handleSaveClick}>Saved Jobs</Button>
            </Col>
        </Container>
    );
}

export default CreateJobPosting;