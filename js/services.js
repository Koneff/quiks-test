angular.module('quiksApp.services',[])

    .factory('Auth', ['$http','$q', '$window', function($http,$q, $window){
        var auth = {};
        var user ={};

        auth.sendCode = function (loginData) {
                var deferred = $q.defer();

                $http( {
                    method: 'POST',
                    url: 'http://rest.quiks.me/api/auth/login/',
                    data: loginData
                })
                    .then(function (successResponse) {
                        deferred.resolve(successResponse);
                        auth.saveToken(successResponse.data.token);
                        user = successResponse.data.user;
                    }, function (failureResponse) {
                        deferred.reject(failureResponse);
                    });
                return deferred.promise;
            };

        auth.saveToken = function (token){
            $window.localStorage['quiks-token'] = token;
        };

        auth.getToken = function (token){
            return $window.localStorage['quiks-token'];
        };

        auth.isLoggedIn = function(){
            var token = auth.getToken();
            if(token){
                return true;

            } else {
                return false
            }
        };

        auth.currentUser = function(){
            if(auth.isLoggedIn()) {
                return user.username;
            }
        };

        auth.logOut = function(){
            return $window.localStorage.removeItem('quiks-token');
        };
        return auth;

    }])

    .factory('Contacts',['$http','$q','Auth',function($http,$q,Auth){
        var o = {
            contacts: []
        };
        o.create = function(contact) {
            var deferred = $q.defer();
            console.log(o.contacts);
            return $http({
                headers: {
                    Authorization: 'Token '+Auth.getToken(),
                    'Accept': 'application/json, text/javascript',
                    'Content-Type': 'application/json; charset=utf-8'
                },
                method: 'POST',
                url: 'http://rest.quiks.me/api/contacts/update/',
                data: {"contacts" : o.contacts.push(contact)}
            }).then(function(successResponse){

                deferred.resolve(successResponse);


            }, function(failureResponse){
                deferred.reject(failureResponse);
            });
            return deferred.promise;
        };
        return o;
    }]);
