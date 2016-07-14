(function (module) {

    var addToken = function (currentUser, $q) {

        var request = function (config) {
            if (currentUser.getProfile().isLoggedIn) {
                config.headers.Authorization = "Bearer " + currentUser.getProfile().token;
            }
            return $q.when(config);
        };

        return {
            request: request
        }
    };

    module.factory("addToken", addToken);
    module.config(function ($httpProvider) {
        $httpProvider.interceptors.push("addToken");
    });

}(angular.module("common.services")));