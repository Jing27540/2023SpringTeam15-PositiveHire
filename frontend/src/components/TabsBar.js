import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';

/**
 * Create TabsBar component for Employee Profile Page
 * @author Jing Hunag
 */

// TODO: dummy example
const ITEMS = ['A', 'B', 'C', 'D', 'E'];

function TabsBar({ titles, setMode, ...props }) {

    const [show, setShow] = React.useState(false);

    return (
        <Nav className="justify-content-center" fill variant="tabs">
            {titles ?
                titles.map((item) => {
                    if (item === 'Positions') {
                        return (
                            <Nav.Item key={item} variant="drak" >
                                <Nav.Link eventKey={item} onClick={() => { setMode(item); setShow(true); }} style={{ color: "black", fontWeight: 'bold' }}>{item}</Nav.Link>
                                <Dropdown.Menu show={show}>
                                    <Dropdown.Item key={"Create"} onClick={() => { setShow(false); }}>Create/Edit a Job Description</Dropdown.Item>
                                    <Dropdown.Item key={"View"} onClick={() => { setShow(false); }}>See Open Positions</Dropdown.Item>
                                </Dropdown.Menu>
                            </Nav.Item>
                        );
                    } else {
                        return (
                            <Nav.Item key={item} variant="drak" >
                                <Nav.Link eventKey={item} onClick={() => { setMode(item); setShow(false); }} style={{ color: "black", fontWeight: 'bold' }}>{item}</Nav.Link>
                            </Nav.Item>
                        );
                    }
                })
                :
                undefined
            }
        </Nav >
    );

}

export default TabsBar;