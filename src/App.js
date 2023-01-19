import React from 'react';
import './App.css';
import {FastingText} from './components/fasting-text/fasting-text.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataLoaded: false,
      fastJSON: {},
      fast: '',
      fastDetails: ''
    };
  }

  async componentDidMount() {
    await fetch("https://orthocal.info/api/oca/")
    .then((res) => res.json())
    .then((json) => {
      this.setState({
        fastJSON: json,
        isDataLoaded: true});
    })

    if(this.state.isDataLoaded){
      this.setFast();
      this.setFastDetails();
    }
  }

  setFast() {
    let apiDay = this.state.fastJSON;

    if (apiDay.fast_level_desc === "Fast" && (apiDay.weekday === 5 || apiDay.weekday === 3)) {
      this.setState({fast: "regular Wednesday & Friday fasting"});
    } else if (apiDay.titles[0].includes("Cheesefare")) {
      this.setState({
        fast: "week of Cheesefare",
        fastDetails: "no red & white meat. Since it's only a <strong>Meat Fast</strong>, <em>fish, dairy, and alcohol are fine"});
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
        this.setState({fastDetails: "but today is a <strong>Fish Day</strong>, so only <em>red & white meat and dairy are off-limits</em>"});
        break;
      case 7:
        this.setState({fastDetails: "but today is only a <strong>Meat Fast</strong>, so <em>only red & white meats are off-limits</em>"});
        break;
      default: break;

    }
  }

  render() {
    return (
      <div className="App">
        <FastingText fast={this.state.fast} fastDetails={this.state.fastDetails} />
      </div>
    );
  }

}

export default App;

// deployment: https://github.com/gitname/react-gh-pages
