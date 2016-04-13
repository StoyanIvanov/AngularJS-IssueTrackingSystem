'use strict';

angular.module('issueTracker.users.role',[])
    .factory('role',['$http','$q','$cookies','authentication',function($http,$q,$cookies,authentication){

        var accessToken='';
        var userName='';
        var UserAuthenticated=false;
        var user=undefined;

        function rememberUser(token, username) {
            accessToken = token;
            userName = username;
            $cookies.put('usr_it', accessToken);
            $cookies.put('userName', userName);
            UserAuthenticated = true;

            authentication.getUser(accessToken)
                .then(function (userData) {
                    user = userData;
                });
        }

        function isAuthenticated(){
           return UserAuthenticated;
        }

        function getUser(){
            if(user){
                return $q.when(user)
            } else {
                return authentication.getUser(accessToken);
            }
        }

        return{
            rememberUser:rememberUser,
            isAuthenticated:isAuthenticated,
            getUser:getUser
        };
    }]);