import React from 'react';
import NavBar from '../components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeProfile from '../views/EmployeeProfile';

function Home() {
    return (
        <>
            <NavBar />
            <EmployeeProfile />
        </>
    );
}

export default Home;