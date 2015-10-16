angular.module('quiksApp.controllers',['quiksApp.services'])
    .controller('FormCtrl',[
        '$scope',
        function($scope){
            $scope.formData = {};
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
            }
    }])

    .controller('LoginCtrl',[
        '$scope',
        'Auth',
        function($scope,Auth){

                $scope.submitLogin = function(){
                    $scope.loginData = {
                        code: $scope.code,
                        mobile_number: $scope.formData.mobile_number
                    };

                    Auth.sendCode($scope.loginData).then(function(successResponse){
                        console.log(successResponse);
                    },function(failureResponse){
                        console.log(failureResponse)
                    })

                };
        }])


    .controller('UpdateCtrl',[
        '$scope',
        'Contacts',
        'Auth',
        function($scope,Contacts,Auth){
            $scope.isLoggedIn = Auth.isLoggedIn;
            $scope.currentUser = Auth.currentUser;
            $scope.logOut = Auth.logOut;
            $scope.contacts = Contacts.contacts;

            $scope.addContact = function(){
                //if (!$scope.local_number||$scope.local_number===""){return;}
                Contacts.create({
                    name:$scope.name,
                    local_number: $scope.local_number
                });
            }
        }
    ]);
