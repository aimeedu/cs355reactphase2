import { NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import '../App.css';

const About = (props) => {
    return(
        <div>
            <NavDropdown title="About" id="about-dropdown">
                <NavDropdown.Item onClick={()=>props.onClick("Fengzhang Du"+"\n"+"This is my first web page!")}>Developers</NavDropdown.Item>
                <NavDropdown.Item onClick={()=>props.onClick2()}>Contact Us</NavDropdown.Item>
            </NavDropdown>
        </div>
    )
};


export default About;