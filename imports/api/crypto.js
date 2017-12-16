import { Mongo } from 'meteor/mongo';
import axios from 'axios';


export const Crypto = new Mongo.Collection('crypto');
if (Meteor.isServer) 
{
    Crypto.remove({})
            axios.get('https://api.coinmarketcap.com/v1/ticker/')
             .then((response) => {
               console.log(response);
               // this.setState({cryptos: response.data})
                for (var i = 0; i < 10; i++) //The json object has lenght
                {
                    var object = response.data[i]; //You are in the current object
                    Crypto.insert({_id: object["rank"], text: object["name"], price_btc: object["price_btc"], price: object["price_usd"],  });

                }
             })
            .catch((error)=>{
               console.log(error);
            });  
            
}