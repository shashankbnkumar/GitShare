(function () {
    "use strict";

    angular
        .module("taskManagement")
        .controller("TaskEditCtrl",
                     ["taskResource", "currentUser", "$routeParams", "$location", "$scope",
                     TaskEditCtrl]);

    function TaskEditCtrl(taskResource, currentUser, $routeParams, $location, $scope) {
        var vm = this;

        vm.authorized = false;
        vm.getTaskById = function () {
            var pId = 0;
            if ($routeParams.taskId != undefined) {
                pId = $routeParams.taskId
            }
            taskResource.get(
                { id: pId },
                function (data) {
                    vm.task = data;
                    vm.originalTask = angular.copy(data);
                },
                function (response) {
                    vm.message = response.statusText + "\r\n";
                    if (response.data.exceptionMessage)
                        vm.message += response.data.exceptionMessage;
                });

        }

        if (currentUser.getProfile().isLoggedIn) {
            vm.authorized = true;
        }

        //$scope.$on('loggedIn', function (event, args) {
        //    if (args.userName != '') {
        //        vm.authorized = true;
        //        vm.getTaskById();
        //     }
        //});

        vm.task = {};
        vm.message = '';

        if (vm.authorized) {

            vm.getTaskById();
        }
        else {
            $location.path("/");
        }



        if (vm.task && vm.task.taskId) {
            vm.title = "Edit: " + vm.task.taskName;
        }
        else {
            vm.title = "New Task";
        }


        vm.submit = function () {
            vm.message = '';
            if (vm.task.taskId) {
                vm.task.$update({ id: vm.task.taskId },
                    function (data) {
                        vm.message = "... Save Complete";
                    },
                    function (response) {
                        vm.message = response.statusText + "\r\n";
                        if (response.data.modelState) {
                            for (var key in response.data.modelState) {
                                vm.message += response.data.modelState[key] + "\r\n";
                            }
                        }
                        if (response.data.exceptionMessage)
                            vm.message += response.data.exceptionMessage;
                    });
            }
            else {
                vm.task.$save(
                    function (data) {
                        vm.originalTask = angular.copy(data);

                        vm.message = "... Save Complete";
                    },
                    function (response) {
                        vm.message = response.statusText + "\r\n";
                        if (response.data.modelState) {
                            for (var key in response.data.modelState) {
                                vm.message += response.data.modelState[key] + "\r\n";
                            }
                        }
                        if (response.data.exceptionMessage)
                            vm.message += response.data.exceptionMessage;
                    });
            }
        };

        vm.cancel = function (editForm) {
            editForm.$setPristine();
            vm.task = angular.copy(vm.originalTask);
            vm.message = "";

        };

        vm.back = function () {
            $location.path("/");
        }

    }
}());
