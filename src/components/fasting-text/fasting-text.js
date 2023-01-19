import React from 'react';

export class FastingText extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <h1>What can Austin & Kimberly eat?</h1>
      <p>Austin and Kimberly are participating in the {this.props.fast} right now, {this.props.fastDetails}.
      </p>
      </div>
    );
  }
}
