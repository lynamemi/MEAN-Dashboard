app.controller('dashboardController', ['$scope', 'dashboardFactory','categoryFactory', '$location', '$cookies', '$routeParams', function($scope, dashboardFactory, categoryFactory, $location, $cookies, $routeParams) {

	// TOPICS
	var index = function () {
		dashboardFactory.index(function(returnedData) {
			$scope.topics = returnedData.topics;
			console.log("INDEX RETURNED DATA", $scope.topics);
		});
		$scope.cateGories = categoryFactory.categories
		console.log($scope.cateGories)
	};
	index();
	$scope.createTopic = function() {
		var newTopic = {_user: $scope.currentUser.user._id, name: $scope.currentUser.user.username, title: $scope.topic.title, description: $scope.topic.description, _category: $scope.category._id}
		console.log("CATEGORY",$scope.category)
		dashboardFactory.createTopic(newTopic, function(returnedData) {
			if (returnedData.errors) {
				console.log("RETURNED TOPIC DATA", returnedData.errors.message)
				$scope.errors = returnedData.errors.message
			} else {
				console.log("RETURNED TOPIC DATA", returnedData.topic)
				$scope.topic = returnedData.topic
			}
			index();
			$scope.topic = {};
		})
	}
	dashboardFactory.getTopic($routeParams._id, function(returnedData) {
		$scope.topic = returnedData.data.topic
		console.log($scope.topic)
		getPosts($routeParams._id)
	})

	// POSTS
	var getPosts = function (id) {
		dashboardFactory.getPosts(id, function(returnedData) {
			$scope.posts = returnedData.posts
			console.log("POSTS IN CONTROLLER", $scope.posts)
		})

	}	
	$scope.vote = function(vote, post){
		var myVote={vote:vote}
		dashboardFactory.updatePost(myVote, post._id, function(returnedData) {
			console.log("VOTE DATA", returnedData, $scope.topic)
			getPosts($scope.topic._id)
		})
	}
	$scope.createPost = function() {
		var newPost = {_user: $scope.currentUser.user._id, name: $scope.currentUser.user.username, text: $scope.text, _topic: $scope.topic._id}
		console.log(newPost)
		dashboardFactory.createPost(newPost, function(returnedData) {
			if (returnedData.errors) {
				console.log("RETURNED POST DATA", returnedData.errors.message)
				$scope.errors = returnedData.errors.message
			} else {
				console.log("RETURNED POST DATA", returnedData.post)
				$scope.post = returnedData.post
			}
			getPosts($scope.topic._id)
			$scope.text = ""
		})
	}

	// COMMENTS
	$scope.createComment = function(text, post) {
		var newComment = {_user: $scope.currentUser.user._id, name: $scope.currentUser.user.username, text: text, _post: post._id}
		console.log("NEW COMMENT",newComment)
		dashboardFactory.createComment(newComment, function(returnedData) {
			if (returnedData.errors) {
				console.log("RETURNED COMMENT DATA", returnedData.errors.message)
				$scope.errors = returnedData.errors.message
			} else {
				console.log("RETURNED COMMENT DATA", returnedData.comment, newComment._post, $scope.topic._id)
				$scope.comment = returnedData.comment
				getPosts($scope.topic._id)
			}
		})
	}
}]);