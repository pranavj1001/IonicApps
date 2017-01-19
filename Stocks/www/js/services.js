angular.module('stocks.services', [])

	.factory('encodeURIService', function(){

		return{
			encode: function(string) {
			    return encodeURIComponent(string).replace(/\"/g, "%22").replace(/\ /g, "%20").replace(/[!'()]/g, escape);
			}
		};

	})

	.factory('dateService', function($filter) {

		var currentDate = function() {
	    	var d = new Date();
	    	var date = $filter('date')(d, 'yyyy-MM-dd');
	    	return date;
	  	};

	  	var oneYearAgoDate = function() {
	    	var d = new Date(new Date().setDate(new Date().getDate() - 365));
	    	var date = $filter('date')(d, 'yyyy-MM-dd');
	    	return date;
	  	};

	  	return {
	    	currentDate: currentDate,
	    	oneYearAgoDate: oneYearAgoDate
	  	};
	})

	.factory('stockDataService', function($q, $http, encodeURIService){

		var getDetailsData = function(ticker){

			var deffered = $q.defer(),
			query = 'select * from yahoo.finance.quotes where symbol IN ("' + ticker + '")',
		    url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIService.encode(query) + '&format=json&env=http://datatables.org/alltables.env';
			
			$http.get(url)
    		.success(function(json){
		    	var jsonData = json.query.results.quote;
		    	//console.log(json);
		    	deffered.resolve(jsonData);
			})
			.error(function(error){
				console.log("Details data error: " + error);
				deffered.reject();
			});

			return deffered.promise;

		};

		var getPriceData = function(ticker){

			//console.log(ticker);

			var deffered = $q.defer(),
			url = "http://finance.yahoo.com/webservice/v1/symbols/" + ticker + "/quote?format=json&view=detail";

			$http.get(url)
    		.success(function(json){
		    	var jsonData = json.list.resources[0].resource.fields;
		    	deffered.resolve(jsonData);
			})
			.error(function(error){
				console.log("Price data error: " + error);
				deffered.reject();
			});

			return deffered.promise;

		};

		return {
			getPriceData: getPriceData,
			getDetailsData: getDetailsData
		};

	});