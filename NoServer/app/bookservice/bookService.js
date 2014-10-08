var app = angular.module("myBooks");

app.service("bookService", function($http, $q){
	this.getBookData = function(search){
		var deferred = $q.defer();
		$http({
			method: "JSONP",
			url: "https://itunes.apple.com/search?term=" + search.author +"&entity=eBook" //search type can be eBook or audiobook, need a drop down??
		}).then(function(bookData){
			bookData = data.data.results
			deferred.resolve(bookData)
		})
		return deferred.promise;
	}
})