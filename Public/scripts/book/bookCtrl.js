var app = angular.module("myBooks")

app.controller("bookCtrl", function($scope, commentsReference, $location){
	$scope.test = "are you working?"
	
	$scope.backToBooks = function(){
		$location.path("/mybooks/" + $scope.user.userId)	
	}


})