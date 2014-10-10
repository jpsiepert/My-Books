var app = angular.module("myBooks");

app.controller("booksCtrl", function($scope, bookService, booksReference, userReference){
  
  $scope.user = userReference;
  $scope.addBookForm = true;
  $scope.mainbuttons = false;
  $scope.recommended = false;
  $scope.toRead = false;
  $scope.read = false;
  $scope.own = false;
  $scope.searchItunes = false;

  $scope.showAddBook = function(){
    $scope.addBookForm = !$scope.addBookForm
  }

  $scope.toggleCheckBoxes = function(index){
    debugger
    $scope.checkBoxes[index] === true;
  }
  
  $scope.gotoRecommendations = function(){
   $scope.recommended = !$scope.recommended
  }
  
  $scope.gotoToRead = function() {
    $scope.toRead = !$scope.toRead;
  }
  
  $scope.gotoRead = function(){
    $scope.read = !$scope.read;
  }
  
  $scope.gotoOwn = function(){
    $scope.own = !$scope.own
  }

  // $scope.showSearchItunes = function(){
  //   $scope.searchItunes = !$scope.searchItunes
  // }
  $scope.filterOptions = {
    filterText: ''
  }



$scope.gridOptions = {
      data: 'bookData',
      filterOptions: $scope.filterOptions,
      height: '110px',
      sortInfo: {fields: ["Artist, Collection", "AlbumArt"], directions:["asc"]},
      columnDefs: [
        {field: 'Artist', displayName: 'Author'},
        {field: 'Collection', displayName: 'Title'},
        {field: "AlbumArt", displayName: "Book Art", cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><img ng-src="{{row.getProperty(col.field)}}"></div>'}
      ],
    };

 var displayBookArray = [];
  
 $scope.bookData = displayBookArray; 
 
 $scope.getBookData = function(){
  $scope.searchItunes = true;
  if($scope.search.query.length > 2) {
    bookService.getBookData($scope.search)
    .then(function(iTunesData){
      $scope.bookData = iTunesData;
      console.log($scope.bookData);
      for(var i=0; i < $scope.bookData.length; i++) {
        var tempObj = new BookConst($scope.bookData[i])
        displayBookArray.push(tempObj);
      }
      $scope.bookData = displayBookArray;
    })
  }
  $scope.searchItunes = true;
 }

 var BookConst = function(obj){
  this.AlbumArt = obj.artworkUrl100;
  this.Collection = obj.trackName;
  this.Artist = obj.artistName;
 }
  $scope.books = booksReference

  $scope.addBook = function(){
    debugger;
    $scope.books.$add($scope.book)
    $scope.book = '';
  }
  $scope.removeBook = function(book){
    $scope.books.$remove(book);
  }
  $scope.updateBook = function(book){
    debugger;
    $scope.books.$save(book);
    $scope.book = '';
  }

})