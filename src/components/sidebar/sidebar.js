import React from 'react';
import './sidebar.css';

export class Sidebar extends React.Component {

  render() {
    return (
        <div id="sidebar">
            <div id="title">{this.props.title}</div>
            <div id="dateText">{this.props.dateText}</div>
        </div>
    );
  }
}
