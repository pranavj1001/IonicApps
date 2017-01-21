angular.module('GeoWeather.services', [])

.factory('weatherDataService', function($q, $http) {
    
    var api = "c37a6024531c8327";

    var getWeatherData = function(city, cityState){
        
        //console.log(city, cityState, api);

        var deffered = $q.defer(),
        url = "http://api.wunderground.com/api/" + api + "/conditions/q/" + cityState + "/" + city + ".json";
			
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
        url = "http://autocomplete.wunderground.com/aq?query="+ '' + searchString;
        
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
    
    return {
        getWeatherData: getWeatherData,
        searchCities: searchCities    
    };
                                                  
})
    
;
