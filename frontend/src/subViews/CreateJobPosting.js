import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import FloatingLabel from 'react-bootstrap-floating-label';
import Table from 'react-bootstrap/Table';

/**
 * This view will show the form allow user to create a job posting
 * @author Jing Huang
 */
function CreateJobPosting(props) {

    const [jobPosting, setJobPosting] = React.useState({});
    const titles = ['JobTitle', 'Requirements', 'Availabliltiy', 'Process']
    const [colors, setColors] = React.useState(["warning", "secondary", "secondary", "secondary"]);
    const [mode, setMode] = React.useState(props.mode ? props.mode : 'JobTitle');
    const [message, setMessage] = React.useState("");

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

    function handleContinueClick() {
        if (mode === titles[0]) {
            setMode(titles[1]);
            setColors(["secondary", "warning", "secondary", "secondary"]);
        } else if (mode === titles[1]) {
            setMode(titles[2]);
            setColors(["secondary", "secondary", "warning", "secondary"]);
        } else if (mode === titles[2]) {
            setMode(titles[3]);
            setColors(["secondary", "secondary", "secondary", "warning"]);
        }
    }

    function handleSaveClick() {
        // update value as user input
        // input validation checking
        let newJobPosting = {
            "jobNumber": jobPosting.jobNumber,
            "jobTitle": jobPosting.jobTitle,
            "salary": jobPosting.salary,
            "department": jobPosting.department,
            "skillRequirements": jobPosting.skillRequirements,
            "certificationRequirements": jobPosting.certificationRequirements,
            "otherRequirements": jobPosting.otherRequirements,
            "jobDescription": jobPosting.jobDescription,
            "availablePositions": jobPosting.availablePositions,
            "location": jobPosting.locations,
            "meetingType": jobPosting.meetingType,
            "meetingNotes": jobPosting.meetingNotes,
            "process": jobPosting.process,
            "applyLink": jobPosting.applyLink,
            "listofApplicants": null
        };

        // call api
        axios.post("http://localhost:8080/jobpostings", newJobPosting).then(response => {
            setMessage("Successful to create a job posting!");
        }).catch(error => {

        });
    }

    return (
        <Container fluid>
            {message && message !== "" ?
                <div className="alert alert-success" role="alert">
                    {message}
                </div>
                :
                undefined
            }
            <Row style={{ marginTop: '5%' }}>
                {
                    titles.map((item, index) => {
                        return (
                            <Col key={index}>
                                <Button
                                    variant={colors[index]}
                                    style={{ width: '200px' }}
                                >
                                    {item}
                                </Button>
                            </Col>
                        );
                    })
                }
            </Row>
            <Row style={{ marginTop: '3%', marginLeft: '2%' }}>
                {
                    mode === titles[0] ?
                        <JobTitle
                            jobPosting={jobPosting}
                            setJobPosting={setJobPosting}
                            handleContinueClick={handleContinueClick}
                        />
                        :
                        mode === titles[1] ?
                            <Requirements
                                jobPosting={jobPosting}
                                setJobPosting={setJobPosting}
                                handleContinueClick={handleContinueClick}
                            />
                            :
                            mode === titles[2] ?
                                <Availability
                                    jobPosting={jobPosting}
                                    setJobPosting={setJobPosting}
                                    handleContinueClick={handleContinueClick}
                                />
                                :
                                mode === titles[3] ?
                                    <Processes
                                        jobPosting={jobPosting}
                                        setJobPosting={setJobPosting}
                                        handleContinueClick={handleContinueClick}
                                        handleSave={handleSaveClick}
                                    />
                                    :
                                    undefined
                }
            </Row>
        </Container>

    );
}

