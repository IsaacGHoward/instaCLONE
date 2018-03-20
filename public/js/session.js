

function logoutClicked(){
//add or modify.  Do a get request on /logout and have the callback
<<<<<<< HEAD
//                from the server redirect to /login.	

	return false;             
}


$(document).ready(function(){ 
=======
//                from the server redirect to /login.

	return false;
}

function sessionSuccess(user){
	$('#username').html(user+"'s"+" profile");
}

$(document).ready(function(){
	$.get('/sessionInfo',null,sessionSuccess)
>>>>>>> 61adf9c66bc999411b113a43644bdea28c883c1c

//add or modify.  Do a get request on /userInfo to get user session data
//                about the currently logged in user.  Use that data to
//                modify the DOM to personalize the session.



//add or modify.  Call logoutClicked when logout button is pressed.


<<<<<<< HEAD
});  		
    
=======
});
>>>>>>> 61adf9c66bc999411b113a43644bdea28c883c1c
