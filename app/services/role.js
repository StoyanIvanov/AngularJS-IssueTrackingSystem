'use strict';

angular.module('issueTracker.users.role',[])
    .factory('role',[
        '$http',
        '$q',
        '$cookies',
        'authentication',
        '$rootScope',
        function($http,$q,$cookies,authentication,$rootScope){

        var userName='';
        var userAuthenticated=false;
        var user=undefined;

        function rememberUser(loginUser) {
            $cookies.put('userName', loginUser.userName);
            $cookies.put('userID', loginUser.Id);
            $cookies.put('isAdmin', loginUser.isAdmin);
            $cookies.put('usr_it', loginUser.access_token);
            if($cookies.get('usr_it')){
                authentication.getUser($cookies.get('usr_it'))
                    .then(function (userInfo) {
                        userAuthenticated = true;
                        user=userInfo;
                    });
            }
        }

        function isAuthenticated(){

            if(user!==undefined || $cookies.get('usr_it')){
               return true;
            }

            return false;
        }

        function getUser(){
            if(userAuthenticated){
                return $q.when(user)
            } else if($cookies.get('usr_it')) {
                return authentication.getUser($cookies.get('usr_it'))
            } else {
                return $q.when(userAuthenticated);
            }
        }

        function getRole(){
            return user.isAdmin;
        }

        function getToken(){
            return $cookies.get('usr_it');
        }

        function logout(){
            user=undefined;
            userAuthenticated=false;
            $cookies.remove('userName');
            $cookies.remove('usr_it');
            $cookies.remove('userID');
            $cookies.remove('isAdmin');

            $rootScope.currentUser=undefined;
            $rootScope.menuUser=false;
        }

        return{
            rememberUser:rememberUser,
            isAuthenticated:isAuthenticated,
            getUser:getUser,
            getToken:getToken,
            getRole:getRole,
            logout:logout
        };
    }]);