angular.module('GeoWeather.controllers', [])

.controller('WeatherCtrl', [ '$scope', '$http', '$ionicLoading', 'weatherDataService' ,function($scope, $http, $ionicLoading, weatherDataService) {
    
    $ionicLoading.show({template: 'Loading Weather Details...'});
    
    $scope.city = "";
    $scope.cityState = "";
    $scope.weather = "";
    $scope.results = "";
    
    $scope.count = 0;
    
    $scope.$on("$ionicView.afterEnter", function(){
        $scope.city = "Mumbai";
        $scope.cityState = "MH";
        if($scope.count == 0)
            getWeatherData();
        $scope.count++;
    });
    
    function getWeatherData(){
        
        var promise = weatherDataService.getWeatherData($scope.city, $scope.cityState);

        promise.then(function(data){
            console.log(data);
            $scope.weather = data;
            $ionicLoading.hide();
        });
        
    };
    
    $scope.getQuery = function(searchString){
        //console.log(data);
        var promise = weatherDataService.searchCities(searchString);
        
        $ionicLoading.show({template: 'Loading Cities...'});
        
        promise.then(function(data){
            console.log(data);
            if(data != undefined)
                $scope.results = data;
                $ionicLoading.hide();
            if(data == undefined){
                location.reload();
            }
        });
        
    };
    
}])

;
