import React from 'react';
import './Speedometer.css';

const Circle = ({color, radius, percent, strokeWidth}) => {
  let fullCircum = (radius * 2 * Math.PI);
  const circumference = (360 - 90) * fullCircum / 360;
  const offset =  circumference - percent / 100 * circumference;
  
  return [
    <circle
      key='shadow'
      className='progress-ring__circle'
      stroke='lightgrey'
      strokeWidth={strokeWidth}
      strokeDashoffset='0'
      strokeDasharray={`${circumference} ${circumference}`}
      fill='transparent'
      r={radius}
      cx='200'
      cy='200' />,
    <circle
      key='circle'
      className='progress-ring__circle'
      stroke={color}
      strokeWidth={strokeWidth}
      strokeDashoffset={`${parseInt(offset)}`}
      strokeDasharray={`${circumference} ${circumference}`}
      fill='transparent'
      r={radius}
      cx='200'
      cy='200' />
  ];
};

class Speedometer extends React.Component {
  render() {
    const engineRatePercent = 100 * this.props.engineRate / 14000;
    const speedPercent = 100 * (this.props.speed * 3.6) / 400;
    const throttlePercent = 100 * this.props.throttle / 1;
    const brakePercent = 100 * this.props.brake / 1;

    return (
      <div className='Speedometer'>
        <div>Speed % {speedPercent}</div>
        <svg className='progress-ring' width='400' height='400'>
          <Circle
            color='orange'
            radius={150}
            percent={engineRatePercent}
            strokeWidth={15} />
          <Circle
            color='red'
            radius={130}
            percent={speedPercent}
            strokeWidth={15} />
          <Circle
            color='green'
            radius={110}
            percent={throttlePercent}
            strokeWidth={15} />
          <Circle
            color='red'
            radius={90}
            percent={brakePercent}
            strokeWidth={15} />
          <polygon points='200,200 0,400 400,400' style={{
            fill: 'white',
            stroke: 'white',
            strokeWidth: 1
          }} />
        </svg>

        {/* Throttle {parseInt(throttlePercent)}%
        <div className='bar'>
          <div className='active' style={{width: `${throttleWidth}%`}} />
        </div>
        <p>RPM: {parseInt(this.props.engineRate)}</p> */}
      </div>
    );
  }
}

export default Speedometer;
        /* RPM: {parseInt(this.props.engineRate)}
        <div className='bar'>
          <div className='active' style={{width: `${rpmWidth}%`}} />
        </div>
        Speed: {parseInt(speed)} KM/H | MAX: {parseInt(maxSpeed)} KM/H
        <div className='bar'>
          <div className='active' style={{width: `${speedWidth}%`}} />
        </div>

        Brakes {parseInt(brakeWidth)}%
        <div className='bar'>
          <div className='active' style={{width: `${brakeWidth}%`}} />
        </div> */