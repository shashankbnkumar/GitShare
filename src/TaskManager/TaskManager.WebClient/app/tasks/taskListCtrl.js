(function () {
    "use strict";
    angular
        .module("taskManagement")
        .controller("TaskListCtrl",
                     ["taskResource", "currentUser", "$location", "$scope",
                         TaskListCtrl]);

    function TaskListCtrl(taskResource, currentUser, $location, $scope) {


        var vm = this;

        $scope.$on('loggedIn', function (event, currentUser) {
            if (currentUser!= undefined && currentUser.getProfile().isLoggedIn) {
                vm.authorized = true;
            }
        });

        vm.authorized = false;
        if (currentUser.getProfile().isLoggedIn) {
            vm.authorized = true;
        }
        vm.add = function () {
            $location.path("/new/");
        }
        taskResource.query({
            $orderby: "DueDate"
        },
        function (data) {
            vm.tasks = data;
        });


    }
}());
