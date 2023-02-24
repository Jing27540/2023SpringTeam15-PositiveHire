import React from 'react';
import NavBar from '../components/NavBar';
import TabsBar from '../components/TabsBar';
import JobPosting from '../views/JobPosting';
import 'bootstrap/dist/css/bootstrap.min.css';

const TITLE = ['Positions', 'Talent Pipeline', 'Performance Reviews', 'Development Plans', 'Resources', 'Reports'];
function Home() {

    const [mode, setMode] = React.useState('Positions');
    return (
        <>
            <NavBar />
            <TabsBar titles={TITLE} setMode={setMode}/>
            <JobPosting />
        </>
    );
}

export default Home;