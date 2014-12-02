var app = angular.module("myBooks");

app.controller("booksCtrl", function($scope, $location, mainService, bookService, booksReference, iBooksReference){

  $scope.addBookForm = true;
  $scope.mainbuttons = false;
  $scope.recommended = true;
  $scope.toRead = true;
  $scope.read = true;
  $scope.own = true;
  $scope.searchItunes = false;
  $scope.bookDetails = false;
  $scope.itunesButton = true;


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
      sortInfo: {fields: ["Artist, Collection", "AlbumArt", "Add Book"]},
      columnDefs: [
        {field: 'Artist', displayName: 'Author'},
        {field: 'Collection', displayName: 'Title'},
        {field: "AlbumArt", displayName: "Book Art", cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><img ng-src="{{row.getProperty(col.field)}}"></div>'},
        {field: "AddBook", displayName: "Add Book", cellTemplate: '<button ng-show="itunesButton" ng-click="addItunesBook(row.rowIndex)">Add Book</button>'}
      ],
    };

 var displayBookArray = [];
 var addBookToList = function(){
  //needs to take active column
  //add the author, book name, book art to list(i.e. owned, or read)
 }
  
 $scope.bookData = displayBookArray; 
 
 $scope.getBookData = function(){
  $scope.searchItunes = true;
  if($scope.search.query.length > 2) {
    bookService.getBookData($scope.search)
    .then(function(iTunesData){
      $scope.bookData = iTunesData;
      for(var i=0; i < $scope.bookData.length; i++) {
        var tempObj = new BookConst($scope.bookData[i], i)
        displayBookArray.push(tempObj);
      }
      $scope.bookData = displayBookArray;
    })
  }
  
  $scope.searchItunes = !scope.searchItunes
 }

 var BookConst = function(obj, i){
  this.AlbumArt = obj.artworkUrl100;
  this.Collection = obj.trackName;
  this.Artist = obj.artistName;
 }
  
  $scope.logOut = function(){
    mainService.logOut()
    $location.path("/")
  }

  $scope.books = booksReference
  $scope.iBooks = iBooksReference;

  $scope.addItunesBook = function(i){
    $scope.iBooks.$add(displayBookArray[i]);
    $scope.addBookForm = false;
    $scope.searchItunes = false;
    $scope.search.query = '';
    $scope.bookData = [];
  }

  $scope.addBook = function(iBook, i){
    $scope.books.$add(iBook)
    $scope.book = '';
    $scope.iBooks.$remove(iBook)
  }
  $scope.removeBook = function(book){
    $scope.books.$remove(book);
  }
  $scope.updateBook = function(book){
    $scope.books.$save(book);
  }

  $scope.showBookDetails = function(book){
    
    $scope.comments = mainService.getComments($scope.user.userId, book.$id)
    $location.path("/mybooks/" + $scope.user.userId + "/books/" + book.$id)

  }
})