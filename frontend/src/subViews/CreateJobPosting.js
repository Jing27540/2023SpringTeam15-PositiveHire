import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

/**
 * This view will show the form allow user to create a job posting
 * @author Jing 
 */
function CreateJobPosting() {

    const titles = ['JobTitle', 'Requirements', 'Availabliltiy', 'Process']
    const [color, setColor] = React.useState("secondary");
    const [mode, setMode] = React.useState('JobTitle');

    // Job Title
    const [jobTitle, setjobTitle] = React.useState();
    const [jobDescription, setJobDescription] = React.useState();
    const [department, setDepartment] = React.useState();
    const [salary, setSalary] = React.useState();
    // Requirements
    const [skill, setSkill] = React.useState();
    const [skillRequirements, setSkillRequirements] = React.useState();
    const [cerificationRequirements, setCertificationRequirements] = React.useState();
    const [otherRequirements, setOtherRequirements] = React.useState();
    // Availability
    const [availablePositions, setAvailablePositions] = React.useState();
    const [location, setLocation] = React.useState();
    const [meetingType, setMeetingType] = React.useState();
    const [meetingNotes, setMeetingNotes] = React.useState();
    // Process
    const [process, setProcess] = React.useState([]);
    const [processData, setProcessData] = React.useState([]);

    console.log(process);

    React.useEffect(()=>{

        let temp = process;

        for (let i = 0; i < processData.length; i++) {
            let item = processData[i];
            if(item)  {
                temp[i] = item;
            }
        }
        setProcess(temp);
    }, [processData]);

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
        // update value

        // call api
    }

    return (
        <Container>
            <Row style={{ marginTop: '15px' }}>
                {
                    titles.map((item, index) => {
                        return (
                            <Col key={index}>
                                <Button
                                    variant={color}
                                    style={{ width: '200px' }}
                                    onClick={() => { setMode(item) }}>
                                    {item}
                                </Button>
                            </Col>
                        );
                    })
                }
            </Row>
            <Row>
                {
                    mode === titles[0] ?
                        <JobTitle
                            setjobTitle={setjobTitle}
                            setDepartment={setDepartment}
                            setJobDescription={setJobDescription}
                            setSalary={setSalary}
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
                                    setLocation={setLocation}
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
                    <Button variant={'warning'} style={{ width: '200px', marginRight: '5%' }} onClick={handleContinueClick}>Continue</Button>
                </Col>
                <Col>
                    <Button style={{ width: '200px', marginRight: '5%' }}>Saved Jobs</Button>
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
                <Col sm={7}> <Form.Control as="textarea" rows={3} placeholder="Type here..." onChange={e => props.setjobTitle(e.target.value)} /> </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> Job Description </Form.Label>
                <Col sm={7}> <Form.Control as="textarea" rows={3} placeholder="Type here..." onChange={e => props.setJobDescription(e.target.value)} /> </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> Department </Form.Label>
                <Col sm={7}> <Form.Control as="textarea" rows={3} placeholder="Type here..." onChange={e => props.setDepartment(e.target.value)} /> </Col>
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
    return (
        <Container>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> # of Positions Available </Form.Label>
                <Col sm={7}> <Form.Control as="textarea" rows={3} placeholder="Type here..." onChange={e => props.setAvailablePositions(e.target.value)} /> </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" style={{ marginTop: '20px' }}>
                <Form.Label column sm={2}> Location </Form.Label>
                <Col sm={7}> <Form.Control as="textarea" rows={3} placeholder="Type here..." onChange={e => props.setLocation(e.target.value)} /> </Col>
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