import { Form, Navbar, Nav, Button, FormControl } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import './App.css';
import Browser from './components/Browser';
import About from './components/About';
import Search from './components/Search';
import Course from './components/Course';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import SearchGoogle from "./components/SearchGoogle";
import FileInput from "./components/FileInput";

class App extends React.Component {

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
                    <Router>
                        <Navbar collapseOnSelect="true" bg="light" variant="light" expand="lg">
                            <Navbar.Brand href="#home">CS355</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">

                                    <Nav.Link onClick={()=>{
                                        this.setState({
                                            content: "This is my home page for CS 355",
                                        })}}>Home</Nav.Link>

                                    <Course />
                                    <Search onClick={this.handleClick}/>
                                    <Browser onClick={this.handleClick}/>
                                    <About onClick2={this.handleImgEmail} onClick={this.handleImg}/>

                                </Nav>
                                {/*<Form inline>*/}
                                {/*    <FormControl type="text" placeholder="Search" className="mr-sm-2" />*/}
                                {/*    <Button variant="outline-success">Search</Button>*/}
                                {/*</Form>*/}
                            </Navbar.Collapse>
                        </Navbar>
                        <br/>
                        <Switch>
                            <Route path="/" exact />
                            <Route path="/file" exact component={FileInput}/>
                            <Route path="/google" exact component={SearchGoogle}/>
                        </Switch>
                    </Router>
                    <div id="content-container">
                        <div>

                            {/*{this.state.img ?*/}
                            {/*    <img src="http://mmbiz.qpic.cn/mmemoticon/ajNVdqHZLLDxX4Ah85t3AAIOXjpZQadepGedJwn5ZXbUUpkyng0Z32tVtVABicBhQh5fgfnnRY3M/0" alt="c1"></img>*/}
                            {/*    : <img src="http://mmbiz.qpic.cn/mmemoticon/ajNVdqHZLLDxX4Ah85t3AAIOXjpZQadeSb98qrUK5PMicPrOjfjleCjFdcdmpTr2stNQRabnDTW4/0" alt="c2"></img>*/}
                            {/*}*/}
                            <h2>{this.state.content}</h2>
                            <h2>{this.state.email ? <a href="mailto:aimeedu11@gmail.com?subject=Contact Developer"target="_blank">Contact Us</a> : null }</h2>



                        </div>
                    </div>

                </header>
            </div>


        );
    }
}


export default App;