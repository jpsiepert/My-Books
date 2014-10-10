var app = angular.module("myBooks", ["ngRoute", "ngGrid", "firebase"])

app.config(function($routeProvider){
	$routeProvider
	.when("/", {
		templateUrl: "/home.html",
		controller: "mainCtrl"
	}).when("/signup", {
		templateUrl: "/app/signUp/signUp.html",
		controller: "signupCtrl"
	}).when("/mybooks/:userId", {
		templateUrl: "/app/books/books.html",
		controller: "booksCtrl",
		resolve: {
			userReference: function(mainService, $route){
				return mainService.getUser($route.current.params.userId);
			},
			booksReference: function(mainService, $route){
				return mainService.getBooks($route.current.params.userId);
			}
		}
	});
	// }).when("/recommended/:userId",{ //do i need to call, getUser?? {
	// 	templateUrl: "/app/books/recommended.html",
	// 	controller: "booksCtrl",
	// 	resolve: {
	// 		userReference: function(mainService, $route){
	// 			return mainService.getUser($route.current.params.userId);
	// 		},
	// 		booksReference: function(mainService, $route){
	// 			return mainService.getThings($route.current.params.userId);
	// 		}
	// 	}
	// })
	// }).when("/toread/:userId",{
	// 	templateUrl: "app/books/toread.html",
	// 	controller: "booksCtrl",
	// 	resolve: {
	// 		userReference: function(mainService, $route){
	// 			return mainService.getUser($route.current.params.userId);
	// 		},
	// 		booksReference: function(mainService, $route){
	// 			return mainService.getThings($route.current.params.userId);
	// 		}
	// 	}
	// }).when("/read/:userId", {
	// 	templateUrl: "app/books/read.html",
	// 	controller: "booksCtrl",
	// 	resolve: {
	// 		userReference: function(mainService, $route){
	// 			return mainService.getUser($route.current.params.userId);
	// 		},
	// 		booksReference: function(mainService, $route){
	// 			return mainService.getThings($route.current.params.userId);
	// 		}
	// 	}
	// }).when("/own/:userId", {
	// 	templateUrl: "app/books/own.html", 
	// 	controller: "booksCtrl",
	// 	resolve: {
	// 		userReference: function(mainService, $route){
	// 			return mainService.getUser($route.current.params.userId);
	// 		},
	// 		booksReference: function(mainService, $route){
	// 			return mainService.getThings($route.current.params.userId);
	// 		}
	// 	}
	// })

});
