// React Imports
import React, { useState, useCallback, useMemo, useEffect } from 'react'

// React Dropzone Imports (drag and drop file area)
import { useDropzone } from 'react-dropzone';

// Navigate Hook
import { useNavigate } from "react-router-dom";

// Bootstrap Imports
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';

//Table for employees
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

// React Icons
import { GrDocumentCsv } from "react-icons/gr";

// Axios Import for API Calls
import axios from "axios";

// Styling for React Dropzone
const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '100px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

/**
 * Import Data fuction that handles taking in a CSV file and uploading the contained information to mySQL
 */
function ImportData() {
  // holds file object
  const [file, setFile] = useState(null)

  // holds list of employees
  const [employeeData, setEmployeeData] = useState([]);

  // initializes navigate hook to navigate between pages
  let navigate = useNavigate();

  //Load state of upload button
  const [loadingUpload, setLoadingUpload] = useState(false)
  //Modal for upload confirmation
  const [showUploadConfirmation, setShowUploadConfirmation] = useState(false)

  //Current data in the system that will populate the table
  const [employees, setEmployees] = useState([]);

  //For deleting all employees
  const [showDeleteAll, setShowDeleteAll] = useState(false)
  const [loadingDeleteAll, setLoadingDeleteAll] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  // array to hold the columns that come from the csv
  const [csvColumns, setCsvColumns] = useState([])

  // all columns in database
  const [databaseColumns] = useState(["NA", "employeeName","employeeNum","marriedId",
                                      "maritalStatusId","genderId","employmentStatusId","departmentId",
                                      "performanceScoreId","age","payRate", "state", "zip", "DOB", "sex",
                                      "maritalDesc", "citizenDesc", "hispanicLatino", "raceDesc", "dateOfHire", 
                                      "daysEmployed", "dateOfTermination", "reasonForTermination", "employmentStatus",
                                      "department", "position", "managerName", "employeeSource", "accessRole", "performanceScore",
                                      "annualBonus", "ptoHours", "technicalSkills", "peopleSkills", "workEthic", "certifications"]);          
  
  // holds the database columns in order of the matching column in csvColumns
  const [matchingArray, setMatchingArray] = useState([])

  /**
   * When a file is dropped in the dropzone, this calls the loadCSV function
   */
  const onDropAccepted = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      loadCSV(file)
    })
  }, [])

  // setting up options for the react dropzone
  const {getRootProps, 
         getInputProps,
         isFocused,
         isDragAccept,
         isDragReject} = useDropzone({onDropAccepted, accept: {"text/csv": [".csv"]}});  

  // handles styling the dropzone on hover
  const style = useMemo(() => ({
  ...baseStyle,
  ...(isFocused ? focusedStyle : {}),
  ...(isDragAccept ? acceptStyle : {}),
  ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  // Load employees on page load
  useEffect(() => {
    loadCurrentData()
  }, []);

  //Loading the employees from the database
  const loadCurrentData = () => {
    axios.get("http://localhost:8080/employees").then(result => {
      setEmployees(result.data)
    })
    console.log(employees)
  };

  const headerSortingStyle = { backgroundColor: '#d2c8e6' };

  //Columns for the table
  const columns = [
    {dataField: "id", text: "ID", sort: true, headerSortingStyle},
    {dataField: "department", text: "Department", sort: true, headerSortingStyle},
    {dataField: "race", text: "Race", sort: true, headerSortingStyle},
    {dataField: "gender", text: "Gender", sort: true, headerSortingStyle},
    {dataField: "employmentStatus", text: "Employment Status", sort: true, headerSortingStyle},
    {dataField: "location", text: "Location", sort: true, headerSortingStyle},
    {dataField: "age", text: "Age", sort: true, headerSortingStyle},
    //{dataField: "education", text: "Education"},
    {dataField: "startDate", text: "Start Date", sort: true, headerSortingStyle},
    {dataField: "endDate", text: "End Date", align: 'center', sort: true, headerSortingStyle},
    //{dataField: "jobTitle", text: "Job Title"},
    {dataField: "lastPromotionDate", text: "Last Promotion Date", sort: true, headerSortingStyle},
    {dataField: "lastTrainingYear", text: "Last Training Year", sort: true, headerSortingStyle},
    //{dataField: "numMentorMeeting", text: "# of Mentor Meetings"},
    //{dataField: "onsiteResult", text: "On Site Result"},
    {dataField: "pay", text: "Pay", sort: true, headerSortingStyle},
    {dataField: "bonus", text: "Bonus", sort: true, headerSortingStyle},
    //{dataField: "phoneInterviewResult", text: "Phone Interview Result"},
    {dataField: "ptoHours", text: "PTO Hours", sort: true, headerSortingStyle},
    //{dataField: "resumeScreeningResult", text: "Resume Screening Result"},
    //{dataField: "trainingTimesLastYear", text: "Training Times Last Year"},
    {dataField: "yearsAtCompany", text: "Years at Company", sort: true, headerSortingStyle},
    //{dataField: "yearsSinceLastPromotion", text: "Years Since Last Promotion"},
  ]

  // Create the options to change the number of rows
  // per page
  const sizePerPageRenderer = ({
    options,
    currSizePerPage,
    onSizePerPageChange
  }) => (
    <div className="btn-group" role="group">
      {
        options.map((option) => {
          const isSelect = currSizePerPage === `${option.page}`;
          return (
            <button
              key={ option.text }
              type="button"
              onClick={ () => onSizePerPageChange(option.page) }
              className={ `btn ${isSelect ? 'btn-primary' : 'btn-outline-primary'}` }
            >
              { option.text }
            </button>
          );
        })
      }
    </div>
  );

  // Options for both the number of rows per page
  // and how the page transition buttons look
  const options = {
    sizePerPageRenderer,
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    sizePerPageList: [{
      text: '5', value: 5
    }, {
      text: '10', value: 10
    }, {
      text: '20', value: 20
    }, {
      text: '50', value: 50
    }, {
      text: 'All', value: employees.length
    }] // A numeric array is also available. the purpose of above example is custom the text
  };

  /**
   * Creates a delay
   * @param ms delay in ms
   */
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  /**
   * Delete all of the employees
   */
  const handleDeleteEmployees = async () => {
    setLoadingDeleteAll(true)
    await delay(1);
    for (const employee of employees) {
      await axios.delete(`http://localhost:8080/employees/${employee.employeeNum}`).then(result => {
        console.log(result.data)
      })
    }
    setShowConfirmation(true)
    await delay(2500);
    setShowDeleteAll(false)
    setLoadingDeleteAll(false)
    setShowConfirmation(false)
    navigate("/home")
  }

  // file reader initiaization 
  const fileReader = new FileReader()

  /**
   * Reads in the csv loaded into the dropzone
   * @param file file to read
   */
  const loadCSV = (file) => {
    setFile(file);
    
    if (file) {
      fileReader.onload = function (event) {
          const csvOutput = event.target.result;
          csvFileToArray(csvOutput);
      };

      fileReader.readAsText(file);
    }
  }

  /**
   * Loads the employee data from the file using the first row
   * as the columns
   * @param string text from file
   */
  const csvFileToArray = (string) => {
    // get the columns from the first row of the file
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");

    // get the data separate from the columns
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    // set up the matching array with all NA to start
    let tempMatchingArray = []
    csvHeader.forEach(header => {
      tempMatchingArray.push("NA")
    });

    setCsvColumns(csvHeader)
    setMatchingArray(tempMatchingArray)

    // for each row create an entry in a new array for every employee
    // that maps the field to the value
    const array = csvRows.map(i => {
      const values = i.split(",");

      const obj = csvHeader.reduce((object, header, index) => {
        let value = values[index]
        object[header] = isNaN(Number(value)) ? value : Number(value);
        return object;
      }, {});
      return obj;
    });

    setEmployeeData(array);
  }

  /**
   * When a column is matched handle that in the
   * matching array
   * @param e event
   * @param idx index of select box changed
   */
  const handleColumnSelect = (e, idx) => {
    matchingArray[idx] = e.target.value
    setMatchingArray([...matchingArray])
  }

  /**
   * Load the employees into the database
   */
  const importEmployees = async () => {
    setLoadingUpload(true)
    await delay(5000);
    for (const employee of employeeData) {
      // initialze the final employee object
      let finalEmployee = {
        employeeName: null,
        employeeNum : 0,
        marriedId: 0,
        maritalStatusId: 0,
        genderId: 0,
        employmentStatusId: 0,
        departmentId: 0,
        performanceScoreId: 0,
        age: 0,    
        payRate: 0.0,
        state: null,
        zip: 0,
        DOB: null,
        sex: null,
        maritalDesc: null,
        citizenDesc: null,
        hispanicLatino: null,
        raceDesc: null,
        dateOfHire: null,
        daysEmployed: 0,
        dateOfTermination: null,
        reasonForTermination: null,
        employmentStatus: null,
        department: null,
        position: null,
        managerName: null,
        employeeSource: null,
        accessRole: null,
        performanceScore: null,
        annualBonus: null,
        ptoHours: 0.0,
        technicalSkills: [],
        peopleSkills: [],
        workEthic: [],
        certifications: []
      }

      // for every column in the matching array, get the matching field in the csv array from the employee
      // and set field in the final employee
      for (let i = 0; i < matchingArray.length; i++) {
        if (matchingArray[i] !== "NA" && employee[csvColumns[i]] !== "null" && employee[csvColumns[i]] !== "") {
          finalEmployee[matchingArray[i]] = employee[csvColumns[i]]
        }
      }
          
      // add the employee to the database
      await axios.post("http://localhost:8080/employees", finalEmployee).then(response => {
        console.log(finalEmployee);
        console.log("done")
      }).catch(error => {
        console.log(finalEmployee)
      });
    }
    setShowUploadConfirmation(true)
    await delay(2000);
    setLoadingUpload(false)
    setShowUploadConfirmation(false)
    navigate("/home")
  }

  return (
    <Container fluid>
      {
        employees.length > 0 ? (
          <div style={{paddingTop: "1em"}}>
            {
              loadingDeleteAll ? (
                <div className="spinner-wrapper d-flex flex-column align-items-center justify-content-center">
                  <div className="row">
                    <Spinner className="spinner-border-big" animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                <br />
                {showConfirmation &&
                  <> 
                    <div className="row">
                      <font color="#FFFFFF">Finished Deleting</font>
                    </div>
                    <div className="row">
                      <font color="#FFFFFF">Redirecting to the home</font>
                    </div>
                  </>
                }
                {!showConfirmation &&
                  <> 
                    <div className="row">
                      <font color="#FFFFFF">Deleting Data</font>
                    </div>
                    <div className="row">
                      <font color="#FFFFFF">Please wait</font>
                    </div>
                  </>
                }
                </div>
              ):(null)
            }
            <h3>
              <div className="d-flex align-items-center">
                <span>
                  <font>Data</font>
                </span>
              <span className="ms-auto"></span>
              {
                employees.length > 0 ? (
                  <>
                    <Button className="btn btn-space" variant="danger" size="sm" onClick={() => setShowDeleteAll(true)}>Delete All</Button>
                  </>
                ):(null)
              }
              </div>
            </h3>
            <hr />
          </div>
        ) : (
          <>
            {
              file === null ? (
                <>
                <div style={{paddingTop: "1em"}}>
                  <h3>
                    <div className="d-flex align-items-center">
                      <span>
                        <font color="#EE786C">Welocme to PH Balanced</font>
                      </span>
                      <span className="ms-auto"></span>
                        {
                          employees.length > 0 ? (
                            <>
                              <Button className="btn btn-space" variant="danger" size="sm" onClick={() => setShowDeleteAll(true)}>Delete All</Button>
                            </>
                          ):(null)
                        }
                    </div>
                  </h3>
                  <h6>To begin generating metrics, please upload your data via a CSV import</h6>
                </div>
                <div style={{paddingTop: "1em"}}>
                <Row className="justify-content-md-center">
                  <Col>
                    <div {...getRootProps({style})}>
                      <input {...getInputProps()} />
                      <h1><GrDocumentCsv /></h1>
                      <p className="text-black">Drag and drop a CSV file here, or click here to select files</p>
                    </div>
                  </Col>
                </Row>
                </div>
                </>
              ) : (
                <>
                  <div style={{paddingTop: "1em"}}>
                    <h3>Upload Data</h3>
                    <hr />
                    <h5>
                      <Card>
                        <Card.Body>
                        <div className="d-flex align-items-center">
                          <span>
                            <font>{file.name}</font>
                          </span>
                          <span className="ms-auto"></span>
                          <Button className="btn btn-space" variant="danger" size="sm" onClick={() => window.location.reload(false)}>Delete</Button>
                        </div>
                        </Card.Body>
                      </Card>
                    </h5>
                  </div>
                  <div style={{paddingBottom: "1em"}}>
                    <Card>
                      <Card.Body>
                        <Card.Title>Match Data</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Match the columns from your uploaded file (left) to the columns in the database (right). Use NA if there is no match.</Card.Subtitle>
                          <Row>
                            <Col xs={6}>
                              <Table striped bordered>
                                <thead>
                                  <tr>
                                    <th>CSV Column</th>
                                    <th>Database Column</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {
                                    csvColumns.map((header, idx) => {
                                      return  <tr key={idx}>
                                                <td>{header}</td>
                                                <td>
                                                  <Form.Select onChange={(e) => handleColumnSelect(e, idx)}>
                                                    {
                                                      databaseColumns.map((col, index) => {
                                                        return <option value={col} key={index}>{col}</option>
                                                      })
                                                    }
                                                  </Form.Select>
                                                </td>
                                              </tr>
                                    })  
                                  }
                                </tbody>
                              </Table>
                            </Col>
                          </Row>
                          <Button variant="success" onClick={importEmployees} disabled={loadingUpload}>Upload Data</Button>
                          {
                            loadingUpload ? (
                              <div className="spinner-wrapper d-flex flex-column align-items-center justify-content-center">
                                <div className="row">
                                  <Spinner className="spinner-border-big" animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                  </Spinner>
                                </div>
                                <br />
                                {showUploadConfirmation &&
                                  <> 
                                    <div className="row">
                                      <font color="#FFFFFF">Finished Uploading</font>
                                    </div>
                                    <div className="row">
                                      <font color="#FFFFFF">Redirecting to the home</font>
                                    </div>
                                  </>
                                }
                                {!showUploadConfirmation &&
                                  <> 
                                    <div className="row">
                                      <font color="#FFFFFF">Uploading Data</font>
                                    </div>
                                    <div className="row">
                                      <font color="#FFFFFF">Please wait</font>
                                    </div>
                                  </>
                                }
                              </div>
                            ):(null)
                          }
                      </Card.Body>
                    </Card>
                  </div>
                </>
              )
            }
          </>
        )
      }
      <Modal show={showDeleteAll} onHide={() => setShowDeleteAll(false)} animation={true}>
          <Modal.Header>
            <Modal.Title>Delete All Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              Are you sure you would like to permanently delete all of the data in the system?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleDeleteEmployees} disabled={loadingDeleteAll}>Delete All</Button>
            <Button variant="danger" onClick={() => setShowDeleteAll(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
    </Container>
  )
}

export default ImportData;