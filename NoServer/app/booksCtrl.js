var app = angular.module("myBooks")

app.controller("booksCtrl", function($scope, EnvironmentService, $location, mainService){
  $scope.signupbutton = false;
  $scope.loginbutton = false;
  $scope.thing = 'sefsefsef'
  
  $scope.gotoRecommendation = function(){
    $location.path("/mybooks/recommended")
  }
  
  $scope.gotoToRead = function() {
    $location.path("/mybooks/toread")
  }
  
  $scope.gotoRead = function(){
    $location.path("/mybooks/read")
  }
  
  $scope.gotoOwn = function(){
    $location.path("/mybooks/own")
  }
})