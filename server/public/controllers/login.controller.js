app.controller('LoginController', function($http, $location, UserService, NgMap) {
    console.log('LoginController created');
      var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        neighborhood: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
      };



    var vm = this;
    vm.user = {
	username: '',
	password: '',
	type: ''
    };
    vm.message = '';


    vm.types = "['establishment']";

//    NgMap.getMap().then(function(map) {
//	vm.map = map;
//    });


    vm.placeChanged = function() {
	vm.place = this.getPlace();
//	vm.map.setCenter(vm.place.geometry.location);
	vm.user.latitude = vm.place.geometry.location.lat();
	vm.user.longitude = vm.place.geometry.location.lng();
	vm.user.phone = vm.place.international_phone_number;
	vm.user.website = vm.place.website;
	vm.user.google_place_id = vm.place.place_id;
	vm.user.google_rating = vm.place.rating;
	vm.user.description = vm.place.formatted_address;
	for (var i = 0; i < vm.place.address_components.length; i++) {
          var addressType = vm.place.address_components[i].types[0];
          if (componentForm[addressType]) {
            var val = vm.place.address_components[i][componentForm[addressType]];
            vm.user[addressType]= val;

          }
        }

	vm.user.position = vm.user.street_number + ' ' + vm.user.route + ', ' + vm.user.locality + ' ' + vm.user.administrative_area_level_1;
	console.log('user', vm.user);
	console.log('place', vm.place);
    }


    vm.login = function() {
	console.log('LoginController -- login');
	if(vm.user.username === '' || vm.user.password === '') {
            vm.message = "Enter your username and password!";
	} else {
            console.log('LoginController -- login -- sending to server...', vm.user);
            $http.post('/', vm.user).then(function(response) {
		if(response.data.username) {
		    console.log('LoginController -- login -- success: ', response.data);
		    // location works with SPA (ng-route)
		    $location.path('/venues'); // http://localhost:5000/#/user
		} else {
		    console.log('LoginController -- login -- failure: ', response);
		    vm.message = "Wrong!!";
		}
            }).catch(function(response){
		console.log('LoginController -- registerUser -- failure: ', response);
		vm.message = "Wrong!!";
            });
	}
    };

    vm.registerUser = function() {
	if (vm.user.type=='venue'){
	    vm.user.name = vm.user.name.split(',')[0];
	}
	console.log('LoginController -- registerUser');
	if(vm.user.username === '' || vm.user.password === '') {
            vm.message = "Choose a username and password!";
	} else {
            console.log('LoginController -- registerUser -- sending to server...', vm.user);
            $http.post('/register', vm.user).then(function(response) {
		console.log('LoginController -- registerUser -- success');
		$location.path('/home');
            }).catch(function(response) {
		console.log('LoginController -- registerUser -- error');
		vm.message = "Please try again."
            });
	}
    }
});
