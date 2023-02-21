import React from 'react';
import meat from '../fast-icons/meat.svg';
import dairy from '../fast-icons/dairy.svg';
import fish from '../fast-icons/fish.svg';
import alcohol from '../fast-icons/alcohol.svg';
import oil from '../fast-icons/oil.svg';

export class FastingText extends React.Component {

  render() {
    return (
      <div id="main-content">
        <div id='fasting' className='main-body'>
          <h1>What can Austin & Kimberly eat?</h1>
          <p>Austin and Kimberly are participating in the {this.props.fast} right now, {this.props.fastDetails}.
          </p>
          <div id="fast-icons">
            <img src={meat} class="fast-icon"></img>
            <img src={dairy} class="fast-icon"></img>
            <img src={fish} class="fast-icon"></img>
            <img src={alcohol} class="fast-icon"></img>
            <img src={oil} class="fast-icon"></img>
          </div>
        </div>
      </div>
    );
  }
}
