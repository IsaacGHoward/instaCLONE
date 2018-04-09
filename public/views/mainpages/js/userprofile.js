
var user;
var loggeduser;
function logoutClicked(){
//add or modify.  Do a get request on /logout and have the callback
//                from the server redirect to /login.

	return false;
}

function sessionSuccess(User){
	user = User;
	console.log(user.username);
	$('#name').html("Name: " + user.realname);
	//$('#username').html(user.username+"'s"+" profile");
	//$('#name').html("Name: " + user.realname);
	//$('#age').html("DOB: " + user.age);
	//$('datejoined').html("Date Joined: " + user.sd);

	let loc;
  var userposts = user.postObjects
	userposts.sort(function(a, b) {
		return b.timestamp - a.timestamp;
	});
	console.log("/public/images/" + String("bison.jpg") +"");
	for (let i=0;userposts.length;i++) {
		loc = userposts[i].imageName;

	$('#postlist').append($('<img>',{src:'/public/images/' + String(loc)}));
	$('#postlist').append("<br>");
	$('#postlist').append(userposts[i].caption);
	$('#postlist').append("<br><br><br><hr><br><br><br>");
	}

	//$('#postlist').append(user.postObjects[0].image);


}
function loggedInUserSuccess(logged_user){
	loggeduser = logged_user;
	console.log("LOGGED IN USER: " +logged_user.username);
}

function followResult(result){
	if(result == true)
	{
		console.log("already following");
			$('#addfriend').html("Following");
	}
	else{
		console.log("not following");
		$.post('/follow' ,{'localuser' : loggeduser , 'otheruser' : user},null );
	}


}


$(document).ready(function(){

	$("#addfriend").click( function( event ) {
				$.get('/checkFollow',{'localuser' : loggeduser , 'otheruser' : user},followResult);
				console.log(loggeduser.username + ' has followed ' + user.username);
				//getUsers();
				return false;
					});

	function viewUser()
	{
		var parameters = location.search.substring(1).split("&");

		var temp = parameters[0].split("=");
		l = unescape(temp[1]);

		//temp = parameters[1].split("=");
		//c = unescape(temp[1]);
		//c= c.split('_').join(' ');
		//l = l.split('_').join(' ');
		console.log(" VIEWED USER : " + l);
		//console.log(c);
		//$("#postimage").attr("src",c);
		$("#username").html(l+"'s Profile");
		$.get('/getuserinfo',{'name' : l},sessionSuccess);
		//console.log("USERNAME : " + user.username);
		//document.getElementById("log").innerHTML = l;
		//document.getElementById("pass").innerHTML = c;
	}
	viewUser();
	$.get('/userInfo',null,loggedInUserSuccess);
	//$.get('/userInfo',null,sessionSuccess)

//add or modify.  Do a get request on /userInfo to get user session data
//                about the currently logged in user.  Use that data to
//                modify the DOM to personalize the session.







//add or modify.  Call logoutClicked when logout button is pressed.


});
