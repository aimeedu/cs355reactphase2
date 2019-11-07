import { NavDropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../App.css';

const Browser = (props) => {
        const nav = "App Name: " + window.navigator.appName + "\n"
            + "App Version: " + window.navigator.appVersion + "\n"
            + "Cookies Enabled: " + window.navigator.cookieEnabled + "\n"
            + "App Language: " + window.navigator.language + "\n"
            + "App Online: " + window.navigator.onLine + "\n"
            + "Platform: " + window.navigator.platform + "\n"
            + "User-agent header: " + navigator.userAgent + "\n";

        const win = "Window innerHeight: " + window.innerHeight + "\n"
            + "Window innerWidth: " + window.innerWidth + "\n";

        const scr = "Screen Height: " + window.screen.height + "\n"
            + "Screen Width: " + window.screen.width + "\n"
            + "Screen availHeight: " + window.screen.availHeight + "\n"
            + "Screen availWidth: " + window.screen.availWidth + "\n"
            + "Screen colorDepth: " + window.screen.colorDepth + "\n"
            + "Screen pixelDepth: " + window.screen.pixelDepth + "\n";

        const loc = "Location href: " + window.location.href + "\n"
            + "Location hostname: " + window.location.hostname + "\n"
            + "Location pathname: " + window.location.pathname + "\n"
            + "Location protocol: " + window.location.protocol + "\n";
        let geoLocation = "";
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(displayLocationInfo);
        }

        function displayLocationInfo(position) {
            geoLocation = "GeoLocation longitude: " + position.coords.longitude+ "\n"
                + "GeoLocation latitude: "+ position.coords.latitude;
        }



    return(
            <div>
                <NavDropdown title="Browser" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={()=>props.onClick(nav)}>Navigator</NavDropdown.Item>
                    <NavDropdown.Item onClick={()=>props.onClick(win)}>Window</NavDropdown.Item>
                    <NavDropdown.Item onClick={()=>props.onClick(scr)}>Screen</NavDropdown.Item>
                    <NavDropdown.Item onClick={()=>props.onClick(loc)}>Location</NavDropdown.Item>
                    <NavDropdown.Item onClick={()=>props.onClick(geoLocation)}>Geolocation</NavDropdown.Item>
                </NavDropdown>
            </div>
        )
}

export default Browser;