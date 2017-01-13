// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

//anonymous function
(function(){

var app = angular.module('notesApp', ['ionic']);

app.config(function($stateProvider, $urlRouterProvider){

  //the state for the list view
  $stateProvider.state('list',{
    url: '/list',
    templateUrl: 'templates/list.html'
  });

  //the state for the edit view
  $stateProvider.state('edit',{
    url: '/edit/:noteId',
    templateUrl: 'templates/edit.html',
    //change the controller
    controller: 'EditCtrl'
  });

  //the state for the add view
  $stateProvider.state('add',{
    url: '/add',
    templateUrl: 'templates/edit.html',
    //change the controller
    controller: 'AddCtrl'
  });
 
  //the default state of the application is the list view
  $urlRouterProvider.otherwise('/list');

});

//the notes array
var notesText = [];

//function to get text from the notesText array
//takes the note Id as a parameter
function getText(noteId){
  for(var i = 0; i < notesText.length; i++){
    if(notesText[i].id == noteId){
      return notesText[i];
    }
  }
  return undefined;
}

//function to make changes in the notesText array
//takes the note object
function updateText(note){
  for(var i = 0; i < notesText.length; i++){
    if(notesText[i].id == note.id){
      notesText[i] = note;
    }
  }
}

//function to add a Note
//takes the note object
function createNote(note){
  notesText.push(note);
}

//the controller for the List view
//used to display the data from notesText
app.controller('ListCtrl', function($scope){

  //creates an object notesText for this scope
  $scope.notesText = notesText;
  //console.log(notesText);

});

//the controller for the Edit view
app.controller('EditCtrl', function($scope, $state){

  //creates an object note for this scope
  //it is created with the help of note id from the url
  $scope.note = angular.copy(getText($state.params.noteId));

  //when the save button is presseds
  $scope.saveText = function(){
    updateText($scope.note);
    //go back to the list state
    $state.go('list');
  };

});

//the controller for the add view
app.controller('AddCtrl', function($scope, $state){

  $scope.note = {
    id: new Date().getTime().toString(),
    title: '',
    description: ''
  };

  //when the save button is presseds
  $scope.saveText = function(){
    createNote($scope.note);
    //go back to the list state
    $state.go('list');
  };

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

})();
