import React from 'react';
import NavBar from '../components/NavBar';
import TabsBar from '../components/TabsBar';
import JobPosting from '../views/JobPosting';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import ProfileCard from '../components/ProfileCard';
import Skill from '../subViews/Skill';

import { Routes, Route } from 'react-router-dom';


function Home() {
    return (
        <>
            {/* <NavBar /> */}
            {/* <Login/> */}

            <div className="wrapper">
                <h1>Ayo</h1>
                <Routes>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/profile" element={<ProfileCard />}></Route>
                </Routes>
            </div>
        </>
    );
}

export default Home;