'use strict';

angular.module('issueTracker.users.role',[])
    .factory('role',['$http','$q','$cookies','authentication',function($http,$q,$cookies,authentication){

        var accessToken='';
        var userName='';
        var userAuthenticated=false;
        var user=undefined;

        function rememberUser(loginUser) {
            $cookies.put('userName', loginUser.userName);
            $cookies.put('userID', loginUser.Id);
            $cookies.put('isAdmin', loginUser.isAdmin);
            userAuthenticated = true;
            user=loginUser;

        }

        function isAuthenticated(){

            if(!$cookies.get('usr_it') && userAuthenticated==false){
                return false;
            }

            if(user || $cookies.get('usr_it')){
               return true;
            }

        }

        function getUser(){
            if(user){
                return $q.when(user)
            } else {
                return authentication.getUser($cookies.get('usr_it'))
            }
        }

        function getRole(){
            return user.isAdmin;
        }

        function getToken(){
            return $cookies.get('usr_it');
        }

        return{
            rememberUser:rememberUser,
            isAuthenticated:isAuthenticated,
            getUser:getUser,
            getToken:getToken,
            getRole:getRole
        };
    }]);