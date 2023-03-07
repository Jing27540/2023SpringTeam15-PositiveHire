import React from "react";
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import styled from "styled-components";
import LoginCard from "../components/LoginCard";
import accounts from "../clients/account";

const WhiteSpace = styled.div`
    display: flex;
    height: 10px;
`

const Box = styled.div`
    display: flex;
    margin: 5px;
    height: 50%;
    width: 100%;
    overflow: auto;
`

const SideBox = styled.div`
    width: 20%;
    float: left;
`;

function BasicLoginPage(props) {

  return (
    <>
      <div>
        <img src={require('../img/logo192.png')}></img>
      </div>

      <Box>
        <SideBox>
        </SideBox>
        <LoginCard title="Employee" />
        <SideBox>
        </SideBox>
        <LoginCard title="HR/DEI" />
      </Box>

    </>
  );
}

export default BasicLoginPage;