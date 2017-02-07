angular.module('GeoWeather.services', [])

.factory('weatherDataService', function($q, $http, encodeURIService) {
    
    var api = "c37a6024531c8327";

    var getWeatherData = function(zmwNumber){
        
        //console.log(city, cityState, api);

        var deffered = $q.defer(),
        url = "http://api.wunderground.com/api/" + api + "/conditions/q/zmw:"+ encodeURIService.encode(zmwNumber) +".json";
			
        $http.get(url)
        .success(function(json){
            var result = json.current_observation;
            //console.log(json);
            deffered.resolve(result);
        })
        .error(function(error){
            console.log("Error: " + error);
            deffered.reject();
        });

        return deffered.promise;

    };
    
    var searchCities = function(searchString){
        
        //console.log(searchString);
        
        var deffered = $q.defer(),
        url = "http://autocomplete.wunderground.com/aq?query="+ encodeURIService.encode(searchString);
        
        //console.log(url);
			
        $http.get(url)
        .success(function(json){
            var result = json.RESULTS;
            //console.log(json);
            deffered.resolve(result);
        })
        .error(function(error){
            console.log("Error: " + error);
            deffered.reject();
        });

        return deffered.promise;
        
    };
    
//    var getWeatherDataStates = function(city, cityState){
//        
//        //console.log(city, cityState, api);
//
//        var deffered = $q.defer(),
//        url = "http://api.wunderground.com/api/" + api + "/conditions/q/"+ encodeURIService.encode(cityState)  +"/" + encodeURIService.encode(city) + ".json";
//			
//        $http.get(url)
//        .success(function(json){
//            var result = json.current_observation;
//            //console.log(json);
//            deffered.resolve(result);
//        })
//        .error(function(error){
//            console.log("Error: " + error);
//            deffered.reject();
//        });
//
//        return deffered.promise;
//
//    };
    
    return {
        getWeatherData: getWeatherData,
        searchCities: searchCities    
    };
                                                  
})

.factory('encodeURIService', function(){

    return{
        encode: function(string) {
			 return encodeURIComponent(string).replace(/\"/g, "%22").replace(/\ /g, "%20").replace(/[!'()]/g, escape);
        }
    };

})

.factory('sharedData', function(){
    
    var zmwNumber = "";
    var cityName = "";
    
    if(!localStorage.getItem('zmw')){
        zmwNumber = "00000.1.43003";
        cityName = "Mumbai, India";
        localStorage.setItem('zmw', zmwNumber);
        localStorage.setItem('name', cityName);
    }
    
    var getValue = function(){
        return localStorage.getItem('zmw');
    };
    
    var setValue = function(number, name, locationLat, locationLong){
        var zmwNumber = number;
        var cityName = name;
        var cityLat = locationLat;
        var cityLong = locationLong;
        localStorage.setItem('zmw', zmwNumber);
        localStorage.setItem('name', cityName);
        localStorage.setItem('locationLat', cityLat);
        localStorage.setItem('locationLong', cityLong);
    };
    
    var getName = function(){
        return localStorage.getItem('name');
    };
    
    var getGPSValue = function(){};
    
    var setGPSValue = function(){};
    
    return{
        getValue: getValue,
        setValue: setValue,
        getName: getName,
        getGPSValue: getGPSValue,
        setGPSValue: setGPSValue
    };
    
})
    
;
