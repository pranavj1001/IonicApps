angular.module('starter.controllers', [])

.controller('SearchCtrl',[ '$scope', '$ionicGesture' ,function($scope, $ionicGesture) {
    
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
    
}])

.controller('PlayerCtrl', function($scope) {})

.controller('AboutMeCtrl', function($scope) {})

;
