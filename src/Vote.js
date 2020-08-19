import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';

class Vote extends Component {

  // calling the function (upVoteJoke) to increment the joke at this specific id
  handleUpVote = (jokeId) => {
    this.props.upVoteJoke(jokeId);
  }

  // calling the function (downVoteJoke) to increment the joke at this specific id
  handleDownVote = (jokeId) => {
    this.props.downVoteJoke(jokeId);
  }

  // sortArrayByDate = (array) => {
  //   let jokesArray = [...this.props.jokes];
  //   jokesArray.sort((jokeA, jokeB) => {
  //     const jokeADate = new Date(jokeA.created_on);
  //     const jokeBDate = new Date(jokeB.created_on);
  //     if (jokeADate > jokeBDate) {
  //       return -1;
  //     } else if (jokeADate < jokeBDate) {
  //       return 1;
  //     } else {
  //       return 0;
  //     }
  //   });
  //   // console.log(jokesArray);
  //   return jokesArray;
  // }


  // sorting the array of jokes in descending order by total number of votes (upvotes - downvotes)
  sortArray = () => {
    
    let jokesArray = [...this.props.jokes];
    jokesArray.sort((jokeA, jokeB) => {
      const totalVotesA = jokeA.upvotes - jokeA.downvotes;
      const totalVotesB = jokeB.upvotes - jokeB.downvotes;
      if (totalVotesB < totalVotesA) {
        return -1;
      } else if (totalVotesB > totalVotesA) {
        return 1;
      } else {
        return 0;
      }
    });
    
    return jokesArray;
  }

  addVoteColor = (index) => {
   if (index > 4) {
     return "jokeLeader4";
   } 
   return `jokeLeader${index}`;
  }

  render() {
    let jokesArray = [];
    if (this.props.parent === "jokeEntry") {
      jokesArray = this.props.jokes;
    } else {
      jokesArray = this.sortArray();
    }
    return (
      <div className="jokeBoard">
        <h2>Rate which jokes are best!</h2>
        <ul className="jokeContainer">
          {

            jokesArray.map( (joke, index) => {
              const totalVotes = joke.upvotes - joke.downvotes;
              return ( 
                  <li key={joke.id} className={this.addVoteColor(index)} >
                    <div className="cardWrapper">
                      <h2>{joke.created_on}</h2>
                      <p>{joke.joke}</p>
                    </div>
                    <div className="jokeDetail"> <p> By: {joke.author} </p> <p>Total Votes:{totalVotes}</p></div>
                    <div className="buttonStyle">
                    <button onClick={() => this.handleUpVote(joke.id)} id={joke.id}><FontAwesomeIcon icon={faThumbsUp} /></button>
                    <button onClick={() => this.handleDownVote(joke.id)} id={joke.id}><FontAwesomeIcon icon={faThumbsDown} /></button> 
                    </div>
                  </li>
                )
              }
            )
          }
        </ul>  
      </div>
    )
  }
}

export default Vote;