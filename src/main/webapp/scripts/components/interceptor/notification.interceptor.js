 'use strict';

angular.module('furmanDealerApp')
    .factory('notificationInterceptor', function ($q, AlertService) {
        return {
            response: function(response) {
                var alertKey = response.headers('X-furmanDealerApp-alert');
                if (angular.isString(alertKey)) {
                    AlertService.success(alertKey, { param : response.headers('X-furmanDealerApp-params')});
                }
                return response;
            }
        };
    });
