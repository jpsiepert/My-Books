var app = angular.module("myBooks");

app.service("bookService", function($http, $q){
	this.getBookData = function(search){
		var deferred = $q.defer();
		$http({
			method: "JSONP",
			url: "https://itunes.apple.com/us/search?term=" + search.query  + "&media=ebook&callback=JSON_CALLBACK"//search type can be eBook or audiobook, need a drop down??
		}).then(function(data){
			iTunesData = data.data.results
			deferred.resolve(iTunesData)
		})
		return deferred.promise;
	}
}) 