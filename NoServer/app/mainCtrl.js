var app = angular.module("myBooks");

app.controller("mainCtrl", function($scope, $location, mainService, EnvironmentService){
 $scope.test = "test";
 $scope.env = EnvironmentService.getEnv();

 $scope.mainbuttons = true;;//is there a way to write an if statement for if location !/ then false;
 //moved the buttons to home.html instead of the index.html
 
 $scope.loginForm = false;
 $scope.theSignUpForm = false;

  $scope.showSignupForm = function(){
 		$scope.theSignUpForm = !$scope.theSignUpForm
 		$scope.mainbuttons = false;
 }

 $scope.showloginForm = function(){
 	console.log("showing form")
 	$scope.loginForm = !$scope.loginForm
 	$scope.mainbuttons = !$scope.mainbuttons
 	$scope.login = ''
 };
$scope.register = function(){
  return mainService.register($scope.signUp, function(user){
    user.uid = user.uid.replace('simplelogin:', '');
    $scope.$apply(function(){
      return $location.path("/mybooks/" + user.uid)
    });
  });
  $scope.signUp = ''
}
 

// $scope.gotoSignUp=function(){
// 	console.log("going to sign up")
//  	$location.path("/signup")
//  	$scope.mainbuttons = false;
//  };

$scope.openUp = function(){
 	console.log("anything")
 	return mainService.login($scope.login, function(user){
 		user.uid = user.uid.replace('simplelogin:', '')
	  	$scope.$apply(function(){
	  		return $location.path("/mybooks/" + user.uid)
	  	})
	});
	$scope.login.email = '';
	$scope.login.password = '';
	
 }

})



