import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

import './Joke.css'



export default class Joke extends Component {

    getColor() {
        if (this.props.votes >= 15) {
          return "#4CAF50";
        } else if (this.props.votes >= 12) {
          return "#8BC34A";
        } else if (this.props.votes >= 9) {
          return "#CDDC39";
        } else if (this.props.votes >= 6) {
          return "#FFEB3B";
        } else if (this.props.votes >= 3) {
          return "#FFC107";
        } else if (this.props.votes >= 0) {
          return "#FF9800";
        } else {
          return "#f44336";
        }
      }

    render() {
        return (
            <div className='Joke'>
                <div className="Joke-buttons">
                    <FontAwesomeIcon className='arrow-up' icon = {faArrowUp} onClick={this.props.upvote} />
                    <span className='Joke-votes' style = {{borderColor: this.getColor()}}>{this.props.votes}</span>
                    <FontAwesomeIcon className='arrow-down' icon = {faArrowDown} onClick={this.props.downvote}/>
                </div>

                <div className="Joke-text">
                    {this.props.joke}
                </div>
               
                
            </div>
        )
    }
}
