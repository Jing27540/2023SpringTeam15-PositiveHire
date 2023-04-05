import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import { GrDocumentCsv } from "react-icons/gr";
/**
 * Create EditProfile Form for user to update their profile
 * @author Jing Huang
 */
// TODO: hard code, should be remove later

const jobHistoryFields = ['Role', 'Select', 'StartDate', 'EndDate'];
const EducationFields = ['Institution', 'Address', 'StartDate', 'EndDate'];

function EditProfile() {

    // TODO: hard code 
    const data = [{ name: "c#", level: "Expert", score: "5", }, { name: "Communication", level: "Advanced", score: "3", }];
    const [role, setRole] = React.useState('role');

    return (
        <Container>
            <Row style={{ margin: "3%" }}><h4 className="uploadResume">Upload Resume</h4></Row>
            <Container style={{ margin: "5%" }}>
                <div style={{ margin: '10%', float: 'center' }}>
                    <Row className="justify-content-md-center">
                        <Row>
                            <h1><GrDocumentCsv /></h1>
                        </Row>
                        <Row>
                            <p className="text-black">Drag and drop a CSV file here, or click here to select files</p>
                        </Row>
                    </Row>
                </div>
            </Container>
        </Container>
    );
}

export default EditProfile;