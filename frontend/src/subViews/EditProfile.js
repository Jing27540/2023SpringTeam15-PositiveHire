import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import axios from 'axios';
import { GrDocumentCsv } from "react-icons/gr";
/**
 * Create EditProfile Form for user to update their profile
 * @author Jing Huang
 */
// TODO: hard code, should be remove later

const jobHistoryFields = ['Role', 'Select', 'StartDate', 'EndDate'];
const EducationFields = ['Institution', 'Address', 'StartDate', 'EndDate'];




function EditProfile(props) {

    const [file, setFile] = React.useState();

    const [employee, setEmployee] = React.useState(props.employee);

    React.useEffect(() => {
      

    }, [file]);

    function handleFileChange(e) {

        if (e.target.files) {
            setFile(e.target.files[0]);
         
        }
        console.log(e.target.files);
    }

    function handleUploadClick() {

        const formData = new FormData();

        formData.append(file.name, file, file.name);
        console.log(formData);
        let form = {
            type: file.type,
            bytes: file.file
        };

        // { headers: { 'Content-Type': `multipart/form-data`, 'Content-Length': `${file.size}` } }
        axios.post(`http://localhost:8080/documents/${employee.employeeNum}`, formData, employee.employeeNum).then(res => {
            console.log(res.data);
         
        });

    }
    // TODO: hard code 
    const data = [{ name: "c#", level: "Expert", score: "5", }, { name: "Communication", level: "Advanced", score: "3", }];
    const [role, setRole] = React.useState('role');

    return (
        <Container>
            <Row style={{ margin: "3%" }}><h4 className="uploadResume">Upload Resume</h4></Row>
            <Container style={{ margin: "5%" }}>
                <div style={{ margin: '10%', float: 'center' }}>
                    <Row className="justify-content-md-center">
                        <div>
                            <input type="file" onChange={handleFileChange} accept=".pdf" />

                            <div>{file && `${file.name}` - `${file.type}`}</div>

                            <button onClick={handleUploadClick}>Upload</button>
                        </div>
                    </Row>
                </div>
            </Container>
        </Container>
    );
}

export default EditProfile;