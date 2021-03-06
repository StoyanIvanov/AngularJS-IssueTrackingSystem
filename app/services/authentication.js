'use strict';

angular.module('issueTracker.authentication',[])
    .factory('authentication',[
        '$http',
        '$q',
        'BASE_URL',
        function($http,$q,BASE_URL){

        function registerUser(user){
            var deferred=$q.defer();

            var data='Email=' + encodeURIComponent(user.username) +
                '&Password=' + encodeURIComponent(user.password) +
                '&ConfirmPassword='+ encodeURIComponent(user.confirmPassword);

            $http({
                method: 'POST',
                url: BASE_URL+'api/Account/Register',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            }).then(function(success){
                    deferred.resolve(success);
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

        function getUserIssues(token,orderBy,pageSize,pageNumber){
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

        function getIssuesByFilter(token,filter,pageSize,pageNumber){
            var deferred=$q.defer();
            var authorization='Bearer ' + token;
            var pageSize=pageSize || 10;
            var pageNumber=pageNumber || 1;

            $http.defaults.headers.common.Authorization=authorization;
            $http.get(BASE_URL+'issues/?'+filter+'&pageSize='+pageSize+'&pageNumber='+pageNumber,$http.header)
                .then(function(issues){
                    deferred.resolve(issues.data);
                },function(error){
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getIssues(pageSize,pageNumber,orderBy){
            var deferred=$q.defer();
            pageSize = pageSize || 10;
            pageNumber = pageNumber || 1;
            orderBy = orderBy ||'DueDate desc';

            $http.get(BASE_URL+'Issues/me?pageSize='+pageSize+'&pageNumber='+pageNumber+'&orderBy='+orderBy+'')
                .then(function(issues){
                    deferred.resolve(issues.data);
                },function(error){
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getIssue(token,Id){
            var deferred=$q.defer();
            var authorization='Bearer ' + token

            $http.defaults.headers.common.Authorization=authorization;
            $http.get(BASE_URL+'Issues/' + Id)
                .then(function(issue){
                    deferred.resolve(issue.data);
                },function(error){
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getAllProjects(token){
                var deferred=$q.defer();
                var authorization='Bearer ' + token;

                $http.defaults.headers.common.Authorization=authorization;
                $http.get(BASE_URL+'Projects/',$http.header)
                    .then(function(projects){
                        deferred.resolve(projects.data);
                    },function(error){
                        deferred.reject(error);
                    });

                return deferred.promise;
        }

        function getProject(token,id){
                var deferred=$q.defer();
                var authorization='Bearer ' + token;

                $http.defaults.headers.common.Authorization=authorization;
                $http.get(BASE_URL+'Projects/'+id,$http.header)
                    .then(function(projects){
                        deferred.resolve(projects.data);
                    },function(error){
                        deferred.reject(error);
                    });

                return deferred.promise;
        }

        function getProjects(token,filter,pageSize,pageNumber){
            var deferred=$q.defer();
            var authorization='Bearer ' + token;
            var filter=filter || '';
            var pageSize=pageSize || 10;
            var pageNumber=pageNumber || 1;

            $http.defaults.headers.common.Authorization=authorization;
            $http.get(BASE_URL+'projects?'+'filter='+filter+'&pageSize='+pageSize+'&pageNumber='+pageNumber,$http.header)
                .then(function(projects){
                    deferred.resolve(projects.data);
                },function(error){
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function updateProject(token, project){
            var deferred=$q.defer();
            var data='Name=' + encodeURIComponent(project.Name) +
                '&Description=' + encodeURIComponent(project.Description);
            for(var i=0;i<project.Labels.length;i++){
                data+='&labels[' + i + '].Name='+ project.Labels[i].Name;
            }
            for(var i=0;i<project.Priorities.length;i++){
                data+='&priorities[' + i + '].Name='+ project.Priorities[i].Name;
            }

            data+='&LeadId='+ encodeURIComponent(project.Lead.Id);

            var authorization='Bearer ' + token;
            $http.defaults.headers.common.Authorization=authorization;
            $http({
                method: 'PUT',
                url: BASE_URL+'Projects/'+project.Id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            }).then(function(response) {
                deferred.resolve(response.data);
            },function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function getLabels(token){
            var deferred=$q.defer();
            var authorization='Bearer ' + token;

            $http.defaults.headers.common.Authorization=authorization;
            $http.get(BASE_URL+'Labels/?filter=',$http.header)
                .then(function(projects){
                    deferred.resolve(projects.data);
                },function(error){
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function addIssue(token, issue){
            var deferred=$q.defer();

            var authorization='Bearer ' + token;

            $http.defaults.headers.common.Authorization=authorization;
            $http({
                method: 'POST',
                url: BASE_URL+'issues/',
                data: issue
            }).then(function(response) {
                deferred.resolve(response.data);
            },function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function changeStatus(token,issueId,statusId){
            var deferred=$q.defer();

            var authorization='Bearer ' + token;

            $http.defaults.headers.common.Authorization=authorization;
            $http({
                method: 'PUT',
                url: BASE_URL+'issues/'+issueId+'/changestatus?statusid='+statusId,
            }).then(function(response) {
                deferred.resolve(response.data);
            },function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function updateIssue(token, issue){
            var deferred=$q.defer();
            var data='DueDate=' + encodeURIComponent(issue.DueDate) +
                '&PriorityId=' + encodeURIComponent(issue.Priority.Id) +
                '&Title='+ encodeURIComponent(issue.Title) +
                '&Description=' + encodeURIComponent(issue.Description) +
                '&AssigneeId=' + encodeURIComponent(issue.Assignee.Id);

            var authorization='Bearer ' + token;
            $http.defaults.headers.common.Authorization=authorization;
            $http({
                method: 'PUT',
                url: BASE_URL+'Issues/'+issue.Id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            }).then(function(response) {
                deferred.resolve(response.data);
            },function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function addProject(token, project){
            var deferred=$q.defer();
            var data='Name=' + encodeURIComponent(project.Name) +
                '&Description=' + encodeURIComponent(project.Description) +
                '&ProjectKey='+ encodeURIComponent(project.ProjectKey);

            for(var i=0;i < project.Labels.ength;i++){
                data=data+'&labels['+i+'].Name='+project.labels[i];
            }

            for(i=0;i < project.Priorities.length;i++){
                data=data+'&priorities['+i+'].Name='+project.Priorities[i];
            }

            data=data+'&LeadId=' + encodeURIComponent(project.LeadId);

            var authorization='Bearer ' + token;
            $http.defaults.headers.common.Authorization=authorization;
            $http({
                method: 'POST',
                url: BASE_URL+'projects',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            }).then(function(response) {
                deferred.resolve(response.data);
            },function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function changePassword(token,data){
            var deferred=$q.defer();
            var data='OldPassword=' + encodeURIComponent(data.oldPassword) +
                '&NewPassword=' + encodeURIComponent(data.newPassword) +
                '&ConfirmPassword=' + encodeURIComponent(data.confirmPassword);

            var authorization='Bearer ' + token;
            $http.defaults.headers.common.Authorization=authorization;
            $http({
                method: 'POST',
                url: BASE_URL+'api/Account/ChangePassword',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            }).then(function(response) {
                deferred.resolve(response.data);
            },function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function getIssueComments(token,issue){
            var deferred=$q.defer();
            var authorization='Bearer ' + token;

            $http.defaults.headers.common.Authorization=authorization;
            $http.get(BASE_URL+'issues/'+issue.Id+'/comments',$http.header)
                .then(function(projects){
                    deferred.resolve(projects.data);
                },function(error){
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function addComment(token,comment,issueId){
            var deferred=$q.defer();
            var data='Text=' + encodeURIComponent(comment.text);

            var authorization='Bearer ' + token;
            $http.defaults.headers.common.Authorization=authorization;
            $http({
                method: 'POST',
                url: BASE_URL+'Issues/'+issueId+'/comments',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            }).then(function(response) {
                deferred.resolve(response.data);
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
            getUsers:getUsers,
            getAllProjects:getAllProjects,
            getProject:getProject,
            updateProject:updateProject,
            addIssue:addIssue,
            getLabels:getLabels,
            getIssuesByFilter:getIssuesByFilter,
            getIssues:getIssues,
            getIssue:getIssue,
            changeStatus:changeStatus,
            updateIssue:updateIssue,
            getProjects:getProjects,
            changePassword:changePassword,
            addProject:addProject,
            getIssueComments:getIssueComments,
            addComment:addComment
        }
    }]);