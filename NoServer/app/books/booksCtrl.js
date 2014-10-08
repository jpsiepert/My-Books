var app = angular.module("myBooks")

app.controller("booksCtrl", function($scope, EnvironmentService, $location, bookService){
  $scope.mainbuttons = false;
  
  $scope.gotoRecommendations = function(){
   $location.path("/mybooks/recommended")
  };
  
  $scope.gotoToRead = function() {
    $location.path("/mybooks/toread/")
  }
  
  $scope.gotoRead = function(){
    $location.path("/mybooks/read/")
  }
  
  $scope.gotoOwn = function(){
    $location.path("/mybooks/own/")
  }

  $scope.getBooks = function(){
    bookService.getBookData($scope.searchBook)
    .then(function(bookData){

    })
  }

  var displayBooksArr = [];
  $scope.displayBooks = function(){
    this.song//need to see how iTunes displays it
  }

  $scope.booksRecommended = {
    
  }

})