app.controller('HomeController', ['BaseService', 'UserService', '$window', '$mdSidenav', function(BaseService, US, $window, $mdSidenav) {
    console.log('HomeController loaded');
    var self = this;

//    BaseService.getEvents();
//    BaseService.getOrgs();    

    self.events = BaseService.events;
    self.orgs = BaseService.orgs;
    self.search = '';
    self.toggleMenu = function() {
	console.log('btn mnue click');
	$mdSidenav('left').toggle();
    }    

    
    if (US.userObject.isLogged){
	self.isLogged = US.userObject.isLogged;
    } else {
	self.isLogged = false;
    }

    self.toggleNotes = function(evid){
	
    }

    }]);
