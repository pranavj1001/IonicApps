angular.module('starter.controllers', [])

.controller('SearchCtrl', [ '$scope', '$ionicGesture', '$state', '$ionicLoading', 'SongDataService', function($scope, $ionicGesture, $state, $ionicLoading, SongDataService) {
    
    $scope.checkToSeeIfDataIsEntered = 0;
    $scope.results = "";
    
    $scope.hideHeader = function() {
        console.log("Hide");
        $( ".tabs" ).slideUp( 200, function() {
           $( ".bar" ).slideUp(200); 
        });
    }
    
    $scope.showHeader = function() {
        console.log("Show");
        $( ".bar" ).slideDown( 200, function() {
           $( ".tabs" ).slideDown(200); 
        });
    }
    
    $scope.goLeft = function(){
        console.log("Left");
        //$(".view-container").hide('slide',{direction:'right'},200);
        $state.go("tab.player");
    }
    
    $scope.searchString = function(searchString){
        console.log(searchString);
        
        if(searchString != ""){
            $scope.check = 1;
            
            //create a promise to get search cites
            var promise = SongDataService.getSongSuggestion(searchString);

            $ionicLoading.show({template: 'Loading Suggestions...'});
                
            //if promise is completed then do this
            promise.then(function(data){
                console.log(data);
                if(data != undefined || searchString != ""){
                    $scope.results = data;
                    if(searchString == ""){
                        $scope.results = "";
                    }
                    $ionicLoading.hide();
                }
//                if(data == undefined){
//                    location.reload();
//                }
            });
        }else{
            $scope.results = "";
            $scope.check = 0;
        }
        
    }
    
    $scope.selectResult = function(result){
        
        console.log(result);
        
    }
    
}])

.controller('PlayerCtrl', [ '$scope', '$ionicGesture', '$state', function($scope, $ionicGesture, $state) {
    
    $scope.hideHeader = function() {
        console.log("Hide");
        $( ".tabs" ).slideUp( 200, function() {
           $( ".bar" ).slideUp(200); 
        });
    }
    
    $scope.showHeader = function() {
        console.log("Show");
        $( ".bar" ).slideDown( 200, function() {
           $( ".tabs" ).slideDown(200); 
        });
    }
    
    $scope.goLeft = function(){
        console.log("Left");
        $state.go("tab.aboutme");
    }
    
    $scope.goRight = function(){
        console.log("Right");
        $state.go("tab.search");
    }
    
}])

.controller('AboutMeCtrl', [ '$scope', '$ionicGesture', '$state', function($scope, $ionicGesture, $state) {
    
    $scope.hideHeader = function() {
        console.log("Hide");
        $( ".tabs" ).slideUp( 200, function() {
           $( ".bar" ).slideUp(200); 
        });
    }
    
    $scope.showHeader = function() {
        console.log("Show");
        $( ".bar" ).slideDown( 200, function() {
           $( ".tabs" ).slideDown(200); 
        });
    }
    
    $scope.goRight = function(){
        console.log("Right");
        $state.go("tab.player");
    }
    
}])

;
