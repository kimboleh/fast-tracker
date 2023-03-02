import React from 'react';
import './sidebar.css';
import arrow from '../fast-icons/arrow.svg';
import circle from '../fast-icons/circle.svg';

export class Sidebar extends React.Component {

  render() {
    return (
        <div id="sidebar" className='light'>
            <div id="title">{this.props.title}</div>
            <div id="dateText">{this.props.dateText}</div>
            <div id="next-previous-buttons">
                <button onClick={this.props.previousDay}>
                    <img src={arrow} id="previous-arrow" alt="previous day"></img>
                </button>
                <button onClick={this.props.toCurrentDate}>
                    <img src={circle} id="current-date" alt="current date"></img>
                </button>
                <button onClick={this.props.nextDay}>
                    <img src={arrow} id="next-arrow" alt="next day"></img>
                </button>
            </div>

            <div id="links">
                <div id="fast-tracker-link" className='sidebar-link sidebar-current' onClick={this.props.openTracker}>Fasting Tracker</div>
                <div id="about-link" className='sidebar-link' onClick={this.props.openAbout}>About</div>
                <div id="faq-link" className='sidebar-link' onClick={this.props.openFAQ}>FAQ</div>
            </div>

            <div id="list-title">Coming soon:</div>
            <div id="list">
                <ul>
                    <li>Monthly calendar view</li>
                </ul>
            </div>
        </div>
    );
  }
}
