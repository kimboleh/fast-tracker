import React from 'react';
import ReactGA from 'react-ga';

import './global.scss';
import { FastingText } from './components/fasting-text/fasting-text.js';
import { Sidebar } from './components/sidebar/sidebar.js';
import { About } from './components/about/about.js';
import { FAQ } from './components/faq/faq.js';

// GA Analytics
const GA_TRACKING_ID = "UA-259094917-1";
ReactGA.initialize(GA_TRACKING_ID);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateString: '',
      isDataLoaded: false,
      fastJSON: {},
      fasts: [],
      fastDescripton: '',
      title: ''
    };
    this.nextDay = this.nextDay.bind(this);
    this.previousDay = this.previousDay.bind(this);
    this.toCurrentDate = this.toCurrentDate.bind(this);

    this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
    "October", "November", "December"];
    this.selectedDate = new Date();
  }

  async componentDidMount() {
    await this.fetchDateJSON();
    this.setNewData();
  }

  async fetchDateJSON() {
    this.setState({ isDataLoaded: false });

    await fetch("https://orthocal.info/api/gregorian/" + this.selectedDate.getFullYear() + "/" + (this.selectedDate.getMonth() + 1) + "/" + this.selectedDate.getDate())
    .then((res) => res.json())
    .then((json) => {
      this.setState({
        fastJSON: json,
        isDataLoaded: true});
    })

    console.log(this.state.fastJSON);
  }

  setNewData() {
    if (this.state.isDataLoaded){
      this.setColor(this.state.fastJSON.pascha_distance);
      this.setDateAndTitleStrings(this.selectedDate, this.state.fastJSON);
      this.setFast();
    }
  }

  setDateAndTitleStrings(dateObject, json) {
    var year = dateObject.getFullYear();
    var month = dateObject.getMonth();
    var numericalDay = dateObject.getDate();

    this.setState({dateString: this.months[month] + " " + numericalDay + ", " + year});
    if (json.titles.length > 0) {
      this.setState({title: json.titles[0]});
    }
  }

  setColor(pascha_distance) {
    const body = document.getElementsByTagName('body')[0];

    /* blue - Marian feasts, Presentation, Annunciation, & Akathist */

    /* red - feasts commemorating the cross, Apostles' Fast & Feast, Advent fast,
     * feast days for holy martyrs, and Great & Holy Thursday */
    if (pascha_distance === -3) {
      body.className = 'red';
    }
    /* green - Pentecost, Palm Sunday, & days commemmorating angels, prophets,
     * monastic saints, ascetics, & fools for Christ */
    else if (pascha_distance === -7 || pascha_distance === 49) {
      body.className = 'green';
    }
    /* black/purple - Lent */
    else if (pascha_distance >= -48 && pascha_distance < 0) {
      body.className = 'purple';
    }
    /* white - Epiphany, Transfiguration, & Pascha */
    else if (pascha_distance === 0) {
      body.className = 'white';
      document.getElementById('sidebar').className = 'dark';
      document.getElementById('text-body').className = 'dark';
    }
    /* gold - default */
    else {
      body.className = 'gold';
    }
  }

  setFast() {
    let fastLevel = this.state.fastJSON.fast_level;
    let fastException = this.state.fastJSON.fast_exception;

    if (fastLevel !== 0) {
      switch (fastException) {
        case 0:
        case 10:
        case 9:
        case 8: // 8 is "Strict Fast (Wine & Oil), 9 is "Strict Fast", 10 is "No overrides"
          this.setState({fasts: ['meat','dairy', 'fish', 'alcohol', 'oil'],
            fastDescripton: 'Today is a strict fast: no meat, dairy, fish, wine, or oil.'});
          break;
        case 7: // Cheesefare
          this.setState({fasts: ['meat'], fastDescripton: 'For the week of Cheesefare, the fast only includes meat.'});
          break;
        case 5: // Wine allowed
          this.setState({fasts: ['meat', 'dairy', 'fish', 'oil'], fastDescripton: 'Wine is permitted, but the fast includes meat, dairy, fish, and oil.'});
          break;
        case 4:
        case 2: // Fish, oil, & wine allowed
          this.setState({fasts: ['meat', 'dairy'], fastDescripton: 'Today is a fish day, so the fast only includes meat and dairy.'});
          break;
        case 3:
        case 1: // Wine & oil allowed
          this.setState({fasts: ['meat', 'dairy', 'fish'], fastDescripton: 'Wine and oil are permitted, but the fast includes meat, dairy, and fish.'});
          break;
        default:
          break;
      }
    } else {
      this.setState({fasts: [], fastDescripton: "No fast today!"});
    }
  }

  async nextDay() {
    this.selectedDate.setDate(this.selectedDate.getDate() + 1);
    await this.fetchDateJSON();
    this.setNewData();
    this.openTracker();
    
    // Analytics
    ReactGA.event({
      category: 'User',
      action: 'viewed next day'
    });
  }

  async previousDay() {
    this.selectedDate.setDate(this.selectedDate.getDate() - 1);
    await this.fetchDateJSON();
    this.setNewData();
    this.openTracker();

    // Analytics
    ReactGA.event({
      category: 'User',
      action: 'viewed previous day'
    });
  }

  async toCurrentDate() {
    this.selectedDate = new Date();
    await this.fetchDateJSON();
    this.setNewData();
    this.openTracker();

    // Analytics
    ReactGA.event({
      category: 'User',
      action: 'returned to current day'
    });
  }

  openAbout() {
    // hide FastTracker and FAQ content
    document.getElementById("fast-tracker").style.display = "none";
    document.getElementById("fast-tracker-link").className = "sidebar-link";
    document.getElementById("faq-page").style.display = "none";
    document.getElementById("faq-link").className = "sidebar-link";

    // show about
    document.getElementById("about-page").style.display = "block";
    document.getElementById("about-link").className += " sidebar-current";

    // Analytics
    ReactGA.event({
      category: 'User',
      action: 'visited About'
    });
  }

  openFAQ() {
    // hide FastTracker and About content
    document.getElementById("fast-tracker").style.display = "none";
    document.getElementById("fast-tracker-link").className = "sidebar-link";
    document.getElementById("about-page").style.display = "none";
    document.getElementById("about-link").className = "sidebar-link";

    // show FAQ
    document.getElementById("faq-page").style.display = "block";
    document.getElementById("faq-link").className += " sidebar-current";

    // GA Analytics
    ReactGA.event({
      category: 'User',
      action: 'visited FAQ'
    });
  }

  openTracker() {
    // hide About and FAQ content
    document.getElementById("about-page").style.display = "none";
    document.getElementById("about-link").className = "sidebar-link";
    document.getElementById("faq-page").style.display = "none";
    document.getElementById("faq-link").className = "sidebar-link";

    // show fast tracker
    document.getElementById("fast-tracker").style.display = "block";
    document.getElementById("fast-tracker-link").className += " sidebar-current";

    // GA Analytics
    ReactGA.event({
      category: 'User',
      action: 'visited Tracker'
    });
  }

  focusFastDesc() {
    console.log("focusing fast description");
    if (document.getElementById("fast-tracker").style.display == "none") {
      this.openTracker();
    }

    document.getElementById("fast-description").focus();
  }

  render() {
    return (
      <div id="app" className="App">
        <div id="skip-to-fast-description">
          <button id="skip-btn" onClick={this.focusFastDesc} tabIndex='1'>Skip to Fast Description</button>
        </div>
        <Sidebar  
          nextDay={this.nextDay} 
          previousDay={this.previousDay}
          toCurrentDate={this.toCurrentDate}
          openTracker={this.openTracker}
          openAbout={this.openAbout}
          openFAQ={this.openFAQ}>
        </Sidebar>
        <FastingText
          title={this.state.title} 
          dateText={this.state.dateString}
          fasts={this.state.fasts}
          fastDesc={this.state.fastDescripton} />
        <About />
        <FAQ />
      </div>
    );
  }

}

export default App;

// deployment: https://github.com/gitname/react-gh-pages
