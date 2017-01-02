var app = angular.module('soundboard', ['ionic']);

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

app.controller('SoundBoardCtrl', function ($scope, $window) {

	$scope.media = null;

	$scope.model = {
		showDelete: false,
		showMove: false,
		sounds: [
			{
				'title': 'Cow',
				'image': 'img/animals/cow-icon.png',
				'desc': 'Mooo',
				'file': '/sounds/cow.mp3'
			},
			{
				'title': 'Dolphin',
				'image': 'img/animals/dolphin-icon.png',
				'desc': 'Whistle',
				'file': '/sounds/dolphin.mp3'
			},
			{
				'title': 'Frog',
				'image': 'img/animals/frog-icon.png',
				'desc': 'Croak',
				'file': '/sounds/frog.mp3'
			},
			{
				'title': 'Bird',
				'image': 'img/animals/bird-icon.png',
				'desc': 'Chirp',
				'file': '/sounds/bird.mp3'
			},
			{
				'title': 'Pig',
				'image': 'img/animals/pig-icon.png',
				'desc': 'Oink',
				'file': '/sounds/pig.mp3'
			},
			{
				'title': 'Dog',
				'image': 'img/animals/puppy-icon.png',
				'desc': 'Bark',
				'file': '/sounds/dog.mp3'
			},
			{
				'title': 'Cat',
				'image': 'img/animals/black-cat-icon.png',
				'desc': 'Meow',
				'file': '/sounds/cat.mp3'
			}
		]
	};

	$scope.play = function (sound) {

		//if previously any sound file was being played 
		if($scope.media){
			$scope.media.pause();
		}

		if($window.cordova){//if the app is run in mobile phones
			console.log("Play called on device");
			ionic.Platform.ready(function(){

				var src = sound.file;
				if(ionic.Platform.is('android')){
					src = '/android_asset/www' + src;
					console.log("Reached here 1");
				}

				$scope.media = new $window.Media(src);
				$scope.media.play();
			});
		}else{//if the app is run in browser
			//set a new object for Audio
			$scope.media = new Audio();
			//location of the file
			$scope.media.src = sound.file;
			//load and play the file
			$scope.media.load();
			$scope.media.play();
		}

	};
});

