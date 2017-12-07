app.service('BaseService', ['$http', 'NgMap', function($http, NgMap) {
    var self = this;

    self.events = {
	list: [],
	cityList: [],
    };

    self.orgs = {};

    self.getEvents = function() {
//	console.log('Getting Inventory');
	$http({
	    method: 'GET',
	    url: 'https://api.mnactivist.org/api/events'
//	    url: 'http://localhost:8000/api/events'
	}).then(function(response) {
//	    console.log('Got Events', response.data.results);
	    self.events.list = response.data.results;
	});
    };
    self.getEvents();
    
    self.getCityEvents = function(cal, city) {
//	console.log('Getting Single Citys Events');
	var time = 'y';
	$http({
	    method: 'GET',
 	    url: 'https://api.mnactivist.org/api/events?cal=' + cal +'&city_name=' + city + '&time=' + time
//	    url: 'http://localhost:8000/api/events?cal=' + cal +'&city_name=' + city + '&time=' + time
	}).then(function(response) {
//	    console.log('Got City List', response.data.results);
	    self.events.cityList = response.data.results;
	});
    };


    self.sendSearch = function(search){
//	console.log('Sending Search');
	$http({
	    method: 'GET',
	    url: 'https://api.mnactivist.org/api/search?q='+ search
	}).then(function(response){
//	    console.log('Got Orgs', response.data);
	    self.orgs.list = response.data.results;
	});
    };

    self.getOrgs = function() {
//	console.log('Getting Orgs');
	$http({
	    method: 'GET',
	    url: 'https://api.mnactivist.org/api/orgs'
	}).then(function(response) {
//	    console.log('Got Orgs', response.data);
	    self.orgs.list = response.data.results;
	});
    };

}]);
