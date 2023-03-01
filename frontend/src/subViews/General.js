import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * General component to hold General Profile information
 * @author Jing Huang
 */

const TITLES = ['First Name', 'Last Name', 'Employee #',
    'Access Role', 'User Status', 'Employee Type',
    'Job Tier', 'Job Title', 'Job History',
    'Company Start Date', 'Departments'];

const DummyData = ['Sharon', 'Owens', '90782846',
    'Administrator', 'Active Employee', 'Full Time',
    'Engineering Department', 'Java Software Engineer, Engineering Department, 02/01/2022 - Present', 'Software Engineer, Engineering Department, 01/10//2021 - 02/01/2022',
    '09/16/2019', 'Engineering'];

// TODO: hard code
function General(props) {

    const [employee, setEmployee] = React.useState(props.employee);

    return (
        <Container fluid style={{ alignItems: 'left' }}>
            <Row style={{ marginBottom: "15px", fontSize: '25px' }}>General Employee Information</Row>
            {
                (employee !== undefined) ?
                    Object.keys(employee).map((item) => {
                        if (item !== 'id') {
                            return (
                                <Row key={item} style={{ textAlign: 'left', justifyContent: "space-between" }}>
                                    <Col>
                                        <h6>{item[0].toUpperCase() + item.substring(1)}</h6>
                                    </Col>
                                    <Col>
                                        <h6>{employee[item]}</h6>
                                    </Col>
                                </Row>
                            );
                        }
                        return;
                    })
                    :
                    undefined
            }
        </Container>
    );

}

export default General;