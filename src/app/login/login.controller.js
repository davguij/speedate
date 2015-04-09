'use strict';

angular.module('speedate')
  .controller('LoginCtrl', function ($scope, Backend, $state) {

    $scope.doLogin = function() {
      $scope.authData = null;
      $scope.error = null;
      Backend.authAnonymously($scope.username).then(function(resp) {
        $scope.userData = resp;
        console.log($scope.userData);
        $state.go('home');
      }).catch(function(error) {
        console.log(error);
      });
    }
  });
