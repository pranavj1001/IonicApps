angular.module('GeoWeather.controllers', [])

.controller('WeatherCtrl', [ '$scope', '$http', '$ionicLoading', 'weatherDataService' ,function($scope, $http, $ionicLoading, weatherDataService) {
    
    $ionicLoading.show({template: 'Loading Weather Details...'});
    
    $scope.city = "Mumbai";
    $scope.cityState = "MH";
    $scope.weather = "";
    $scope.results = "";
    
    $scope.check = 0;
    
    $scope.$on("$ionicView.afterEnter", function(){
        getWeatherData();
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
        if(searchString != ""){
            $scope.check = 1;
            
            var promise = weatherDataService.searchCities(searchString);
        
            $ionicLoading.show({template: 'Loading Cities...'});

            promise.then(function(data){
                console.log(data);
                if(data != undefined || searchString == ""){
                    $scope.results = data;
                    if(searchString == ""){
                        $scope.results = "";
                    }
                    $ionicLoading.hide();
                }
                if(data == undefined){
                    location.reload();
                }
            });
        }else{
            $scope.results = "";
            $scope.check = 0;
        }
    };
    
}])

;
