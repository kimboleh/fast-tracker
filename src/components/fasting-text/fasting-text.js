import React from 'react';
import './fasting-text.scss';
import meat from '../fast-icons/meat.svg';
import dairy from '../fast-icons/dairy.svg';
import fish from '../fast-icons/fish.svg';
import alcohol from '../fast-icons/alcohol.svg';
import oil from '../fast-icons/oil.svg';

import arrow from '../fast-icons/arrow.svg';
import today from '../fast-icons/today-icon.svg';

export class FastingText extends React.Component {
  constructor(props) {
    super(props);
    this.possibleFasts = ['meat', 'dairy', 'fish', 'alcohol', 'oil'];
    this.meatStr = 'meat is allowed';
    this.dairyStr = 'dairy is allowed';
    this.fishStr = 'fish is allowed';
    this.alcStr = 'alcohol is allowed';
    this.oilStr = 'oil is allowed';
  }

  componentDidUpdate() {
    this.possibleFasts.forEach(fast => {
      if (this.props.fasts.includes(fast)) {
        document.getElementById(fast).className += " fasted";
        document.getElementById(fast).alt = fast + " is not allowed";
      } else {
        document.getElementById(fast).className = "fast-icon";
        document.getElementById(fast).alt = fast + " is allowed";
      }
    });
  }

  render() {
    return (
      <div id="fast-tracker" className="main-content">
        <div id='text-body' className='light'>
          <div id="date-info">
            <div id="title" tabIndex='0'><h1>{this.props.title}</h1></div>
            <div id="dateText" tabIndex='0'><h2>{this.props.dateText}</h2></div>
          </div>
          <div id="next-previous-buttons">
              <button onClick={this.props.previousDay} title="Previous day">
                  <img src={arrow} id="previous-arrow" alt="previous day"></img>
              </button>
              <button onClick={this.props.toCurrentDate} title="Today">
                  <img src={today} id="current-date" alt="current date"></img>
              </button>
              <button onClick={this.props.nextDay} title="Next day">
                  <img src={arrow} id="next-arrow" alt="next day"></img>
              </button>
          </div>
          <div id="fast-icons" className='light'>
            <img src={meat} id="meat" className="fast-icon" alt={this.meatStr} tabIndex='0'></img>
            <img src={dairy} id="dairy" className="fast-icon" alt={this.dairyStr} tabIndex='0'></img>
            <img src={fish} id="fish" className="fast-icon" alt={this.fishStr} tabIndex='0'></img>
            <img src={alcohol} id="alcohol" className="fast-icon" alt={this.alcStr} tabIndex='0'></img>
            <img src={oil} id="oil" className="fast-icon" alt={this.oilStr} tabIndex='0'></img>
          </div>
          <div id="fast-description" tabIndex='0'>{this.props.fastDesc}</div>
        </div>
      </div>
    );
  }
}
