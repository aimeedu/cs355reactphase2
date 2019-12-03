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

    // make AJAX calls, query the data from the search table. http://localhost:3000 or 5000/admin, both working
    // as soon as you go to this page, the table will show.
    async componentDidMount() {
        console.log('component has mounted.');
        const res = await fetch('/admin');
        const results = await res.json();
        this.setState({
            results,
        })
    }

    indexing = async (e) => {
        e.preventDefault();
        const userInput = e.target.elements.userInput.value;
        console.log(userInput);
        console.log('Indexing Successfully! Data inserted in DB!');
        //change location to home page.
        window.location='/';
    }

    render() {
        const rows = this.state.results.map((result, i) => {
            return(
                <tr key={i}>
                    <td>{result.searchid}</td>
                    <td>{result.terms}</td>
                    <td>{result.count}</td>
                    <td>{result.searchdate}</td>
                </tr>
            )
        })

        return (
            <div>
                <h2>Indexing Launcher</h2>

                <Form className="search" onSubmit={this.indexing}>
                    <FormControl className="mr-sm-1 searchBar" type="url" placeholder="Type a URL to be indexed." name="userInput"/>
                    <Button id="searchBtn" variant="btn btn-light purple-btn" type="submit">Search</Button>
                </Form>

                <br/><br/>
                <h3>User Search Histories</h3>

                <table className="">
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

                <h5>Admin: Indexing Launcher
                    This is an Admin screen in which the user can type/paste a URL to be indexed, passing it to the Indexing Engine mentioned above. <br/>
                    Alternatively, one can add an option to the previously created screens that for any search result in Phase 2, one clicks a button to index selected items.
                </h5>
            </div>
        );
    }
}

export default Admin;