app.controller('UserController', ['UserService', function(UserService) {
    console.log('UserController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.userDetails = UserService.userDetails;
    vm.userSocial = UserService.userSocial;
    vm.search = '';

}]);
