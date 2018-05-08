//var Promise = require('promise');
//var mongoose = require('mongoose');
//var User = require('./models/info.js');
var storage = require('node-persist');
var myStorage = storage.create({"username" : "admin",
			 													"password" : "password"});
myStorage.initSync();
storage.initSync();

let myDatabase = function() {
	this.infoList = storage.getItemSync("myStorage");
	//this.infoList = [];
}
myDatabase.prototype.createAdmin = function() {
	return this.infoList.push({"username" : "admin",
														"password" : "password"});
}

myDatabase.prototype.getArraySize = function() {
	return this.infoList.length;
	/*
	new Promise(function(resolve,reject){
	User.find({},function(error,info) {
		if (error) {
			reject(error)
		} else {
			resolve(info.length);
		}
	});
});
	*/
}

//done add or modify.  Complete getAllObjects function.
myDatabase.prototype.deleteAllObjects = function() {
	for (let i=0;i<this.infoList.length;i++) {
		this.infoList[i] = undefined;
	}
	storage.setItemSync("myStorage", this.infoList);
	storage.initSync();
	return(true);
}
myDatabase.prototype.getAllObjects = function() {
	let objs = [];
	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i]) {
			objs.push(this.infoList[i]);
		}
	}
	return(objs);
	/*
	new Promise(function(resolve,reject){
	User.find({},function(error,info) {
		if (error) {
			reject(null);
		} else {
			let objs = [];
			for (let i=0;i<info.length;i++) {
				objs.push({ident:info[i].ident,name:info[i].name});
			}
			resolve(objs);
		}
	});
});
	*/
}

myDatabase.prototype.getAllUsernames = function() {
	//console.log("in usernames");
	let usernames = [];
	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i]) {
			usernames.push(this.infoList[i].username);
		}
	}
	return(usernames);
	/*
	new Promise(function(resolve,reject){
	User.find({},function(error,info) {
		if (error) {
			reject(null);
		} else {
			let username = [];
			for (let i=0;i<info.length;i++) {
				username.push(info[i].username);
			}
			resolve(username);
		}
	});
});
	*/
}

myDatabase.prototype.getAllRealNames = function() {
	let realNames = [];
	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i]) {
			realNames.push(this.infoList[i].realname);
		}
	}
	return(realNames);
	/*
	new Promise(function(resolve,reject){
	User.find({},function(error,info) {
		if (error) {
			reject(null);
		} else {
			let names = [];
			for (let i=0;i<info.length;i++) {
				names.push(info[i].realname);
			}
			resolve(names);
		}
	});
});
	*/
}

myDatabase.prototype.getAllAges = function() {
	let ages = [];
	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i]) {
			ages.push(this.infoList[i].age);
		}
	}
	return(ages);
	/*
	new Promise(function(resolve,reject){
	User.find({},function(error,info) {
		if (error) {
			reject(null);
		} else {
			let ages = [];
			for (let i=0;i<info.length;i++) {
				ages.push(info[i].age);
			}
			resolve(ages);
		}
	});
});
	*/
}


myDatabase.prototype.getObjectWithRealName = function(realname) {
	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i] && realname == this.infoList[i].realname)
			return (this.infoList[i]);
	}
	return (null);
	/*
	new Promise(function(resolve,reject){
	User.find({realname:realname},function(error,info) {
			if (error) {
					reject (null);
			}
			else if (info == null) {
					reject (null);
			}
			if (info.length == 1)
			{
				resolve({ name: info[0].name });
			}
			else
			{
					reject (null);
			}
	 });
 });
	*/
}

myDatabase.prototype.getObjectWithUsername = function(username) {
	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i] && username == this.infoList[i].username)
			return (this.infoList[i]);
	}
	return (null);
	/*
	new Promise(function(resolve,reject){
	User.find({username:username},function(error,info) {
			if (error) {
					reject (null);
			}
			else if (info == null) {
					reject (null);
			}
			if (info.length == 1)
			{
				resolve(user);
			}
			else
			{
					reject (null);
			}
	 });
 });
	*/
}


myDatabase.prototype.addObject = function(obj) {
	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i] && obj.username == this.infoList[i].username)
			return (null);
	}
	this.infoList.push(obj);
	storage.setItemSync("myStorage", this.infoList);
	storage.initSync();
	return (obj);

	/*
	new Promise(function(resolve,reject){
	User.create(obj,function(error,info) {
			if (error) {
					 reject(null);
			}

			resolve(info);
	});
});
	*/
}

myDatabase.prototype.addFriendToUser = function(username, friendObj) {
	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i] && username == this.infoList[i].username)
		{
			this.infoList[i].friendList.push(friendObj);
			console.log(username);
			storage.setItemSync("myStorage", this.infoList);
			storage.initSync();
			return (this.infoList[i]);
		}
	}
	return(null);
/*
new Promise(function(resolve,reject){
	Team.findOneAndUpdate({username:username},{$push:{friendList:friendObj}},function(error,info) {
						if (error) {
								 reject(null);
						}
						else if (info == null) {
								 reject(null);
						}
						 resolve(info);
				});
			});
				*/
}

