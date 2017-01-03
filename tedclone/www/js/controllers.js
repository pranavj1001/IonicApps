var app = angular.module('tedclone.controllers', []);

app.controller('FeedCtrl', function ($scope, $ionicLoading, FeedService) {
	console.log("Loading FeedCtrl");

	$ionicLoading.show({template: 'Loading your Feed...'});
	$scope.feed = FeedService;
	$scope.feed.loadFeed().then(function(){
		$ionicLoading.hide();
	});

	$scope.doRefresh = function () {
		$scope.feed.loadFeed().then(function () {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};
});

app.controller('PostCtrl', function ($scope) {
	console.log("Loading PostCtrl");

	$scope.share = function () {
		console.debug("Sharing post");
	};

	$scope.readMore = function () {
		console.debug("Read more post");
	};

});
