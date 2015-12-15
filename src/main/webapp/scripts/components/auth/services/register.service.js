'use strict';

angular.module('furmanDealerApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


