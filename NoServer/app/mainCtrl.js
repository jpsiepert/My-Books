var app = angular.module("myBooks");

app.controller("mainCtrl", function($scope, $location, mainService, EnvironmentService){

 $scope.env = EnvironmentService.getEnv();


 
 $scope.loginForm = true;
 $scope.theSignUpForm = false;

  $scope.showSignupForm = function(){
 		$scope.theSignUpForm = true;
 		$scope.mainbuttons = false;
    $scope.loginForm = false;
 }

 $scope.showloginForm = function(){
 	$scope.loginForm = true;
  $scope.theSignUpForm = false;
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



