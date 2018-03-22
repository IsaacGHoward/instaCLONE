

function logoutClicked(){
//add or modify.  Do a get request on /logout and have the callback
//                from the server redirect to /login.

	return false;
}

function sessionSuccess(user){
	$('#username').html(user.username+"'s"+" profile");
	$('#name').html("Name: " + user.realname);
	$('#age').html("DOB: " + user.age);
	$('datejoined').html("Date Joined: " + user.sd);
}

$(document).ready(function(){
	$.get('/userInfo',null,sessionSuccess)

//add or modify.  Do a get request on /userInfo to get user session data
//                about the currently logged in user.  Use that data to
//                modify the DOM to personalize the session.



//add or modify.  Call logoutClicked when logout button is pressed.


});
