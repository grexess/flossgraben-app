import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Tweets = new Mongo.Collection('tweets');

if (Meteor.isServer) {
    Meteor.publish('tweets', function () {
        return Tweets.find({});
    });
}