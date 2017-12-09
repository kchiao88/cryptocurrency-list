import React, { Component } from 'react';
import Card from './Card.jsx';
import axios from 'axios';
// App component - represents the whole app
export default class App extends Component {
      constructor(props){
        super(props);
        this.state = { cryptos: "Loading" };
        this.componentWillMount = this.componentWillMount.bind(this);
      }
    componentWillMount()
    {
            axios.get('https://api.coinmarketcap.com/v1/ticker/')
             .then((response) => {
               console.log(response);
               this.setState({cryptos: response.data})
             })
            .catch((error)=>{
               console.log(error);
            });       
    }
    getTasks() {
        return [
            { _id: 1, text: this.state.cryptos[0]["id"], price: this.state.cryptos[0]["price_usd"], price_btc: 1},

            { _id: 2, text: this.state.cryptos[1]["id"], price: this.state.cryptos[1]["price_usd"], price_btc: this.state.cryptos[1]["price_btc"] },

            { _id: 3, text: this.state.cryptos[2]["id"], price: this.state.cryptos[2]["price_usd"], price_btc: this.state.cryptos[2]["price_btc"] },
        ];
    }
    renderTasks() {
        return this.getTasks().map((task) => (
            <Card key={task._id} task={task} />
        ));
    }
    render() {
        return (
            <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
        );
    }
}
