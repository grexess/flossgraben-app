import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Tweets = new Mongo.Collection('tweets');

if (Meteor.isServer) {

    console.log(Tweets.find({}).fetch());

    Meteor.publish('tweets', function () {
        return Tweets.find({});
    });
}