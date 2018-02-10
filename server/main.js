import { Meteor } from 'meteor/meteor';
import '../imports/api/crypto.js';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';

import { Favorites } from '../imports/api/favorites.js' 
// import '../imports/startup/accountsConfig.js';

Meteor.startup(() => {
  // code to run on server at startup
    Meteor.methods({
      'favorites.insert'(coin) 
      {
        //check(coin, String);
     
        // Make sure the user is logged in before inserting a task
        /*
        if (! this.userId) {
          throw new Meteor.Error('not-authorized');
        }
        */
        
        console.log("server: ", coin, Meteor.user().emails[0].address);
        const objectarray = Favorites.find({author:Meteor.user().emails[0].address}).fetch();
        console.log(objectarray);
        let coinchecker = true;
        for (let key in objectarray)
        {
          let obj = objectarray[key];
          if(obj["coin"] === coin)
          {
              coinchecker = false;
          }
        }
        
        if(coinchecker)
        {
            Favorites.insert({
              coin,
              author: Meteor.user().emails[0].address
            }); 
        }
      },
      'favorites.remove'(coin) 
      {
          Favorites.remove({
              coin,
              author: Meteor.user().emails[0].address
            });          
      }
    });
});

