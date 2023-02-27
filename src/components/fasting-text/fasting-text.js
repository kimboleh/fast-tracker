import React from 'react';
import meat from '../fast-icons/meat.svg';
import dairy from '../fast-icons/dairy.svg';
import fish from '../fast-icons/fish.svg';
import alcohol from '../fast-icons/alcohol.svg';
import oil from '../fast-icons/oil.svg';

export class FastingText extends React.Component {
  constructor(props) {
    super(props);
    this.meatStr = 'meat is allowed';
    this.dairyStr = 'dairy is allowed';
    this.fishStr = 'fish is allowed';
    this.alcStr = 'alcohol is allowed';
    this.oilStr = 'oil is allowed';
  }

  componentDidUpdate() {
    this.props.fasts.forEach(fast => {
      document.getElementById(fast).className += " fasted";
      document.getElementById(fast).alt = fast + " is not allowed";
    });
  }

  render() {
    return (
      <div id="main-content">
        <div id='text-body' className='light'>
          <div id="titles">
            <h1>OCA Fast Tracker</h1>
            <h2>What's on the table?</h2>
          </div>
          <div id="fast-icons" className='light'>
            <img src={meat} id="meat" className="fast-icon" alt={this.meatStr}></img>
            <img src={dairy} id="dairy" className="fast-icon" alt={this.dairyStr}></img>
            <img src={fish} id="fish" className="fast-icon" alt={this.fishStr}></img>
            <img src={alcohol} id="alcohol" className="fast-icon" alt={this.alcStr}></img>
            <img src={oil} id="oil" className="fast-icon" alt={this.oilStr}></img>
          </div>
          <div id="fast-description">{this.props.fastDesc}</div>
        </div>
      </div>
    );
  }
}