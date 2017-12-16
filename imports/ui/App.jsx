import React, { Component } from 'react';
import Card from './Card.jsx';
import axios from 'axios';

import { withTracker } from 'meteor/react-meteor-data';
 
import { Crypto } from '../api/crypto.js';


// App component - represents the whole app
export class App extends Component {
    renderTasks() {
        return this.props.cc.map((task) => (
            <Card key={task._id} task={task} />
        ));
    }
    render() {
        return (
            <div>
                <h1>Crypto List</h1>
                    <div>
                        <div className="card-deck" style={{ margin: "0 auto"}}>
                            {this.renderTasks()}
                        </div>
                    </div>
            </div>
        );
    }
}

export default withTracker(() => {
  return {
    cc: Crypto.find({}).fetch(),
  };
})(App);