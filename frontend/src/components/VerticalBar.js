import Nav from 'react-bootstrap/Nav';
import styled from 'styled-components';

/**
 * Manage tool of job posting create/edit/review/view
 * 
 * @author Jing Huang
 */

const HorizontalLine = styled.div`
    width: 100%;
    height: 1;
    border-top: 0.5px solid #D3D3D3;
`;

function VerticalBar(props) {
    return (
        <Nav defaultActiveKey="Edit" className="flex-column" style={{ fontWeight: 'bold' }} onSelect={(selectedKey) => { props.setMode(selectedKey) }}>
            <Nav.Item key={1} variant="drak">
                <Nav.Link eventKey="Create" >CREATE</Nav.Link>
                <HorizontalLine></HorizontalLine>
            </Nav.Item>
            <Nav.Item key={2} variant="drak">
                <Nav.Link eventKey="Edit" >EDIT</Nav.Link>
                <HorizontalLine></HorizontalLine>
            </Nav.Item>
            <Nav.Item key={3} variant="drak" >
                <Nav.Link eventKey="REVIEW" >REVIEW</Nav.Link>
                <HorizontalLine></HorizontalLine>
            </Nav.Item>
            <Nav.Item key={4} variant="drak">
                <Nav.Link eventKey="VIEW" >VIEW</Nav.Link>
                <HorizontalLine></HorizontalLine>
            </Nav.Item>
        </Nav>
    );
}

export default VerticalBar;