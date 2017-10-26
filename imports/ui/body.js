import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Runners } from '../api/runners.js';

import './runner.js';
import './birthSelection.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
});

Template.body.events({

	//submit a new runner
	'click #submitBtn': function (event, instance) {
		event.preventDefault();

		const birthday = instance.$('#dob-day :selected').text() + "." + instance.$('#dob-year :selected').text() + "." + instance.$('#dob-year :selected').text();

		Runners.insert({
			firstName: instance.$('#firstName').val(),
			lastName: instance.$('#lastName').val(),
			club: instance.$('#club').val(),
			gender: instance.$('input[name="gender"]:checked').val(),
			birthday: birthday
		});
	}
});

Template.thisYear.onCreated(function bodyOnCreated() {
	Meteor.subscribe('runners');
});

Template.body.helpers({
	runners() {
		return Runners.find({});

},
runnersCount: function () {
	return Runners.find().count()
}
});

Template.thisYear.helpers({
	runners() {
			return Runners.find({});

	},
	runnersCount: function () {
		return Runners.find().count()
	}
});

Template.registerform.events({

	'submit .addRunnerForm': function (event) {
		// Prevent default browser form submit
		event.preventDefault();

		// Get value from form element
		//var name = event.target.textbox1.value;

		alert('name');
	},

	'click': function (event, templ) {

		event.preventDefault();
		alert('Click');
	}
	/*

	'submit #addRunnerForm'(event) {
		// Prevent default browser form submit
		event.preventDefault();
		debugger;
		// Get value from form element
		const target = event.target;
		const text = target.text.value;
		/*
		   // Insert a task into the collection
		   Tasks.insert({
			 text,
			 createdAt: new Date(), // current time
		   });
	    
		   // Clear form
		   target.text.value = ''; */

});