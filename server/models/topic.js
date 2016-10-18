var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var topicSchema = new mongoose.Schema({
	// The 'type' property of the object inside of the array is an attribute // the array represents an embedded document for a one-many relationship // the type tells Mongoose what to look for.
	name: { type: String },
	title: { type: String, required: true },
	description: { type: String, required: true },
	_user: { type: Schema.Types.ObjectId, ref: 'User'},
	_category: { type: String},
	_my_posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]},
	{ timestamps: true },
	{strict: false});

mongoose.model('Topic', topicSchema);


