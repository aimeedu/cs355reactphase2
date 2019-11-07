import {Form, Navbar, Nav, Button, FormControl, NavDropdown} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';


import {Link, NavLink} from 'react-router-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
//route different url to different component.

class TempNav extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            content: "This is my home page for CS 355",
            img: false,
            email: false,
        }
    }

    handleClick = (i)=>{
        this.setState({
            content: i,
            img: false,
            email: false,
        })
    }

    handleImgEmail = (j)=>{
        this.setState({
            content: j,
            img: true,
            email: true,
        })
    }

    handleImg = (x)=>{
        this.setState({
            content: x,
            img: true,
            email: false,
        })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Navbar collapseOnSelect="true" bg="light" variant="light" expand="lg">
                        <Navbar.Brand href="#home">CS355</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link onClick={()=>{
                                    this.setState({
                                        content: "This is my home page for CS 355",
                                    })}}>Home</Nav.Link>

                                <NavDropdown title="Course" id="course-dropdown">
                                    <NavDropdown.Item href="https://www.zybooks.com">Zybooks</NavDropdown.Item>
                                    <NavDropdown.Item href="https://tophat.com">TopHat</NavDropdown.Item>
                                    <NavDropdown.Item href="https://www.google.com/drive/">Google Drive</NavDropdown.Item>
                                    <NavDropdown.Item href="https://www.w3schools.com">W3Schools</NavDropdown.Item>
                                </NavDropdown>

                                <NavDropdown title="Search" id="search-dropdown">
                                    <NavDropdown.Item>
                                        <NavLink to="/file">Search from a file</NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <NavLink to="/google">Google Search</NavLink>
                                    </NavDropdown.Item>
                                </NavDropdown>

                                <NavDropdown title="Browser" id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={()=>this.onClick(nav)}>Navigator</NavDropdown.Item>
                                    <NavDropdown.Item onClick={()=>this.onClick(win)}>Window</NavDropdown.Item>
                                    <NavDropdown.Item onClick={()=>props.onClick(scr)}>Screen</NavDropdown.Item>
                                    <NavDropdown.Item onClick={()=>props.onClick(loc)}>Location</NavDropdown.Item>
                                    <NavDropdown.Item onClick={()=>props.onClick(geoLocation)}>Geolocation</NavDropdown.Item>
                                </NavDropdown>

                                <NavDropdown title="About" id="about-dropdown">
                                    <NavDropdown.Item onClick={()=>props.onClick("Fengzhang Du"+"\n"+"This is my first web page!")}>Developers</NavDropdown.Item>
                                    <NavDropdown.Item onClick={()=>props.onClick2()}>Contact Us</NavDropdown.Item>
                                </NavDropdown>

                            </Nav>
                            <Form inline>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>

                </header>
            </div>


        );
    }
}


export default TempNav;
