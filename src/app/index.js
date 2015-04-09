'use strict';

angular.module('speedate', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'ngMaterial', 'firebase'])
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl'

      })
      .state('home', {
      	url: '/home',
      	templateUrl: 'app/home/home.html',
      	controller: 'HomeCtrl'
      })
      .state('room', {
        url: '/room/:roomId',
        templateUrl: 'app/room/room.html',
        controller: 'RoomCtrl'
      })
      ;

    $urlRouterProvider.otherwise('/login');
  })

  .run(function($rootScope, $state, Backend){

      $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams){ 
        var userData = Backend.getUser();
    		console.log(userData);
    		if (!userData) {
    			$state.go('login');
    		} else {
    			if ($state.is('login')) {
    				$state.go('home');
    			}
    		}
         });
  })
