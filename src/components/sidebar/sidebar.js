import React from 'react';
import './sidebar.scss';
import meat from '../fast-icons/meat.svg';

export class Sidebar extends React.Component {

  render() {
    return (
        <div id="sidebar" className='light'>
            <div id="site-title">Meat<img src={meat} id="meat-logo" className="fast-icon" alt="logo - icon of a porkchop"/><br/>& Right</div>
            <h1 aria-label="Meat and Right" class="hidden">Meat and Right</h1>
            <h2>An OCA Fasting Tracker</h2>
            <hr/>

            <div id="links">
                <div id="fast-tracker-link" className='sidebar-link sidebar-current' onClick={this.props.openTracker} tabIndex='0'>Daily Fast Tracker</div>
                <div id="cal-link" className="sidebar-link" onClick={this.props.openCal} tabIndex='0'>Monthly Calendar</div>
                <div id="about-link" className='sidebar-link' onClick={this.props.openAbout} tabIndex='0'>About</div>
                <div id="faq-link" className='sidebar-link' onClick={this.props.openFAQ} tabIndex='0'>FAQ</div>
            </div>
        </div>
    );
  }
}
