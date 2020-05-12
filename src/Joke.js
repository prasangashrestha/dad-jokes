import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

import './Joke.css'


export default class Joke extends Component {
    render() {
        return (
            <div className='Joke'>
                <div className="Joke-buttons">
                    <FontAwesomeIcon icon = {faArrowUp} onClick={this.props.upvote} />
                    <span>{this.props.votes}</span>
                    <FontAwesomeIcon icon = {faArrowDown} onClick={this.props.downvote}/>
                </div>

                <div className="Joke-text">
                    {this.props.joke}
                </div>
               
                
            </div>
        )
    }
}
