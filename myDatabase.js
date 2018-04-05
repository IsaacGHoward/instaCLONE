///Eilise
//When we send a message, we have to store the timestamp and who it was sent to//
//basically the whole message has to be object with who it was sent to and the timestamp




var storage = require('node-persist');
var myStorage = storage.create({"username" : "admin",
			 													"password" : "password"});
myStorage.initSync();
storage.initSync();

let myDatabase = function() {

	this.infoList = storage.getItemSync("myStorage");


}
myDatabase.prototype.createAdmin = function() {
	return this.infoList.push({"username" : "admin",
														"password" : "password"});
}

myDatabase.prototype.getArraySize = function() {
	return this.infoList.length;
}

//done add or modify.  Complete getAllObjects function.
myDatabase.prototype.getAllObjects = function() {
	let objs = [];
	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i]) {
			objs.push(this.infoList[i]);
		}
	}
	return(objs);
}

myDatabase.prototype.getAllUsernames = function() {
	let usernames = [];
	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i]) {
			usernames.push(this.infoList[i].username);
		}
	}
	return(usernames);
}

myDatabase.prototype.getAllRealNames = function() {
	let realNames = [];
	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i]) {
			realNames.push(this.infoList[i].realname);
		}
	}
	return(realNames);
}

myDatabase.prototype.getAllAges = function() {
	let ages = [];
	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i]) {
			ages.push(this.infoList[i].age);
		}
	}
	return(ages);
}

myDatabase.prototype.getObjectAtIndex = function(index) {
	if (index < 0 || index >= this.infoList.length)
		return (null);
	else {
		if (!this.infoList[index]) {
			return(null);
		} else {
			return(this.infoList[index]);
		}
	}
}

myDatabase.prototype.getObjectWithRealName = function(realname) {
	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i] && realname == this.infoList[i].realname)
			return (this.infoList[i]);
	}
	return (null);
}

myDatabase.prototype.getObjectWithUsername = function(username) {
	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i] && username == this.infoList[i].username)
			return (this.infoList[i]);
	}
	return (null);
}

myDatabase.prototype.addObjectAtIndex = function(obj,index) {
	if (index < 0)
		return (null);
	if (index < this.infoList.length)
	{
		if (!this.infoList[index]) {
			this.infoList[index] = obj;
			return (obj);
		}
		else {
			return (null);
		}
	}
	else
		this.infoList[index] = obj;
	return (obj);
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
}

myDatabase.prototype.postWithUsername = function(username, postObject) {

	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i] && username == this.infoList[i].username)
		{
			//this.infoList[i].postObjects.push(postObject);
			this.infoList[i].postObjects.push(postObject);
			return(this.infoList[i].postObjects[i]);
		}
	}
	return (null);
}
myDatabase.prototype.postWithRealname = function(realname, postObject) {

	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i] && realname == this.infoList[i].realname)
			this.infoList[i].postObjects.push(postObject);

	}
	return (null);
}
myDatabase.prototype.getAllPosts = function() {
let posts = [];
	for (let i=0;i<this.infoList.length;i++) {
		for (let j=0;j<this.infoList[i].postObjects.length;j++) {
					posts.push(this.infoList[i].postObjects[i]);
			}
	}
	return (posts);
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
myDatabase.prototype.getPostWithUsername = function(username, label) {

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
			return (obj);
	}
		return (null);
}

myDatabase.prototype.changeObjectWithRealName = function(obj,  realname) {
	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i] && obj.realname == this.infoList[i].realname)
			this.infoList[i] = obj;
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
			return(obj);
		}
	}
	return (null);
}


	myDatabase.prototype.addNewMsgToMsgHist = function(username,message) {
		for (let i=0;i<this.infoList.length;i++) {
			if (this.infoList[i] && username == this.infoList[i].username)
			{
				this.infoList[i].userMsgHist.push(message);
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
}


module.exports = myDatabase;
