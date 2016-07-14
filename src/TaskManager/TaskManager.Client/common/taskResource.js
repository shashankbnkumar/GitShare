(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("taskResource",
                ["$resource",
                 "appSettings",
                 "currentUser",
                    taskResource])

    function taskResource($resource, appSettings, currentUser) {
        return $resource(appSettings.serverPath + "/api/tasks/:id", null,
            {
                'get': {
                    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
                },

                'save': {
                    method: 'POST',
                    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token },
                },

                'update': {
                    method: 'PUT',
                    headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
                }
            });
    }
}());

