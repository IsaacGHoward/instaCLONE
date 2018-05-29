
var mongoose = require("mongoose");

var friendSchema =  mongoose.Schema({
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
		unique: false
	},
	caption: {
		required: false,
		unique: false,
		type:String
	},
	imageLocation: {
		required: true
	},
	imageName: {
		required: true,
		type:String
	},
	image: {
		required: true
	},
	comments: []
});

var Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;
