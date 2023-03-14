import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import FloatingLabel from 'react-bootstrap-floating-label';


/**
 * This view will show the form allow user to create a job posting
 * @author Jing 
 */
function CreateJobPosting() {

    const [jobPosting, setJobPosting] = React.useState();
    const titles = ['JobTitle', 'Requirements', 'Availabliltiy', 'Process']
    const [colors, setColors] = React.useState(["warning", "secondary", "secondary", "secondary"]);
    const [mode, setMode] = React.useState('JobTitle');

    // Job Title
    const [jobTitle, setjobTitle] = React.useState();
    const [applyLink, setApplyLink] = React.useState();
    const [jobDescription, setJobDescription] = React.useState();
    const [department, setDepartment] = React.useState();
    const [salary, setSalary] = React.useState();
    // Requirements
    const [skill, setSkill] = React.useState();
    const [skillRequirements, setSkillRequirements] = React.useState(); // Skill []
    const [cerificationRequirements, setCertificationRequirements] = React.useState(); // Certification []
    const [otherRequirements, setOtherRequirements] = React.useState(); // String
    // Availability
    const [availablePositions, setAvailablePositions] = React.useState(); // Integer
    const [locationsList, setLocationsList] = React.useState([]); // String []

    const [meetingType, setMeetingType] = React.useState();
    const [meetingNotes, setMeetingNotes] = React.useState();
    // Process
    const [process, setProcess] = React.useState([]); // String []
    const [processData, setProcessData] = React.useState([]); // String []

    // console.log(jobTitle);
    // console.log(locationsList);
    // axios.get(`http://localhost:8080/jobpostings`)
    //     .then(result => {
    //         setJobPosting(result.data);
    //     });

    function handleContinueClick() {
        if (mode === titles[0]) {
            setMode(titles[1]);
        } else if (mode === titles[1]) {
            setMode(titles[2]);
        } else if (mode === titles[2]) {
            setMode(titles[3]);
        }
    }

    function handleSaveClick() {
        // update value as user input
        // input validation checking
        console.log(locationsList);
        let newJobPosting = {
            // "jobNumber": jobNumber,
            "jobTitle": jobTitle,
            "salary": salary,
            "department": department,
            "skillRequirements": [],
            "certificationRequirements": [],
            "otherRequirements": null,
            "jobDescription": jobDescription,
            "availablePositions": availablePositions,
            "location": locationsList,
            "meetingType": meetingType,
            "meetingNotes": meetingNotes,
            "process": null,
            "applyLink": applyLink,
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

    return (
        <Container>
            <Row style={{ marginTop: '5%' }}>
                {
                    titles.map((item, index) => {
                        return (
                            <Col key={index}>
                                <Button
                                    variant={colors[index]}
                                    style={{ width: '200px' }}
                                    onClick={() => { setMode(item); }}>
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
                            setjobTitle={setjobTitle}
                            addLocation setDepartment={setDepartment}
                            setJobDescription={setJobDescription}
                            setSalary={setSalary}
                            setApplyLink={setApplyLink}
                        />
                        :
                        mode === titles[1] ?
                            <Requirements
                                setOtherRequirements={setOtherRequirements}
                                setCertificationRequirements={setCertificationRequirements}
                                setSkillRequirements={setSkillRequirements}
                            />
                            :
                            mode === titles[2] ?
                                <Availability
                                    setAvailablePositions={setAvailablePositions}
                                    setLocationsList={setLocationsList}
                                    locationsList={locationsList}
                                    // addNewLocation={addNewLocation}
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
            <Row className="justify-content-end">
                <Col>
                    {mode !== 'Process' ?
                        <Button variant={'warning'} style={{ width: '200px', marginRight: '5%' }} onClick={handleContinueClick}>Continue</Button>
                        :
                        <></>
                    }
                </Col>
                <Col>
                    <Button style={{ width: '200px', marginRight: '5%' }} onClick={handleSaveClick}>Saved Jobs</Button>
                </Col>
            </Row>
        </Container>

    );
}

// job title
const JobTitle = (props) => {
    return (
        <Container>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> Official Position Title </Form.Label>
                <Col sm={7}> <Form.Control as="textarea" rows={3} placeholder="Type here..." onChange={e => props.setjobTitle(e.target.value)} /></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> Job Description </Form.Label>
                <Col sm={7}> <Form.Control as="textarea" rows={3} placeholder="Type here..." onChange={e => props.setJobDescription(e.target.value)} /></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> Apply Link </Form.Label>
                <Col sm={7}> <Form.Control rows={3} placeholder="Type here..." onChange={e => props.setApplyLink(e.target.value)} /></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> Department </Form.Label>
                <Col sm={7}> <Form.Control as="textarea" rows={3} placeholder="Type here..." onChange={e => props.setDepartment(e.target.value)} /></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }} onChange={e => props.setSalary(e.target.value)}>
                <Form.Label column sm={2}> Median Salary (varies based on location)</Form.Label>
                <Col sm={7}> <Form.Control as="textarea" rows={3} placeholder="Type here..." /> </Col>
            </Form.Group>
        </Container>
    );
}


// requirements
const Requirements = (props) => {
    return (
        <Container>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> SKILL REQUIREMENET </Form.Label>
                <Col sm={7}> <Form.Control as="textarea" rows={3} placeholder="Type here..." onChange={e => props.setSkillRequirements(e.target.value)} /> </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> CERTIFICATION SKILL </Form.Label>
                <Col sm={7}> <Form.Control as="textarea" rows={3} placeholder="Type here..." onChange={e => props.setCertificationRequirements(e.target.value)} /> </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> OTHER REQUIREMENET</Form.Label>
                <Col sm={7}> <Form.Control as="textarea" rows={3} placeholder="Type here..." onChange={e => props.setOtherRequirements(e.target.value)} /> </Col>
            </Form.Group>
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
        </Container>
    );
}

export default CreateJobPosting;