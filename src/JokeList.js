import React, { Component } from 'react'
import axios from 'axios';

export default class JokeList extends Component {
    async componentDidMount() {
        let res = await axios.get('https://icanhazdadjoke.com/',
                   {headers: {Accept: 'application/json'}});
        console.log(res.data.joke)
  
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
