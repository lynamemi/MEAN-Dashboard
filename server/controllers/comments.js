var mongoose = require('mongoose');

var Post = mongoose.model('Post');
var User = mongoose.model('User');
var Topic = mongoose.model('Topic');
var Comment = mongoose.model('Comment');

function CommentController() {
	this.create = function(req, res) {
		var comment = new Comment(req.body)
		User.findOne({_id: req.session.user._id}, function(err, user) {
			Post.findOne({_id: comment._post}, function (err, post) {
				comment.save(function(err, comment) {
					if (err) {
						res.json({error:err});
					} else {
						user._comments.push(comment);
						post._comments.push(comment);
						user.save(function(err) {
							if(err) {
								res.json({error:err})
							} else {
								post.save(function(err) {
									if(err){
										res.json({error:err})
									} else {
										res.json({comment:comment})
									}
								})
								
							}
						})
					}
				})
			})
		})
	}
}

module.exports = new CommentController();