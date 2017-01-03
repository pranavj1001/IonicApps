var app = angular.module('tedclone.services', []);

app.constant("FEED_URL", "http://feeds.feedburner.com/TEDTalks_video");

app.factory('FeedService', function ($http, $q, $rootScope, FEED_URL) {

	var self = {
		'posts': []
	};

	self.loadFeed = function () {

		self.posts.length = 0;
		var defer = $q.defer();

		superfeedr.auth('zeo2396', '9686963a64f912eb6b65c55a1ea07a1b');
		superfeedr.setOnLoadCallback(function() {
			var feed = new superfeedr.Feed(FEED_URL);
			feed.load(function(result) {
				$rootScope.$apply(function() {
					angular.forEach(result.feed.entries, function (entry) {
						self.posts.push(entry);
					});
					defer.resolve(self.posts);
				});				
			});
		});		

		return defer.promise;
	};

	self.getEntry = function (link) {
		for (var i = 0; i < self.posts.length; i++) {
			var entry = self.posts[i];
			if (entry.link == link) {
				return entry;
			}
		}
		return null;
	};

	return self;
});
