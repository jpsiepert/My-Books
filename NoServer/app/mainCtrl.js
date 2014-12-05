var app = angular.module("myBooks");

app.controller("mainCtrl", function($scope, $location, mainService, EnvironmentService){

 $scope.env = EnvironmentService.getEnv();


 
 $scope.loginForm = true;
 $scope.theSignUpForm = false;
 $scope.passwordCheck = false;
 $scope.signUpButton = true;
 //$scope.error = false;

  $scope.showSignupForm = function(){
 		$scope.theSignUpForm = true;
 		$scope.mainbuttons = false;
    $scope.loginForm = false;
    $scope.signUp = '';
    $scope.confirmPassword = '';
    $scope.passwordCheck = false;
 }

 $scope.showloginForm = function(){
 	$scope.loginForm = true;
  $scope.theSignUpForm = false;
 	$scope.login = '';
 };

 $scope.checkPasswords = function(){
  if($scope.signUp.password !== $scope.confirmPassword && $scope.signUp.password.length && $scope.confirmPassword){
    $scope.passwordCheck = true;
    $scope.signUpButton = false;
  }else {
    $scope.passwordCheck = false;
    $scope.signUpButton = true;
  }
 }

$scope.register = function(){
  return mainService.register($scope.signUp, function(user, err){
    if(user){
      user.uid = user.uid.replace('simplelogin:', '');
      $scope.$apply(function(){
        return $location.path("/mybooks/" + user.uid)
      });
      $scope.signUp = ''
    } else {
      swal({
        title: "Oops!",
        text: "That e-mail is already in use",
        allowOutsideClick: true
      })
  }
});
}
 

$scope.forgotPassword = function(email){
  if(!email){
    swal({
      title: "Please enter e-mail"
    })
  } else {
    swal({
      title: "Send New Password?",
      text: "Is this your e-mail? " + email,
      showCancelButton: true,
      confirmButtonText: "Yes! Send Password",
      cancelButtonText: "No! Enter E-mail",
      closeOnConfirm: false
    },
    function(){
      debugger;
        mainService.resetPassword(email, function(error){
          if(!error){
            swal("Success!", "check your e-mail for new password", "success")
          }
        })
      
    })
  }
}

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



