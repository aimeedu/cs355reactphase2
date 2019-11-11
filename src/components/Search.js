import { NavLink } from "react-router-dom";
import { NavDropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
// import '../App.css';
import './Components.css';

const Search = (props) => {
    return(
        <div>
            <NavDropdown title="Search" id="search-dropdown">
                <NavDropdown.Item>
                    <NavLink to="/file" onClick={()=>props.onClick(null)}>Search from a file</NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                    <NavLink to="/google" onClick={()=>props.onClick(null)}>Google Search</NavLink>
                </NavDropdown.Item>
            </NavDropdown>
        </div>
    )
}

export default Search;