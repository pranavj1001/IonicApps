angular.module('GeoWeather.controllers', [])

.controller('WeatherCtrl', [ '$scope', '$http', 'weatherDataService' ,function($scope, $http, weatherDataService) {
    
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
        });
        
    };
    
}])

;
