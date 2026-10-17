import React from 'react';
import './sidebar.scss';

import { SettingsPanel } from '../settings-panel/settings-panel.js';

import meat from '../fast-icons/meat.svg';
import menuOpen from '../fast-icons/menu-burger-horizontal.svg';
import menuClose from '../fast-icons/close-x.svg';
import settingsGear from "../fast-icons/settings-gear.svg";

export class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isGregorian: localStorage.getItem("isGregorian") === "true", // default: Gregorian
      isSlavic: localStorage.getItem("isSlavic") === "true", // default: OCA/Slavic
      isMenuOpen: false,
      isSettingsOpen: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.handleCalendarToggle = this.handleCalendarToggle.bind(this);
    this.handleTraditionToggle = this.handleTraditionToggle.bind(this);
  }

  toggleMenu() {
    this.setState(prev => ({
      isMenuOpen: !prev.isMenuOpen,
      isSettingsOpen: false // collapsing the menu also collapses settings
    }));
  }

  toggleSettings() { this.setState(prev => ({ isSettingsOpen: !prev.isSettingsOpen })); }

  closeMenu() { this.setState({ isMenuOpen: false, isSettingsOpen: false }); }

  // wrap link clicks so the menu auto-closes on mobile after navigating
  handleLinkClick(handler) {
    return () => {
      handler();
      this.closeMenu();
    };
  }

  handleCalendarToggle(isChecked) {
    this.setState({ isGregorian: isChecked });
    localStorage.setItem("isGregorian", isChecked.toString());
    this.props.updateFastingData();
  }

  handleTraditionToggle(isChecked) {
    this.setState({ isSlavic: isChecked });
    localStorage.setItem("isSlavic", isChecked.toString());
    this.props.updateFastingData();
  }

  render() {
    const { isMenuOpen, isSettingsOpen } = this.state;

    return (
        <div id="sidebar" className={'light' + (isMenuOpen ? ' menu-open' : '')}>
            <div id="site-title">Meat<img src={meat} id="meat-logo" alt="logo - icon of a porkchop"/><br/>& Right</div>
            <h1 aria-label="Meat and Right" className="hidden">Meat and Right</h1>
            <h2>An Orthodox Fasting Tracker</h2>
            <hr/>

            <button
              id="menuToggle"
              aria-label={this.state.isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={this.state.isMenuOpen}
              onClick={this.toggleMenu}>
              <img src={this.state.isMenuOpen ? menuClose : menuOpen} alt="" />
            </button>

            <div id="links">

                <div id="fast-tracker-link" className='sidebar-link sidebar-current' onClick={this.handleLinkClick(this.props.openTracker)} tabIndex='0'>Daily Fast Tracker</div>
                <div id="cal-link" className="sidebar-link" onClick={this.handleLinkClick(this.props.openCal)} tabIndex='0'>Monthly Calendar</div>
                <div id="about-link" className='sidebar-link' onClick={this.handleLinkClick(this.props.openAbout)} tabIndex='0'>About</div>
                <div id="faq-link" className='sidebar-link' onClick={this.handleLinkClick(this.props.openFAQ)} tabIndex='0'>FAQ</div>

                <button
                  id="settingsToggle"
                  aria-label={this.state.isSettingsOpen ? "Close settings" : "Open settings"}
                  aria-expanded={this.state.isSettingsOpen}
                  onClick={this.toggleSettings}>
                  <img src={settingsGear} alt="settings" />
                </button>

                <SettingsPanel
                  isOpen={this.state.isSettingsOpen}
                  isGregorian={this.state.isGregorian}
                  isSlavic={this.state.isSlavic}
                  onCalendarToggle={this.handleCalendarToggle}
                  onTraditionToggle={this.handleTraditionToggle}
                />
            </div>

            {isMenuOpen && <div className="sidebar-overlay" onClick={this.closeMenu}></div>}
        </div>
    );
  }
}