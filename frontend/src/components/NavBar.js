import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";

/**
 * NavBar class for the header of the application
 */
export default class NavBar extends Component {
  render() {
    return (
      <Navbar class="navbar" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/dashboard">
            <img
              src="/PHBalancedLogo.png"
              width="132"
              height="45"
              hspace="3.5"
              className="d-inline-block align-top"
              alt="logo"
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <NavLink className='text-link' exact activeClassName="active" to="/dashboard">Dashboard</NavLink>
            <NavLink className='text-link' exact activeClassName="active" to="/createchart">Create Chart</NavLink>
            <NavLink className='text-link' exact activeClassName="active" to="/importdata">Data</NavLink>
          </Nav>
        </Container>
      </Navbar>
    )
  }
}