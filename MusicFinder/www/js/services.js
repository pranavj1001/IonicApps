angular.module('starter.services', [])

.factory('encodeURIService', function(){

    return{
        encode: function(string) {
			 return encodeURIComponent(string).replace(/\"/g, "%22").replace(/\ /g, "%20").replace(/[!'()]/g, escape);
        }
    };

})

.factory('SongData', function($q, $http, encodeURIService) {
    
    
    
});