myDatabase.prototype.removeFriend = function(username, friendObj) {
	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i] && username == this.infoList[i].username)
		{
			for (let j=0;j<this.infoList[i].friendList.length;j++) {
				if (this.infoList[i].friendList[j] && friendObj.username == this.infoList[i].friendList[j].username)
				{
					this.infoList[i].friendList.splice(j,1);
					storage.setItemSync("myStorage", this.infoList);
					storage.initSync();
					return (friendObj);
				}
			}
		}
	}
	return(null);
	/*
	new Promise(function(resolve,reject){
		Team.findOneAndUpdate({username:username},{$pull:{friendList:{username:friendObj.username}}},function(error,info) {
							if (error) {
									 resject(null);
							}
							else if (info == null) {
									 reject(null);
							}
							 resolve(info);
					});
				});
					*/
}
myDatabase.prototype.removeFriendThroughUsername = function(username, friendUsername) {
	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i] && username == this.infoList[i].username)
		{
			for (let j=0;j<this.infoList[i].friendList.length;j++) {
				if (this.infoList[i].friendList[j] && friendUsername == this.infoList[i].friendList[j].username)
				{
					this.infoList[i].friendList.splice(j,1);
					storage.setItemSync("myStorage", this.infoList);
					storage.initSync();
					return (friendObj);
				}
			}
		}
	}
	return(null);
	/*
	new Promise(function(resolve,reject){
		User.findOneAndUpdate({username:username},{$pull:{friendList:{username:friendUsername}}},function(error,info) {
							if (error) {
									 reject(null);
							}
							else if (info == null) {
									 reject(null);
							}
							 resolve(info);
					});
				});
					*/
}
myDatabase.prototype.getAllFriendsofUser = function(username) {
	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i] && username == this.infoList[i].username)
			return (this.infoList[i].friendList);
	}
	return(null);
	/*
	new Promise(function(resolve,reject){
	User.find({username:username},function(error,info) {
			if (error) {
					reject (null);
			}
			else if (info == null) {
					reject (null);
			}
			if (info.length == 1)
			{
				resolve(info.friendList);
			}
			else
			{
					reject (null);
			}
	 });
 });
	*/
}
myDatabase.prototype.findifFriend = function(username,potFriendUsername) {
	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i] && username == this.infoList[i].username)
			{
				for (let j=0;j<this.infoList[i].friendList.length;j++) {
					if (this.infoList[i].friendList[j] && potFriendUsername == this.infoList[i].friendList[j].username)
						return (true);
				}
			}
	}
	return(false);
	/*
	new Promise(function(resolve,reject){
	User.find({username:username},function(error,info) {
			if (error) {
					reject (null);
			}
			for (let i=0;i<info.length;i++) {
				if (info[i] && username == info[i].username)
					{
						for (let j=0;j<info[i].friendList.length;j++) {
							if (info[i].friendList[j] && potFriendUsername == info[i].friendList[j].username)
								resolve (true);
						}
					}
			}
	 });
 });
	*/
}

myDatabase.prototype.postWithUsername = function(username, postObject) {

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
	/*
	new Promise(function(resolve,reject){
		Team.findOneAndUpdate({username:username},{$push:{postObjects:postObject}},function(error,info) {
							if (error) {
									 reject(null);
							}
							else if (info == null) {
									 reject(null);
							}
							 resolve(info);
					});
				});
				*/
}
myDatabase.prototype.postWithRealname = function(realname, postObject) {

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
	/*
	new Promise(function(resolve,reject){
		Team.findOneAndUpdate({realname:realname},{$push:{postObjects:postObject}},function(error,info) {
							if (error) {
									 reject(null);
							}
							else if (info == null) {
									 reject(null);
							}
							 resolve(info);
					});
				});
				*/
}

myDatabase.prototype.addCommentToPost = function(postObject, comment) {
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
	return (null);
	/*
	////////////////////////////////////////////////WORK ON THIS
	new Promise(function(resolve,reject){
		Team.findOneAndUpdate({realname:realname},{$push:{postObjects:postObject}},function(error,info) {
							if (error) {
									 reject(null);
							}
							else if (info == null) {
									 reject(null);
							}
							 resolve(info);
					});
				});
				*/

}

