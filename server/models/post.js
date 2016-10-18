var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new mongoose.Schema({
	// _ is the naming convention for the key referencing a diff document // not an array since it's the "one" in the relationship and is not embedded, it's associated
	name: { type: String },
	text: { type: String, required: true},
	upvote: { type: Number, default: 0 },
	downvote: { type: Number, default: 0 },
	_user: { type: Schema.Types.ObjectId, ref: 'User'},
	_topic: { type: Schema.Types.ObjectId, ref: 'Topic'},
	_comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]},
	{ timestamps: true });

mongoose.model('Post', postSchema);

