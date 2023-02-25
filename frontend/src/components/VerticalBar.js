import Nav from 'react-bootstrap/Nav';
import styled from "styled-components";


/**
 * Manage tool of job posting create/edit/review/view
 * 
 * @author Jing Huang
 */
function VerticalBar(title, setTool) {
    return (
        <Nav defaultActiveKey="Edit" className="flex-column" style={{ fontWeight: 'bold' }}>
            <Nav.Item key={1} variant="drak" >
                <Nav.Link eventKey="Create">CREATE</Nav.Link>
            </Nav.Item>
            <Nav.Item key={2} variant="drak" >
                <Nav.Link eventKey="Edit">EDIT</Nav.Link>
            </Nav.Item>
            <Nav.Item key={3} variant="drak" >
                <Nav.Link eventKey="REVIEW">REVIEW</Nav.Link>
            </Nav.Item>
            <Nav.Item key={4} variant="drak" >
                <Nav.Link eventKey="VIEW">VIEW</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default VerticalBar;