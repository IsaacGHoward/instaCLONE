var mongoose = require('mongoose');
var Friend = require("./models/Friend.js");
var Post = require("./models/Post.js");
let myDatabase = function() {
	this.infoList = [];
}

myDatabase.prototype.getArraySize = function() {
	return this.infoList.length;
}

myDatabase.prototype.getAllFriends = function(res) {
	Friend.find({},function(error,info) {
		if (error) {
			res.json(null);
		} else {
			let objs = [];
			for (let i=0;i<info.length;i++) {
			  objs.push({username:info[i].username,otherUsername:info[i].otherUsername});
			}
			res.json(objs);
		}
	});
}
myDatabase.prototype.addFriend = function(res,friendObj) {
	console.log("in database");
	Friend.create(friendObj,function(error,info) {
			if (error) {
					 res.json(null);
			}

			 res.json(info);
	});
}
/////------------------------------------------------------------------------------------------------
myDatabase.prototype.getAllPosts = function(res) {
	Post.find({},function(error,info) {
		if (error) {
			res.json(null);
		} else {
			res.json(info);
		}
	});
}
myDatabase.prototype.getAllPostsWithUsername = function(res,username) {
	Post.find({username:username},function(error,info) {
		if (error) {
			res.json(null);
		} else
    res.json(info);
	});
}

myDatabase.prototype.getObjectWithID = function(res,ident) {
	Team.find({ident:ident},function(error,info) {
			if (error) {
					res.json (null);
			}
			else if (info == null) {
					res.json (null);
			}
			if (info.length == 1)
			{
				res.json({ name: info[0].name });
			}
			else
			{
					res.json (null);
			}
	 });

}

myDatabase.prototype.createPost = function(res,postObj) {
	console.log("in database");
	Post.create(postObj,function(error,info) {
			if (error) {
					 res.sendFile(__dirname + "/public/views/mainpages/html/feed.html");
			}

			 res.sendFile(__dirname + "/public/views/mainpages/html/feed.html");
	});
}


//add or modify.  Complete changeObject function.
myDatabase.prototype.changeObject = function(res,username,name) {
	Team.findOneAndUpdate({username:username},{name:name},function(error,info) {
	          if (error) {
	               res.json(null);
	          }
	          else if (info == null) {
	               res.json(null);
	          }
	           res.json(info);
	      });
}


//add or modify.  Complete deleteObjectWithID function.
myDatabase.prototype.deleteObjectWithID = function(res,ident) {
	Team.remove({username:username},function(error,removed) {
			if (error) {
					 res.json(null);
			}
			 res.json(removed.result);
	});
}


module.exports = mongoDatabase;
