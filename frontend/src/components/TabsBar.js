import Nav from 'react-bootstrap/Nav';

/**
 * Create TabsBar component for Employee Profile Page
 * @author Jing Hunag
 */

// TODO: dummy example
const ITEMS = ['A', 'B', 'C', 'D', 'E'];

function TabsBar({ titles, setMode, ...props }) {
    return (
        <Nav className="justify-content-center" fill variant="tabs" defaultActiveKey="/home/profile">
            {titles ?
                titles.map((item) => {
                    return (
                        <Nav.Item key={item} variant="drak" >
                            <Nav.Link eventKey={item} onClick={() => { setMode(item) }} style={{ color: "black", fontWeight: 'bold' }}>{item}</Nav.Link>
                        </Nav.Item>
                    );
                })
                :
                undefined
            }
        </Nav >
    );

}

export default TabsBar;