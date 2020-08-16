import React, { Component } from 'react';


class RandomJoke extends Component {
    randomJoke = null;
    
    constructor() {
        super();
        this.state = {
            //randomJoke = null,
            isGeneratingJoke: false
        };
        this.onGenerateJoke = this.onGenerateJoke.bind(this);
    }

    componentDidMount() {
        this.onGenerateJoke();
    }

    //generate a joke
    generateJoke() {
        this.setState({ isGeneratingJoke: true })

        fetch(`//icanhazdadjoke.com/`, {
            headers: {
                accept: "application/json" //this will retrieve json data
            }
        })

        .then(response => response.json())
        .then(json => {
            this.setState({
                randomJoke: json.joke,
                isGeneratingJoke: false
            });
        });
    }

    onGenerateJoke() {
        this.generateJoke();
    }

    render() {
        return(
            <div className="randomJokeContainer">
                <h1>Rnadom Joke Generator</h1>

                <button onClick={this.onGenerateJoke} disabled={this.state.isGeneratingJoke}>Tell me a joke</button>

                <p className="randomJokeResult">{this.state.isGeneratingJoke ? "Generating random joke..." : this.state.randomJoke}</p>
            </div>
        )
    }
}

export default RandomJoke;







// componentDidMount() {
//     const axios = require("axios");
//     const generateJoke = () => {
//         return axios.get("https://icanhazdadjoke.com/").then(response => {
//           return response;
//         });
//     };
// }

// componentDidMount() {
//     axios({
//       url: `//icanhazdadjoke.com/?`,
//       method: `GET`,
//       responseType: `json`,
//     })
//     .then((response) => {
//       console.log(response); //.data.data.url?
//       result = response.data.joke
//       this.setState({
//         joke: result
//       })
//     })
//   }

// render() {
//     return(
//     <p>{result.data.joke}</p>
//     )
// }



// axios.get('//icanhazdadjoke.com/?').then(res => {
// 			const results = res.data;
// 			this.setState({
// 				jokes: results
// 			});
// 		});