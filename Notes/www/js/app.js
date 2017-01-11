// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

(function(){

var app = angular.module('notesApp', ['ionic'])

app.controller('ListCtrl', function($scope){

  $scope.notesText = [
    {
      title: 'Hey There!',
      description: 'Testing out the notesText array, Hope you guys have a great day'
    },
    {
      title: 'Hey There! Again',
      description: 'Testing out the notesText array again, Hope you guys have a great day'
    }
  ];

});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider){

  $stateProvider.state('list',{
    url: '/list',
    templateUrl: 'templates/list.html'
  });

  $stateProvider.state('edit',{
    url: '/edit',
    templateUrl: 'templates/edit.html'
  });

  $urlRouterProvider.otherwise('/list');

});

})();
