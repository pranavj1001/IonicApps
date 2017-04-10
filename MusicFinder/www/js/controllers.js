angular.module('starter.controllers', [])

.controller('SearchCtrl', [ '$scope', '$ionicGesture', '$state' ,function($scope, $ionicGesture, $state) {
    
//    $scope.hideHeader = function() {
//        console.log("Hide");
//        $( ".tabs" ).slideUp( 200, function() {
//           $( ".bar" ).slideUp(200); 
//        });
//    }
//    
//    $scope.showHeader = function() {
//        console.log("Show");
//        $( ".bar" ).slideDown( 200, function() {
//           $( ".tabs" ).slideDown(200); 
//        });
//    }
    
    $scope.goLeft = function(){
        console.log("Left");
        //$(".view-container").hide('slide',{direction:'right'},200);
        $state.go("tab.player");
    }
    
}])

.controller('PlayerCtrl', [ '$scope', '$ionicGesture', '$state', function($scope, $ionicGesture, $state) {
    
//    $scope.hideHeader = function() {
//        console.log("Hide");
//        $( ".tabs" ).slideUp( 200, function() {
//           $( ".bar" ).slideUp(200); 
//        });
//    }
//    
//    $scope.showHeader = function() {
//        console.log("Show");
//        $( ".bar" ).slideDown( 200, function() {
//           $( ".tabs" ).slideDown(200); 
//        });
//    }
    
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
    
//    $scope.hideHeader = function() {
//        console.log("Hide");
//        $( ".tabs" ).slideUp( 200, function() {
//           $( ".bar" ).slideUp(200); 
//        });
//    }
//    
//    $scope.showHeader = function() {
//        console.log("Show");
//        $( ".bar" ).slideDown( 200, function() {
//           $( ".tabs" ).slideDown(200); 
//        });
//    }
    
    $scope.goRight = function(){
        console.log("Right");
        $state.go("tab.player");
    }
    
}])

;
