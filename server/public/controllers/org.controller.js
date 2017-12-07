// Venues
app.controller('OrgController', ['OrgService', 'UserService', 'NgMap', '$routeParams', function(OrgService, US, NgMap, $routeParams) {
    console.log('OrgController loaded');

    if ($routeParams.id){
	OrgService.getOrg($routeParams.id);
    } else {
	OrgService.getOrgs();
    }

    var self = this;

//    self.userDetails = US.userDetails;
    self.orgs = OrgService.orgs;
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
