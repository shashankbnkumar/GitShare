(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("userAccount",
                ["$resource",
                 "appSettings", "$rootScope",
                    userAccount])

    function userAccount($resource, appSettings, $rootScope) {
        return {
            registration: $resource(appSettings.serverPath + "/api/Account/Register", null,
                    {
                        'registerUser': { method: 'POST' }
                    }),
            login: $resource(appSettings.serverPath + "/Token", null,
                    {
                        'loginUser': {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            transformRequest: function (data, headersGetter) {
                                var str = [];
                                for (var d in data)
                                    str.push(encodeURIComponent(d) + "=" +
                                                        encodeURIComponent(data[d]));
                               // $rootScope.$broadcast('loggedIn', data);
                                return str.join("&");
                            }

                        }
                    })
        }
    }
})();
