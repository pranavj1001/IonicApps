(function() {

    var geoApp = angular.module('GeoWeather.controllers', []);

    geoApp.controller('WeatherCtrl', [ '$scope', '$http', '$ionicLoading', 'weatherDataService', 'sharedData', function($scope, $http, $ionicLoading, weatherDataService, sharedData) {

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
            
            if(hr >= 20 || hr <= 5){

                if(changeClassW != null)
                    changeClassW.className = changeClassW.className.replace( /(?:^|\s)weatherMorning(?!\S)/g , '' );

                if(changeClassW != null)
                    changeClassW.className += " weatherNight";

            }else{

                if(changeClassW != null)
                    changeClassW.className = changeClassW.className.replace( /(?:^|\s)weatherNight(?!\S)/g , '' );

                if(changeClassW != null)
                    changeClassW.className += " weatherMorning";

            }

        });

        function getWeatherData(){

            $scope.zmw = sharedData.getValue();

            var promise = weatherDataService.getWeatherData($scope.zmw);

            promise.then(function(data){
                //console.log(data);
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

    }]);

    geoApp.controller('SettingsCtrl', [ '$scope', '$ionicLoading', 'weatherDataService', 'sharedData', function($scope, $ionicLoading, weatherDataService, sharedData) {

        $scope.results = "";
        $scope.check = 0;
        $scope.result = "";
        $scope.defaultCity = "";
        $scope.displaySelectedCityName = "";

        $scope.settingsList = [
            { text: "Use GPS", checked: false }
        ];
        
        $scope.saveGPSValue = function(){
            sharedData.setGPSValue($scope.settingsList.checked);
        };

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

    }]);

    geoApp.controller('GeoLocationCtrl', [ '$scope', '$cordovaGeolocation', '$ionicPlatform',function($scope, $cordovaGeolocation, $ionicPlatform) {
        
//        var map;
//        function initMap() {
//            console.log("Reached here");
//            map = new google.maps.Map(document.getElementById('map'), {
//                  center: {lat: -34.397, lng: 150.644},
//                  zoom: 8
//            });
//        }

        $scope.$on("$ionicView.afterEnter", function(){

            var hr  = (new Date()).getHours();

            var changeClassG = document.getElementById("geoTab");

            if(hr >= 20 || hr <= 5){

                if(changeClassG != null)
                    changeClassG.className = changeClassG.className.replace( /(?:^|\s)geoMorning(?!\S)/g , '' );

                if(changeClassG != null)
                    changeClassG.className += " geoNight";

            }else{

                if(changeClassG != null)
                    changeClassG.className = changeClassG.className.replace( /(?:^|\s)geoNight(?!\S)/g , '' );

                if(changeClassG != null)
                    changeClassG.className += " geoMorning";

            }

        });
        
        $ionicPlatform.ready(function(){
        
            var posOptions = {timeout: 10000, enableHighAccuracy: true};
            $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                $scope.coords = position.coords;
    //            var lat  = position.coords.latitude
    //            var long = position.coords.longitude
                var mapOptions = {
                  center: {lat: $scope.coords.latitude, lng: $scope.coords.longitude},
                  zoom: 15,
                  mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
            }, function(err) {
                console.log("getCurrentPosition Error : " + angular.toJson(err));
            });
            
        });
        
        //AIzaSyD1sle_TzidAi-HEEiD-paDHlnx8URyngA

    }]);
    
}());
