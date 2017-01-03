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

app.controller('PostCtrl', function ($scope, $stateParams, FeedService, $window, $cordovaSocialSharing) {
	console.log("Loading PostCtrl");

	$scope.postId = $stateParams.id;
	$scope.post = FeedService.getEntry($scope.postId);

	$scope.share = function () {
		console.debug("Sharing post");
		$cordovaSocialSharing
	    .share($scope.post.contentSnippet, $scope.post.title, $scope.post.thumbnail, $scope.post.link) // Share via native share sheet
	    .then(function(result) {
	      // Success!
	    }, function(err) {
	      // An error occured. Show a message to the user
	    });
	};

	$scope.readMore = function () {
		console.debug("Read more post");
		$window.open($scope.post.link, "_system", "location=yes");
	};

});
