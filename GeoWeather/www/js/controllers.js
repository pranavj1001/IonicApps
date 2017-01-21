angular.module('GeoWeather.controllers', [])

.controller('WeatherCtrl', [ '$scope', '$http', '$ionicLoading', 'weatherDataService' ,function($scope, $http, $ionicLoading, weatherDataService) {
    
    $ionicLoading.show({template: 'Loading Weather Details...'});
    
    $scope.$on("$ionicView.afterEnter", function(){
        getWeatherData();
    });
    
    $scope.city = "Mumbai";
    $scope.cityState = "MH";
    $scope.weather = "";
    
    function getWeatherData(){
        
        var promise = weatherDataService.getWeatherData($scope.city, $scope.cityState);

        promise.then(function(data){
            console.log(data);
            $scope.weather = data;
            $ionicLoading.hide();
        });
        
    };
    
    $scope.getQuery = function(data){
        console.log(data);
    };
    
}])

;
