$(document).ready(function() {
	$("#clock").addClass("animated pulse");
});

var countdown, minCalc, secCalc, masterTimer; 
var timeCalculationNum = 25; // the starting number used to calculate the timer


// +1/-1 time button functions
// add time
function addTime() {
	timeCalculationNum = timeCalculationNum + 1;

	if (timeCalculationNum < 10) {
		document.getElementById("time").innerHTML = '0' + timeCalculationNum.toString() + ":00";
	} else {
		document.getElementById("time").innerHTML = timeCalculationNum.toString() + ":00";
	}

	$("#minute-up").addClass("animated bounceIn").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
		function(e) {
			$(this).removeClass('animated bounceIn');
		}
	);
}

// subtract time
function subtractTime() {
	if (timeCalculationNum === 1) { // if clock was already at 1:00, reset to 25:00
		timeCalculationNum = 25;
		document.getElementById("time").innerHTML = timeCalculationNum.toString() + ":00";
		$("#minute-down").addClass("animated bounceIn").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
			function(e) {
				$(this).removeClass('animated bounceIn');
			}
		);
	} else {
		timeCalculationNum = timeCalculationNum - 1;

		if (timeCalculationNum < 10) {
		document.getElementById("time").innerHTML = '0' + timeCalculationNum.toString() + ":00";
	} else {
		document.getElementById("time").innerHTML = timeCalculationNum.toString() + ":00";
		}

		$("#minute-down").addClass("animated bounceIn").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
			function(e) {
				$(this).removeClass('animated bounceIn');
			}
		);
	}
}

// timer function using the system clock for accuracy, working from http://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer

function masterTimer(duration, display) {
    var start = Date.now(), diff, minutes, seconds;
    function timer() {
        // get the number of seconds that have elapsed  
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // calculate minutes and seconds
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;
				
				// if timer ends, run success function
				if (minutes === 0 && seconds === 0) {
					success();
				}			

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds; 
			
        if (diff <= 0) {
            start = Date.now() + 1000;
        }
    };
    // run timer once to avoid setInterval delay, then run in setInterval
    timer();
    countdown = setInterval(timer, 1000);
}

// start clock button action
function startClock() {
	var timeConversion = 60 * timeCalculationNum, display = document.querySelector('#time');
  masterTimer(timeConversion, display);

	// change background and title	
	document.body.style.background = "#009631 url('http://www.mikemorkes.com/codepen/pomodoro/green_tomato.jpg') no-repeat center top";
	document.getElementById("title").innerHTML = "Get to work!";

	// remove zoom class so we can reuse it later
	$(document).ready(function() {
		$("#clock").removeClass("animated pulse");
	});

	// show stop button, hide start button	
	document.getElementById("start").style.display = "none";
	document.getElementById("stop").style.display = "block";
}

// stop clock button action
function stopClock() {

	// stop countdown
	clearInterval(countdown);

	// change background and title
	document.body.style.background = "#810000 url('http://www.mikemorkes.com/codepen/pomodoro/red_tomato.jpg') no-repeat center top";
	document.getElementById("title").innerHTML = "Well? We're waiting!";

	// show reset button, hide stop button
	document.getElementById("stop").style.display = "none";
	document.getElementById("reset").style.display = "block";
}


// reset clock button action
function resetClock() {
	// reset time and clock face
	timeCalculationNum = 25;
	document.getElementById("title").innerHTML = "Toe&#8209;may&#8209;toe, Toe&#8209;mah&#8209;toe";
	document.getElementById("time").innerHTML = "25:00";

	// change background	
	document.body.style.background = "#810000 url('http://www.mikemorkes.com/codepen/pomodoro/red_tomato.jpg') no-repeat center top";

	// show start button, hide reset button
	document.getElementById("start").style.display = "block";
	document.getElementById("reset").style.display = "none";
}

// success
function success() {
		clearInterval(countdown);
		// reset timeCalculationNum, change title and background
		timeCalculationNum = 25;
		
		document.getElementById("title").innerHTML = "Take a break, you've earned it!";
		document.body.style.background = "#0051ad url('http://www.mikemorkes.com/codepen/pomodoro/beach_bkgd.jpg') no-repeat center top";
		document.getElementById("time").innerHTML = "00:00";

		// show reset button, hide stop button
		document.getElementById("stop").style.display = "none";
		document.getElementById("reset").style.display = "block";

		// zoom in the clock for some whiz bang
		$(document).ready(function() {
			$("#clock").addClass("animated pulse");
		});
	
		// Play audio
		var audio = new Audio('http://www.mikemorkes.com/codepen/pomodoro/squish.mp3');
		audio.play();	
}