angular.module('notesApp.noteStore', [])
.factory('NoteStore', function(){

  //the notes array
  var notesText = angular.fromJson(window.localStorage['notesText'] || '[]');

  //HTML 5 api 'localStorage'
  //works with desktop and mobile
  function save(){
  	window.localStorage['notesText'] = angular.toJson(notesText); 
  }

  return{
    list: function(){
      return notesText;
    },
    //function to get text from the notesText array
    //takes the note Id as a parameter
    get: function(noteId){
      for(var i = 0; i < notesText.length; i++){
        if(notesText[i].id == noteId){
          return notesText[i];
        }
      }
      return undefined;
    },
    //function to add a Note
    //takes the note object
    add: function(note){
      notesText.push(note);
      save();
    },
    //function to make changes in the notesText array
    //takes the note object
    update: function(note){
      for(var i = 0; i < notesText.length; i++){
        if(notesText[i].id == note.id){
          notesText[i] = note;
        }
      }
      save();
    },
    delete: function(noteId){
      for(var i = 0; i < notesText.length; i++){
        if(notesText[i].id == noteId){
          notesText.splice(i,1);
          save();
        }
      }	
    },
    moveNote: function(note, fromIndex, toIndex){
    	notesText.splice(fromIndex, 1);
    	notesText.splice(toIndex, 0, note);
    	save();
    }
  };

});