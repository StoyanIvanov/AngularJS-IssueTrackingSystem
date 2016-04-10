'use strict';

angular.module('issueTracker.authentication',[])
    .factory('authentication',['$http','$q','BASE_URL', function($http,$q,BASE_URL){

        function registerUser(user){
            var deferred=$q.defer();

            $http.post(BASE_URL+'api/users/Register',user)
                .then(function(success){
                    deferred.resolve(success.data);
                },function(error){
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function loginUser(user){
            var deferred=$q.defer();

            $http.post(BASE_URL+'api/users/Login',user)
                .then(function(user){
                    deferred.resolve(user.data);
                },function(error){
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function logoutUser(){

        }

        return {
            registerUser:registerUser,
            loginUser:loginUser,
            logoutUser:logoutUser

        }
    }]);