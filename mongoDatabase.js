/*
var promise = User.findById('123').exec();

promise.then(function(user) {
  user.name = 'Robert Paulson';

  return user.save(); // returns a promise
})
.then(function(user) {
  console.log('updated user: ' + user.name);
  // do something with updated user
})
.catch(function(err){
  // just need one of these
  console.log('error:', err);
});
/*
var Promise = require('promise');
var mongoose = require('mongoose');
var User = require('./models/User.js');
var storage = require('node-persist');
var myStorage = storage.create({"username" : "admin",
			 													"password" : "password"});
const express = require('express');
const app = express();
let mongoDatabase = function() {
	User.create({username:'admin',password:'password'},function(error,info) {
			if (error) {

			}

	});
	this.mongoSetup();
}
mongoDatabase.prototype.mongoSetup = function(){
			 mongoose.Promise = global.Promise;
			mongoose.connect("mongodb://localhost:27017/InstaClone");
	 }
mongoDatabase.prototype.createAdmin = function() {
	return this.infoList.push({"username" : "admin",
														"password" : "password"});
}

mongoDatabase.prototype.getArraySize = function() {
	User.create({username:'admin',password:'password'},function(error,info) {
			if (error) {

			}
			return('done');
	});
}
mongoDatabase.prototype.getAllObjects = function() {
	function done(value)
	{
		return(value.objs);
	};


	User.find({},function(error,info) {
		if (error) {
			done(null);
		} else {
			let objs = [];
			for (let i=0;i<info.length;i++) {
				objs.push({ident:info[i].ident,name:info[i].name});
			}
			console.log(objs + '----');
			done({"objs":objs});
		}
	});


}
/*
mongoDatabase.prototype.getAllUsernames = function() {
	User.find({},function(error,info) {
		if (error) {
			return(null);
		} else {
			let ages = [];
			for (let i=0;i<info.length;i++) {
				objs.push(info[i].username);
			}
			return(objs);
		}
	});
}

mongoDatabase.prototype.getAllRealNames = function() {
	User.find({},function(error,info) {
		if (error) {
			return(null);
		} else {
			let ages = [];
			for (let i=0;i<info.length;i++) {
				objs.push(info[i].realname);
			}
			return(objs);
		}
	});

}

mongoDatabase.prototype.getAllAges = function() {
	User.find({},function(error,info) {
		if (error) {
			return(null);
		} else {
			let ages = [];
			for (let i=0;i<info.length;i++) {
				ages.push(info[i].age);
			}
			return(ages);
		}
	});

}


mongoDatabase.prototype.getObjectWithRealName = function(realname) {
	User.find({realname:realname},function(error,info) {
			if (error) {
					return (null);
			}
			else if (info == null) {
					return (null);
			}
			if (info.length == 1)
			{
				return({ name: info[0].name });
			}
			else
			{
					return (null);
			}
	 });

}

mongoDatabase.prototype.getObjectWithUsername = function(username) {
	User.find({username:username},function(error,info) {
			if (error) {
					return (null);
			}
			else if (info == null) {
					return (null);
			}
			if (info.length == 1)
			{
				return(user);
			}
			else
			{
					return (null);
			}
	 });

}


mongoDatabase.prototype.addObject = function(obj) {
	User.create(obj,function(error,info) {
			if (error) {
					 return(null);
			}

			return(info);
	});

}

mongoDatabase.prototype.addFriendToUser = function(username, friendObj) {
	User.findOneAndUpdate({username:username},{$push:{friendList:friendObj}},function(error,info) {
						if (error) {
								 return(null);
						}
						else if (info == null) {
								 return(null);
						}
						 return(info);
				});
}

mongoDatabase.prototype.removeFriend = function(username, friendObj) {
		User.findOneAndUpdate({username:username},{$pull:{friendList:{username:friendObj.username}}},function(error,info) {
							if (error) {
									 return(null);
							}
							else if (info == null) {
									 return(null);
							}
							 return(info);
					});

}
mongoDatabase.prototype.removeFriendThroughUsername = function(username, friendUsername) {
		User.findOneAndUpdate({username:username},{$pull:{friendList:{username:friendUsername}}},function(error,info) {
							if (error) {
									 return(null);
							}
							else if (info == null) {
									 return(null);
							}
							 return(info);
					});

}
mongoDatabase.prototype.getAllFriendsofUser = function(username) {
	User.find({username:username},function(error,info) {
			if (error) {
					return (null);
			}
			else if (info == null) {
					return (null);
			}
			if (info.length == 1)
			{
				return(info.friendList);
			}
			else
			{
					return (null);
			}
	 });

}
/*
mongoDatabase.prototype.findifFriend = function(username,potFriendUsername) {
	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i] && username == this.infoList[i].username)
			{
				for (let j=0;j<this.infoList[i].friendList;j++) {
					if (this.infoList[i].friendList[j] && potFriendUsername == this.infoList[i].friendList[j].username)
						return (true);
				}
			}
	}
	return(false);
}

mongoDatabase.prototype.postWithUsername = function(username, postObject) {

	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i] && username == this.infoList[i].username)
		{
			//this.infoList[i].postObjects.push(postObject);
			this.infoList[i].postObjects.push(postObject);
			storage.setItemSync("myStorage", this.infoList);
			storage.initSync();
			return(this.infoList[i].postObjects[i]);
		}
	}
	return (null);
}
mongoDatabase.prototype.postWithRealname = function(realname, postObject) {

	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i] && realname == this.infoList[i].realname)
		{
			this.infoList[i].postObjects.push(postObject);
			storage.setItemSync("myStorage", this.infoList);
			storage.initSync();
			return(this.infoList[i].postObjects[i]);
		}
	}
	return (null);
}

mongoDatabase.prototype.addCommentToPost = function(postObject, comment) {
	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i] && postObject.username == this.infoList[i].username)
		{
			for (let j=0;j<this.infoList[i].postObjects.length;j++) {
				if (this.infoList[i] && postObject.timestamp == this.infoList[i].postObjects[j].timestamp)
				{
					this.infoList[i].postObjects[j].comments.push(postObject);
					storage.setItemSync("myStorage", this.infoList);
					storage.initSync();
					return(this.infoList[i].postObjects[j]);
				}
			}
		}
	}
	///////////////////////THIS IS WHERE I AM
	return (null);
}

mongoDatabase.prototype.getAllPosts = function() {
	User.find({},function(error,info) {
		if (error) {
			return(null);
		} else {
			let posts = [];
			for (let i=0;i<info.length;i++) {
				posts.push(info[i].username);
			}
			return(posts);
		}
	});

}
mongoDatabase.prototype.getAllPostsofFriends = function(username) {
	User.find({username:username},function(error,info) {
			if (error) {
					reject (null);
			}
			else if (info == null) {
					reject (null);
			}
			if (info.length == 1)
			{
				friends = info.friendList;
				next();
			}
			else
			{
					reject (null);
			}
	 });
	User.find({},function(error,info) {
		if (error) {
			reject(null);
		} else {
		for (let k=0;k<info.length;k++) {
			for (let h=0;h<friends.length;h++) {
				if(info[k] && friends[h].username == info[k].username)
				{
								posts.push(info[k].postObjects[j]);
				}
			}
		}
			resolve(posts);
		}
	});
	return (posts);
}
mongoDatabase.prototype.getAllPostsWithUsername = function(username) {
	User.find({username:username},function(error,info) {
			if (error) {
					resolve (null);
			}
			else if (info == null) {
					reject (null);
			}
			if (info.length == 1)
			{
				resolve(info.postObjects);
			}
			else
			{
					reject (null);
			}
	 });
}
mongoDatabase.prototype.getPostWithUsernameandLabel = function(username, label) {
	User.find({username:username},function(error,info) {
			if (error) {
					reject (null);
			}
			else if (info == null) {
					reject (null);
			}
			if (info.length == 1)
			{
				for (let j=0;j<this.infoList[i].postObjects.length;j++) {
				resolve(info.postObjects);
				}
			}
			else
			{
					resolve (null);
			}
	 });

}


mongoDatabase.prototype.changeObjectWithUsername = function(obj,  username) {
		User.findOneAndUpdate({username:username},{obj},function(error,info) {
							if (error) {
									 reject(null);
							}
							else if (info == null) {
									 reject(null);
							}
							 resolve(info);
					});

}

mongoDatabase.prototype.changeObjectWithRealName = function(obj,  realname) {
		User.findOneAndUpdate({realname:realname},{obj},function(error,info) {
							if (error) {
									 reject(null);
							}
							else if (info == null) {
									 reject(null);
							}
							 resolve(info);
					});

}

//done add or modify.  Complete changeObject function.
mongoDatabase.prototype.changeObject = function(obj) {
	User.findOneAndUpdate({realname:obj.realname},{obj},function(error,info) {
						if (error) {
								 reject(null);
						}
						else if (info == null) {
								 reject(null);
						}
						 resolve(info);
				});


}


	mongoDatabase.prototype.addNewMsgToMsgHist = function(username,message) {
			User.findOneAndUpdate({username:username},{$push:{userMsgHist:message}},function(error,info) {
								if (error) {
										 reject(null);
								}
								else if (info == null) {
										 reject(null);
									 }

								 resolve(info);
						});

	}
	mongoDatabase.prototype.getUserMsgHistory = function(username) {
		User.find({username:username},function(error,info) {
				if (error) {
						reject (null);
				}
				else if (info == null) {
						reject (null);
				}
				if (info.length == 1)
				{
					for (let j=0;j<this.infoList[i].postObjects.length;j++) {
					resolve(info.postObjects);
					}
				}
				else
				{
						reject (null);
				}
		 });

	}
	mongoDatabase.prototype.getAllMessagesToUser = function(username) {
		User.find({},function(error,info) {
			if (error) {
				reject(null);
			} else {
			for (let k=0;k<info.length;k++) {
				for (let h=0;h<info.userMsgHist.length;h++) {
					if(info[k] && username == info[k].userMsgHist[h].username)
					{
									messages.push(info[k].userMsgHist[h].message);
					}
				}
			}
				resolve(messages);
			}
		});

	}
	mongoDatabase.prototype.getAllMessagesToUserFromUser = function(toUsername,fromUsername) {
		User.find({},function(error,info) {
			if (error) {
				reject(null);
			} else {
			for (let k=0;k<info.length;k++) {
				for (let h=0;h<info.userMsgHist.length;h++) {
					if(info[k] && toUsername == info[k].userMsgHist[h].username && fromUsername == info[k].username)
					{
									messages.push(info[k].userMsgHist[h].message);
					}
				}
			}
				resolve(messages);
			}
		});

	}

//done add or modify.  Complete deleteObjectWithID function.
mongoDatabase.prototype.deleteObjectWithRealName = function(realname) {
	User.remove({realname:realname},function(error,removed) {
			if (error) {
					 reject(null);
			}
			 resolve(removed.result);
	});

}
*/

module.exports = mongoDatabase;
