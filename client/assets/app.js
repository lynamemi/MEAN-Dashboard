var app = angular.module('app', ['ngRoute','ngCookies']);
app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/partials/login.html',
			controller: 'userController'
		})
		.when('/dashboard', {
			templateUrl: '/partials/dashboard.html',
			controller: 'dashboardController'
		})
		.when('/topic/:_id', {
			templateUrl: '/partials/topic.html',
			controller: 'dashboardController'
		})
		.when('/user/:_id', {
			templateUrl: '/partials/user.html',
			controller: 'userController'
		})
		.otherwise({
			redirectTo: '/'
		})
});