angular.module('quiksApp.services',[])
    .factory('Verification',[
        '$http',
        '$q',
        function($http,$q){
            var o = null;
            return{
                sendData: function (domain) {
                    var deferred = $q.defer();

                    var domainVal = String(domain);

                    $http.get('http://rest.quiks.me/api/auth/verification/', {
                        contentType: 'application/json',
                        data: angular.toJson(o),
                        cache: false
                    })

                        .then(function (successResponse) {
                            //console.log('success', successResponse);
                            deferred.resolve(successResponse);
                            o = domain;
                        }, function (failureResponse) {
                            //console.log('error', failureResponse);
                            deferred.reject(failureResponse);
                        });
                    return deferred.promise;
                }
            };

        }
    ]);
