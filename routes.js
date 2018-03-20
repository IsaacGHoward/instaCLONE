	
var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");
var clientSessions = require('client-sessions');


<<<<<<< HEAD
router.get("/",function(request,response){
	response.sendFile(__dirname + "/public/views/profile.html");
=======
router.get("/signup",function(req,res){
//add or modify.  Send back to the client signup.html.	
	
>>>>>>> 61adf9c66bc999411b113a43644bdea28c883c1c
});


router.get("/",function(req,res){
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


router.get("/session",function(req,res){
//add or modify.  Look at req.session_state.??? to check if a session is active.
//                If session is active then send back to the client session.html.
//                else send back to the client login.html.\
		console.log(req.session_state.username);
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

});

 

let userInfo = [];

router.post('/signup', function(req, res){
//add or modify.  Check if a valid signup.  If the signup is valid,
//                  add user and password info to userInfo array.
//                  Give req.session_state.??? a valid value.
//                  Send back a json object of {redirect:"/session"}.
//                else send back a json object that is null.

});



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



module.exports = router;
