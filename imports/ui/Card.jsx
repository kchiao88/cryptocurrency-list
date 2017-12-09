import React, { Component } from 'react';

export default class Card extends Component {
  render() {
    return (
    <div className="card text-white bg-dark mb-3" style={{ maxWidth: "20%"}}>
      <div className="card-header">Price of bitcoin: { this.props.task.price_btc }</div>
      <div className="card-body">
        <h4 className="card-title">{this.props.task.text}</h4>
        <p className="card-text">${this.props.task.price}</p>
      </div>
    </div>
    );
  }
}

