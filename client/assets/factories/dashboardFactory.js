app.factory('dashboardFactory', ['$http', function($http) {
	var topics = [];
	var topic = {};
	function DashboardFactory() {

		
		// USER
		this.login = function(user, callback) {
			console.log(user)
			$http.post('/login', user).then(function(returnedData) {
				console.log("DATA IN FACTORY", returnedData)
				callback(returnedData.data);
			})
		}
		this.checkUserStatus = function(callback) {
			$http.get('/session').then(function(returnedData){
				callback(returnedData.data)
			})
		}
		this.getUser = function(id, callback) {
			console.log("USER FACTORY ID", id)
			$http.get('/users/'+id).then(function(returnedData){
				console.log("USER FACTORY DATA", returnedData)
				callback(returnedData)
			})
		}


		// TOPIC
		this.createTopic = function(newTopic, callback) {
			$http.post('/topics', newTopic).then(function(returnedData) {
				if (typeof(callback) == 'function') {
					callback(returnedData.data);
				}
			})
		}
		this.index = function(callback) {
			$http.get('/topics').then(function(returnedData) {
				if (typeof(callback) == 'function') {
					callback(returnedData.data);
				}
			});
		};
		this.getTopic = function(id, callback) {
			console.log("TOPIC FACTORY ID", id)
			$http.get('/topics/'+id).then(function(returnedData){
				callback(returnedData)
			})
		}


		// POST
		this.createPost = function(newPost, callback) {
			$http.post('/posts', newPost).then(function(returnedData) {
				if (typeof(callback) == 'function') {
					callback(returnedData.data);
				}
			})
		}
		this.getPosts = function(id, callback) {
			$http.get('/posts/'+id).then(function(returnedData) {
				if (typeof(callback) == 'function') {
					callback(returnedData.data);
				}
			});
		};
		this.updatePost = function(vote, id, callback) {
			console.log("FACTORTY POST UPDATE", vote, id)
			$http.put('/posts/'+id, vote).then(function(returnedData) {
				if (typeof(callback) == 'function') {
					callback(returnedData.data);
				}
			})
		}


		// COMMENT
		this.createComment = function(newComment, callback) {
			$http.post('/comments', newComment).then(function(returnedData) {
				if (typeof(callback) == 'function') {
					callback(returnedData.data);
				}
			})
		}
	}
	return new DashboardFactory();
}]);