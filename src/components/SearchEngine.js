import React, {Component} from 'react';
import {Button, Form, FormControl} from "react-bootstrap";
import './Components.css';

class SearchEngine extends Component {

    constructor(props){
        super(props);
        this.state = {
            caseInsensitive: false,
            partialMatch: false,
        }
    }

    search = async (e) => {
        e.preventDefault();
        const userInput = e.target.elements.userInput.value;
        console.log(userInput);
    }

    checkCase = () => {
        this.setState({
            caseInsensitive: !this.state.caseInsensitive,
        })
        console.log(this.state.caseInsensitive);
    }

    checkMatch = () => {
        this.setState({
            partialMatch: !this.state.partialMatch,
        })
        console.log(this.state.partialMatch);
    }

    render() {
        return (
            <div>
                <h2>My Custom Search Engine</h2>

                <div className="checkbox">
                    <label><input type="checkbox" name="case" onChange={this.checkCase}/> Case Insensitive </label>
                    <label><input type="checkbox" name="match" onChange={this.checkMatch}/> Allow Partial Match </label>
                </div>


                <Form className="search" onSubmit={this.search}>
                    <FormControl className="mr-sm-1 searchBar" type="text" placeholder="Type a word to Search." name="userInput"/>
                    <Button id="searchBtn" variant="btn btn-light purple-btn" type="submit">Search</Button>
                </Form>
                <h3> Search Result: </h3>

            </div>
        )
    }
}

export default SearchEngine;