
let myDatabase = function() {
	this.infoList = [];
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
	return (obj);
}




myDatabase.prototype.changeObjectWithRealName = function(obj,realname) {
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
		if (this.infoList[i] && obj.ident == this.infoList[i].ident)
		{
			this.infoList[i]=obj;
			return(obj);
		}
	}
	return (null);
}

myDatabase.prototype.deleteObjectAtIndex = function(index) {
	if (index < 0 || index >= this.infoList.length) {
		return(null);
	} else {
		if (!this.infoList[index]) {
			return(null);
		} else {
			let obj = this.infoList[index];
			this.infoList[index] = undefined;
			return(obj);
		}
	}
}


//done add or modify.  Complete deleteObjectWithID function.
myDatabase.prototype.deleteObjectWithRealName = function(realname) {
	for (let i=0;i<this.infoList.length;i++) {
		if (!this.infoList[i])
			return(null);
		if (this.infoList[i] && realname == this.infoList[i].realname)
		{
			this.infoList[i]=undefined;
			return(realname);
		}
	}


	return (null);
}


module.exports = myDatabase;
