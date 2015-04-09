'use strict';

angular.module('speedate')
	.controller('HomeCtrl', function($scope, $state, Backend){
		$scope.hey = "hey";
		$scope.user = Backend.getUser();
		console.log($scope.user);
		$scope.doLogout = function() {
			Backend.unAuth();
			$state.go('login');
		}

		$scope.enterChat = function() {
			Backend.getAvailRoom().then(function(availRoom) {
				if (!availRoom) {
					Backend.createRoom($scope.user).then(function(roomId) {
						console.log(roomId);
						//goto the room
						$state.go('room', {roomId: roomId});
					});
				} else {
					if (availRoom.members.indexOf($scope.user.$id) === -1) {
						Backend.joinRoom(availRoom, $scope.user).then(function(roomId) {
							console.log(roomId);
							//go to the room
						});
					}
				$state.go('room', {roomId: availRoom.$id});
				}
			});
		}
	});