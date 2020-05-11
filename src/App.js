import React, { Component } from 'react';

import JokeList from './JokeList';

export default class App extends Component {
  
  render() {
    return (
      <div>
        <h1>Dad Jokes</h1>
        <JokeList />
      </div>
    )
  }
}
