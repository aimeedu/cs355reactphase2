import React, {Component} from 'react';
import './Admin.css';
import {Button, Form, FormControl} from "react-bootstrap";

class Admin extends Component {
    constructor(props){
        super(props);
        this.state = {
            results:[],
        }
    }

    // make AJAX calls, query the data from the search table. http://localhost:3000/admin
    componentDidMount() {
        console.log('component has mounted.')
        fetch('/admin')
            .then(res => res.json())
            .then(results => this.setState({results}, () => console.log('results fetched..', results)))
    }

    render() {

        const rows = this.state.results.map((result, i) => {
            return(
                <tr key={i}>
                    <td>{this.state.results.searchid}</td>
                    <td>{this.state.results.terms}</td>
                    <td>{this.state.results.count}</td>
                    <td>{this.state.results.searchdate}</td>
                </tr>
            )
        })

        return (
            <div>
                <h2>Indexing Launcher</h2>

                <Form className="search">
                    <FormControl className="mr-sm-1 searchBar" type="text" placeholder="Type a URL to be indexed." name="userInput"/>
                    <Button id="searchBtn" variant="btn btn-light purple-btn" type="submit">Search</Button>
                </Form>
                <br/><br/>
                <h3>User Search Histories</h3>

                <table>
                    <thead>
                        <tr>
                            <th>Search ID</th>
                            <th>Terms</th>
                            <th>Number of search results</th>
                            <th>Searching Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>

                <br/>
                <h4>api call to the database, get those information then insert into table row using map function.</h4>
                <h5>Admin: Indexing Launcher
                    This is an Admin screen in which the user can type/paste a URL to be indexed, passing it to the Indexing Engine mentioned above. <br/>
                    Alternatively, one can add an option to the previously created screens that for any search result in Phase 2, one clicks a button to index selected items.
                    </h5>
            </div>
        );
    }
}

export default Admin;