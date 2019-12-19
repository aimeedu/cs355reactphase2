import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './Components.css';
import {useParams} from 'react-router';

// const style = {
//     background: 'darkseagreen',
//     margin: '60px',
// }


const About = () => {
    const {msg} = useParams();
    return (
        <div className="level1 email">
            {
                msg === "contact" ?
                    <h2><a href="mailto:yanbron96@gmail.com ?subject=Contact Developer"target="_blank">Contact Us</a></h2>
                    : <h2>Yaniv Bronshtein
                        Yaniv Bronshtein is an aspiring Software Developer seeking to further his skills in front end development for the CS 355 group project</h2>
            }
        </div>
    )
}
export default About;