import React from 'react';
import './App.css';
import {FastingText} from './components/fasting-text/fasting-text.js';
import {Sidebar} from './components/sidebar/sidebar.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateString: '',
      isDataLoaded: false,
      fastJSON: {},
      fast: '',
      fastDetails: '',
      title: ''
    };
    this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
    "October", "November", "December"];
    this.today = new Date();
  }

  async componentDidMount() {
    await fetch("https://orthocal.info/api/oca/")
    .then((res) => res.json())
    .then((json) => {
      this.setState({
        fastJSON: json,
        isDataLoaded: true});
    })

    console.log(this.state.fastJSON);

    if(this.state.isDataLoaded){
      this.setColor(this.state.fastJSON);
      this.setDate(this.today, this.state.fastJSON);
      this.setFast();
      this.setFastDetails();
    }
  }

  setDate(dateObject, json) {
    var year = dateObject.getFullYear();
    var month = dateObject.getMonth();
    var numericalDay = dateObject.getDate();

    this.setState({dateString: this.months[month] + " " + numericalDay + ", " + year});
    if (json.titles.length > 0) {
      this.setState({title: json.titles[0]});
    }
  }

  setColor(json) {
    const body = document.getElementsByTagName('body')[0];

    /* gold - default */
    body.className = 'gold';

    /* blue - Marian feasts, Presentation, Annunciation, & Akathist */

    /* red - feasts commemorating the cross, Apostles' Fast & Feast, Advent fast,
     * feast days for holy martyrs, and Great & Holy Thursday */

    /* green - Pentecost, Palm Sunday, & days commemmorating angels, prophets,
     * monastic saints, ascetics, & fools for Christ */

    /* black/purple - Lent */
    if (json.pascha_distance >= -40 && json.pascha_distance < 0) {
      body.className = 'purple';
    }

    /* white - Epiphany, Transfiguration, & Pascha */
    if (json.pascha_distance === 0) {
      body.className = 'white';
    }
  }

  setFast() {
    let apiDay = this.state.fastJSON;

    if (apiDay.fast_level_desc === "Fast" && (apiDay.weekday === 5 || apiDay.weekday === 3)) {
      this.setState({fast: "regular Wednesday & Friday fasting"});
    } else if (apiDay.titles[0].includes("Cheesefare")) {
      this.setState({
        fast: "week of Cheesefare",
        fastDetails: "no red & white meat. Since it's only a Meat Fast, fish, dairy, and alcohol are fine"});
    } else {
      this.setState({fast: apiDay.fast_level_desc});
    }
  }

  setFastDetails() {
    let apiDay = this.state.fastJSON;
    let fast = this.state.fast;

    if (fast !== "week of Cheesefare" &&
        (fast === "Lenten Fast" || fast === "Nativity Fast" || apiDay.fast_level_desc === "Fast")) {
          this.setState({fastDetails: "which means no meat, no dairy, and no alcohol"});
    }

    // exceptions
    switch (apiDay.fast_exception) {
      case 2:
        this.setState({fastDetails: "but today is a Fish Day, so only red & white meat and dairy are off-limits"});
        break;
      case 7:
        this.setState({fastDetails: "but today is only a Meat Fast, so only red & white meats are off-limits"});
        break;
      default: break;

    }
  }

  render() {
    return (
      <div id="app" className="App">
        <Sidebar title={this.state.title} dateText={this.state.dateString}></Sidebar>
        <FastingText fast={this.state.fast} fastDetails={this.state.fastDetails} />
      </div>
    );
  }

}

export default App;

// deployment: https://github.com/gitname/react-gh-pages
