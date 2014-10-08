var app = angular.module("myBooks")

app.service("EnvironmentService", function($window){
	this.getEnv = function(){
		return $window.env
	}
})