angular.module('GeoWeather.controllers', [])

.controller('WeatherCtrl', [ '$scope', '$http', '$ionicLoading', 'weatherDataService', 'sharedData', function($scope, $http, $ionicLoading, weatherDataService, sharedData) {
    
    $ionicLoading.show({template: 'Loading Weather Details...'});
    
    $scope.weather = "";
    $scope.results = "";
    
    $scope.check = 0;
    
    var zmw;
    
    $scope.$on("$ionicView.afterEnter", function(){
        
        getWeatherData();
        
        var hr  = (new Date()).getHours();
        
        console.log(hr);

        var changeClassW = document.getElementById("weatherTab");
        var changeClassG = document.getElementById("geoTab");
            

        if(hr >= 20 || hr <= 5){
            
            if(changeClassW != null)
                changeClassW.className = changeClassW.className.replace( /(?:^|\s)weatherMorning(?!\S)/g , '' );
            
            if(changeClassG != null)
                changeClassG.className = changeClassG.className.replace( /(?:^|\s)geoMorning(?!\S)/g , '' );
            
            if(changeClassW != null)
                changeClassW.className += " weatherNight";
            if(changeClassG != null)
                changeClassG.className += " geoNight";

        }else{
            
            if(changeClassW != null)
                changeClassW.className = changeClassW.className.replace( /(?:^|\s)weatherNight(?!\S)/g , '' );
            
            if(changeClassG != null)
                changeClassG.className = changeClassG.className.replace( /(?:^|\s)geoNight(?!\S)/g , '' );
            
            if(changeClassW != null)
                changeClassW.className += " weatherMorning";
            if(changeClassG != null)
                changeClassG.className += " geoMorning";

        }
        
    });
    
    function getWeatherData(){
        
        $scope.zmw = sharedData.getValue();
        
        var promise = weatherDataService.getWeatherData($scope.zmw);

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
        
        //console.log(result);
        
        $('#inputWeather').val(result.name);
        
        var promise = weatherDataService.getWeatherData(result.zmw);

        promise.then(function(data){
            //console.log(data);
            if(data != undefined){
                $scope.weather = data;
                $scope.check = 0;
            }
        });
        
    };
    
}])

.controller('SettingsCtrl', [ '$scope', '$ionicLoading', 'weatherDataService', 'sharedData', function($scope, $ionicLoading, weatherDataService, sharedData) {
    
    $scope.results = "";
    $scope.check = 0;
    $scope.result = "";
    $scope.defaultCity = "";
    $scope.displaySelectedCityName = "";
    
    $scope.settingsList = [
        { text: "Use GPS", checked: false }
    ];
    
    $scope.$on("$ionicView.afterEnter", function(){
        
        $scope.defaultCity = sharedData.getName();
        
        //console.log($scope.defaultCity);
        
        var hr  = (new Date()).getHours();
        
        var changeClassS = document.getElementById("settingsTab");
        
        if(hr >= 20 || hr <= 5){
            
            if(changeClassS != null)
                changeClassS.className = changeClassS.className.replace( /(?:^|\s)settingsMorning(?!\S)/g , '' );
            
            if(changeClassS != null)
                changeClassS.className += " settingsNight";
            
        }else{
            
            if(changeClassS != null)
                changeClassS.className = changeClassS.className.replace( /(?:^|\s)settingsNight(?!\S)/g , '' );
            
            if(changeClassS != null)
                changeClassS.className += " settingsMorning";
            
        }
        
    });
    
    $scope.save = function(){
        
        console.log($scope.result);
        
        if($scope.result != undefined){
            console.log("Reached Here");
            sharedData.setValue($scope.result.zmw, $scope.result.name);
            location.reload();
        }
        
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
      
        $scope.result = result;
        $('#inputSettings').val(result.name);
        
    };
        
}])

.controller('GeoLocationCtrl', [ '$scope', function($scope) {
    
}])

;
