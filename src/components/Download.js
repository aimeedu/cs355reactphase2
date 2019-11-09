import React, {Component} from 'react';

class Download extends Component {

    constructor(props){
        super(props);
    }

    // selectAll = () => {
    //     this.setState({
    //         checked: true,
    //     })
    // }
    //
    // deselectAll = () => {
    //     this.setState({
    //         checked: false,
    //     })
    // }
    //
    // // a controlled form handles all form changes via state, which is a very React way of doing things.
    // checkBox = () => {
    //     const checked = this.state.checked;
    //
    //     this.setState({
    //         checked: !this.state.checked
    //     })
    // }

    //https://medium.com/@wlodarczyk_j/handling-multiple-checkboxes-in-react-js-337863fd284e
    //https://stackoverflow.com/questions/55259173/react-handling-multiple-checkboxes
    // https://codepen.io/anon/pen/wpjLdM?editors=1111
    //working code for check box
    // https://appdividend.com/2018/09/25/how-to-save-multiple-checkboxes-values-in-react-js/
    //save for phase 3

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
            result = result + "<result>\n<title>" + title + "</title>\n" +
                "<url>" + url + "</url>\n" + "<description>" +
                description + "</description>\n</result>\n";
        }
        result += "</results>";
        return result;
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

        // the data has already been stored in states in parent class, retrieve the data from this.props.data
        if (fileType == ".csv") {
            const data = this.tocsv(this.props.data);
            this.download(data, fileName, "text/csv");
        }
        else if (fileType == ".json") {
            const data = JSON.stringify(this.props.data);
            this.download(data, fileName, "application/json");
        }else{
            const data = this.toxml(this.props.data);
            this.download(data, fileName, "text/xml");
        }
    }

    render() {
        return (
            <div>
                <form className="downloadFile" onSubmit={this.downloadFile}>
                    <button type="button" onClick={this.selectAll}> Select All </button>
                    <button type="button" onClick={this.deselectAll}> Deselect All </button>
                    <button type="submit"> Download As </button>
                    <input type="text" id="fileName" placeholder="File Name" name="input" required="required"/>
                    <select name="options" id="fileType" required="required">
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