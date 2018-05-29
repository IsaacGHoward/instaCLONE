var mongoose = require('mongoose');
var Friend = require("./models/Friend.js");
var Post = require("./models/Post.js");
let mongoDatabase = function() {
	this.infoList = [];
}

mongoDatabase.prototype.getArraySize = function() {
	return this.infoList.length;
}

mongoDatabase.prototype.getAllFriends = function(res) {
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
mongoDatabase.prototype.addFriend = function(res,friendObj) {
	console.log("in database");
	Friend.create(friendObj,function(error,info) {
			if (error) {
					 res.json(null);
			}

			 res.json(info);
	});
}
/////------------------------------------------------------------------------------------------------
mongoDatabase.prototype.getAllPosts = function(res) {
	Post.find({},function(error,info) {
		if (error) {
			res.json(null);
		} else {
			res.json(info);
		}
	});
}
mongoDatabase.prototype.getAllPostsWithUsername = function(res,username) {
	Post.find({username:username},function(error,info) {
		if (error) {
			res.json(null);
		} else
    res.json(info);
	});
}

mongoDatabase.prototype.getObjectWithID = function(res,ident) {
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

mongoDatabase.prototype.createPost = function(res,postObj) {
	console.log("in database");
	Post.create(postObj,function(error,info) {
			if (error) {
					 res.sendFile(__dirname + "/public/views/mainpages/html/feed.html");
			}

			 res.sendFile(__dirname + "/public/views/mainpages/html/feed.html");
	});
}


//add or modify.  Complete changeObject function.
mongoDatabase.prototype.changeObject = function(res,username,name) {
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
mongoDatabase.prototype.deleteObjectWithID = function(res,ident) {
	Team.remove({username:username},function(error,removed) {
			if (error) {
					 res.json(null);
			}
			 res.json(removed.result);
	});
}


module.exports = mongoDatabase;
