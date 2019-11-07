import React, {Component} from 'react';

const API_KEY = "AIzaSyDzFrh_sw6E2iClTjBjWCGLApEW_d9xXZU";

class SearchGoogle extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }

    search = async (e) => {
        e.preventDefault();
        const userInput = e.target.elements.userInput.value;
        // let queryurl = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=010154474853921520295:rr3dcyakuje&q=`;
        // let url = queryurl + userInput;

        const api_call = await fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=010154474853921520295:rr3dcyakuje&q=${userInput}`)
        const data = await api_call.json();

        let link = await data.items[0].displayLink;
        let title = await data.items[0].title;
        let snippet = await data.items[0].snippet;
        console.log(link);
        console.log(title);
        console.log(snippet);

        this.setState({
            data: data.items
        })


    }

    selectAll = () => {
///=hellogit init
    }
    deselectAll = () => {

    }
//gghghghghg
    // downloadFile = () => {
    //
    // }

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

                <ul>

                    {this.state.data.map((data, i) => {
                        return (
                            <div key={i}>
                                <p><h2>{data.title}</h2></p>
                                <p><a href={data.link}>{data.displayLink}</a></p>
                                <p>{data.snippet}</p>
                            </div>
                    )})}

                </ul>
            </div>
        );
    }
}

export default SearchGoogle;