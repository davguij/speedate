'use strict';

angular.module('speedate').
	factory('Backend', function($firebaseAuth, $firebaseObject, $firebaseArray) {
		var ref = new Firebase("https://speedate.firebaseio.com/");
		var auth = $firebaseAuth(ref);

		var _authAnonymously = function(_username) {
			var promise = auth.$authAnonymously().then(function(resp) {
				ref.child("users").child(resp.uid).set({
				  username: _username
				});
				return resp;
			});
			return promise;
		};

		var _getUser = function() {
			var user = auth.$getAuth();
			if (user) {
				return $firebaseObject(ref.child('users').child(user.uid));				
			} else {
				return;
			}
		};

		var _unAuth = function() {
			auth.$unauth();
		};

		var _getAvailRoom = function() {
			var rooms = $firebaseArray(ref.child('rooms'));
			return rooms.$loaded().then(function(resp) {
				if (resp.length === 0) {
					return false;
				} else {
					for (var i = resp.length - 1; i >= 0; i--) {
						var room = resp[i];
						if (room.members.length === 1) {
							return room;
						}
					};
				}
			});
		};

		var _createRoom = function(owner) {
			var rooms = $firebaseArray(ref.child('rooms'));
			return rooms.$add({
				members: [owner.$id]
			}).then(function(resp) {
				return resp.key();
			});
		};

		var _joinRoom = function(room, user) {
			var members = $firebaseArray(ref.child('rooms').child(room.$id).child('members'));
			return members.$add(user.$id).then(function(resp) {
				return resp.key();
			});
		};

		return {
			authAnonymously: _authAnonymously,
			getUser: _getUser,
			unAuth: _unAuth,
			getAvailRoom: _getAvailRoom,
			createRoom: _createRoom,
			joinRoom: _joinRoom
		};
	});