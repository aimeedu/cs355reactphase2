import React, {Component} from 'react';
import './Admin.css';
import {Button, Form, FormControl} from "react-bootstrap";

class Admin extends Component {
    render() {
        return (
            <div>
                <h2>My Custom Search Engine</h2>

                <Form className="search" onSubmit>
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