var app = angular.module("myBooks")

app.service("mainService", function($firebase){
	
	var fbUrl = "https://my-book-collection.firebaseio.com/";
	
	var fbLogin = new Firebase(fbUrl);

	this.logOut = function(){
		localStorage.setItem('user', '');
		fbLogin.unauth()
	}

	var setUser = function(user){
		console.log(user)
		user.uid = user.uid.replace('simplelogin:', '');
		localStorage.setItem('user', JSON.stringify(user));
	};

	this.getAuth = function(){
		if(localStorage.getItem('user')){
			return JSON.parse(localStorage.getItem('user'));
		} else {
			return false;
		}
	};

 this.register = function(user, cb){
 	var message;
		fbLogin.createUser({
			email: user.email,
			password: user.password
		}, function(error) {
			if (error === null) {
				fbLogin.authWithPassword({
						email    : user.email,
						password : user.password
					}, function(err, authData) {
				  if (authData) {
				  	authData.name = user.name;
				  	authData.userId = authData.uid.replace("simplelogin:", "");
				    fbLogin.child('users').child(authData.uid.replace('simplelogin:', '')).set(authData);
				    setUser(authData);
				    cb(authData, message);
				  } else {
				  	message = "Something went wrong, please try again";
				  	cb(null, message);
				  }
				});
			} else {
				message = "E-mail already in use";
				cb(null, message)
			}
		});
	}

	this.login = function(user, cb){
		fbLogin.authWithPassword({
			email    : user.email, 
			password : user.password
		}, function(err, authData) {
			if (err) {
				cb(null, err)
			    
			} else if (authData) {
			    // user authenticated with Firebase
			    setUser(authData);
			    cb(authData); //gives the authenticated user to our callback
			}
		});
	};

	this.resetPassword = function(user, cb){
		fbLogin.resetPassword({
		    email : user
		  }, function(error) {
		  if (error === null) {
		    console.log("Password reset email sent successfully");
		    cb(null)
		  } else {
		    console.log("Error sending password reset email:", error);
		    cb(error)
		  }
		});
	};

	this.updatePassword = function(email, cb){

	}

	this.getUser = function(userId){
		return $firebase(new Firebase(fbUrl + 'users/' + userId)).$asObject();
	}

	this.getBooks = function(userId){
		return $firebase(new Firebase(fbUrl + 'users/' + userId + '/books')).$asArray();	
	}

	this.getComments = function(userId, bookId){
		return $firebase(new Firebase(fbUrl + 'users/' + userId + '/books' + bookId + "/comments")).$asArray();
	}

	this.getIBooks = function(userId){
		return $firebase(new Firebase(fbUrl + '/users/' + userId + '/iBooks')).$asArray();
	}

})