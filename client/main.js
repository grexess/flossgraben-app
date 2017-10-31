import '../imports/ui/body.js';

$(document).ready(function () {
		countDown();
		
	$(".ss-icon-left").click(function(){galleryspin("-");});
	$(".ss-icon-right").click(function(){galleryspin();});
	window.setInterval(galleryspin, 3000);

  });
/*
Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
*/

function countDown() {
	// Set the date we're counting down to
	var startDate = "Jan 27, 2018 13:30:00";
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

	//carousel
	var angle = 0;
	function galleryspin(sign) { 
	spinner = document.querySelector("#spinner");
	if (!sign) { angle = angle + 45; } else { angle = angle - 45; }
	spinner.setAttribute("style","-webkit-transform: rotateY("+ angle +"deg); -moz-transform: rotateY("+ angle +"deg); transform: rotateY("+ angle +"deg);");
	}