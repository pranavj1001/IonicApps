var app = angular.module('8ball', ['ionic'])

app.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
});


app.controller('PredictionController', function ($scope, $timeout) {

	var predictionList = [
		"Signs point to yes",
		"Yes",
		"Reply hazy, try again",
		"Without a doubt",
		"My sources say no",
		"As I see it, yes",
		"You may rely on it",
		"Concentrate and ask again",
		"Outlook not so good",
		"It is decidedly so",
		"Better not tell you now",
		"Very doubtful",
		"Yes - definitely",
		"It is certain",
		"Cannot predict now",
		"Most likely",
		"Ask again later",
		"My reply is no",
		"Outlook good",
		"Don't count on it"
	];

	$scope.prediction = "Tap 8ball for an answer";
	$scope.answered = true;

	$scope.doThis = function(){
		$scope.answered = false;
		$scope.prediction = "Thinking";
		$timeout(function(){
			$scope.prediction = "Thinking.";
			//console.log("first");
		},500);
		$timeout(function(){
			$scope.prediction = "Thinking..";
			//console.log("second");
		},1000);
		$timeout(function(){
			$scope.prediction = "Thinking...";
			//console.log("third");
		},1500);
		$timeout(function(){
			$scope.prediction = predictionList[Math.floor(Math.random() * predictionList.length)];
			$scope.answered = true;		
		},2000);
	};

});
