var app = angular.module("myBooks")

app.service("mainService", function($firebase){
	
	var fbUrl = "https://boiling-heat-705.firebaseio.com/";
	
	var fbLogin = new Firebase(fbUrl);
	
 this.register = function(user, cb){
		fbLogin.createUser({
			email: user.email,
			password: user.password
		}, function(error) {
			if (error === null) {
				console.log("User created successfully");
				fbLogin.authWithPassword({
						email    : user.email,
						password : user.password
					}, function(err, authData) {
				  if (authData) {
				  	authData.name = user.name;
				  	authData.userId = authData.uid.replace("simplelogin:", "");
				    fbLogin.child('users').child(authData.uid.replace('simplelogin:', '')).set(authData);
				    cb(authData);
				  } else {
				  	console.log('something went wrong');
				  }
				});
			} else {
				console.log("Error creating user:", error);
				return false;
			}
		});
	}

	this.login = function(user, cb){
		fbLogin.authWithPassword({
			email    : user.email, 
			password : user.password
		}, function(err, authData) {
			if (err) {
				switch (err.code) {
					case "INVALID_EMAIL":
			        // handle an invalid email 
			        case "INVALID_PASSWORD":
			        // handle an invalid password
			        default:
			    }
			} else if (authData) {
			    // user authenticated with Firebase
			    console.log("Logged In! User ID: " + authData.uid);
			    cb(authData); //gives the authenticated user to our callback
			}
		});
	}

	this.getUser = function(userId){
		return $firebase(new Firebase(fbUrl + 'users/' + userId)).$asObject();
	}

	this.getBooks = function(userId){
		return $firebase(new Firebase(fbUrl + 'users/' + userId + '/books')).$asArray();	
	}

})