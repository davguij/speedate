'use strict';

angular.module('speedate')
	.controller('RoomCtrl', function($scope, $state, $stateParams, Backend){
		$scope.roomId = $stateParams.roomId;
		$scope.user = Backend.getUser();

		// TODO display if the room is active (ie. if it has two members)
		// or if the user is waiting for a chat partner

		$scope.sendMessage = function() {
			console.log($scope.user.username + " says " + $scope.message);
			$scope.message = null;
		}
	});