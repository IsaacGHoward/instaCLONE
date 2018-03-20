	
var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");
<<<<<<< HEAD
var clientSessions = require('client-sessions');


<<<<<<< HEAD
router.get("/",function(request,response){
	response.sendFile(__dirname + "/public/views/profile.html");
=======
router.get("/signup",function(req,res){
//add or modify.  Send back to the client signup.html.	
	
>>>>>>> 61adf9c66bc999411b113a43644bdea28c883c1c
=======
var myDatabase = require('./myDatabase');
var clientSessions = require('client-sessions');
var db = new myDatabase();
console.log(db.getAllNames);

router.get("/signup",function(req,res){
//add or modify.  Send back to the client signup.html.
res.sendFile(__dirname + "/public/views/signup.html");
>>>>>>> 504a6d6fe58c195ba14086f773571441e9348a23
});


router.get("/",function(req,res){
<<<<<<< HEAD
//add or modify.  Send back to the client login.html.	
	
	res.sendFile(__dirname + "/public/views/login.html");
});


<<<<<<< HEAD
router.get("/feed", function(req,res){
		res.sendFile(__dirname + "index.html");
});
router.get("/profile/:profilename", function(req,res){
		res.sendFile(__dirname + "/public/views/profile.html");
});

//done add or modify.  Use getAllObjects.
router.get('/read', function(req, res){
	let names= db.getAllObjects();
	res.json(names);
=======
router.get("/login",function(req,res){
//add or modify.  Send back to the client login.html.	
	res.sendFile(__dirname + "/public/views/login.html");
>>>>>>> 61adf9c66bc999411b113a43644bdea28c883c1c
});

//add or modify.  Below is already done for you.
router.get("/logout",function(req,res){	
	req.session_state.reset();
	res.json({redirect:"/login"});
});	
=======
//add or modify.  Send back to the client login.html.
	res.sendFile(__dirname + "/public/views/login.html");
});


router.get("/login",function(req,res){
//add or modify.  Send back to the client login.html.
	res.sendFile(__dirname + "/public/views/login.html");
});

//add or modify.  Below is already done for you.
router.get("/logout",function(req,res){
	req.session_state.reset();
	res.json({redirect:"/login"});
});
>>>>>>> 504a6d6fe58c195ba14086f773571441e9348a23


router.get("/session",function(req,res){
//add or modify.  Look at req.session_state.??? to check if a session is active.
//                If session is active then send back to the client session.html.
<<<<<<< HEAD
//                else send back to the client login.html.\
		console.log(req.session_state.username);
		if(req.session_state.username)
		{
			res.sendFile(__dirname + "/public/views/session.html");	
		}
		else
			res.sendFile(__dirname + "/public/views/session.html");	
=======
//                else send back to the client login.html.
		if(req.session_state.username)
		{
			res.sendFile(__dirname + "/public/views/session.html");
		}
		else
			res.sendFile(__dirname + "/public/views/session.html");
>>>>>>> 504a6d6fe58c195ba14086f773571441e9348a23
});

router.get("/userInfo",function(req,res){
//add or modify.  Look at req.session_state.??? to check if a session is active.
<<<<<<< HEAD
//                If session is active then send back to client a json object 
=======
//                If session is active then send back to client a json object
>>>>>>> 504a6d6fe58c195ba14086f773571441e9348a23
//                   with the user data.
//                else send back a json object that is null.

});
<<<<<<< HEAD

 

<<<<<<< HEAD

let users = [];
router.get("/sessionInfo",function(req,res){

		res.json({username : req.session_state.username , realname : req.session_state.realname, age : req.session_state.age , sd : req.session_state.datejoined})
});
=======
let userInfo = [];
>>>>>>> 603f2351472d4b3ce5168f141bc8778d5e277c1e

router.post('/signup', function(req, res){
//add or modify.  Check if a valid signup.  If the signup is valid,
//                  add user and password info to userInfo array.
//                  Give req.session_state.??? a valid value.
//                  Send back a json object of {redirect:"/session"}.
//                else send back a json object that is null.
<<<<<<< HEAD
//<<<<<<< HEAD

	let user = {username:req.body.username, password:req.body.password,
		realname:req.body.realname, age:req.body.age , signupdate : new Date().toString()};

	for (let i=0;i<users.length;i++) {
		if (users[i] && user.username == users[i].username)
			return (null);
		}
	users.push(user);
	req.session_state.username = user.username;
	req.session_state.password = user.password;
	req.session_state.realname = user.realname;
	req.session_state.age = user.age;
	req.session_state.datejoined = user.signupdate;
	res.json({redirect:"/session"});
=======
>>>>>>> 603f2351472d4b3ce5168f141bc8778d5e277c1e

=======


router.post('/signup', function(req, res){
//add or modify.  Check if a valid signup.  If the signup is valid,
//                  add user and password info to userInfo array.
//                  Give req.session_state.??? a valid value.
//                  Send back a json object of {redirect:"/session"}.
//                else send back a json object that is null.

console.log("signup");
if (req.body.username == "" || req.body.password == "") {
res.json(null);
return;
}
else{
	db.addObject({username:req.body.username,
								password:req.body.password,
								password2:req.body.password2, 
								realname:req.body.realname,
								age:req.body.age});
	req.session_state.username = req.body.username;
	req.session_state.password = req.body.password;
	//eilise: not neccesary currently
	//may come in handy later
	res.json({redirect:"/login"});
}
});



router.post('/login', function(req, res){
	let objs = db.getAllObjects();
//add or modify.  Determine if the login info is valid.  If the login is valid,
//                  set req.session_state.??? to a valid value.
//                  Send back a json object of {redirect:"/session"}.
//                else send back a json object that is null.
		console.log("login");
		if (req.body.username == "" || req.body.password == "") {
		res.json(null);
		return;
		}
	else {
		for(var i = 0; i < objs.length; i++)
		{
 				if(req.body.username == objs[i].username)
				{
					if(req.body.password == objs[i].password)
					{
					req.session_state.username = req.body.username;
					res.json({redirect:"/session"});
			  	}
				}
		}
	}
			res.json(null);

>>>>>>> 504a6d6fe58c195ba14086f773571441e9348a23
});



<<<<<<< HEAD
router.post('/login', function(req, res){
//add or modify.  Determine if the login info is valid.  If the login is valid,
//                  set req.session_state.??? to a valid value.
//                  Send back a json object of {redirect:"/session"}.
//                else send back a json object that is null.
		console.log("We in here");
		if (req.body.username == "" || req.body.password == "") {
		res.json(null);
		return;
		}
		else{
		req.session_state.username = req.body.username;
		res.json({redirect:"/session"});
		}
});



=======
>>>>>>> 504a6d6fe58c195ba14086f773571441e9348a23
module.exports = router;
