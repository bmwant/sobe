import React, { Component } from 'react';

var InfoBox = React.createClass({
  render: function() {
    return (
      <div className="infoBox tile is-ancestor">
        <div className="tile is-parent">
            <article className="tile is-child notification is-info">
              <p className="title">{this.props.info}</p>
              <p className="subtitle">With an image</p>
              <figure className="image is-4by3">
                <img src="http://placehold.it/640x480" />
              </figure>
            </article>
          </div>
      </div>
    )
  }
});

export default InfoBox;