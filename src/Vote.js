import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

class Vote extends Component {

  // calling the function (upVoteJoke) to increment the joke at this specific id
  handleUpVote = (jokeId) => {
    this.props.upVoteJoke(jokeId);
  }

  // calling the function (downVoteJoke) to increment the joke at this specific id
  handleDownVote = (jokeId) => {
    this.props.downVoteJoke(jokeId);
  }

  //sorting the array of jokes in descending order by total number of votes (upvotes - downvotes)
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
    return (
      <div className="jokeBoard">
        <h2>Upvote or Downvote One of the Jokes Below to Move On.</h2>
        <ul>
          {
            this.sortArray().map( (joke, index) => {
              const totalVotes = joke.upvotes - joke.downvotes;
              return ( 
                <div>
                  <li key={joke.id} className={this.addVoteColor(index)} >
                    {joke.author} {joke.joke} {joke.created_on}
                    <Link to={"/random"}><button onClick={() => this.handleUpVote(joke.id)} id={joke.id}><FontAwesomeIcon icon={faThumbsUp} /></button></Link>
                    <Link to={"/random"}><button onClick={() => this.handleDownVote(joke.id)} id={joke.id}><FontAwesomeIcon icon={faThumbsDown} /></button></Link> Total Votes: {totalVotes}
                  </li>
                </div>
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