import React, {Component} from 'react';
import {Button, Form, FormControl} from "react-bootstrap";

class SearchEngine extends Component {
    render() {
        return (
            <div>
                <h2>My Custom Search Engine</h2>

                <div className="radio">
                    <label><input type="radio" name="optradio" checked/>Option 1</label>
                </div>
                <div className="radio">
                    <label><input type="radio" name="optradio"/>Option 2</label>
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