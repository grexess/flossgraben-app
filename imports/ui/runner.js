import { Template } from 'meteor/templating';
 
import { Runners } from '../api/runners.js';
 
import './runner.html';

/*
Template.runner.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Runners.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
    Runners.remove(this._id);
  },
});
*/