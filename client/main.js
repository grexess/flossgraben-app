import '../imports/ui/body.js';

$(document).ready(function () {
		countDown();
		
		$('.owl-carousel').owlCarousel({
			loop: true,
			lazyLoad: true,
			margin: 10,
			autoplay:true,
			autoplayTimeout:1000,
			autoplayHoverPause:true,
			items: 2,
			dots: false,
		});

  });


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
