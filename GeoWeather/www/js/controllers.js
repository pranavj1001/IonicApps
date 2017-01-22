angular.module('GeoWeather.controllers', [])

.controller('WeatherCtrl', [ '$scope', '$http', '$ionicLoading', 'weatherDataService' ,function($scope, $http, $ionicLoading, weatherDataService) {
    
    $scope.settingsList = [
        { text: "Use GPS", checked: false }
    ];
    
    $ionicLoading.show({template: 'Loading Weather Details...'});
    
    $scope.weather = "";
    $scope.results = "";
    
    $scope.check = 0;
    
    var zmw;
    
    $scope.$on("$ionicView.afterEnter", function(){
        getWeatherData();
    });
    
    function getWeatherData(){
        
        getDefaultCity();
        
        var promise = weatherDataService.getWeatherDataStates($scope.city, $scope.cityState);

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
                //console.log(data);
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
    
    $scope.selectCity = function(result){
        
        console.log(result);
        
        var promise = weatherDataService.getWeatherData(result.zmw);

        promise.then(function(data){
            //console.log(data);
            if(data != undefined){
                $scope.weather = data;
                $scope.check = 0;
            }
        });
        
    };
    
    function getDefaultCity(){
        
        $scope.city = "Mumbai";
        $scope.cityState = "MH";
        
    }
    
}])

;
