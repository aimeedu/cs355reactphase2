import React, {Component} from 'react';
import '../App.css';

const API_KEY = "AIzaSyDzFrh_sw6E2iClTjBjWCGLApEW_d9xXZU";

class SearchGoogle extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: [],
            checked: false,
        }
    }

    search = async (e) => {
        e.preventDefault();
        const userInput = e.target.elements.userInput.value;
        if(userInput){
            const req = await fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=010154474853921520295:rr3dcyakuje&q=${userInput}`)
            const data = await req.json();
            console.log(data);
            this.setState({
                data: data.items
            })
        }
    }

    selectAll = () => {
        this.setState({
            checked: true,
        })
    }

    deselectAll = () => {
        this.setState({
            checked: false,
        })
    }

    // a controlled form handles all form changes via state, which is a very React way of doing things.
    checkBox = () => {
        this.setState({
            checked: !this.state.checked,
        })
    }

    //https://medium.com/@wlodarczyk_j/handling-multiple-checkboxes-in-react-js-337863fd284e
    //https://stackoverflow.com/questions/55259173/react-handling-multiple-checkboxes
    // https://codepen.io/anon/pen/wpjLdM?editors=1111
    //working code for check box

    // https://appdividend.com/2018/09/25/how-to-save-multiple-checkboxes-values-in-react-js/
    //save for phase 3
    downloadFile = async () => {
    // the data has already stored in states, retrieve the data from this.state should work
    //     const fileData = JSON.stringify(this.state.data);
        console.log(this.state.data);
        // const blob = new Blob([fileData], {type: "text/plain"});
    }

    render() {
        return (
            <div>
                <h4>Search with Google</h4>
                <form id="searchbar" className="search" onSubmit={this.search}>
                    <input type="text" placeholder="Google" name="userInput" />
                    <button id="submit" type="submit"> Search </button>
                </form>

                <div className="selectors">
                    <button type="button" onClick={this.selectAll}> Select All </button>
                    <button type="button" onClick={this.deselectAll}> Deselect All </button>
                </div>

                <div className="download">
                    <form id="downloadFile" className="downloadFile" onSubmit={this.downloadFile}>
                        <button type="submit" name="f-download" id="download"> Download As </button>
                        <input type="text" id="fileName" placeholder="File Name" name="fileName" required="required"/>
                        <select name="options" id="fileType" required="required">
                            <option value="JSON">.JSON</option>
                            <option value="CSV">.CSV</option>
                            <option value="XML">.XML</option>
                        </select>
                    </form>
                </div>

                <div className="container">
                    <div className="row">
                        {this.state.data.map((data, i) => {
                            return (
                                <div key={i} className="col-md-4" style={{ border: "2px solid white", padding: "25px" }}>
                                    <div className="box">
                                        <input type="checkbox" name="check" checked={this.state.checked} onClick={this.checkBox}/>
                                        <h2>{data.title}</h2>
                                        <a href={data.link}>{data.displayLink}</a>
                                        <p>{data.snippet}</p>
                                    </div>
                                </div>
                            )})}
                        </div>
                    </div>
                </div>

        );
    }
}

export default SearchGoogle;