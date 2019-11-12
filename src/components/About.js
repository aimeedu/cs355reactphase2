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
        <div className="level1">
            {
                msg == "contact" ?
                    <h2><a href="mailto:aimeedu11@gmail.com?subject=Contact Developer"target="_blank">Contact Us</a></h2>
                    : <h2>{ "{ Fengzhang Du }" } <br/> This is my first web page!</h2>
            }
        </div>
    )
}
export default About;