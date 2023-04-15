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

    //     function getExportFile () {
    //     // helper function: generate a new file from base64 String
    //     const base64ToBlob = (dataurl) => {
    //       const arr = dataurl.split(',');
    //       const mime = arr[0].match(/:(.*?);/)[1];
    //       const sliceSize = 1024;
    //       const byteChars = window.atob(arr[1]);
    //       const byteArrays = [];

    //       for (let offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
    //         let slice = byteChars.slice(offset, offset + sliceSize);

    //         const byteNumbers = new Array(slice.length);
    //         for (let i = 0; i < slice.length; i++) {
    //           byteNumbers[i] = slice.charCodeAt(i);
    //         }

    //         const byteArray = new Uint8Array(byteNumbers);

    //         byteArrays.push(byteArray);
    //       }

    //       return new Blob(byteArrays, {type: mime});
    //     }

    //     const getFilename = (dataUrl) => {
    //       const arr = dataUrl.split(',');
    //       const mime = arr[0].match(/:(.*?);/)[1];

    //       return Math.round(+new Date()/1000) + '.' + mime.split('/').pop();
    //     }

    //     let reader = new FileReader();

    //         reader.readAsDataURL(file);

    //     // const dataUrl = this.previewCanvas.toDataURL();
    //     const dataUrl = reader.result;
    //     const blob = base64ToBlob(dataUrl);
    //     blob.name = getFilename(dataUrl);

    //     // generate file from base64 string
    //     return blob;

    //   }

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

        let reader = new FileReader();

        // reader.readAsDataURL(file);
        reader.readAsDataURL(file);

        let data = btoa(reader.result);

        reader.onload = function () {
            // console.log("result" + reader.result);

            //Remove the beginning portion of the result that is NOT a part of the base64 encoded string
            var base64result = reader.result.split(',')[1];
            // console.log(base64result);
            console.log(base64result.length);
            const size = 3 * (base64result.length / 4);
            console.log(size);
            let data = {
                content: base64result
            }
            console.log(data);

            axios.post(`http://localhost:8080/documents/${employee.employeeNum}`, base64result, { headers: { 'Content-Type': 'application/json' } }).then(res => {
                console.log(res.data);

            });
        };

        // let sendFile = getExportFile();

        // { headers: { 'Content-Type': `multipart/form-data`, 'Content-Length': `${file.size}` } }
        // , { headers: { 'Content-Type': 'application/json' } }
        // axios.post(`http://localhost:8080/documents/${employee.employeeNum}`, oop).then(res => {
        //     console.log(res.data);

        // });

    }

    function downloadResume() {
        axios.get(`http://localhost:8080/documents/${employee.employeeNum}`).then(res => {

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
                            <button onClick={downloadResume}>Download</button>
                        </div>
                    </Row>
                </div>
            </Container>
        </Container>
    );
}

export default EditProfile;