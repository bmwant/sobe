import React, { Component } from 'react';

var QuestionBox = React.createClass({
  render: function() {
    return (
      <div className="questionBox">
        Hello, I'm question container
        <h2>
          {this.props.question}
        </h2>
        <a className="button is-success">Holly true</a>
        <a className="button is-danger">Not a chance</a>
      </div>
      )
  }
});

export default QuestionBox;