import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
});

Template.body.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  },
});

Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    Meteor.call('tasks.insert', text);

    // Clear form
    target.text.value = '';
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
});



$(document).ready(function () {
    
        registerTopLevelClick();
        //registerSecondLevelClick();
        countDown();
        $(".content").html($("#Home-Content").html());
        //set Home to active node
        var home = $('.click')[0];
        $(home).addClass("active1");
    });
    
    function registerTopLevelClick() {
    
        $('.click').click(function () {
            $('.click').removeClass("active1");
            $(this).addClass("active1");
            // replace the contents of the div with the link text
            var secondNavElem = $("#" + $(this).text() + "-SecondNav");
            var subNavElements = secondNavElem.find("[data-target]");
            if (subNavElements.length > 0) {
                var subContent = subNavElements[0].dataset.target;
                $(".content").html($("#" + subContent).html());
                $(subNavElements[0]).parent().addClass("active1")
                $(".secondNav").html(secondNavElem.html());
                registerSecondLevelClick();
            } else {
                $(".content").html($("#" + $(this).text() + "-Content").html());
                $(".secondNav").html("");
            };
            // cancel the default action of the link by returning false
            return false;
        });
    }
    
    function registerSecondLevelClick() {
    
        $('.clickSecNav').click(function () {
    
            $(".clickSecNav").removeClass("secondNavListActive").addClass("secondNavListInactive"); ;
            $(this).removeClass("secondNavListInactive").addClass("secondNavListActive");
            $(".content").html($("#" + this.dataset.target).html());
    
            //exception for pciture right
            if (this.dataset.target == "2018-Strecke") {
                $(".right").html('<img src="https://my.flossgraben.run/images/runner.png" />')
            } else {
                $(".right").html("");
            }
            // cancel the default action of the link by returning false
            return false;
        });
    }
    
    function myFunction() {
    
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }
    
    function countDown() {
        // Set the date we're counting down to
        var startDate = "Jan 5, 2018 15:37:25";
        var countDownDate = new Date(startDate).getTime();
    
        // Update the count down every 1 second
        var x = setInterval(function () {
    
                // Get todays date and time
                var now = new Date().getTime();
    
                // Find the distance between now an the count down date
                var distance = countDownDate - now;
    
                // Time calculations for days, hours, minutes and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
                // Display the result in the element with id="2018"
                document.getElementById("countdown").innerHTML = "Noch <b>" + days + "  </b>Tage <b>" + hours + "</b> Stunden <b>" + minutes + "</b> Minuten <b>" + seconds + "</b> Sekunden bis zum Start am  " + startDate + "!";
    
                // If the count down is finished, write some text
                if (distance < 0) {
                    clearInterval(x);
                    document.getElementById("countdown").innerHTML = "EXPIRED";
                }
            }, 1000);
    }
    
 