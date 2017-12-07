// var app = angular.module('LiveFreeApp', ['ngRoute']);

var app = angular.module('MnApp', ['hc.marked', 'ngRoute', 'xeditable', 'ngMap', 'ngMaterial']);

app.run(function(editableOptions) {
    editableOptions.theme = 'default'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

app.filter('capitalize', function() {
    return function(input, scope) {
	if (input!=null)
	    input = input.replace(/-/g, ' ');
	input = input.toLowerCase();
	return input.substring(0,1).toUpperCase()+input.substring(1);
    }
});

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
	.when('/home', {
	    templateUrl: '/views/templates/home.html',
	    controller: 'LoginController as lc',
	})
	.when('/register', {
	    templateUrl: '/views/templates/register.html',
	    controller: 'LoginController as lc'
	})
	.when('/user', {
	    templateUrl: '/views/templates/user.html',
	    controller: 'UserController as uc',
	    resolve: {
		getuser : function(UserService){
		    return UserService.getuser();
		}
	    }
	})
	.when('/org/:id', {
	    templateUrl: '/views/templates/org.html',
	    controller: 'OrgController as oc',
//	    resolve: {
//		getuser : function(UserService){
//		    return UserService.getuser();
//		}
//	    }
	})
	.when('/:cal/:city', {
	    templateUrl: '/views/templates/city.html',
	    controller: 'CityController as cc',
	})
	.when('/search', {
	    templateUrl: '/views/templates/search.html',
	})
	.when('/', {
	    templateUrl: 'views/templates/main.html',
	    controller: 'HomeController',
	    controllerAs: 'hc'
	})
}]);
