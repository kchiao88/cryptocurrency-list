import { Mongo } from 'meteor/mongo';
import axios from 'axios';


export const Crypto = new Mongo.Collection('crypto');
if (Meteor.isServer) 
{
            axios.get('https://api.coinmarketcap.com/v1/ticker/')
             .then((response) => {
               console.log(response);
               // this.setState({cryptos: response.data})
             })
            .catch((error)=>{
               console.log(error);
            });  
            
}