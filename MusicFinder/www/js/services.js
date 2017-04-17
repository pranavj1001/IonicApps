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
            var result = json.tracks.items;
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
    
})

.factory('sharedData', function(){
    
    var songNamme = "";
    
    if(!localStorage.getItem('currentSelectedSong')){
        songName = "No Song Selected";
        localStorage.setItem('currentSelectedSong', songName);
    }
    
    var getSongName = function(){
        return localStorage.getItem('currentSelectedSong');
    }
    
    var setSongName = function(name){
        songName = name;
        localStorage.setItem('currentSelectedSong', songName);
    }
    
    return{
        getSongName: getSongName,
        setSongName: setSongName
    };
    
});
