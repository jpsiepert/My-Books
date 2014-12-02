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
		templateUrl: "/home.html",
		controller: "mainCtrl"
	}).when("/mybooks/:userId", {
		templateUrl: "/app/books/books.html",
		controller: "booksCtrl",
		resolve: {
			booksReference: function(mainService, $route){
				return mainService.getBooks($route.current.params.userId);
			}
		}
	}).when("/mybooks/:userId/books/:bookId", {
		templateUrl: "/app/book/book.html",
		controller: "bookCtrl", 
		resolve: {
			commentsReference: function(mainService, $route){
				return mainService.getComments($route.current.params.userId, $route.current.params.bookId);
			}
		}
	});


	// .when("/signup", {
	// 	templateUrl: "/app/signUp/signUp.html",
	// 	controller: "signupCtrl"
	// })

});
