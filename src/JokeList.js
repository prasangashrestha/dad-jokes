import React, { Component } from 'react'
import axios from 'axios';
import './JokeList.css'
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

        this.setState({jokes: jokes})
        window.localStorage.setItem('jokes', JSON.stringify(jokes))
  
    }

    handleVote = (id, delta) => {
        this.setState(st => ({
            jokes: st.jokes.map(j => 
                j.id === id ? {...j, votes: j.votes + delta}: j)
                
        }))
    }

    render() {
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
                    <button className="JokeList-getmore">Get Jokes</button>
                </div>
                <div className="JokeList-jokes">
                     {jokes}
                </div>
                   
            
            </div>
        )
    }
}
