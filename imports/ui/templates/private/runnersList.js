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
                    Bert.alert("Runner changed", 'info');
                }
                else {
                    Bert.alert("No Runner selected", 'danger');
                }
            }

            if (action === "createR") {
                $('#overlay').show();
                Bert.alert("Runner created", 'info');
            }

            if (action === "cancelR") {
                $('#overlay').hide();
                Bert.alert("Action canceled", 'info');
            }

            /*
            instance.$('.prvCntDiv').hide();
            instance.$('.navElem').removeClass("w3-green");
            instance.$(event.currentTarget).addClass("w3-green");
            instance.$('#' + event.currentTarget.dataset.target).show();
            */
        }
    });
}