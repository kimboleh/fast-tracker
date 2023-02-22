import React from 'react';
import './sidebar.css';

export class Sidebar extends React.Component {

  render() {
    return (
        <div id="sidebar" className='light'>
            <div id="title">{this.props.title}</div>
            <div id="dateText">{this.props.dateText}</div>
        </div>
    );
  }
}
