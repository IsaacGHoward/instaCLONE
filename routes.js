
var express = require("express");
var router = express.Router();
var path = require("path");
var myDatabase = require('./mongoDatabase');
var clientSessions = require('client-sessions');
var formidable = require('formidable');
var fs = require('fs');
var passport = require("passport");
var db = new myDatabase();
var User = require("./models/User.js");
var captionText;

router.use(function(req, res, next) {
  res.locals.currentUserjy = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

router.get("/signup",function(req,res){

res.sendFile(__dirname + "/public/views/signup.html");
});

router.get("/",function(req,res){
//	db.deleteAllObjects();
	res.sendFile(__dirname + "/public/views/login.html");
});

router.post('/follow', function(req,res){
	console.log("FOLLOW ATTEMPTED");
	console.log(req.body.localuser.username);
	console.log(req.body.otheruser);
	var newObj = db.addFriend(res,{username:req.user.username,
                                otherUsername:req.body.otheruser});
	//console.log(newObj);
});
router.post('/unfollow', function(req,res){
	var newObjj = db.removeFriend(res,{username:req.user.username,
                                otherUsername:req.body.otheruser});
});
router.get('/checkFollow',function(req,res){

	var friendlist = db.checkIfFriend(res,{username:req.user.username,
                                        otherUsername:req.query.otheruser});

});

router.get("/login",function(req,res){
	res.sendFile(__dirname + "/public/views/login.html");
});

router.get("/userList",function(req,res){
  User.find({},function(err, user) {

		if (err) { return next(err); }

		if (user)
			res.json(user);

	});

});

router.get("/followerPosts",function(req,res){
	db.getAllPosts(res);
});

router.post("/getUserProfile",function(req,res){
	console.log(req.body.username);
	res.sendFile(__dirname + "/public/views/profile.html");
});

router.get("/logout",function(req,res){
	req.user.reset();
	res.json({redirect:"/login"});
});


router.get("/session",function(req,res){
//add or modify.  Look at req.user.??? to check if a session is active.
//                If session is active then send back to the client session.html.
//                else send back to the client login.html.
		if(req.isAuthenticated())
		{
			res.sendFile(__dirname + "/public/views/session.html");
		}
		else
			res.sendFile(__dirname + "/public/views/session.html");
});

router.get("/userInfo",function(req,res){
  console.log('in user info');
if (req.isAuthenticated()) {

  User.find({username:req.user.username},function(err, user) {

		if (err) { return next(err); }

		if (user)
    console.log(user);
			res.json(user);

	});

	}
	else {
		res.json(null);
	}
});
router.get("/userPost",function(req,res){
if (req.isAuthenticated()) {
  db.getAllPostsWithUsername(res,req.user.username);
	}
	else {
		res.json(null);
	}
});
router.post("/deleteAccount",function(req,res){
if (req.isAuthenticated()) {
  User.findOneAndRemove({username:req.body.username},function(error,removed) {
			if (error) {
        console.log('error');
					 res.json(null);
			}
      req.session.destroy();
      res.json({redirect:"/login"});
	});


	}
	else {
		res.json(null);
	}
});
router.get("/successroot", function(req, res) {
console.log("get successroot");
	res.json({redirect:"/session"});
});

router.get("/failroot", function(req, res) {
console.log("get failroot");
	res.json({redirect:"/login"});
});

router.get("/successsignup", function(req, res) {
console.log("get successsignup");
		res.sendFile(__dirname + "/public/views/login.html");
});

router.get("/failsignup", function(req, res) {
console.log("get failsignup");
		res.sendFile(__dirname + "/public/views/login.html");
});

router.get("/successlogin", function(req, res) {
console.log("get successlogin");
console.log(req.user);
	res.json({redirect:"/session"});
});
router.get("/faillogin", function(req, res) {
console.log("get faillogin");
	res.json({redirect:"/login"});

});

router.post('/signup', function(req, res){
			console.log("pre signup");
	console.log("post signup");
		var age = req.body.age;
	   var sd	= new Date();
  	var realname = req.body.realname;
	  var username = req.body.username;
	  var password = req.body.password;
    console.log(age);
    console.log(realname);
	  User.findOne({ username: username }, function(err, user) {

	    if (err) { return next(err); }
	    if (user) {
	      req.flash("error", "User already exists");
	      return res.redirect("/failsignup");
	    }
	console.log("post signup1");

	    var newUser = new User({
	      username: username,
	      password: password,
        realname:realname,
        age: age,
        sd: sd
	    });
	console.log("post signup2");
  console.log(newUser);
	    newUser.save();    //this line has to be called.
	console.log("post signup done");

	  });


	}, passport.authenticate("login", {
	  successRedirect: "/successsignup",
	  failureRedirect: "/failsignup",
	  failureFlash: true
	}));


	router.post("/login", passport.authenticate("login", {
	  successRedirect: "/successlogin",
	  failureRedirect: "/faillogin",
	  failureFlash: true
	}));

router.get("/postPicture",function(req,res){
	///when posting a picture or comment, in the JSON object, we will need to specify its "type"
	//and specify its "label"
	console.log('we here');

res.sendFile(__dirname + "/public/views/mainpages/html/createPost.html");

});

router.post("/submitPost",function(req,res){

	//console.log('we here in submit post');
	//console.log("upload");

	//captionText = req.body.caption;
	//console.log(captionText);

		res.json({redirect:"./mainpages/html/feed.html"});


});

router.post('/mainpages/html/fileupload', function(req, res){

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = __dirname + '/public/images/' + files.filetoupload.name;

      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;

        	let today = new Date();
console.log("fileupload " + files.filetoupload.name);
console.log("fileupload " + files.filetoupload);
console.log("today is " + today);
console.log(Date.now());
console.log(fields.caption);
		let postObject = {username:req.user.username, //redundant but adding just in case
							  realname:req.user.realname,
							  date:today,
							  timestamp:Date.now(),
							  caption: fields.caption ,
							  imageLocation:(__dirname + '/public/images/' + files.filetoupload.name),
							  imageName: files.filetoupload.name,
							  image: files.filetoupload,
								comments: []
						 		}
			/////
			db.createPost(res, postObject);

      });
    });
});


module.exports = router;
