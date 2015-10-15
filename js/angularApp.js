//eabbd448cae88b9c7704e938a5564472d40b72c5
angular.module('quiksApp',['ngAnimate','ui.router','quiksApp.controllers'])

.config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider,$urlRouterProvider){
            $stateProvider
            .state('form',{
                    url: '/form',
                    templateUrl: 'templates/form.html',
                    controller: 'FormCtrl'
                })

            .state('form.verification',{
                    url: '/verification',
                    templateUrl: 'templates/form-verification.html',
                    controller: 'VerificationCtrl'
                })

            .state('form.login',{
                    url: '/login',
                    templateUrl: 'templates/form-login.html',
                    controller: 'LoginCtrl'
                });

            $urlRouterProvider.otherwise('/form/verification');
        }]);
