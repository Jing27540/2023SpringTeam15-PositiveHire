import Nav from 'react-bootstrap/Nav';

/**
 * Create TabsBar component for Employee Profile Page
 * @author Jing Hunag
 */
const ITEMS = ['Skills & Certifications', 'Performance Review', 'Career Development Plans', 'Open Positions'];

function TabsBar(props) {
    return (
        <Nav fill variant="tabs" defaultActiveKey="/home/profile">
            <Nav.Item>
                <Nav.Link href="/home/profile">General</Nav.Link>
            </Nav.Item>
            {ITEMS.map((item) => {
                return (
                    <Nav.Item>
                        <Nav.Link eventKey={item}>{item}</Nav.Link>
                    </Nav.Item>
                );
            })}
        </Nav>
    );

}

export default TabsBar;