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
    .controller('ChangePasswordController',['$scope','$location','authentication','role','noty',function($scope,$location,authentication,role,noty){

        if(!role.isAuthenticated()){
            $location.path('/login');
        }

        var token=role.getToken();
        $scope.isAuthenticated=role.isAuthenticated();

            $scope.changePassword=function(changePasswordData){

                authentication.changePassword(token,changePasswordData)
                    .then(function () {
                        noty.show('The password is changed successful!',"success");
                        setTimeout(function(){ noty.closeAll() }, 1500);
                        $location.path('/');
                    }, function (error) {
                        noty.show('The password change failed! '+ error.data.error_description,"error");
                        setTimeout(function(){ noty.closeAll() }, 2000);
                    });
            }
    }]);