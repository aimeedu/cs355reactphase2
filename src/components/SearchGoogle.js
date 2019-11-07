import React, {Component} from 'react';
import '../App.css';

const API_KEY = "AIzaSyDzFrh_sw6E2iClTjBjWCGLApEW_d9xXZU";

class SearchGoogle extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: [],
            checked: false
        }
    }

    search = async (e) => {
        e.preventDefault();
        const userInput = e.target.elements.userInput.value;
        // let queryurl = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=010154474853921520295:rr3dcyakuje&q=`;
        // let url = queryurl + userInput;

        const req = await fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=010154474853921520295:rr3dcyakuje&q=${userInput}`)
        const data = await req.json();

        // let link = await data.items[0].displayLink;
        // let title = await data.items[0].title;
        // let snippet = await data.items[0].snippet;
        // console.log(data);
        // console.log(title);
        // console.log(snippet);

        this.setState({
            data: data.items
        })
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

    downloadFile = () => {

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
                                <div className="col-md-4" style={{ border: "2px solid white", padding: "25px" }}>
                                    <div key={i} className="box">
                                        <input type="checkbox" name="check" checked={this.state.checked}/>
                                        <p><h2>{data.title}</h2></p>
                                        <p><a href={data.link}>{data.displayLink}</a></p>
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