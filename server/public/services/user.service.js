app.factory('UserService', function($http, $location){
    console.log('UserService Loaded');

    var userObject = {};

    return {
	userObject : userObject,
	username: '',
	getuser : function(){
	    console.log('UserService -- getuser');
	    $http.get('/user').then(function(response) {
		if(response.data.username) {
		    console.log('got user', response.data)
		    userObject.userName = response.data.username;
		    userObject.type = response.data.type;
		    username = response.data.username;	     
		    userObject.user_id = response.data.user_id;
		    userObject.isLogged = true;
		    //              console.log('UserService -- getuser -- UserObject Data: ', userObject);
		                 console.log('UserService -- getuser -- User Details: ', userDetails);
		} else {
		    console.log('UserService -- getuser -- failure');
		    // user has no session, bounce them back to the login page
		    $location.path("/home");
		}
	    },function(response){
		console.log('UserService -- getuser -- failure: ', response);
		$location.path("/home");
	    });
	},

	logout : function() {
	    console.log('UserService -- logout');
	    $http.get('/user/logout').then(function(response) {
		console.log('UserService -- logout -- logged out');
		$location.path("/home");
	    });
	}
    };
});
