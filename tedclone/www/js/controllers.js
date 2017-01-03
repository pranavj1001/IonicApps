var app = angular.module('tedclone.controllers', []);

app.controller('FeedCtrl', function ($scope, FeedService) {
	console.log("Loading FeedCtrl");

	$scope.feed = FeedService;
	$scope.feed.loadFeed();

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
