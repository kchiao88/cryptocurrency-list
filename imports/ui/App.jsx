import React, { Component } from 'react';
import Card from './Card.jsx';
import axios from 'axios';

import { withTracker } from 'meteor/react-meteor-data';
 
import { Crypto } from '../api/crypto.js';
import { Favorites } from '../api/favorites.js';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';


// App component - represents the whole app
export class App extends Component {
    
     constructor(props) {
        super(props);
        this.state = {cryptos: "",
            favCryptos: ""
        };
      }
    componentWillMount()
    {
            axios.get('https://api.coinmarketcap.com/v1/ticker/')
             .then((response) => {
               this.setState({cryptos: response.data})
             })
            .catch((error)=>{
               console.log(error);
            });              
    }
    componentDidMount()
    {
        var elem = document.getElementById("skeleton-loading");
        elem.remove();
    }
    renderCoins() {
        return this.props.cc.map((coin) => (
            <Card key={coin._id} task={coin} loggedIn={ !this.props.currentUser } fav={ false }/>
        ));
    }
    renderCoinsFav()
    {
        
        //console.log(this.props.fcc);
        let list_of_coins_I_fav = []
        for(let coin in this.props.fcc)
        {
            list_of_coins_I_fav.push(this.props.fcc[coin]["coin"]);
        }
        coins = this.props.cc.map(function(coin, i)
        {
            if(list_of_coins_I_fav.includes(coin.text))
            {
                return <Card key={coin._id} task={coin} theme={true} loggedIn={ true } fav={ true }/>
            }
        })
        
        return coins
    }
    render() {
        return (
            <div>
                <AccountsUIWrapper />
                <h1 style={{ textAlign: "center" }}>Crypto List</h1>
                    <div>
                        <div className="card-deck" style={{ margin: "0 auto"}}>
                            {this.state.cryptos !== this.props.cc ? this.renderCoins() : this.state.cryptos }
                        </div>
                    </div>
                    
                    <div hidden={ !this.props.currentUser }>
                         <h3 style={{ textAlign: "center" }}>Favorites</h3>
                         <div className="card-deck" style={{ margin: "0 auto"}}>
                            { this.renderCoinsFav() }
                        </div>                           
                    </div>
                    }
            </div>
        );
    }
}

export default withTracker(() => {
      return {
        cc: Crypto.find({}).fetch(),
        fcc: Favorites.find({ author: Meteor.user().emails[0].address }).fetch() || {},
        currentUser: Meteor.user()
      };

})(App);