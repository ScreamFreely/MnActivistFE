// Venues
app.controller('CityController', ['BaseService', 'UserService', 'NgMap', '$routeParams', function(BaseService, US, NgMap, $routeParams) {
    console.log('CityController loaded');

    if ($routeParams.city){
	var city = $routeParams.city;
	var cal = $routeParams.cal;
	BaseService.getCityEvents(cal, city);
    } 

    var self = this;
    self.events = BaseService.events;
//    self.userDetails = US.userDetails;
//    self.voteUp = VenueService.voteUp;
//    self.voteDown = VenueService.voteDown;
//    self.newReview = false;

/*    self.addReview = function(artist, venue) {
	VenueService.addReview(artist, venue, self.venues.single.new_review);
	self.newReview = false;
    }
*/
    self.range = function(n) {
        return new Array(n);
    };

}]);
