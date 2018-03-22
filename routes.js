
var express = require("express");
var router = express.Router();
var path = require("path");
var myDatabase = require('./myDatabase');
var clientSessions = require('client-sessions');
var db = new myDatabase();


router.get("/signup",function(req,res){

res.sendFile(__dirname + "/public/views/signup.html");
});


router.get("/",function(req,res){

	res.sendFile(__dirname + "/public/views/login.html");
});


router.get("/login",function(req,res){
	res.sendFile(__dirname + "/public/views/login.html");
});

router.get("/logout",function(req,res){
	req.session_state.reset();
	res.json({redirect:"/login"});
});


router.get("/session",function(req,res){
//add or modify.  Look at req.session_state.??? to check if a session is active.
//                If session is active then send back to the client session.html.
//                else send back to the client login.html.
		if(req.session_state.username)
		{
			res.sendFile(__dirname + "/public/views/session.html");
		}
		else
			res.sendFile(__dirname + "/public/views/session.html");
});

router.get("/userInfo",function(req,res){
//add or modify.  Look at req.session_state.??? to check if a session is active.
//                If session is active then send back to client a json object
//                   with the user data.
//                else send back a json object that is null.
if(req.session_state.username)
{
	res.json(db.getObjectWithUsername(req.session_state.username));
}
else
		res.json(null);

});


router.post('/signup', function(req, res){
//add or modify.  Check if a valid signup.  If the signup is valid,
//                  add user and password info to userInfo array.
//                  Give req.session_state.??? a valid value.
//                  Send back a json object of {redirect:"/session"}.
//                else send back a json object that is null.

console.log("signup");
if (req.body.username == ""
 || req.body.password == ""
 || req.body.password != req.body.password2) {
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
	req.session_state.realname = req.body.realname;
	req.session_state.age = req.body.age;
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

		console.log(req.body.username);
			console.log(req.body.password);

		for(var i = 0; i < objs.length; i++)
		{
			console.log(objs[i]);
			
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

});



module.exports = router;
