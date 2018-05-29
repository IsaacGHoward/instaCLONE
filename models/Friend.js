
var mongoose = require("mongoose");

var friendSchema =  mongoose.Schema({
	username: {
		required: true,
		unique: true,
		type:String
	},
	otherUsername: String
});

var Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;
