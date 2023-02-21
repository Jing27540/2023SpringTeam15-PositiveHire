import Nav from 'react-bootstrap/Nav';

/**
 * Create TabsBar component for Employee Profile Page
 * @author Jing Hunag
 */
const ITEMS = ['General', 'Skills & Certifications', 'Performance Review', 'Career Development Plans', 'Open Positions'];

function TabsBar(props) {
    return (
        <Nav className="justify-content-center" fill variant="tabs" defaultActiveKey="/home/profile">
            {ITEMS.map((item) => {
                return (
                    <Nav.Item key={item} variant="drak">
                        <Nav.Link eventKey={item} style={{color:"black", fontWeight: 'bold'}}>{item}</Nav.Link>
                    </Nav.Item>
                );
            })}
        </Nav>
    );

}

export default TabsBar;