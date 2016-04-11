'use strict';

angular.module('issueTracker.users.role')
    .factory('role',['$http','$q','$cookies',function($http,$q,$cookies){

        var accessToken='';
        var userName='';
        var isAuthenticated=false;

        function rememberUser(token, username){
            if(accessToken){

            } else {

                accessToken=token;
                userName=username;
                $cookies.put('usr_it',user.access_token);
                $cookies.put('userName',user.userName);

                isAuthenticated=true;
            }

        }

        function getUser(){
            return{
                userName:userName
            }
        }

        function isAuthenticated(){
           return isAuthenticated;
        }

        return{
            rememberUser:rememberUser,
            getUser:getUser,
            isAuthenticated:isAuthenticated
        }
        ;
    }]);