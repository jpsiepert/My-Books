var app = angular.module("myBooks")

app.controller("signupCtrl", function($scope, mainService, EnvironmentService,$firebaseSimpleLogin, $location){	
 $scope.signupForm = false;
 $scope.mainbuttons = false;
 $scope.showSignupForm = function(){
 		$scope.signupForm = !$scope.signupForm
 }

// var myRef = new Firebase("https://boiling-heat-705.firebaseio.com/user");
// var authClient = new FirebaseSimpleLogin(myRef, function(error, user) {
//   if (error) {
//     // an error occurred while attempting login
//     console.log(error);
//   } else if (user) {
//     // user authenticated with Firebase
//     console.log("User ID: " + user.uid + ", Provider: " + user.provider);
//   } else {
//     // user is logged out
//   }
// });
// $scope.signUp = function(){
// 	authClient.createUser($scope.signupEmail, $scope.signupPassword, function(error, user) {
//   if (error === null) {
//     console.log("User created successfully:", user);
//   } else {
//     console.log("Error creating user:", error);
//   }
// });
// 	$scope.signupEmail = ''
// 	$scope.signupPassword=''
// 	$location.path("/")
// }
$scope.register = function(){
  return mainService.register($scope.signUp, function(user){
    user.uid = user.uid.replace('simplelogin:', '');
    $scope.$apply(function(){
      $location.path("/mybooks/" + user.uid)
    });
  });
  $scope.signUp.name = '';
  $scope.signUp.email = '';
  $scope.signUp.password = '';
}

})