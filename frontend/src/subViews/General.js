import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * General component to hold General Profile information
 * @author Jing Huang
 */
function General(props) {

    const [employee, setEmployee] = React.useState(props.employee);

    return (
        <Container fluid style={{ alignItems: 'left', marginTop: "2%", marginLeft: "2%" }}>
            <Row style={{ marginBottom: "15px", fontSize: '25px' }}>General Employee Information</Row>
            {
                (employee !== undefined) ?
                    Object.keys(employee).map((item, index) => {
                        if (item !== 'id' && item !== 'technicalSkills' && item !== 'peopleSkills'
                            && item !== 'workEthic' && item !== 'certifications' && item !== 'jobRecords' && item !== 'education') {
                            return (
                                <Row key={index} style={{ textAlign: 'left', justifyContent: "space-between" }}>
                                    <Col>
                                        <h6>{item[0].toUpperCase() + item.substring(1)}</h6>
                                    </Col>
                                    <Col>
                                        <h6>{employee[item]}</h6>
                                    </Col>
                                </Row>
                            );
                        } else {
                            return;
                        }
                    })
                    :
                    undefined
            }
        </Container>
    );

}

export default General;