myDatabase.prototype.getAllPosts = function() {
let posts = [];
	for (let i=0;i<this.infoList.length;i++) {
		for (let j=0;j<this.infoList[i].postObjects.length;j++) {
					posts.push(this.infoList[i].postObjects[j]);
			}
	}
	return (posts);
	/*
	new Promise(function(resolve,reject){
	User.find({},function(error,info) {
		if (error) {
			reject(null);
		} else {
			let posts = [];
			for (let i=0;i<info.length;i++) {
				for (let j=0;j<info[i].postObjects.length;j++) {
							posts.push(info[i].postObjects[j]);
					}
			}
			resolve(posts);
		}
	});
});
	*/
}
myDatabase.prototype.getAllPostsofFriends = function(username) {
let posts = [];
let friends = [];
	for (let i=0;i<this.infoList.length;i++) {
		if(this.infoList[i] && username == this.infoList[i].username)
		{
			for (let j=0;j<this.infoList[i].friendList.length;j++) {
						friends.push(this.infoList[i].friendList[j]);
				}
		}
	}
	for (let k=0;k<this.infoList.length;k++) {
		for (let h=0;h<this.friends.length;h++) {
		if(this.infoList[k] && friends[h].username == this.infoList[k].username)
		{
						posts.push(this.infoList[k].postObjects[j]);
		}
	}
	}

	return (posts);
}
myDatabase.prototype.getAllPostsWithUsername = function(username) {

	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i] && username == this.infoList[i].username)
					return(this.infoList[i].postObjects);
	}
	return (null);
}
myDatabase.prototype.getPostWithUsernameandLabel = function(username, label) {

	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i] && username == this.infoList[i].username)
				{
					for (let j=0;j<this.infoList[i].postObjects.length;j++) {
						if (this.infoList[i].postObjects[j] && label == this.infoList[i].postObjects[j].label)
							return(this.infoList[i].postObjects[j]);
						}
				}

	}
	return (null);
}

myDatabase.prototype.deletePostWithUsernameAndLabel= function(username, label) {
	if (label < 0 || label >= this.infoList.length) {
		return(null);
	} else {
		for (let i=0;i<this.infoList.length;i++) {
			if (this.infoList[i] && username == this.infoList[i].username)
					{
						for (let j=0;j<this.infoList[i].postObjects.length;j++) {
							if (this.infoList[i].postObjects[j] && label == this.infoList[i].postObjects[j].label)
								{
								let obj = this.infoList[i].postObjects[j];
								this.infoList[i].postObjects[j] = undefined;
								storage.setItemSync("myStorage", this.infoList);
								storage.initSync();
								return(obj);
								}
							}
					}

		}
	}
}



myDatabase.prototype.changeObjectWithUsername = function(obj,  username) {
	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i] && obj.username == this.infoList[i].username)
			this.infoList[i] = obj;
			storage.setItemSync("myStorage", this.infoList);
			storage.initSync();
			return (obj);
	}
		return (null);
}

myDatabase.prototype.changeObjectWithRealName = function(obj,  realname) {
	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i] && obj.realname == this.infoList[i].realname)
			this.infoList[i] = obj;
			storage.setItemSync("myStorage", this.infoList);
			storage.initSync();
			return (obj);
	}
		return (null);
}

//done add or modify.  Complete changeObject function.
myDatabase.prototype.changeObject = function(obj) {
	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i] && obj.username == this.infoList[i].username)
		{
			this.infoList[i]=obj;
			storage.setItemSync("myStorage", this.infoList);
			storage.initSync();
			return(obj);
		}
	}
	return (null);
	/*
	User.findOneAndUpdate({realname:obj.realname},{obj},function(error,info) {
						if (error) {
								 res.json(null);
						}
						else if (info == null) {
								 res.json(null);
						}
						 res.json(info);
				});
	*/
}


	myDatabase.prototype.addNewMsgToMsgHist = function(username,message) {
		for (let i=0;i<this.infoList.length;i++) {
			if (this.infoList[i] && username == this.infoList[i].username)
			{
				this.infoList[i].userMsgHist.push(message);
				storage.setItemSync("myStorage", this.infoList);
				storage.initSync();
				return(this.infoList[i]);
			}
		}
		return (null);
	}
	myDatabase.prototype.getUserMsgHistory = function(username) {
		for (let i=0;i<this.infoList.length;i++) {
			if (this.infoList[i] && username == this.infoList[i].username)
			{
				return(this.infoList[i].userMsgHist);
			}
		}
		return (null);
	}
	myDatabase.prototype.getAllMessagesToUser = function(username) {
		let messages = [];
		for (let i=0;i<this.infoList.length;i++) {
			for (let j=0;j<this.infoList.length;j++) {
			if (this.infoList[i] && username == this.infoList[i].userMsgHist[j].username)
			{
					messages.push(this.infoList[i].userMsgHist[j].message);
			}
		}
		}
		return (messages);
	}
	myDatabase.prototype.getAllMessagesToUserFromUser = function(toUsername,fromUsername) {
		let messages = [];
		for (let i=0;i<this.infoList.length;i++) {
			for (let j=0;j<this.infoList.length;j++) {
			if (this.infoList[i] && fromUsername == this.infoList[i].username && toUsername == this.infoList[i].userMsgHist[j].username)
			{
					messages.push(this.infoList[i].userMsgHist[j].message);
			}
		}
		}
		return (messages);
	}

//done add or modify.  Complete deleteObjectWithID function.
myDatabase.prototype.deleteObjectWithRealName = function(realname) {
	for (let i=0;i<this.infoList.length;i++) {
		if (!this.infoList[i])
			return(null);
		if (this.infoList[i] && realname == this.infoList[i].realname)
		{
			this.infoList[i]=undefined;
			storage.setItemSync("myStorage", this.infoList);
			storage.initSync();
			return(realname);
		}
	}
	return (null);
	/*
	User.remove({realname:realname},function(error,removed) {
			if (error) {
					 res.json(null);
			}
			 res.json(removed.result);
	});
	*/
}


module.exports = myDatabase;
