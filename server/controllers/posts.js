var mongoose = require('mongoose');

var Post = mongoose.model('Post');
var User = mongoose.model('User');
var Topic = mongoose.model('Topic');
var Comment = mongoose.model('Comment');

function PostController() {
	this.create = function(req, res) {
		console.log("USER FOR POST", req.session.user._id)
		var post = new Post(req.body)
		User.findOne({_id: req.session.user._id}, function(err, user) {
			Topic.findOne({_id: post._topic}, function (err, topic) {
				post.save(function(err, post) {
					if (err) {
						res.json({error:err});
					} else {
						user._my_posts.push(post);
						topic._my_posts.push(post);
						user.save(function(err) {
							if(err) {
								res.json({error:err})
							} else {
								topic.save(function(err) {
									if(err){
										res.json({error:err})
									} else {
										res.json({post:post})
									}
								})
								
							}
						})
					}
				})
			})
		})
	}
	this.show = function(req, res) {
		Post.find({_topic: req.params.id}).populate('_comments').exec(function(err, posts) {
			if(err) {
				console.log(err);
			} else {
				res.json({posts: posts})
			}
		})
	}
	this.update = function(req, res) {
		console.log('UPDATE POST MODEL', req.params.id, req.body.vote)
		if(req.body.vote == "up") {
			Post.findByIdAndUpdate({_id: req.params.id}, {$inc: {upvote: 1}}, function(err, post) {
				if(err) {
					console.log(err)
				} else {
					res.json({post: post})
				}
			})
		} else {
			Post.findByIdAndUpdate({_id: req.params.id}, {$inc: {downvote: -1}}, function(err, post) {
				if(err) {
					console.log(err)
				} else {
					res.json({post: post})
				}
			})
		}

	}
}

module.exports = new PostController();