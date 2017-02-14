(function() {

    var geoApp = angular.module('GeoWeather.controllers', []);
  
    //Controller for the Weather Tab 
    geoApp.controller('WeatherCtrl', [ '$scope', '$http', '$ionicLoading', 'weatherDataService', 'sharedData', function($scope, $http, $ionicLoading, weatherDataService, sharedData) {
        
        //Loading Screen
        $ionicLoading.show({template: 'Loading Weather Details...'});
       
        //variables
        $scope.weather = "";
        $scope.results = "";

        $scope.check = 0;

        var zmw;
        
        //Do this when we enter the tab
        $scope.$on("$ionicView.afterEnter", function(){
            
            //Function to get Weather Details of the default city
            getWeatherData();
            
            //get the Device's Time (in hours) 
            var hr  = (new Date()).getHours();

            console.log(hr);
            
            //Get the Main Weather Tab
            var changeClassW = document.getElementById("weatherTab");
            
            //Mood Setting Logic
            //If night Change the background to a darker colour
            //Can be changed to multiple colour settings by simply adding more if else and making respective changes to the css file
            if(hr >= 20 || hr <= 5){
                
                //replace if Morning class is there
                if(changeClassW != null)
                    changeClassW.className = changeClassW.className.replace( /(?:^|\s)weatherMorning(?!\S)/g , '' );
                
                //add Night Class
                if(changeClassW != null)
                    changeClassW.className += " weatherNight";

            }else{
                
                //replace if Night Class is there
                if(changeClassW != null)
                    changeClassW.className = changeClassW.className.replace( /(?:^|\s)weatherNight(?!\S)/g , '' );
                
                //add Morning Class
                if(changeClassW != null)
                    changeClassW.className += " weatherMorning";

            }

        });
        
        //Function to get Weather Data
        function getWeatherData(){
            
            //get the default saved city's ZMW number
            $scope.zmw = sharedData.getValue();
            
            //create a promise to get Weather Data of the default saved city
            var promise = weatherDataService.getWeatherData($scope.zmw);
          
            //if promise is completed then do this
            promise.then(function(data){
                //console.log(data);
                $scope.weather = data;
                $ionicLoading.hide();
            });

        };
        
        //Function to show search Results
        $scope.getQuery = function(searchString){
            //console.log(data);
            
            //Logic to hide search results if there is no search string
            if(searchString != ""){
                $scope.check = 1;
                
                //create a promise to get search cites
                var promise = weatherDataService.searchCities(searchString);

                $ionicLoading.show({template: 'Loading Cities...'});
                
                //if promise is completed then do this
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
        
        //Function to select a city
        //Function is called when user selects a city from the search results
        $scope.selectCity = function(result){

            console.log(result);

            $('#inputWeather').val(result.name);
          
            //create a promise to get weather data of selected city
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
    
    //Controller for the Settings Tab 
    geoApp.controller('SettingsCtrl', [ '$scope', '$ionicLoading', 'weatherDataService', 'sharedData', function($scope, $ionicLoading, weatherDataService, sharedData) {
        
        //variables
        $scope.results = "";
        $scope.check = 0;
        $scope.result = "";
        $scope.defaultCity = "";
        $scope.displaySelectedCityName = "";
        
        //gps preference
        //still in beta
        $scope.gpsPreference = sharedData.getGPSValue();
        
        //ionic toggle value
        $scope.settingsList = [
            { text: "Use GPS", checked: $scope.gpsPreference }
        ];
         
        //save gps preference value
        $scope.saveGPSValue = function(value){
            sharedData.setGPSValue(value);
        };
        
        //after entering into the tab
        $scope.$on("$ionicView.afterEnter", function(){
             
            //get defaultcity name
            $scope.defaultCity = sharedData.getName();

            //console.log($scope.defaultCity);
            
            //get the Device's Time (in hours)
            var hr  = (new Date()).getHours();
            
            //Get the Main Settings Tab
            var changeClassS = document.getElementById("settingsTab");
             
            //Mood Setting Logic
            //If night Change the background to a darker colour
            //Can be changed to multiple colour settings by simply adding more if else and making respective changes to the css file
            if(hr >= 20 || hr <= 5){
                
                //replace if Morning class is there
                if(changeClassS != null)
                    changeClassS.className = changeClassS.className.replace( /(?:^|\s)settingsMorning(?!\S)/g , '' );
                
                //add Night Class
                if(changeClassS != null)
                    changeClassS.className += " settingsNight";

            }else{
                
                //replace if Night class is there
                if(changeClassS != null)
                    changeClassS.className = changeClassS.className.replace( /(?:^|\s)settingsNight(?!\S)/g , '' );
                
                //add Morning Class
                if(changeClassS != null)
                    changeClassS.className += " settingsMorning";

            }

        });
        
        //Function to save default city's details
        $scope.save = function(){

            console.log($scope.result);

            if($scope.result != undefined){
                sharedData.setValue($scope.result.zmw, $scope.result.name, $scope.result.lat, $scope.result.lon);
                location.reload();
            }

        };
        
        //Function to get Search Results
        //Same as above
        //In Future, will make both a common function
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
        
        //Function to select a city
        $scope.selectCity = function(result){

            $scope.result = result;
            $('#inputSettings').val(result.name);

        };

    }]);

    geoApp.controller('GeoLocationCtrl', [ '$scope', '$cordovaGeolocation', '$ionicPlatform', 'sharedData', function($scope, $cordovaGeolocation, $ionicPlatform, sharedData) {
        
//        var map;
//        function initMap() {
//            console.log("Reached here");
//            map = new google.maps.Map(document.getElementById('map'), {
//                  center: {lat: -34.397, lng: 150.644},
//                  zoom: 8
//            });
//        }
        
        $scope.useGPS = sharedData.getGPSValue;
        
        console.log($scope.useGPS);

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
