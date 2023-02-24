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
        <Nav className="justify-content-center" fill variant="tabs" defaultActiveKey="/home/profile">
            {titles ?
                titles.map((item) => {
                    if (item === 'Positions') {
                        return (
                            <Nav.Item key={item} variant="drak" >
                                <Nav.Link eventKey={item} onClick={() => { setMode(item); setShow(true); }} style={{ color: "black", fontWeight: 'bold' }}>{item}</Nav.Link>
                                <Dropdown.Menu show={show}>
                                    <Dropdown.Item onClick={() => { setShow(false); }}>Action</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { setShow(false); }}>Another action</Dropdown.Item>
                                </Dropdown.Menu>
                            </Nav.Item>
                        );
                    } else {
                        return (
                            <Nav.Item key={item} variant="drak" >
                                <Nav.Link eventKey={item} onClick={() => { setMode(item) }} style={{ color: "black", fontWeight: 'bold' }}>{item}</Nav.Link>
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