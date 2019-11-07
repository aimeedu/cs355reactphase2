import React, {Component} from 'react';

class FileInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filename: null,
            content: null
        }
    }

    uploadFile = (event) => {
        let file = event.target.files[0];
        console.log(file);

        let data = new FormData();
        if (file) {
            // data.append sends key value pair.
            data.append('file', file);
            console.log(data);
            // axios.post('/files', data)...
        }
    }

    showFile = async (e) => {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = (e.target.result);
            // alert(text);

            this.setState({
                content: text
            })
        };

        // reader.readAsText(e.target.files[0])

    }

    render() {
        return (
            <form>
                <input type="file" name="myFile" onChange={this.showFile} />
                <button>Download</button>
                <select id = "format">
                    <option value="XML">XML</option>
                    <option value="JSON">JSON</option>
                    <option value="CSV">CSV</option>
                </select>

                <br />
                <div>{this.state.content}</div>

            </form>
        )
    }
}

export default FileInput;