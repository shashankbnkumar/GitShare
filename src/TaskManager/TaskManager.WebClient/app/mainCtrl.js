(function () {
    "use strict";

    angular
        .module("taskManagement")
        .controller("MainCtrl",
                    ["userAccount",
                        "currentUser", "$location","$rootScope",
                        MainCtrl]);

    function MainCtrl(userAccount, currentUser, $location, $rootScope) {
        var vm = this;
        vm.isLoggedIn = function () {
            return currentUser.getProfile().isLoggedIn;
        };
        vm.message = '';
        vm.userData = {
            userName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        vm.registerUser = function () {
            vm.userData.confirmPassword = vm.userData.password;

            userAccount.registration.registerUser(vm.userData,
                function (data) {
                    vm.confirmPassword = "";
                    vm.message = "... Registration successful";
                    vm.login();
                },
                function (response) {
                    vm.isLoggedIn = false;
                    vm.message = response.statusText + "\r\n";
                    if (response.data.exceptionMessage)
                        vm.message += response.data.exceptionMessage;

                    // Validation errors
                    if (response.data.modelState) {
                        for (var key in response.data.modelState) {
                            vm.message += response.data.modelState[key] + "\r\n";
                        }
                    }
                });
        }

        vm.login = function () {
            vm.userData.grant_type = "password";
            //vm.userData.email = "username@abc.com";
            //vm.userData.password = "Password@123";
            vm.userData.userName = vm.userData.email;

            userAccount.login.loginUser(vm.userData,
                function (data) {
                    vm.message = "";
                    vm.password = "";
                    currentUser.setProfile(vm.userData.userName, data.access_token);
                    $rootScope.$broadcast('loggedIn', currentUser);
                    $location.path("/");
                },
                function (response) {
                    vm.password = "";
                    vm.message = response.statusText + "\r\n";
                    if (response.data && response.data.exceptionMessage)
                        vm.message += response.data.exceptionMessage;

                    if (response.data && response.data.error) {
                        vm.message += response.data.error;
                    }
                    $location.path("/");
                });
        }
    }
})();
