var mongoose = require('mongoose');

var Post = mongoose.model('Post');
var User = mongoose.model('User');
var Topic = mongoose.model('Topic');
var Comment = mongoose.model('Comment');

function TopicController() {
	this.create = function(req, res) {
		console.log("USER FOR TOPIC", req.session.user._id)
		User.findOne({_id: req.session.user._id}, function(err, user) {
			var topic = new Topic(req.body)
			topic.save(function(err, topic) {
				if (err) {
					res.json({error:err});
				} else {
					user._topics.push(topic);
					user.save(function(err) {
						if(err) {
							res.json({error:err})
						} else {
							res.json({topic:topic})
						}
					})
				}
			})
		})
	}
	this.show = function(req, res) {
		Topic.findOne({_id: req.params.id}, function(err, topic) {
			if(err) {
				console.log(err)
				res.json({error:err})
			} else {
				res.json({topic:topic})
			}
		})
	}
	this.index = function(req, res) {
		Topic.find({}, function(err, topics) {
			if(err) {
				console.log(err);
			} else {
				res.json({topics: topics})
			}
		})
	}
}

module.exports = new TopicController();