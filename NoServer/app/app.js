var app = angular.module("myBooks", ["ngRoute", "firebase"])

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
			thingsReference: function(mainService, $route){
				return mainService.getThings($route.current.params.userId);
			}
		}
	}).when("/mybooks/recommended/", {
		templateUrl: "/app/books/recommended.html",
		controller: "booksCtrl"
	}).when("/mybooks/toread/:userId",{
		templateUrl: "app/books/toread.html",
		controller: "booksCtrl",
		resolve: {
			userReference: function(mainService, $route){
				return mainService.getUser($route.current.params.userId);
			},
			thingsReference: function(mainService, $route){
				return mainService.getThings($route.current.params.userId);
			}
		}
	}).when("/mybooks/read/:userId", {
		templateUrl: "app/books/read.html",
		controller: "booksCtrl",
		resolve: {
			userReference: function(mainService, $route){
				return mainService.getUser($route.current.params.userId);
			},
			thingsReference: function(mainService, $route){
				return mainService.getThings($route.current.params.userId);
			}
		}
	}).when("/mybooks/own/:userId", {
		templateUrl: "app/books/own.html", 
		controller: "booksCtrl",
		resolve: {
			userReference: function(mainService, $route){
				return mainService.getUser($route.current.params.userId);
			},
			thingsReference: function(mainService, $route){
				return mainService.getThings($route.current.params.userId);
			}
		}
	})

});
