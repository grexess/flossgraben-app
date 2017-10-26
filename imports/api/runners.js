import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Runners = new Mongo.Collection('runners');

/*
if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('runners', function runnersPublication() {
      return Runners.find({});
    });
  }
*/