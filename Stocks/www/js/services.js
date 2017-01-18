angular.module('stocks.services', [])

	.factory('stockDataService', function($q, $http){

		var getPriceData = function(ticker){

			//console.log(ticker);

			var defferred = $q.defer(),
			url = "http://finance.yahoo.com/webservice/v1/symbols/" + ticker + "/quote?format=json&view=detail";

			$http.get(url)
    		.success(function(json){
		    	var jsonData = json.list.resources[0].resource.fields;
		    	defferred.resolve(jsonData);
			})
			.error(function(error){
				console.log("Price data error: " + error);
				defferred.reject();
			});

			return defferred.promise;

		};

		return {
			getPriceData: getPriceData
		};

	});