var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: {
		type: String,
		trim: true
	},
	_topics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
	_my_posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
	_comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
	}, {timestamps: true
});

mongoose.model('User', UserSchema);