import React, { Component } from 'react';
import Card from './Card.jsx';
import axios from 'axios';

import { withTracker } from 'meteor/react-meteor-data';
 
import { Crypto } from '../api/crypto.js';


// App component - represents the whole app
export class App extends Component {
    /*
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
    */
    renderTasks() {
        return this.props.cc.map((task) => (
            <Card key={task._id} task={task} />
        ));
    }
    render() {
        return (
            <div className="container">
        <header>
          <h1>Crypto List</h1>
        </header>
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
        );
    }
}

export default withTracker(() => {
  return {
    cc: Crypto.find({}).fetch(),
  };
})(App);