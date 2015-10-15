angular.module('quiksApp.controllers',['quiksApp.services'])
    .controller('FormCtrl',[
        '$scope',
        function($scope){
            $scope.formData = {};
           //$scope.processForm = alert('awesome!!!')

           /* $scope.verificateData = function(){
                Verification.sendData($scope.domainInput.domain).then(function(successResponse){
                    $scope.dataLoaded = true;
                    $scope.siteInfo = successResponse.data;
                    console.log(successResponse);
                },function(failureResponse){
                    $scope.dataLoaded = false;
                    console.log(failureResponse);
                });
            }*/
        }
    ])

    .controller('VerificationCtrl',[
        '$scope',
        '$http',
        function($scope,$http){
            $scope.verificateData = function() {
                $scope.verificData = {};
                    verificData = {
                        mobile_number: $scope.formData.mobile_number,
                        country: $scope.formData.country
                    };
                    console.log(verificData);
                    $http({
                        method: 'POST',
                        url: 'http://rest.quiks.me/api/auth/verification/',
                        data: verificData
                    })
                        .then(function (successResponse) {
                            console.log('OK');
                            console.log(successResponse);
                        },function (failureResponse) {
                            console.log(failureResponse);
                        });
                       // .error(function () {
                         //   console.log('error')
                        //});
            }
    }])

    .controller('LoginCtrl',[
        '$scope',
        '$http',
        function($scope,$http){
            $scope.sendSMS = function() {
                $scope.loginData = {};
                loginData = {
                    code: $scope.sms,
                    mobile_number: $scope.formData.mobile_number
                };
                console.log(loginData);
                $http({
                    method: 'POST',
                    url: 'http://rest.quiks.me/api/auth/login/',
                    data: loginData
                })
                    .then(function (successResponse) {
                        console.log(successResponse);
                        console.log(successResponse.data.token);
                    },function (failureResponse) {
                        console.log(failureResponse);
                    });
            }
        }])
