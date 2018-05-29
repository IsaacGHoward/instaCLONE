
var mongoose = require("mongoose");

var postSchema =  mongoose.Schema({
	username: {
		required: true,
		unique: false,
		type:String
	},
	realname: {
		type:String
	},
	date: {
		required: true,
		unique: false,
		type:String
	},
	timestamp: {
		required: true,
		unique: false,
		type:String
	},
	caption: {
		required: false,
		unique: false,
		type:String
	},
	imageLocation: {
		required: true,
		type: String
	},
	imageName: {
		required: true,
		type: String
	},
	image: {
		required: false
	},
	comments: []
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
