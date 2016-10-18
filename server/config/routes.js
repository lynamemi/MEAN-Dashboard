var comments = require('../controllers/comments.js');
var users = require('../controllers/users.js');
var posts = require('../controllers/posts.js');
var topics = require('../controllers/topics.js');

module.exports = function(app) {
	app.get('/users/:id', users.show);
	app.post('/login', users.login);
	app.get('/session', users.session)
	app.get('/logout', users.logout)

	app.post('/topics', topics.create);
	app.get('/topics', topics.index);
	app.get('/topics/:id', topics.show);
	
	app.post('/posts', posts.create);
	app.get('/posts/:id', posts.show);
	app.put('/posts/:id', posts.update);

	app.post('/comments', comments.create);
}