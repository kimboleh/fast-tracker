import React from 'react';
import './App.css';
import { FastingText } from './components/fasting-text/fasting-text.js';
import { Sidebar } from './components/sidebar/sidebar.js';
import about from './components/fast-icons/qmark.svg';

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
    this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
    "October", "November", "December"];
    this.today = new Date();
  }

  async componentDidMount() {
    await fetch("https://orthocal.info/api/gregorian/")
    .then((res) => res.json())
    .then((json) => {
      this.setState({
        fastJSON: json,
        isDataLoaded: true});
    })

    console.log(this.state.fastJSON);

    if(this.state.isDataLoaded){
      this.setColor(this.state.fastJSON.pascha_distance);
      this.setDate(this.today, this.state.fastJSON);
      this.setFast();
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
    }
  }

  render() {
    return (
      <div id="app" className="App">
        <Sidebar title={this.state.title} dateText={this.state.dateString}></Sidebar>
        <FastingText fasts={this.state.fasts} fastDesc={this.state.fastDescripton} />
        <img src={about} id="about" alt="about" title="About"></img>
      </div>
    );
  }

}

export default App;

// deployment: https://github.com/gitname/react-gh-pages
