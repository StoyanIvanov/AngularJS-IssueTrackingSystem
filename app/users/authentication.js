'use strict';

angular.module('issueTracker.authentication',[])
    .factory('authentication',['$http','$q','BASE_URL','$cookies', function($http,$q,BASE_URL,$cookies){

        function registerUser(user){
            var deferred=$q.defer();

            $http.post(BASE_URL+'api/Account/Register',user)
                .then(function(success){
                    deferred.resolve(success.data);
                },function(error){
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function loginUser(user){
            var deferred=$q.defer();
            var data='username=' + encodeURIComponent(user.username) +
                '&password=' + encodeURIComponent(user.password) +
                '&grant_type=password';

            $http({
                method: 'POST',
                url: BASE_URL+'api/Token',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            }).then(function(response) {
                $cookies.put('usr_it', response.data.access_token);
                deferred.resolve(response.data);
            },function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function getUser(token){
            var deferred=$q.defer();
            var authorization='Bearer ' + token;

            $http.defaults.headers.common.Authorization=authorization;
            $http.get(BASE_URL+'users/me',$http.header)
                .then(function(user){
                    deferred.resolve(user.data);
                },function(error){
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getUsers(token){
            var deferred=$q.defer();
            var authorization='Bearer ' + token;

            $http.defaults.headers.common.Authorization=authorization;
            $http.get(BASE_URL+'Users/',$http.header)
                .then(function(user){
                    deferred.resolve(user.data);
                },function(error){
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getUserIssues(token,pageSize,pageNumber,orderBy){
            var deferred=$q.defer();
            var pageSize=pageSize || 10;
            var pageNumber=pageNumber || 1;
            var orderBy=orderBy || 'Project.Name desc, IssueKey';
            var authorization='Bearer ' + token;

            $http.defaults.headers.common.Authorization=authorization;
            $http.get(BASE_URL+'Issues/me?orderBy='+orderBy+'&pageSize='+pageSize+'&pageNumber='+pageNumber,$http.header)
                .then(function(issues){
                    deferred.resolve(issues.data);
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
            logoutUser:logoutUser,
            getUser:getUser,
            getUserIssues:getUserIssues,
            getUsers:getUsers
        }
    }]);