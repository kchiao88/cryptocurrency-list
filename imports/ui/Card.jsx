import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Favorites } from '../api/crypto.js';
import Skeleton from 'react-loading-skeleton';

export default class Card extends Component {
  favoriteThisCoin(thecoin)
  {
      console.log("=>", thecoin);
      Meteor.call('favorites.insert', thecoin);
  }
  unfavoritecoin(thecoin)
  {
    Meteor.call('favorites.remove', thecoin);
  }
  render() {
      const theme = this.props.theme;
    return (
    <div className={ this.props.theme ? "card text-white bg-dark mb-3" : "card text-black bg-light mb-3"} style={{ minWidth: "250px"}} >
      <div className="card-header">Price of bitcoin: { this.props.task.price_btc  || <Skeleton/>}
      </div>
      <div className="card-body">
        <h4 className="card-title">{this.props.task.text || <Skeleton/>}</h4>
        <p className="card-text">${this.props.task.price || <Skeleton/>}</p>
        <button hidden={ theme || this.props.loggedIn } className="btn btn-danger" onClick={() => this.favoriteThisCoin(this.props.task.text) }>Favorite this please </button>
        <button hidden={ !this.props.fav } className="btn btn-success" onClick={() => this.unfavoritecoin(this.props.task.text) }>Unfavorite this please </button>
      </div>
    </div>
    );
  }
}

