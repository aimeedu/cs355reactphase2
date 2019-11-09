import React, {Component} from 'react';
import '../App.css';
import Download from "./Download";

const API_KEY = "AIzaSyDzFrh_sw6E2iClTjBjWCGLApEW_d9xXZU";

class SearchGoogle extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: [],
            checked: [],
        }
    }
//todo: selectAll, deselectAll, checkbox
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

    search = async (e) => {
        e.preventDefault();
        const userInput = e.target.elements.userInput.value;
        if(userInput){
            const req = await fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=010154474853921520295:rr3dcyakuje&q=${userInput}`)
            const data = await req.json();
            // console.log(data);
            this.setState({
                data: data.items,
                checked: Array(data.items.length).fill(false),
            })
            console.log(this.state.data);
            console.log(this.state.checked);
        }
    }


    delete = (event) => {
        const index = event.target.dataset.index;
        this.setState(state => {
            const data = [...state.data]
            data.splice(index, 1);
            return{
                data: data
            }
        })
    }

    render() {
        return (
            <div>
                <span><h2>Search with Google: You have {this.state.data.length} search results listed below</h2></span>
                <form className="search" onSubmit={this.search}>
                    <input type="text" placeholder="Google" name="userInput" />
                    <button type="submit"> Search </button>
                </form>

                {/*passing data as a property to child class*/}
                <Download data={this.state.data}/>

                <div className="container">
                    <div className="row">
                        {this.state.data.map((data, i) => {
                            return (
                                <div key={i} className="col-md-4" style={{ border: "2px solid white", padding: "25px" }}>
                                    <div className="box">
                                        <input type="checkbox" name="check" onClick={this.checkBox}/>
                                        <button data-index={i} onClick={this.delete}> Delete </button>
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