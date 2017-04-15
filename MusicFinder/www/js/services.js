angular.module('starter.services', [])

.factory('encodeURIService', function(){

    return{
        encode: function(string) {
			 return encodeURIComponent(string).replace(/\"/g, "%22").replace(/\ /g, "%20").replace(/[!'()]/g, escape);
        }
    };

})

.factory('SongDataService', function($q, $http, encodeURIService) {
    
    var getSongSuggestion = function(query){

        var deffered = $q.defer(),
        url = "https://api.spotify.com/v1/search?q=" + encodeURIService.encode(query) + "&type=track&limit=5&offset=0";
			
        $http.get(url)
        .success(function(json){
            var result = json;
            //console.log(json);
            deffered.resolve(result);
        })
        .error(function(error){
            console.log("Error: " + error);
            deffered.reject();
        });

        return deffered.promise;

    };
    
    return{
        getSongSuggestion : getSongSuggestion
    };
    
});
