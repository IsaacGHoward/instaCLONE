var mongoose = require("mongoose");

var userSchema =  mongoose.Schema({
	username: {
		required: true,
		unique: true,
		type:String
	},
  password: {
    required: true,
    unique: false,
    type:String
  },
  realname: {
    required: true,
    unique: false,
    type:String
  },
  age: {
    required: false,
    unique: false,
    type:Number
  },
  sd: {
    required: false,
    unique: false,
    type:String
  },
  postObjects:[],
  friendList:[],
  userMsgHist : []
});

var User = mongoose.model('User', userSchema);

module.exports = User;
