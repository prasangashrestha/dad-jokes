import React, { Component } from 'react'
import axios from 'axios';
import './JokeList.css'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaugh } from '@fortawesome/free-solid-svg-icons'

import Joke from './Joke';


export default class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10
    }

    state = {
        jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]')
    }

     componentDidMount() {
        if(this.state.jokes.length === 0 ) this.getJokes()
    }

    async getJokes(){

        let jokes = []
        while(jokes.length < this.props.numJokesToGet){
            let res = await axios.get('https://icanhazdadjoke.com/',
                   {headers: {Accept: 'application/json'}});
            jokes.push({id: Math.random(), joke: res.data.joke, votes: 0});
        }

        this.setState(st => ({
            loading:false,
            jokes: [...st.jokes, ...jokes ]
        
        }),
            () => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
        )
        
  
    }

    handleVote = (id, delta) => {
        this.setState(st => ({
            jokes: st.jokes.map(j => 
                j.id === id ? {...j, votes: j.votes + delta}: j)
                
        }),
            () => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
        )
    }

    handleClick = () => {
        this.setState({loading: true}, this.getJokes)
    }

    render() {
        if(this.state.loading){
            return (
                <div className="JokeList-spinner">
                    <FontAwesomeIcon icon={faLaugh} className='fa-spin' />
                    <h1 className="JokeList-title">Loading....</h1>
                </div>
            )
        }
        const jokes = this.state.jokes.map(joke => (
            <Joke 
                key={joke.id} 
                joke={joke.joke}
                votes={joke.votes}
                upvote={() => this.handleVote(joke.id, 1)}
                downvote={() => this.handleVote(joke.id, -1)}
                />
        ))

        return (
            

            <div className='JokeList'>
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title">
                        <span>Dad</span> Jokes
                        <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" alt='ss'/>
                    </h1>
                    <button onClick={this.handleClick} className="JokeList-getmore">Get Jokes</button>
                </div>
                <div className="JokeList-jokes">
                     {jokes}
                </div>
                   
            
            </div>
        )
    }
}
