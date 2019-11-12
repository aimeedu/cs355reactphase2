import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import Browser from './components/Browser';
import About from './components/About';
import Home from './components/Home';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SearchGoogle from "./components/SearchGoogle";
import FileInput from "./components/FileInput";
import MyNavbar from "./components/MyNavbar";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="App-body">
                    <Router>
                        <MyNavbar/>
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/about/:msg" component={About}/>
                            <Route path="/browser/:info" exact component={Browser}/>
                            <Route path="/file" exact component={FileInput}/>
                            <Route path="/google" exact component={SearchGoogle}/>
                        </Switch>
                    </Router>
                </div>
            </div>
        );
    }
}

export default App;