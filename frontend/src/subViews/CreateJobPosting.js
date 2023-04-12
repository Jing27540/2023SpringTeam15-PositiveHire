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
            // setMode(titles[0]);
            alert("Successful to create a new job posting!");
            props.setMode("Edit");
        }).catch(error => {

        });
    }

    return (
        <Container fluid>
            {/* {message && message !== "" ?
                <div className="alert alert-success" role="alert">
                    {message}
                </div>
                :
                undefined
            } */}
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
    const [jobNumber, setJobNumber] = React.useState(props.jobPosting.jobNumber ? props.jobPosting.jobNumber : "");
    const [jobTitle, setjobTitle] = React.useState(props.jobPosting.jobTitle ? props.jobPosting.jobTitle : "");
    const [applyLink, setApplyLink] = React.useState(props.jobPosting.applyLink ? props.jobPosting.applyLink : "");
    const [jobDescription, setJobDescription] = React.useState(props.jobPosting.jobDescription ? props.jobPosting.jobDescription : "");
    const [department, setDepartment] = React.useState(props.jobPosting.department ? props.jobPosting.department : "");
    const [salary, setSalary] = React.useState(props.jobPosting.salary ? props.jobPosting.salary : "");
    const [index, setIndex] = React.useState(salary !== "" ? salary.indexOf("~") : undefined);
    const [min, setMin] = React.useState(index ? salary.substr(0, index) : "");
    const [max, setMax] = React.useState(index ? salary.substr(index + 1) : "");

    console.log(min, max);

    // get jobPostings list
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

    const isValidUrl = urlString => {
        var a = document.createElement('a');
        a.href = urlString;
        return (a.host && a.host !== window.location.host);
    }

    function handleSaveClick(flag) {

        if (jobNumber !== "" && jobTitle !== "" && jobDescription !== '' && department !== '' && min !== '' && max !== '') {
            // check applyLink
            // check jobNumber
            const result = jobPostings.filter(item => jobNumber === item.jobNumber);
            if (applyLink !== '' && !isValidUrl(applyLink)) {
                alert("Invalid Link!");
            }
            // check if duplicate jobNumber occurs in create mode [when props.saveMode === true]
            else if (props.saveMode !== false && result && result.length > 0) {
                alert("Duplicate JobNumber!");
            } else {
                jobPostingData.jobNumber = jobNumber;
                jobPostingData.jobTitle = jobTitle;
                if (applyLink !== "") {
                    jobPostingData.applyLink = applyLink;
                } else {
                    jobPostingData.applyLink = "";
                }
                jobPostingData.jobDescription = jobDescription;
                jobPostingData.department = department;
                // isNaN(x)
                jobPostingData.salary = min + "~" + max;

                // save data
                props.setJobPosting(jobPostingData);
                if (props.saveMode !== undefined && props.saveMode === false) {
                    // api call
                    axios.put("http://localhost:8080/jobpostings", jobPostingData).then(response => {
                        console.log("save", jobPostingData);
                        alert("Save Successfully!!");
                    }).catch(error => {
                        alert("Unsuccessful to update the Job Title!")
                    });
                } else {
                    // switch to next
                    props.handleContinueClick();
                }
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
                <Col sm={9}> <Form.Control rows={1} placeholder="Type here..." value={jobNumber} disabled={props.saveMode !== undefined ? !props.saveMode : false} onChange={e => setJobNumber(e.target.value)} /></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> Job Description </Form.Label>
                <Col sm={9}> <Form.Control as="textarea" rows={3} placeholder="Type here..." value={jobDescription} onChange={e => setJobDescription(e.target.value)} /></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> Apply Link </Form.Label>
                <Col sm={9}> <Form.Control rows={1} placeholder="Type here..." value={applyLink} onChange={e => {
                    setApplyLink(e.target.value);
                }} /></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> Department </Form.Label>
                <Col sm={9}> <Form.Control as="textarea" rows={3} placeholder="Type here..." value={department} onChange={e => setDepartment(e.target.value)} /></Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> Median Salary (varies based on location)</Form.Label>
                <Col sm={9} style={{ textAlign: "center", marginTop: '10px' }}>
                    <Row style={{ itemAlign: "left" }}>
                        <Col sm={6}>
                            <Row>
                                <Form.Label column sm={2}>MIN$</Form.Label>
                                <Col sm={8}><Form.Control placeholder="Type here..." value={min} onChange={e => { if (isNaN(e.target.value)) { alert('Min Salary should be Integer!') } else { setMin(e.target.value); } }} /></Col>
                            </Row>
                        </Col>
                        <Col sm={6}>
                            <Row>
                                <Form.Label column sm={2}>MAX$</Form.Label>
                                <Col sm={8}><Form.Control placeholder="Type here..." value={max} onChange={e => { if (isNaN(e.target.value)) { alert('Max Salary should be Integer!') } else { setMax(e.target.value); } }} /></Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
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

    const [flag, setFlag] = React.useState(false);

    React.useEffect(() => {
        if (flag) {
            setSName("");
            setYearExperience("");
            setComment1("");
        }
        setFlag(false);
    }, [flag]);

    // TODO: The list is not Update
    function addSkill() {
        let exists = false;

        if (skillRequirements === undefined) {
            setSkillRequirements([]);
        }

        if (comment1 !== "" && sType !== "" && yearExperience !== undefined && yearExperience !== "") {
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
                    // TODO: this is not working!!
                    setFlag(true);
                    alert("Successfully add new skill!");
                } else {
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
            alert("No Skill to Remove.");
        }
    }

    const handleSkillRequirementsChange = () => {
        const newSK = [...skillRequirements];
        setSkillRequirements(newSK);
    };

    function addCertification() {

        let exists = false;

        if (certificationRequirements === undefined) {
            setCertificationRequirements([]);
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
            if (props.saveMode !== undefined && props.saveMode === false) {
                // api call
                axios.put("http://localhost:8080/jobpostings", jobPostingData).then(response => {
                    alert("Save Successfully!!");
                }).catch(error => {
                    alert("Unsuccessful to update the Requirements!")
                });
            } else {
                // switch to next
                props.handleContinueClick();
            }

        } else {
            alert("Missing inputs of skillRequirements, certificiationRequirements and otherRequirements, Please enter N/A instead!");
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
                <Col sm={2}><Button variant="outline-primary" onClick={() => { addCertification(); }}>Add Certification</Button></Col>
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
        if (availablePositions || locations.length > 0 || meetingType !== "" || meetingNotes !== "") {
            if (isNaN(availablePositions) || availablePositions < 1) {
                alert("availablePositions should be integer and cannot be 0.");
            } else {
                jobPostingData.availablePositions = availablePositions;
                jobPostingData.location = locations;
                jobPostingData.meetingType = meetingType;
                jobPostingData.meetingNotes = meetingNotes;

                // save data
                props.setJobPosting(jobPostingData);
                if (props.saveMode !== undefined && props.saveMode === false) {
                    // api call
                    axios.put("http://localhost:8080/jobpostings", jobPostingData).then(response => {
                        alert("Save Successfully!!");
                    }).catch(error => {
                        alert("Unsuccessful to update the Availability!")
                    });
                } else {
                    // switch to next
                    props.handleContinueClick();
                }
            }
        } else {
            alert("Missing inputs of availablePositions/location/meetingType/meetingNotes! Please N/A instead.");
        }
    }

    return (
        <Container>
            {props.saveMode !== undefined && props.saveMode === false ?
                <Row className="justify-content-start">
                    <Button onClick={handleSaveClick} size="sm" style={{ backgroundColor: "green", borderColor: "green", width: '70px', marginTop: '1%' }} >
                        Save
                    </Button>
                </Row>
                :
                <></>
            }
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> # of Positions Available </Form.Label>
                <Col sm={3}> <Form.Control rows={1} placeholder="Type Number..." value={availablePositions} onChange={e => setAvailablePositions(e.target.value)} /> </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Col sm={2}><Button variant="outline-primary" onClick={() => { addLocation(); }}>Add Location</Button></Col>
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
                <Col sm={9}> <Form.Control as="textarea" rows={3} placeholder="Type here..." value={meetingNotes} onChange={e => setMeetingNotes(e.target.value)} /> </Col>
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
    const [p1, setP1] = React.useState(props.jobPosting.process ? props.jobPosting.process[0] : "");
    const [p2, setP2] = React.useState(props.jobPosting.process ? props.jobPosting.process[1] : "");
    const [p3, setP3] = React.useState(props.jobPosting.process ? props.jobPosting.process[2] : "");
    const [p4, setP4] = React.useState(props.jobPosting.process ? props.jobPosting.process[3] : "");
    const [p5, setP5] = React.useState(props.jobPosting.process ? props.jobPosting.process[4] : "");

    function handleSaveClick() {
        let p = [];
        p.push(p1);
        p.push(p2);
        p.push(p3);
        p.push(p4);
        p.push(p5);
        setProcess(p);
        jobPostingData.process = p;
        console.log(jobPostingData);
        // save data
        props.setJobPosting(jobPostingData);
        if (props.saveMode !== undefined && props.saveMode === false) {
            // api call
            axios.put("http://localhost:8080/jobpostings", jobPostingData).then(response => {
                console.log("save", jobPostingData);
                alert("Save Successfully!!");
            }).catch(error => {
                alert("Unsuccessful to update the Processes!")
            });
        } else {
            // switch to next
            props.handleContinueClick();
            // reset
            // setProcess(['', '', '', '', '']);
            props.handleSave();
        }
    }

    return (
        <Container>
            {props.saveMode !== undefined && props.saveMode === false ?
                <Row className="justify-content-start">
                    <Button onClick={handleSaveClick} size="sm" style={{ backgroundColor: "green", borderColor: "green", width: '70px', marginTop: '1%' }} >
                        Save
                    </Button>
                </Row>
                :
                <></>
            }
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}>Step 1</Form.Label>
                <Col sm={9}>
                    <Form.Control as="textarea" rows={2} value={p1} placeholder="Type here..." onChange={e => { setP1(e.target.value); }} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}>Step 2</Form.Label>
                <Col sm={9}>
                    <Form.Control as="textarea" rows={2} value={p2} placeholder="Type here..." onChange={e => { setP2(e.target.value); }} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}>Step 3</Form.Label>
                <Col sm={9}>
                    <Form.Control as="textarea" rows={2} value={p3} placeholder="Type here..." onChange={e => { setP3(e.target.value); }} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}>Step 4</Form.Label>
                <Col sm={9}>
                    <Form.Control as="textarea" rows={2} value={p4} placeholder="Type here..." onChange={e => { setP4(e.target.value); }} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}>Step 5</Form.Label>
                <Col sm={9}>
                    <Form.Control as="textarea" rows={2} value={p5} placeholder="Type here..." onChange={e => { setP5(e.target.value); }} />
                </Col>
            </Form.Group>
            {props.saveMode !== undefined && props.saveMode === false ?
                <></>
                :
                <Row className="justify-content-end">
                    <Button style={{ width: '200px', marginRight: '5%' }} onClick={handleSaveClick}>Saved Jobs</Button>
                </Row>
            }
        </Container>
    );
}

export default CreateJobPosting;