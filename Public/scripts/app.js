var app = angular.module("myBooks", ["ngRoute", "ngGrid", "firebase"])

app.run(function($rootScope, mainService, $location, $route){
	$rootScope.$on("$routeChangeStart", function(evt, next, current){
		
		if(mainService.getAuth()){
			var authUser = mainService.getAuth();
			$rootScope.user = mainService.getUser(authUser.uid);
		} else {
			$location.path("/")
		}
	})
})

app.config(function($routeProvider){
	$routeProvider
	.when("/", {
		templateUrl: "/scripts/main/home.html",
		controller: "mainCtrl"
	}).when("/mybooks/:userId", {
		templateUrl: "/scripts/books/books.html",
		controller: "booksCtrl",
		resolve: {
			booksReference: function(mainService, $route){
				return mainService.getBooks($route.current.params.userId)
			},
			iBooksReference: function(mainService, $route){
				return mainService.getIBooks($route.current.params.userId)
			}
		}
		
	}).when("/mybooks/:userId/books/:bookId", {
		templateUrl: "/scripts/book/book.html",
		controller: "bookCtrl", 
		resolve: {
			commentsReference: function(mainService, $route){
				return mainService.getComments($route.current.params.userId, $route.current.params.bookId);
			}
		}
	}).when("/mybooks/:userId/profile", {
		templateUrl: "/scripts/profile/profile.html",
		controller: "ProfileCtrl"
	});

});
