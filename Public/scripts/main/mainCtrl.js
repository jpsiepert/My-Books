var app = angular.module("myBooks");

app.controller("mainCtrl", function($scope, $location, mainService){


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
        allowOutsideClick: true,
        confirmButtonColor: "#871D1A"
      })
  }
});
}
 

$scope.forgotPassword = function(email){
  if(!email){
    swal({
      title: "Please enter e-mail",
      confirmButtonColor: "#871D1A"
    })
  } else {
    swal({
      title: "Send New Password?",
      text: "Is this your e-mail? " + email,
      showCancelButton: true,
      confirmButtonText: "Yes! Send Password",
      cancelButtonText: "No! Enter E-mail",
      closeOnConfirm: false,
      confirmButtonColor: "#871D1A"
    },
    function(){
        mainService.resetPassword(email, function(error){
          if(!error){
            swal("Success!", "check your e-mail for new password", "success")
          }
        })
      
    })
  }
}

$scope.openUp = function(){
 	return mainService.login($scope.login, function(user, err){
    if(!user){
      swal({
        title: "Oops!",
        text: "Invalid E-mail or Password, Please try again.",
        confirmButtonColor: "#871D1A"
      })
      $scope.login = '';
    } else {
      if(user.password.isTemporaryPassword){
        user.uid = user.uid.replace('simplelogin:', '')
        
        $scope.$apply(function(){
          return $location.path("/mybooks/" + user.uid + "/profile")
      })
      
      } else {
   		  user.uid = user.uid.replace('simplelogin:', '')
  	  	
        $scope.$apply(function(){
  	  	  return $location.path("/mybooks/" + user.uid)
	  	  })
      }
    }
	});
	$scope.login.email = '';
	$scope.login.password = '';
	
 }

})



