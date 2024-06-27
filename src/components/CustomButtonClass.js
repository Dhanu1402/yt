// src/components/CustomButtonClass.js
import React, { Component } from 'react';

class CustomButtonClass extends Component {
  constructor(props) {
    super(props);
    this.state = { title: 'Button' };
  }

  setTitle = (newTitle) => {
    this.setState({ title: newTitle });
  };

  render() {
    const { onClick, style } = this.props;

    const { title } = this.state;

    return (
      <button
        className={`py-2 px-4 bg-green-500 text-white rounded ${style}`}
        onClick={onClick}
      >
        {title}
      </button>
    );
  }
}

export default CustomButtonClass;
