import React from 'react';
import './sidebar.scss';
import meat from '../fast-icons/meat.svg';
import arrow from '../fast-icons/arrow.svg';
import today from '../fast-icons/today-icon.svg';

export class Sidebar extends React.Component {

  render() {
    return (
        <div id="sidebar" className='light'>
            <div id="site-title">Meat<img src={meat} id="meat-logo" className="fast-icon" alt="logo - icon of a porkchop"/><br/>& Right</div>
            <h1 aria-label="Meat and Right" class="hidden">Meat and Right</h1>
            <h2>An OCA Fasting Tracker</h2>
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

            <div id="links">
                <div id="fast-tracker-link" className='sidebar-link sidebar-current' onClick={this.props.openTracker} tabIndex='0'>Fasting Tracker</div>
                <div id="about-link" className='sidebar-link' onClick={this.props.openAbout} tabIndex='0'>About</div>
                <div id="faq-link" className='sidebar-link' onClick={this.props.openFAQ} tabIndex='0'>FAQ</div>
            </div>
        </div>
    );
  }
}
