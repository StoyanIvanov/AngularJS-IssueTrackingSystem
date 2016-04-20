'use strict';

angular.module('issueTracker.changePasswordController',[
        'issueTracker.authentication'
    ])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/profile/password',{
            templateUrl:'app/templates/changePassword.html',
            controller:'ChangePasswordController'
        })

    }])
    .controller('ChangePasswordController',['$scope','$location','authentication','role',function($scope,$location,authentication,role){

        if(!role.isAuthenticated()){
            $location.path('/login');
        }

        var token=role.getToken();
        $scope.isAuthenticated=role.isAuthenticated();

            $scope.changePassword=function(changePasswordData){
                console.log(changePasswordData);
                authentication.changePassword(token,changePasswordData)
                    .then(function (response) {
                    })
            }



    }]);