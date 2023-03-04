import React from 'react';
import NavBar from '../components/NavBar';
import TabsBar from '../components/TabsBar';
import JobPosting from '../views/JobPosting';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import ProfileCard from '../components/ProfileCard';
import Skill from '../subViews/Skill';
import { useState } from 'react';

import { Routes, Route, useNavigate } from 'react-router-dom';

function Home() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    // console.log(isLoggedIn);

    React.useEffect(()=>{
        if (isLoggedIn) {
            navigate("/login");
        } else {
            navigate("/");
        }
    }, [isLoggedIn]);

    function checking(flag) {
        setIsLoggedIn(flag);
        console.log("button press " + isLoggedIn);
    }

    return (
        <>
            {/* <NavBar /> */}
            {/* <Login/> */}

            <div className="wrapper">
                <Routes>
                    <Route path="/" element={<ProfileCard />}></Route>
                    <Route path="/login" element={< Login handleChange={checking} />}></Route>
                    <Route path="/profile" element={<ProfileCard />}></Route>
                </Routes>
            </div>
        </>
    );
}

export default Home;