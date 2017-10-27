import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import dataTablesBootstrap from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';
dataTablesBootstrap(window, $);

import { Runners } from '../api/runners.js';
import { Tweets } from '../api/tweets.js';

import '../api/dataTable.js';

import './runner.js';
import './birthSelection.js';
import './body.html';


function calculateGroup(day, month, year, gender) {

	var group = gender;
	var today = new Date();
	var birthday = new Date(year, month - 1, day);
	var differenceInMilisecond = today.valueOf() - birthday.valueOf();
	var year_age = Math.floor(differenceInMilisecond / 31536000000);
	return group + "-" + year_age;
}

Template.body.onCreated(function bodyOnCreated() {
});

Template.body.events({

	//submit a new runner
	'click #submitBtn': function (event, instance) {

		event.preventDefault();

		if (validateForm()) {

			const gender = instance.$('input[name="gender"]:checked').val();
			const birthday = instance.$('#dob-day :selected').val() + "." + instance.$('#dob-month :selected').val() + "." + instance.$('#dob-year :selected').val();
			const group = calculateGroup(instance.$('#dob-day :selected').val(), instance.$('#dob-month :selected').val(), instance.$('#dob-year :selected').val(), gender);

			Runners.insert({
				firstName: instance.$('#firstName').val(),
				lastName: instance.$('#lastName').val(),
				club: instance.$('#club').val(),
				gender: gender,
				birthday: birthday,
				group: group
			});
			//update counter fields
			instance.$('#count1').text("(" + Runners.find().count() + ")");
			instance.$('#count2').text(Runners.find().count());
		}
	},

	//submit a new tweet
	'click #submitComment': function (event, instance) {

		Tweets.insert({
			comment: instance.$('#comment').val(),
			author: instance.$('#author').val()
		});

		instance.$('#comment').val("");
		instance.$('#author').val("");
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
		return Runners.find().count();
	}
});

Template.myFrame.onRendered(function(){
	
	   this.autorun(function(){
		 Template.currentData();
	   });
	
	});

Template.myFrame.helpers({
	tweets() {
		return Tweets.find({});
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

});

function validateForm() {
	isOkay = true;

	if ($('#firstName').val().length < 3) {
		isOkay = false;
		$('#firstName').addClass("errorField");
		$('#firstName').on('click', function () {
			$('#firstName').removeClass("errorField");
		});
	} else {
		$('#firstName').removeClass("errorField");
	}
	if ($('#lastName').val().length < 3) {
		isOkay = false;
		$('#lastName').addClass("errorField");
		$('#lastName').on('click', function () {
			$('#lastName').removeClass("errorField");
		});
	} else {
		$('#lastName').removeClass("errorField");
	}


	if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($('#eMail').val()))) {
		isOkay = false;
		$('#eMail').addClass("errorField");
		$('#eMail').on('click', function () {
			$('#eMail').removeClass("errorField");
		});
	} else {
		$('#eMail').removeClass("errorField");
	}
	if ($('input[name=gender]:checked').length === 0) {
		isOkay = false;
		$('#gender').addClass("errorField");
		$('#gender').on('click', function () {
			$('#gender').removeClass("errorField");
		});
	} else {
		$('#gender').removeClass("errorField");
	}
	if ($('#dob-day :selected').val() === "") {
		isOkay = false;
		$('#dob-day').addClass("errorField");
		$('#dob-day').on('focus', function () {
			$('#dob-day').removeClass("errorField");
			$(this).blur();
			return false;
		});
	} else {
		$('#dob-day').removeClass("errorField");
	}
	if ($('#dob-month :selected').val() === "") {
		isOkay = false;
		$('#dob-month').addClass("errorField");
		$('#dob-month').on('focus', function () {
			$('#dob-month').removeClass("errorField");
			$(this).blur();
			return false;
		});
	} else {
		$('#dob-month').removeClass("errorField");
	}
	if ($('#dob-year :selected').val() === "") {
		isOkay = false;
		$('#dob-year').addClass("errorField");
		$('#dob-year').on('focus', function () {
			$('#dob-year').removeClass("errorField");
			$(this).blur();
			return false;
		});
	} else {
		$('#dob-year').removeClass("errorField");
	}

	return isOkay;
}
