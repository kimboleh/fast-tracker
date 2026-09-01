import React from 'react';
import './sidebar.scss';
import meat from '../fast-icons/meat.svg';
import menuOpen from '../fast-icons/menu-burger-horizontal.svg';
import menuClose from '../fast-icons/close-x.svg';

export class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isGregorian: localStorage.getItem("isGregorian") === "true",
      isMenuOpen: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  toggleMenu() {
    this.setState(prevState => ({ isMenuOpen: !prevState.isMenuOpen }));
  }

  closeMenu() {
    this.setState({ isMenuOpen: false });
  }

  // wrap link clicks so the menu auto-closes on mobile after navigating
  handleLinkClick(handler) {
    return () => {
      handler();
      this.closeMenu();
    };
  }

  render() {
    const { isMenuOpen } = this.state;

    return (
        <div id="sidebar" className={'light' + (isMenuOpen ? ' menu-open' : '')}>
            <div id="site-title">Meat<img src={meat} id="meat-logo" alt="logo - icon of a porkchop"/><br/>& Right</div>
            <h1 aria-label="Meat and Right" className="hidden">Meat and Right</h1>
            <h2>An OCA Fasting Tracker</h2>
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

            {isMenuOpen && <div className="sidebar-overlay" onClick={this.closeMenu}></div>}
        </div>
    );
  }
}