
var express = require("express");
var router = express.Router();
var path = require("path");
var myDatabase = require('./myDatabase');
var clientSessions = require('client-sessions');
var formidable = require('formidable');
var fs = require('fs');
var db = new myDatabase();

var captionText;

router.get("/signup",function(req,res){

res.sendFile(__dirname + "/public/views/signup.html");
});


router.get("/",function(req,res){
//	db.deleteAllObjects();
	res.sendFile(__dirname + "/public/views/login.html");
});

router.get("/getuserinfo",function(req,res){
  //console.log("get user info");
	//console.log("req query name : " + req.query.name);
	//console.log(db.getObjectWithUsername(req.query.name));
	res.json(db.getObjectWithUsername(req.query.name));
})

router.post('/follow', function(req,res){
	//console.log("FOLLOW ATTEMPTED");
	//console.log(req.body.localuser.username);
	//console.log(req.body.otheruser);
	var newObj = db.addFriendToUser(req.body.localuser.username,req.body.otheruser );
	//console.log(newObj);
});
router.post('/unfollow', function(req,res){
	//remove friend
	var newObjj = db.removeFriend(req.body.localuser.username,req.body.otheruser );
});
router.get('/checkFollow',function(req,res){
	var toset = false;
	var friendlist = db.getAllFriendsofUser(req.query.localuser.username);
	for (let i=0;i<friendlist.length;i++) {
		if (friendlist[i] && friendlist[i].username == req.query.otheruser.username) {
			toset = true;
		}
	}
	res.json(toset);
});

router.get("/login",function(req,res){
	res.sendFile(__dirname + "/public/views/login.html");
	console.log("LOGINN");
});

router.get("/userList",function(req,res){
	res.json(db.getAllUsernames());
});

router.get("/followerPosts",function(req,res){
	res.json(db.getAllPostsWithUsername('a'));
});

router.post("/getUserProfile",function(req,res){
	console.log(req.body.username);
	res.sendFile(__dirname + "/public/views/profile.html");
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
let usernames = db.getAllUsernames();
for (let i=0;i<usernames.length;i++) {
	if (usernames[i] == req.body.username) {
		res.json(null);
	}
}
console.log("signup");
if (req.body.username == ""
 || req.body.password == "") {
		res.json(null);
		return;
}
else{
	var signupDate = new Date();
	db.addObject({username:req.body.username,
								password:req.body.password,
								realname:req.body.realname,
								age:req.body.age,
								sd:signupDate,
							  postObjects:[],
								friendList:[],
								userMsgHist : []
						 		});
	req.session_state.username = req.body.username;
	req.session_state.password = req.body.password;
	req.session_state.realname = req.body.realname;
	req.session_state.age = req.body.age;
	console.log(db.getObjectWithUsername(req.body.username));
	res.json({redirect:"/login"});
}
});



router.post('/login', function(req, res){
	console.log("login");
	let objs = db.getAllObjects();
//add or modify.  Determine if the login info is valid.  If the login is valid,
//                  set req.session_state.??? to a valid value.
//                  Send back a json object of {redirect:"/session"}.
//                else send back a json object that is null

		if (req.body.username == "" || req.body.password == "") {
				res.json(null);
		return;
		}
	else {
		for(var i = 0; i < objs.length; i++)
		{
			console.log(objs[i]);

 				if(req.body.username == objs[i].username)
				{
					if(req.body.password == objs[i].password)
					{
						req.session_state.username = req.body.username;
						res.json({redirect:"/public/views/session.html"});
			  	}
				}
		}
	}
			res.json(null);
			//https://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client to try to fix the
			//cmd error resulting from this

});
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

		res.json({});


});

router.post('/mainpages/html/fileupload', function(req, res){

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = __dirname + '/public/images/' + files.filetoupload.name;

      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;

        	let today = new Date();
//console.log("fileupload " + files.filetoupload.name);
//console.log("fileupload " + files.filetoupload);
//console.log("today is " + today);
//console.log(Date.now());
//console.log(req.body.caption);
		let postObject = {username:req.session_state.username, //redundant but adding jsut in case
							  realname:req.session_state.realname,
							  date:today,
							  timestamp:Date.now(),
							  caption: fields.caption ,
							  imageLocation:(__dirname + '/public/images/' + files.filetoupload.name),
							  imageName: files.filetoupload.name,
							  image: files.filetoupload,
								comments: []
						 		}
			/////
			db.postWithUsername(req.session_state.username, postObject);
			db.postWithRealname(req.session_state.realname,	postObject);

//console.log(db.getAllPostsWithUsername("a"));
	 res.json({redirect:"../../session"});
      });
    });
});



module.exports = router;
