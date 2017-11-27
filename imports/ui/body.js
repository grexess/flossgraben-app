import { Template } from 'meteor/templating';
import moment from 'moment';
import dataTablesBootstrap from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';
dataTablesBootstrap(window, $);

import FlipClock from 'meteor/modweb:flipclock';

import { Tweets } from '../api/tweets.js';
import { Runners } from '../api/runners.js';

import '../api/datatable.js';

import './templates/tweets.html';
import './templates/impressum.html';
import './templates/register.html';
import './templates/links.html';
import './templates/historie.html';
import './templates/fakten.html';
import './templates/footer.html';
import './templates/birthSelection.html';
import './templates/carousel.html';
import './templates/start.html';

import './templates/private/private.js';
import './body.html';

/*
*  Routes
*/
Router.route('/private', {
	template: 'private'
});


Router.route('/verify-email/:token', function () {
	Accounts.verifyEmail(this.params.token, (error) => {
		if (error) {
			Bert.alert(error.reason, 'danger');
		} else {
			Router.go('/private');
			Bert.alert('Email verified! Thanks!', 'success');
		}
	});
  });

Router.route('/', {
	template: 'start'
});

if (Meteor.isServer) {
	
}
/*
*  Client actions
*/
if (Meteor.isClient) {

	//user login
	Template.login.events({
		'submit form': function (event) {
			event.preventDefault();
			var emailVar = event.target.loginEmail.value;
			var passwordVar = event.target.loginPassword.value;
			Meteor.loginWithPassword(emailVar, passwordVar);
		}
	});

	Template.start.helpers({
		runners() {
			return Runners.find({});
		},
		runnersCount: function () {
			return Runners.find().count();
		},
		tweets() {
			return Tweets.find({});
		}
	});

	Template.register.helpers({
		runners() {
			return Runners.find({});
		}
	});

	Template.tweets.helpers({
		tweets() {
			return Tweets.find({});
		}
	});

	Template.links.events({
		//link clicked
		'click .myLink': function (event, instance) {
			event.preventDefault();
		}
	});

	Template.private.helpers({
		tweets() {
			return Tweets.find({});
		},
		runners() {
			return Runners.find({});
		},
		userlist() {
			return Meteor.users.find({});
		}
	});

	Template.private.onCreated(function () {
		$('[data-target="runners"]').addClass("w3-green");
		$('#runners').show();
	});

	Template.private.events({
		'click .navElem': function (event, instance) {
			event.preventDefault();
			instance.$('.prvCntDiv').hide();
			instance.$('.navElem').removeClass("w3-green");
			instance.$(event.currentTarget).addClass("w3-green");
			instance.$('#' + event.currentTarget.dataset.target).show();
		},

		'click .logout': function (event) {
			event.preventDefault();
			Meteor.logout();
		}
	});

	Template.start.events({
		//submit a new runner
		'click #submitBtn': function (event, instance) {

			event.preventDefault();

			if (validateRegisterForm()) {

				const gender = htmlEscape(instance.$('input[name="gender"]:checked').val());
				const birthday = htmlEscape(instance.$('#dob-day :selected').val() + "." + instance.$('#dob-month :selected').val() + "." + instance.$('#dob-year :selected').val());
				const group = htmlEscape(calculateGroup(instance.$('#dob-day :selected').val(), instance.$('#dob-month :selected').val(), instance.$('#dob-year :selected').val(), gender));

				Runners.insert({
					firstName: htmlEscape(instance.$('#firstName').val()),
					lastName: htmlEscape(instance.$('#lastName').val()),
					club: htmlEscape(instance.$('#club').val()),
					gender: gender,
					birthday: birthday,
					group: group,
					createdAt: new Date()
				});
				//update counter fields
				instance.$('#count1').text("(" + Runners.find().count() + ")");
				instance.$('#count2').text(Runners.find().count());
			}
		},

		//submit a new tweet
		'click #submitComment': function (event, instance) {

			validateTweetInput(instance.$('#comment'));
			validateTweetInput(instance.$('#author'));

			if (validateTweetInput(instance.$('#comment')) && validateTweetInput(instance.$('#author'))) {

				Tweets.insert({
					comment: instance.$('#comment').val(),
					author: instance.$('#author').val(),
					createdAt: new Date()
				});

				instance.$('#comment').val("");
				instance.$('#author').val("");
			}
		}
	});

	Template.registerHelper('formatDate', function (date) {
		return moment(date).format('DD.MM.YYYY');
	});

	Meteor.subscribe('runners');
	Meteor.subscribe('tweets');
	Meteor.subscribe('userlist');
}

/* Helper functions */


function validateTweetInput(field) {
	if (field.val().length < 3) {
		field.addClass("errorField");
		field.on('click', function () {
			field.removeClass("errorField");
		});
		return false;
	} else {
		field.removeClass("errorField");
		return true;
	}
}

function calculateGroup(day, month, year, gender) {

	var group = gender;
	var today = new Date();
	var birthday = new Date(year, month - 1, day);
	var differenceInMilisecond = today.valueOf() - birthday.valueOf();
	var year_age = Math.floor(differenceInMilisecond / 31536000000);
	return group + "-" + year_age;
}

function validateRegisterForm() {
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

function htmlEscape(str) {
	return str
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}





