(function () {
    "use strict";

    var app = angular.module("taskManagement", ["common.services", "ngRoute", "ui.date"]);


    app.config(function ($routeProvider) {

        $routeProvider
        .when("/", {
            templateUrl: "/app/tasks/taskListView.html",
            controller: "TaskListCtrl"
        })
        .when("/edit/:taskId", {
            templateUrl: "/app/tasks/taskEditView.html",
            controller: "TaskEditCtrl"
        })
        .when("/new/", {
            templateUrl: "/app/tasks/taskEditView.html",
            controller: "TaskEditCtrl"
        })
        .otherwise({ redirectTo: "/" });
    });

}());