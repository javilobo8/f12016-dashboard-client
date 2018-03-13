import React, { Component } from 'react';
import { subscribe } from './api';
import './App.css';

import Speedometer from './Speedometer';

function pad(num) {
  if (num < 10) {
    return '0' + num;
  }
  return num;
}

function mmss(secs) {
  var minutes = Math.floor(secs / 60);
  secs = Math.round((secs % 60) * 1000) / 1000;
  return pad(minutes) + ":" + pad(secs);
}

function toCelsius(f) {
  return parseInt((f + 276) * (5 / 9));
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      maxSpeed: 0,
    };

    this.laps = [];

    subscribe('data', (err, data) => this.handleData(data));
  }

  handleData(data) {
    this.setState((prevState) => {
      const maxSpeed = prevState.maxSpeed < data.speed ? data.speed : prevState.maxSpeed;
      return {data, maxSpeed};
    });
  }

  render() {
    const {data} = this.state;

    if (!data) {
      return '';
    }

    return (
      <div className='App'>
        <Speedometer
          maxSpeed={this.state.maxSpeed}
          speed={data.speed}
          engineRate={data.engineRate}
          throttle={data.throttle}
          brake={data.brake}
        />
        <p>Time: {mmss(data.time)}</p>
        <p>Lap time: {mmss(data.lapTime)}</p>
        <p>Last lap time: {mmss(data.last_lap_time)}</p>
        <p>Lap: {data.lap}</p>
        <p>Sector: {data.sector}</p>
        <p>Sector 1 time: {mmss(data.sector1_time)}</p>
        <p>Sector 2 time: {mmss(data.sector2_time)}</p>
        <p>Brakes: {`[${toCelsius(data.brakes_temp1)}, ${toCelsius(data.brakes_temp2)}, ${toCelsius(data.brakes_temp3)}, ${toCelsius(data.brakes_temp4)}]`}</p>
        <p>Pressure: {`[${data.wheels_pressure1}, ${data.wheels_pressure2}, ${data.wheels_pressure3}, ${data.wheels_pressure4}]`}</p>
        {/* <code>{JSON.stringify(this.state.data, null, 2)}</code> */}
      </div>
    );
  }
}

export default App;