// job title
export const JobTitle = (props) => {

    const [jobPostingData, setJobPostingData] = React.useState(props.jobPosting);
    const [jobNumber, setJobNumber] = React.useState(props.jobPosting.jobNumber ? props.jobPosting.jobNumber: "");
    const [jobTitle, setjobTitle] = React.useState(props.jobPosting.jobTitle ? props.jobPosting.jobTitle : "");
    const [applyLink, setApplyLink] = React.useState(props.jobPosting.applyLink ? props.jobPosting.applyLink : "");
    const [jobDescription, setJobDescription] = React.useState(props.jobPosting.jobDescription ? props.jobPosting.jobDescription : "");
    const [department, setDepartment] = React.useState(props.jobPosting.department ? props.jobPosting.department : "");
    const [salary, setSalary] = React.useState(props.jobPosting.salary ? props.jobPosting.salary : "");

    const isValidUrl = urlString => {
        var a = document.createElement('a');
        a.href = urlString;
        return (a.host && a.host != window.location.host);
    }

    function handleSaveClick(flag) {

        if (jobNumber !== "" && jobTitle !== "" && jobDescription !== '' && department !== '' && salary !== '') {
            jobPostingData.jobTitle = jobTitle;
            jobPostingData.jobNumber = jobNumber;
            if (applyLink !== "") {
                jobPostingData.applyLink = applyLink;
            } else {
                jobPostingData.applyLink = "";
            }
            jobPostingData.jobDescription = jobDescription;
            jobPostingData.department = department;
            jobPostingData.salary = salary;
            // save data
            props.setJobPosting(jobPostingData);
            // switch to next
            if(flag === true) {
                props.handleContinueClick()
            }

        } else {
            alert('Missing input! Please enter N/A instead.');
        }
    }

    return (
        <Container>
            {props.saveMode !== undefined && props.saveMode === false ?
                <Row className="justify-content-start">
                    <Button size="sm" onClick={handleSaveClick} style={{ backgroundColor: "green", borderColor: "green", width: '70px', marginTop: '1%' }} >
                        Save
                    </Button>
                </Row>
                :
                <></>
            }
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> Official Position Title </Form.Label>
                <Col sm={9}> <Form.Control rows={1} placeholder="Type here..." value={jobTitle} onChange={e => setjobTitle(e.target.value)} /></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> Job Number </Form.Label>
                <Col sm={9}> <Form.Control rows={1} placeholder="Type here..." value={jobNumber} onChange={e => setJobNumber(e.target.value)} /></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> Job Description </Form.Label>
                <Col sm={9}> <Form.Control as="textarea" rows={3} placeholder="Type here..." value={jobDescription} onChange={e => setJobDescription(e.target.value)} /></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> Apply Link </Form.Label>
                <Col sm={9}> <Form.Control rows={1} placeholder="Type here..." value={applyLink} onChange={e => {
                    if (!isValidUrl(e.target.value)) {
                        alert("Invalid Link!");
                    } else { setApplyLink(e.target.value); }
                }} /></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> Department </Form.Label>
                <Col sm={9}> <Form.Control as="textarea" rows={3} placeholder="Type here..." value={department} onChange={e => setDepartment(e.target.value)} /></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> Median Salary (varies based on location)</Form.Label>
                <Col sm={9}> <Form.Control placeholder="Type here..." value={salary} onChange={e => setSalary(e.target.value)} /> </Col>
            </Form.Group>
            {props.saveMode !== undefined && props.saveMode === false ?
                <></>
                :
                <Row className="justify-content-end">
                    <Button variant={'warning'} style={{ width: '200px', marginRight: '5%' }} onClick={handleSaveClick}>Save & Continue</Button>
                </Row>
            }
        </Container>
    );
}

