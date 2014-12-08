var app = angular.module("myBooks");

app.controller("ProfileCtrl", function($scope, $location, mainService){

	$scope.changePasswordBtn = true;
	$scope.passwordMessage = false;

	$scope.backToBooks = function(){
		$location.path("/mybooks/" + $scope.user.$id)
	};

	 $scope.checkPasswords = function(){
	 	if($scope.profile.newPassword !== $scope.confirmPassword && $scope.profile.newPassword.length && $scope.confirmPassword){
		  $scope.changePasswordBtn = false;
		  $scope.passwordMessage = true;
	  	}else {
		  $scope.changePasswordBtn = true;
		  $scope.passwordMessage = false;
	  }
 }


	$scope.updatePassword = function(){
		currentUser = {
			email: $scope.user.password.email,
			newPassword: $scope.profile.newPassword,
			oldPassword: $scope.profile.oldPassword
		}
		mainService.updatePassword(currentUser, function(updatedUser, err){
			if(updatedUser){
				swal({
					title: "Password Updated!",
					type: "success",
					confirmButtonColor: "#871D1A"
				});
				
			} else {
				swal({
					title: "Something went wrong, try again",
					type: "error",
					confirmButtonColor: "#871D1A"
				})
			}
	
		})
		$scope.profile = '';
		$scope.confirmPassword = '';
	}
});