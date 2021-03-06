import './runnersList.html';

import { Runners } from '../../../api/runners.js';

if (Meteor.isClient) {

    Template.runnersList.helpers({
        runners() {
            return Runners.find({});
        }
    });

    Template.runnersList.events({

        'click .evtBtn'(event) {
            event.preventDefault();

            var selId = ($('input[name=nRunner]:checked', '.rTable').val());

            var action = event.currentTarget.dataset.target;

            if (action === "deleteR") {
                if (selId) {
                    Meteor.call('runners.remove', selId);
                    Bert.alert("Runner removed", 'info');
                }
                else {
                    Bert.alert("No Runner selected", 'danger');
                }
            }

            if (action === "changeR") {
                if (selId) {
                    $('#overlay').show();
                    //set the values
                    var record = Runners.find({"_id": selId}).fetch()[0];
                    $('#firstName').val(record.firstName);
                    $('#lastName').val(record.lastName);
                    $('#club').val(record.club);

                    

                    $('#addRunnerForm')[0].reset();
                }
                else {
                    Bert.alert("No Runner selected", 'danger');
                }
            }

            if (action === "createR") {
                $('#overlay').show();
            }

            if (action === "createUser") {
                
				//const gender = Meteor.call('htmlEscape',{str: $('input[name="gender"]:checked').val()}());
				//const birthday = Meteor.call('htmlEscape',{str: $('#dob-day :selected').val() + "." + instance.$('#dob-month :selected').val() + "." + instance.$('#dob-year :selected').val());
				//const group = Meteor.call('htmlEscape',{str:(calculateGroup(instance.$('#dob-day :selected').val(), instance.$('#dob-month :selected').val(), instance.$('#dob-year :selected').val(), gender));

				Runners.insert({
					firstName: htmlEscape($('#firstName').val()),
					lastName: htmlEscape($('#lastName').val()),
					club: htmlEscape($('#club').val()),
				//	gender: gender,
				//	birthday: birthday,
				//	group: group,
					createdAt: new Date()
				});

                $('#overlay').hide();
                $('#addRunnerForm')[0].reset();
                Bert.alert("Runner created", 'info');
            }

            if (action === "cancelCreation") {
                $('#overlay').hide();
                Bert.alert("Action canceled", 'info');
            }

        }
    });
}

function htmlEscape(str) {
	return str
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}
