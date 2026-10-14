import React, {Component} from "react"

export default class MyClasCompo extends Component {
    constructor(){
        super();
        this.state = {
            name:"Ajay Kumar"
        };
    }
    componentWillMount(){
        console.log("WillMount");
        console.log("WillMount state.name" , this.state.name);
    }
    componentDidMount(){
        this.setState({name: "Vimal"});
        console.log("DidMount");
        console.log("DidMount state.name" , this.state.name);
    }
    render(){
        return(
            <div>
                    <h1> Welcome with class components</h1>
                    <p>ClasCompo state.name: {this.state.name}</p>
            </div>
        );
    }
}