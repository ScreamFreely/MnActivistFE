app.controller('AuxController', ['BaseService', 'UserService', '$window', '$mdSidenav', function(BaseService, US, $window, $mdSidenav) {
    console.log('HomeController loaded');
    var self = this;

    self.subscribeList = false;
    self.search = '';
    self.org_search = '';
    self.sendSearch = BaseService.sendSearch;
    self.orgs = BaseService.orgs;
    self.toggleMenu = function() {
	console.log('btn mnue click');
	$mdSidenav('left').toggle();
    }    

    
    if (US.userObject.isLogged){
	self.isLogged = US.userObject.isLogged;
    } else {
	self.isLogged = false;
    }
    }]);
