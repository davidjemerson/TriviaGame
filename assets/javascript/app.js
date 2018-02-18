var questionList = ["1. Which actor played the Tenth Doctor?",
					"2. Which actor played the Ninth Doctor?",
					"3. Who was the 'Bad Wolf?'",
					"4. Which planet is the home of the Time Lords?",
					"5. How many regenerations does a Time Lord get?",
					"6. Who is the 'Impossible Girl'?",
					"7. Which of these is not an enemy of The Doctor?",
					"8. Who played the 'War Doctor'?",
					"9. The Doctor's spaceship is a _________.",
					"10. What does TARDIS stand for?"];

var answerList = [	["Christopher Eccleston", "David Tennant", "Tom Baker", "Nicolas Cage"],
					["Matt Smith", "Tom Baker", "Christopher Eccleston", "Roger Stevens"],
					["Rose Tyler", "Martha Jones", "Donna Noble", "Captain Jack Harkness"],
					["Earth", "Gallifrey", "Judoon", "Mercury"],
					["10", "3", "27", "12"],
					["Clara Oswald", "Donna Noble", "Martha Jones", "Amy Pond"],
					["Cybermen", "The Ood", "Daleks", "The Master"],
					["Elton John", "John Hurt", "Benedict Cumberbatch", "Martin Freeman"],
					["TARDUS", "STARDUS", "STARDIS", "TARDIS"],
					["Time Always Reaches Dominant Intelligent Snakes", "Trace and Record Doctors in Space", "Time and Relative Dimension in Space", "Nothing, it's just a made up word"]];

var correctAnswers = ["David Tennant", "Christopher Eccleston", "Rose Tyler", "Gallifrey", "12", "Clara Oswald", "The Ood", "John Hurt", "TARDIS", "Time and Relative Dimension in Space"];

var currentQuestion = 0;
var questionTimer = 30;
var counter = 0;
var numberCorrect = 0;
var numberWrong = 0;
var timeOutCount = 0;

function gameOver() {
	$("#question").text("Game Over. Here's how you did:");
	$("#answers").append("<p>Number Right: "+numberCorrect+"</p>");
	$("#answers").append("<p>Number Wrong: "+numberWrong+"</p>");
	$("#answers").append("<p>Didn't Answer: "+timeOutCount+"</p>");
}

function nextQuestion() {
	if (currentQuestion < questionList.length-1) {
		currentQuestion++;
		questionTimer = 30;
		loadQuestion();
	}
	else {
		gameOver();
	}
}

function correctAnswer() {
	$("#question").text("That's right!");
	$("#answers").empty();
	clearInterval(counter);
	setTimeout(nextQuestion, 3000);
}

function incorrectAnswer() {
	$("#question").text("Nope. The correct answer was: "+correctAnswers[currentQuestion]);
	$("#answers").empty();
	clearInterval(counter);
	setTimeout(nextQuestion, 3000);
}

function checkAnswer() {
	if ($(this).text() === correctAnswers[currentQuestion]) {
		numberCorrect++;
		correctAnswer();
	}
	else {
		numberWrong++;
		incorrectAnswer();
	}
}

function timesUp() {
	$("#question").text("Time's Up! The correct answer was: "+correctAnswers[currentQuestion]);
	$("#answers").empty();
	timeOutCount++;
	clearInterval(counter);
	setTimeout(nextQuestion, 3000);
}

function startCounting() {
	$(".answer-button").click(checkAnswer);
	counter = setInterval(countdown, 1000);
	function countdown() {
		if (questionTimer > 0) {
			questionTimer--;
		}
		else {
			clearInterval(counter);
			timesUp();
		}
		$("#questionTimer").text(questionTimer);
	}
};

function loadQuestion() {
	$("#question").text(questionList[currentQuestion]);
	$("#answers").empty();
	var answer1 = $("<button>").text(answerList[currentQuestion][0]).addClass("answer-button");
	var answer2 = $("<button>").text(answerList[currentQuestion][1]).addClass("answer-button");
	var answer3 = $("<button>").text(answerList[currentQuestion][2]).addClass("answer-button");
	var answer4 = $("<button>").text(answerList[currentQuestion][3]).addClass("answer-button");
	$("#answers").append(answer1).append(answer2).append(answer3).append(answer4);
	startCounting();
};

function startScreen() {
	$("#question").text("Doctor Who Trivia! Press Start to begin");
	var startButton = $("<button>").text("Start").addClass("start-button");
	$("#answers").append(startButton);
}

startScreen();
$(".start-button").click(loadQuestion);
