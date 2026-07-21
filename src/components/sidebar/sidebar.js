import React from 'react';
import './sidebar.scss';
import meat from '../fast-icons/meat.svg';
import menuOpen from '../fast-icons/menu-burger-horizontal.svg';
import menuClose from '../fast-icons/close-x.svg';

export class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    // Initialize from localStorage only once on mount
    this.state = {
      isGregorian: localStorage.getItem("isGregorian") === "true",
      isMenuOpen: false
    };
  }

  render() {
    return (
        <div id="sidebar" className='light'>
            <div id="site-title">Meat<img src={meat} id="meat-logo" className="fast-icon" alt="logo - icon of a porkchop"/><br/>& Right</div>
            <h1 aria-label="Meat and Right" className="hidden">Meat and Right</h1>
            <h2>An OCA Fasting Tracker</h2>
            <hr/>

            <button 
              id="menuOpen"
              className=""
              onClick={this.setState(isMenuOpen, true)}>
              <img src={menuOpen} />
            </button>

            <div id="links">
                <div id="fast-tracker-link" className='sidebar-link sidebar-current' onClick={this.props.openTracker} tabIndex='0'>Daily Fast Tracker</div>
                <div id="cal-link" className="sidebar-link" onClick={this.props.openCal} tabIndex='0'>Monthly Calendar</div>
                <div id="about-link" className='sidebar-link' onClick={this.props.openAbout} tabIndex='0'>About</div>
                <div id="faq-link" className='sidebar-link' onClick={this.props.openFAQ} tabIndex='0'>FAQ</div>
            </div>

            <button>
              <img src={menuClose} />
            </button>

            <div id="calendar-type-toggle">
              <span></span>
              <div className="toggle">
                  <input
                    type="checkbox"
                    name="calendar-type-toggle"
                    aria-label={"Toggle " + (this.state.isGregorian ? "Julian" : "Gregorian") + " Calendar"}
                    checked={this.state.isGregorian}
                    onChange={e => {
                      const isChecked = e.target.checked;
                      this.setState({ isGregorian: isChecked });
                      localStorage.setItem("isGregorian", isChecked.toString());
                      this.props.updateFastingData();
                    }} 
                    />
                  <label></label>
              </div>
            </div>
        </div>
    );
  }
}
