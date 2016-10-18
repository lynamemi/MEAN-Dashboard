app.controller('userController', ['$scope', 'dashboardFactory', '$location', '$cookies', '$routeParams', function($scope, dashboardFactory, $location, $cookies, $routeParams) {

	$scope.login = function() {
		if(!$scope.username || $scope.username.length < 3) {
			alert("Name must be at least 3 characters")
		} else {
			var newUser = {username: $scope.username}
			console.log(newUser)
			dashboardFactory.login(newUser, function(returnedData) {
				$scope.username = returnedData.user.username
				console.log($scope.username)
				if(returnedData.status) {
					console.log($scope.username)
					$location.url('/dashboard')
				} else {
					alert("Not successfully logged in")
				}
			})
		}
	}

	dashboardFactory.checkUserStatus(function(returnedData) {
		$scope.currentUser = returnedData;
		if(!$scope.currentUser.user) {
			$location.url('/')
		}
	})

	dashboardFactory.getUser($routeParams._id, function(returnedData) {
		$scope.user = returnedData.data.user
	})

}]);