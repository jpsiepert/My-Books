var app = angular.module("myBooks")

app.service("mainService", function($firebase){
	
	var fbUrl = "https://my-book-collection.firebaseio.com/";
	
	var fbRef = new Firebase(fbUrl);

	this.logOut = function(){
		localStorage.setItem('user', '');
		fbRef.unauth()
	}

	var setUser = function(user){
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
		fbRef.createUser({
			email: user.email,
			password: user.password
		}, function(error) {
			if (error === null) {
				fbRef.authWithPassword({
						email    : user.email,
						password : user.password
					}, function(err, authData) {
				  if (authData) {
				  	authData.name = user.name;
				  	authData.userId = authData.uid.replace("simplelogin:", "");
				    fbRef.child('users').child(authData.uid.replace('simplelogin:', '')).set(authData);
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
		fbRef.authWithPassword({
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
		fbRef.resetPassword({
		    email : user
		  }, function(error) {
		  if (error === null) {
		    
		    cb(null)
		  } else {
		    
		    cb(error)
		  }
		});
	};

	this.updatePassword = function(user, cb){
		fbRef.changePassword({
		  email: user.email,
		  oldPassword : user.oldPassword,
		  newPassword : user.newPassword
		}, function(error) {
		  if (!error) {
		    cb(user);
		  } else {
		 
		    cb(null, error)
		  }
		});
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
		return $firebase(new Firebase(fbUrl + 'users/' + userId + '/iBooks')).$asArray();
	}

})