// requirements
export const Requirements = (props) => {
    const [jobPostingData, setJobPostingData] = React.useState(props.jobPosting);

    const [sType, setSType] = React.useState("");
    const [sName, setSName] = React.useState("");
    const [yearExperience, setYearExperience] = React.useState("");
    const [comment1, setComment1] = React.useState("");

    const [cType, setCType] = React.useState("");
    const [cName, setCName] = React.useState("");
    const [comment2, setComment2] = React.useState("");

    const [skillRequirements, setSkillRequirements] = React.useState(props.jobPosting.skillRequirements ? props.jobPosting.skillRequirements : []); // Skill []
    const [certificationRequirements, setCertificationRequirements] = React.useState(props.jobPosting.certificationRequirements ? props.jobPosting.certificationRequirements : []); // Certification []
    const [otherRequirements, setOtherRequirements] = React.useState(props.jobPosting.otherRequirements ? props.jobPosting.otherRequirements : ''); // String

    // TODO: The list is not Update
    function addSkill() {
        let exists = false;

        if (skillRequirements === undefined) {
            skillRequirements = [];
        }

        if (comment1 !== "" && sType !== "" && yearExperience !== undefined && yearExperience !== "") {
            console.log(comment1, sType, yearExperience);
            if (isNaN(yearExperience)) {
                alert("Year Experience should be Integer!");
            } else {
                let tmp = comment1 + " (" + sType + ")";
                let newSkill = {
                    name: sName,
                    level: tmp, // string
                    score: yearExperience
                }

                skillRequirements.forEach(element => {
                    if (element.name === newSkill.name) {
                        exists = true;
                    }
                });

                if (!exists) {
                    skillRequirements.push(newSkill);
                    setSName("");
                    setComment1("");
                    setYearExperience("");
                    setSType("");
                    alert("Successfully add new skill!");
                } else {
                    setSName("");
                    setComment1("");
                    setYearExperience("");
                    setSType("");
                    alert("Skill is already existed!");
                }
            }
        } else {
            alert("Missing Input of Name/Comment/YearExperience/Type!");
        }

    }

    function removeSkill(index) {
        if (skillRequirements && skillRequirements.length > 0) {
            skillRequirements.splice(index, 1);
            handleSkillRequirementsChange();
            alert("Sucessfully to remove skill.");
        } else {
            alert("No Skills data.");
        }
    }

    const handleSkillRequirementsChange = () => {
        const newSK = [...skillRequirements];
        setSkillRequirements(newSK);
    };

    function addCertification() {

        let exists = false;

        if (certificationRequirements === undefined) {
            certificationRequirements = [];
        }

        if (comment2 !== "" && cType !== "" && cName !== "") {
            let tmp = comment2 + " (" + cType + ")";
            let newCertification = {
                name: cName,
                institution: '',
                issuedDate: null,
                credentialID: '',
                skills: tmp,
            }

            certificationRequirements.forEach(element => {
                if (element.name === newCertification.name) {
                    exists = true;
                }
            });

            if (!exists) {
                certificationRequirements.push(newCertification);
                // TODO: reset, not working!!!
                setCName("");
                setComment2("");
                setCType("");
                alert("Success to add new certification!");
            } else {
                setCName("");
                setComment2("");
                setCType("");
                alert("Certification is already existed!");
            }
        } else {
            alert("Missing Input of Name/Comment/Type!");
        }
    }

    function removeCertification(index) {
        if (certificationRequirements && certificationRequirements.length > 0) {
            certificationRequirements.splice(index, 1);
            handleCertificationRequirementsChange();
            alert("Sucessfully to remove certification.");
        } else {
            alert("No Certifications data.");
        }
    }

    const handleCertificationRequirementsChange = () => {
        const newC = [...certificationRequirements];
        setCertificationRequirements(newC);
    };

    function handleSaveClick() {

        if (skillRequirements.length > 0 || certificationRequirements.length > 0 || otherRequirements !== "") {
            jobPostingData.skillRequirements = skillRequirements;
            jobPostingData.certificationRequirements = certificationRequirements;
            jobPostingData.otherRequirements = otherRequirements;
            // save data
            props.setJobPosting(jobPostingData);
            // switch to next
            props.handleContinueClick();
        } else {
            alert("Missing inputs of skillRequirements, certificiationRequirements and otherRequirements, Please enter N/A instead!");
        }
    }

    return (
        <Container>
            {props.saveMode !== undefined && props.saveMode === false ?
                <Row className="justify-content-start">
                    <Button size="sm" style={{ backgroundColor: "green", borderColor: "green", width: '70px', marginTop: '1%' }} >
                        Save
                    </Button>
                </Row>
                :
                <></>
            }
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> SKILL REQUIREMENETS </Form.Label>
                <Col sm={9}>
                    {skillRequirements.length > 0 ?
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Skill #</th>
                                    <th>Comment</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {skillRequirements.map((item, index) => {
                                    // TODO: generate String with missing value, the list is not updated
                                    let combine = item.name + ": " + item.score + " Years Experience, " + item.level;
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td key={index}>{combine}</td>
                                            <td>
                                                <Button onClick={() => { removeSkill(index); }} size="sm" style={{ backgroundColor: "#990033", borderColor: "#990033", width: '30px', marginTop: '1%' }} >
                                                    X
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                        :
                        <Form.Control as="textarea" disabled={true} rows={2} placeholder="No Skill Requirements..." />
                    }
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Col sm={2}><Button variant="outline-primary" onClick={() => { addSkill(); }}>Add Skill</Button></Col>
                <Col sm={2}><FloatingLabel label="Name" id="name" value={sName} onChange={e => setSName(e.target.value)} /></Col>
                <Col sm={2}><FloatingLabel label="Year Experience" id="YearExperience" value={yearExperience} onChange={(e) => { setYearExperience(e.target.value) }} style={{ marginRight: '10px' }} /></Col>
                <Col sm={5}><FloatingLabel as="textarea" rows={3} label="Comments" id="comments1" value={comment1} onChange={(e) => { setComment1(e.target.value) }} style={{ marginRight: '10px' }} /></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}></Form.Label>
                <Col sm={7}>
                    <Row>
                        <div className="mb-3" onClick={e => setSType(e.target.value)}>
                            <Form.Check inline label="Required" name="group1" type='radio' value="Required" />
                            <Form.Check inline label="Suggested" name="group1" type='radio' value="Suggested" />
                        </div>
                    </Row>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> CERTIFICATION REQUIREMENETS </Form.Label>
                <Col sm={9}>
                    {certificationRequirements.length > 0 ?
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Certification #</th>
                                    <th>Comment</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {certificationRequirements.map((item, index) => {
                                    let combine = item.name + ": " + item.skills;
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td key={index}>{combine}</td>
                                            <td>
                                                <Button onClick={() => { removeCertification(index); }} size="sm" style={{ backgroundColor: "#990033", borderColor: "#990033", width: '30px', marginTop: '1%' }} >
                                                    X
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                        :
                        <Form.Control as="textarea" disabled={true} rows={2} placeholder="No Certification Requirements..." />
                    }
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Col sm={2}><Button variant="outline-primary" onClick={()=>{addCertification();}}>Add Certification</Button></Col>
                <Col sm={3}><FloatingLabel label="Name" id="name" value={sName} onChange={e => setCName(e.target.value)} /></Col>
                <Col sm={6}><FloatingLabel as="textarea" rows={3} label="Comments" id="comment2" value={comment2} onChange={(e) => { setComment2(e.target.value) }} style={{ marginRight: '10px' }} /></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}></Form.Label>
                <Col sm={7}>
                    <Row>
                        <div className="mb-3" onClick={e => setCType(e.target.value)}>
                            <Form.Check inline label="Required" name="group2" type='radio' value="Required" />
                            <Form.Check inline label="Suggested" name="group2" type='radio' value="Suggested" />
                        </div>
                    </Row>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> OTHER REQUIREMENETS</Form.Label>
                <Col sm={9}> <Form.Control as="textarea" rows={3} placeholder="Type here..." value={otherRequirements} onChange={e => setOtherRequirements(e.target.value)} /> </Col>
            </Form.Group>
            {/* <Row className="justify-content-end">
                <Button variant={'warning'} style={{ width: '200px', marginRight: '5%' }} onClick={handleSaveClick}>Save & Continue</Button>
            </Row> */}
            {props.saveMode !== undefined && props.saveMode === false ?
                <></>
                :
                <Row className="justify-content-end">
                    <Button variant={'warning'} style={{ width: '200px', marginRight: '5%' }} onClick={handleSaveClick}>Save & Continue</Button>
                </Row>

            }
        </Container>
    );
}

// availability
export const Availability = (props) => {

    const [jobPostingData, setJobPostingData] = React.useState(props.jobPosting);
    const [state, setState] = React.useState("");
    const [city, setCity] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [zipcode, setZipcode] = React.useState("");

    const [availablePositions, setAvailablePositions] = React.useState(props.jobPosting.availablePositions ? props.jobPosting.availablePositions : ""); // Integer
    const [locations, setLocations] = React.useState(props.jobPosting.location ? props.jobPosting.location : []); // String []
    const [meetingType, setMeetingType] = React.useState(props.jobPosting.meetingType ? props.jobPosting.meetingType : '');
    const [meetingNotes, setMeetingNotes] = React.useState(props.jobPosting.meetingNotes ? props.jobPosting.meetingNotes : '');

    function addLocation() {
        // input checking

        if (city !== "" && state !== "" && country !== "" && zipcode !== "") {
            let str = city + ' ' + state + ' ' + country + ' ' + zipcode;
            // add to the list
            if (str !== undefined) {
                locations.push(str);
            }
            // reset value
            setState();
            setCity();
            setCountry();
            setZipcode();
            handlechange();
            alert("Successfully to add new location.");

        } else {
            alert("Missing inputs of city/state/country/zipcode! Please N/A instead.");
        }
    }

    function removeLocation(index) {
        if (locations && locations.length > 0) {
            locations.splice(index, 1);
            handlechange();
            alert("Sucessfully to remove location.");
        } else {
            alert("No Loactions data.");
        }
    }

    const handlechange = () => {
        const newLocations = [...locations];
        setLocations(newLocations);
    };

    function handleSaveClick() {
        if (availablePositions || locations.length > 0 || meetingType !== "" && meetingNotes !== "") {
            if (isNaN(availablePositions)) {
                alert("availablePositions should be integer.");
            } else {
                jobPostingData.availablePositions = availablePositions;
                jobPostingData.location = locations;
                jobPostingData.meetingType = meetingType;
                jobPostingData.meetingNotes = meetingNotes;
                console.log(jobPostingData);
                // save data
                props.setJobPosting(jobPostingData);
                // switch to next
                props.handleContinueClick();
            }
        } else {
            alert("Missing inputs of availablePositions/location/meetingType/meetingNotes! Please N/A instead.");
        }
    }

    return (
        <Container>
            {props.saveMode !== undefined && props.saveMode === false ?
                <Row className="justify-content-start">
                    <Button size="sm" style={{ backgroundColor: "green", borderColor: "green", width: '70px', marginTop: '1%' }} >
                        Save
                    </Button>
                </Row>
                :
                <></>
            }
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> # of Positions Available </Form.Label>
                <Col sm={3}> <Form.Control rows={1} placeholder="Type Number..." onChange={e => setAvailablePositions(e.target.value)} /> </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Col sm={2}><Button variant="outline-primary" onClick={()=>{addLocation();}}>Add Location</Button></Col>
                <Col sm={2}><FloatingLabel label="Country" id="country" onChange={e => setCountry(e.target.value)} /></Col>
                <Col sm={2}><FloatingLabel label="State" id="state" onChange={(e) => { setState(e.target.value) }} style={{ marginRight: '10px' }} /></Col>
                <Col sm={2}><FloatingLabel label="City" id="city" onChange={e => setCity(e.target.value)} /></Col>
                <Col sm={2}><FloatingLabel label="Zipcode" id="zipcode" onChange={e => setZipcode(e.target.value)} /></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> Locations </Form.Label>
                <Col sm={9}>
                    {locations.length > 0 ?
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Location #</th>
                                    <th>Comment</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {locations.map((item, index) => {
                                    // TODO: generate String with missing value, the list is not updated
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item}</td>
                                            <td>
                                                <Button onClick={() => { removeLocation(index) }} size="sm" style={{ backgroundColor: "#990033", borderColor: "#990033", width: '30px', marginTop: '1%' }} >
                                                    X
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                        :
                        <Form.Control as="textarea" disabled={true} rows={2} placeholder="No Locations Data..." />
                    }
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> Meeting Type</Form.Label>
                <Col sm={9}>
                    <div className="mb-3" onClick={e => setMeetingType(e.target.value)}>
                        <Form.Check inline label="in persion" name="group1" type='radio' value="inPersion" />
                        <Form.Check inline label="Online" name="group1" type='radio' value="Online" />
                        <Form.Check inline label="Hybrid" name="group1" type='radio' value="Hybrid" />
                    </div>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> Meeting Notes </Form.Label>
                <Col sm={9}> <Form.Control as="textarea" rows={3} placeholder="Type here..." onChange={e => setMeetingNotes(e.target.value)} /> </Col>
            </Form.Group>
            {props.saveMode !== undefined && props.saveMode === false ?
                <></>
                :
                <Row className="justify-content-end">
                    <Button variant={'warning'} style={{ width: '200px', marginRight: '5%' }} onClick={handleSaveClick}>Save & Continue</Button>
                </Row>
            }
        </Container>
    );
}

// processes
export const Processes = (props) => {
    const [jobPostingData, setJobPostingData] = React.useState(props.jobPosting);
    const [process, setProcess] = React.useState(props.jobPosting.process ? props.jobPosting.process : ['', '', '', '', '']);

    React.useEffect(() => {
        if (props.jobPosting.process && props.jobPosting.process.length > 0) {
            setProcess(props.jobPosting.process);
        }
    }, [props.jobPosting.process]);

    function handleProcessChange(newP, index) {
        let tmp = process;
        tmp[index] = newP;
        setProcess(tmp);
    }

    function handleSaveClick() {
        jobPostingData.process = process;
        // save data
        props.setJobPosting(jobPostingData);
        // switch to next
        props.handleContinueClick();
        // reset
        setProcess(['', '', '', '', '']);
        props.handleSave();
    }

    return (
        <Container>
            {props.saveMode !== undefined && props.saveMode === false ?
                <Row className="justify-content-start">
                    <Button size="sm" style={{ backgroundColor: "green", borderColor: "green", width: '70px', marginTop: '1%' }} >
                        Save
                    </Button>
                </Row>
                :
                <></>
            }
            {
                process.map((item, index) => {
                    return (
                        <Form.Group as={Row} key={index} className="mb-3" style={{ marginTop: '20px' }}>
                            <Form.Label column sm={2}>Step {index + 1}</Form.Label>
                            <Col sm={9}>
                                <Form.Control as="textarea" rows={2} placeholder="Type here..." onChange={e => { handleProcessChange(e.target.value, index); }} />
                            </Col>
                        </Form.Group>
                    );
                })
            }
            {/* <Row className="justify-content-end">
                <Col className="justify-content-start">
                    <Button variant="outline-primary" onClick={addProcess}>Add Process</Button>
                </Col>
                <Col className="justify-content-end">
                    <Button style={{ width: '200px', marginRight: '5%' }} onClick={handleSaveClick}>Saved Jobs</Button>
                </Col>
            </Row> */}
            {props.saveMode !== undefined && props.saveMode === false ?
                <></>
                :
                <Row className="justify-content-end">
                    {/* <Col className="justify-content-start">
                    <Button variant="outline-primary" onClick={addProcess}>Add Process</Button>
                </Col> */}
                    {/* <Col className="justify-content-end"> */}
                    <Button style={{ width: '200px', marginRight: '5%' }} onClick={handleSaveClick}>Saved Jobs</Button>
                    {/* </Col> */}
                </Row>
            }
        </Container>
    );
}

export default CreateJobPosting;