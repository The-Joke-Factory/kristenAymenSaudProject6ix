import React, { Component } from 'react';
import axios from 'axios';

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

        axios({
            method: 'GET',
            url: 'https://icanhazdadjoke.com/',
            responseType: 'json',
            headers: {
                Accept: "application/json" //this will retrieve json data
            }
        })
        .then((res) => {
            console.log(res.data.joke);
            this.setState(
                {
                    randomJoke: res.data.joke,
                    isGeneratingJoke: false
                })
        });
    }

    onGenerateJoke() {
        this.generateJoke();
    }

    render() {
        return(
            <div className="randomJokeContainer">
                <h1>Random Joke Generator</h1>
                <button className="randomJokeBtn" onClick={this.onGenerateJoke} disabled={this.state.isGeneratingJoke}>Tell me a joke</button>

                <p className="randomJokeResult">{this.state.isGeneratingJoke ? "Generating random joke..." : this.state.randomJoke}</p>
            </div>
        )
    }
}

export default RandomJoke;


// class RandomJoke extends Component {
//     constructor() {
//       super();
//       this.state = {
//         joke: []
//       };
      
//       this.getJoke = this.getJoke.bind(this);
//     }
    
//     getJoke() {
//       axios.get(`//icanhazdadjoke.com/`)
//         .then(response => {
//         this.setState({joke: response.joke});
//       }).catch(error => {
//         console.log(error);
//       });
//     }
    
//     render() {
//       return(
//         <div className="randomJokeContainer">
//           <h1>Random Joke</h1>
//           <h3>{this.state.joke}</h3>
//           <button type="button" 
//             className="randomJokeBtn"
//             onClick={this.getJoke}>
//             Tell me a joke
//           </button>
//         </div>
//       );
//     }
// }



