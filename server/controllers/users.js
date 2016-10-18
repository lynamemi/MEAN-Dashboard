var mongoose = require('mongoose');

var Post = mongoose.model('Post');
var User = mongoose.model('User');
var Topic = mongoose.model('Topic');
var Comment = mongoose.model('Comment');

function UserController() {
	this.show = function(req, res) {
		console.log("MODEL", req.params.id)
		User.findOne({_id: req.params.id}, function(err, user) {
			if(err) {
				console.log(err)
				res.json({error:err})
			} else {
				console.log(user)
				res.json({user:user})
			}
		})
	}
	this.login = function(req, res) {
		User.findOne({username: req.body.username}, function(err, user) {
			if(!user) {
				var user = new User(req.body)
				user.save(function(err, data) {
					console.log("NEW USER FOR MODEL", user)
					if (err) {
						console.log("SAVE ERROR", err)
						return res.json({status:false})
					} else {
						req.session.user = user
						req.session.save()
						console.log("SESSION USER 1",req.session.user)
						return res.json({status:true, user:user})
					}
				})
			}
			else if(err) {
				console.log(err)
			} else {
				req.session.user = user
				req.session.save()
				console.log("USER EXISTING", user)
				return res.json({status:true, user:user})
			}
		})
	}
	this.session = function(req, res) {
		if(req.session.user) {
			console.log("SESSION USER 2",req.session.user)
			res.json({user:req.session.user})
		} else {
			console.log("no user",req.session.user)
			res.json({user:null})
		}
	}
	this.logout = function(req, res) {
		req.session.destroy();
		res.redirect('/');
	}
}

module.exports = new UserController();