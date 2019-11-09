import React, {Component} from 'react';
import Download from "./Download";

class FileInput extends React.Component {
    constructor(props) {
        super(props);
        // this.fileInput = React.createRef();
        this.state = {
            data: [],
        }
    }
    delete = (event) => {
        const index = event.target.dataset.index;
        this.setState(state => {
            const data = [...state.data]
            data.splice(index, 1);
            return{
                data: data,
            }
        })
    }
    // uploadFile = (event) => {
    //     let file = event.target.files[0];
    //     console.log(file);
    //
    //     let data = new FormData();
    //     if (file) {
    //         // data.append sends key value pair.
    //         data.append('file', file);
    //         console.log(data);
    //         // axios.post('/files', data)...
    //     }
    // }

    showFile = async (e) => {
        e.preventDefault();
        //get file name.
        const fileName = e.target.files[0].name;
        // check file type.
        const type = fileName.split(".")[1];
        // read the file contents as plain text.
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = (e.target.result);
            // console.log(text);
            if (type == "json") {
                // JSON.parse() take a json string and turn it into a json object.
                let obj = JSON.parse(text);
                this.setState({
                    data: obj.Result,
                })
                // console.log(obj); // return a object { ... }
                // console.log(obj.Result); //return an array [{...}, {....}]
            }
            else if (type == "csv") {
                const lines = text.split("\n");
                // console.log(lines);
                let csvData = [];

                for (let i = 0; i<lines.length; i++){
                    let arr = lines[i].split(",");
                    csvData.push({
                        title: arr[0],
                        url: arr[1],
                        description: arr[2],
                    });
                }
                this.setState({
                    data: csvData,
                })
            }
            else{
                const parser = new DOMParser();
                let doc = parser.parseFromString(text, "text/xml");
                const results = doc.getElementsByTagName("result");

                let xmlData = [];
                for (let i = 0; i<results.length; i++){
                    xmlData.push({
                        title: doc.getElementsByTagName("title")[i].innerHTML,
                        url: doc.getElementsByTagName("url")[i].innerHTML,
                        description: doc.getElementsByTagName("description")[i].innerHTML,
                    });
                }
                this.setState({
                    data: xmlData,
                })
            }
        };
        reader.readAsText(e.target.files[0])
    }



    render() {
        return (
            <div>
                <form>
                    <input type="file" accept=".xml,.json,.csv" onChange={this.showFile}/>
                </form>

                {/*passing data as a property to child class*/}
                <Download data={this.state.data}/>

                <div className="container">
                    <div className="row">
                        {this.state.data.map((data, i) => {
                            return (
                                <div key={i} className="col-md-12" style={{ border: "2px solid white", padding: "25px" }}>
                                    <div className="box">
                                        <input type="checkbox" name="check" onClick={this.checkBox}/>
                                        <button data-index={i} onClick={this.delete}> Delete </button>
                                        <h2>{data.title}</h2>
                                        <a href={data.url}>{data.url}</a>
                                        <p>{data.description}</p>
                                    </div>
                                </div>
                            )})}
                    </div>
                </div>
            </div>
        )
    }
}

export default FileInput;