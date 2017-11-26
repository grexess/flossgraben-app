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
                Meteor.call('runners.remove', selId);
                Bert.alert("Runner removed", 'info');
            }

            if (action === "changeR") {
                $('#overlay').show();
                Bert.alert("Runner changed", 'info');
            }

            if (action === "createR") {

                Bert.alert("Runner created", 'info');
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