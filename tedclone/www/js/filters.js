var app = angular.module('tedclone.filters', []);

app.filter('stripTags', function () {
		return function (text) {
			return String(text).replace(/<[^>]+>/gm, '');
		}
	}
);