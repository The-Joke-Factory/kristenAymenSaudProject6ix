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
                <h1>Ranadom Joke Generator</h1>

                <button className="randomJokeBtn" onClick={this.onGenerateJoke} disabled={this.state.isGeneratingJoke}>Tell me a joke</button>

                <p className="randomJokeResult">{this.state.isGeneratingJoke ? "Generating random joke..." : this.state.randomJoke}</p>
            </div>
        )
    }
}

export default RandomJoke;
