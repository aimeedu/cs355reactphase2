import { NavDropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../App.css';

class Course extends React.Component {
    render(){
        return(
            <div>
                <NavDropdown title="Course" id="course-dropdown">
                    <NavDropdown.Item href="https://www.zybooks.com">Zybooks</NavDropdown.Item>
                    <NavDropdown.Item href="https://tophat.com">TopHat</NavDropdown.Item>
                    <NavDropdown.Item href="https://www.google.com/drive/">Google Drive</NavDropdown.Item>
                    <NavDropdown.Item href="https://www.w3schools.com">W3Schools</NavDropdown.Item>
                </NavDropdown>
            </div>
        )
    }
}

export default Course;