app.service('OrgService', ['$http', 'NgMap', function($http, NgMap) {
    var self = this;

    self.orgs = {
	list: [],
	single: {},
	newOrg: {},
	vote: {}
    };

    self.getOrgs = function() {
//	console.log('Getting Inventory');
	$http({
	    method: 'GET',
	    url: 'https://api.mnactivist.org/api/orgs'
	}).then(function(response) {
//	    console.log('Got Inventory', response.data);
	    self.orgs.list = response.data.results;
	});
    };

    self.getOrg = function(code) {
//	console.log('Getting Single Org');
	$http({
	    method: 'GET',
	    url: 'https://api.mnactivist.org/api/orgs?org=' + code
//    	    url: 'http://localhost:8000/api/orgs?org=' + code
	}).then(function(response) {
//	    console.log('Got Org', response.data);
	    self.orgs.single = response.data.results[0];
	    self.getOrgEvents(code);
	});
    };

    self.getOrgEvents = function(org){
	$http({
	    method: 'GET',
	    url: 'https://api.mnactivist.org/api/events?org=' + org	    
	}).then(function(response){
//	    console.log('Events', response.data.results);
	    self.orgs.single.events = response.data.results;
	})
    }

}]);
