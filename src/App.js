import React, { Component } from 'react';
import { subscribeToData } from './api';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };

    subscribeToData((err, data) => this.setState({ 
      data 
    }));
  }


  render() {
    return (
      <div className='App'>
        <code>{JSON.stringify(this.state.data, null, 2)}</code>
      </div>
    );
  }
}

export default App;
