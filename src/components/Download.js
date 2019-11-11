import React, {Component} from 'react';
import './Components.css';

class Download extends Component {

    constructor(props){
        super(props);
    }

    //https://medium.com/@wlodarczyk_j/handling-multiple-checkboxes-in-react-js-337863fd284e
    //https://stackoverflow.com/questions/55259173/react-handling-multiple-checkboxes
    // https://codepen.io/anon/pen/wpjLdM?editors=1111
    //working code for check box
    // https://appdividend.com/2018/09/25/how-to-save-multiple-checkboxes-values-in-react-js/
    //save for phase 3

    // tocsv = (data) => {
    //     let result = "";
    //     for(let i = 0; i<data.length; i++) {
    //         if (data[i].isChecked) {
    //             let title = data[i].title;
    //             let url = data[i].url;
    //             let description = data[i].description;
    //             result += (title + "," + url + "," + description + "\n");
    //             result.trim();
    //         }
    //     }
    //     return result;
    // };

    tocsv = (data) => {
        const csvRows = [];
        //get the headers
        const headers = Object.keys(data[0]);
        csvRows.push(headers.join(','));

        for (const row of data) {
            const values = headers.map(header => {
                const escaped = (''+row[header]).replace(/"/g, '\\"');
                return `"${escaped}"`;
            })
            csvRows.push(values.join(','));
        }
        return csvRows.join('\n');
    }

    toxml = (data) => {
        let result = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<results>\n";
        for(let i = 0; i<data.length; i++) {

                let title = data[i].title;
                let url = data[i].url;
                let description = data[i].description;
                result = result + "  <result>\n    <title>" + title + "</title>\n" +
                    "    <url>" + url + "</url>\n" + "    <description>" +
                    description + "</description>\n  </result>\n";

        }
        result += "</results>";
        return result;
    }

    trimData = (data) => {
        // copy the object array.
        const arr = [...this.props.data];
        let newArr = []
        for (let i = 0; i< arr.length; i++) {
                if(arr[i].isChecked) {
                    newArr.push({
                        title:arr[i].title,
                        url:arr[i].url,
                        description:arr[i].description,
                    });
            }}
        return newArr;
    }

    download = (data, fileName, type) => {
        const file = new Blob([data], {type: type});
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    downloadFile = (e) => {
        e.preventDefault();
        const input = e.target.elements.input.value;
        const fileType = e.target.elements.options.value;
        const fileName = input + fileType;
        const trim = this.trimData(this.props.data);

        // the data has already been stored in states in parent class, retrieve the data from this.props.data
        if (fileType == ".csv") {
            const data = this.tocsv(trim);
            this.download(data, fileName, "text/csv");
        }
        else if (fileType == ".json") {
            const data = JSON.stringify(trim);
            // const data = this.tojson(this.props.data);
            this.download(data, fileName, "application/json");
        }else{
            const data = this.toxml(trim);
            this.download(data, fileName, "text/xml");
        }
    }

    render() {
        return (
            <div>
                <form className="downloadFile" onSubmit={this.downloadFile}>
                    <div id="selector">
                        <button id="selectall" className="btn btn-outline-primary" type="button" onClick={this.selectAll}>Select All</button>
                        <button id="deselectall" className="btn btn-outline-primary" type="button" onClick={this.deselectAll}>Deselect All</button>
                    </div>
                        <button id="download" className="btn btn-light" type="submit">Download</button>
                        <input id="fileName" className="form-control" type="text" placeholder="File Name" name="input" required="required"/>
                        <select name="options" id="fileType" className="custom-select" required="required">
                            <option value=".json">.JSON</option>
                            <option value=".csv">.CSV</option>
                            <option value=".xml">.XML</option>
                        </select>

                </form>
            </div>
        );
    }
}

export default Download;