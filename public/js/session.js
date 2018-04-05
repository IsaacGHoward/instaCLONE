

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
function postClicked()
{
	$.ajax({
					url: "/postPicture",
					type: "POST",
					data: {},
					success: function(data){

					if (!data)
							alert("Sign Up Invalid");
						else
						 window.location = data.redirect;
					} ,
					dataType: "json"
					});

			return false;
			}
	function getUsers()
	{
		$.ajax({
						url: "/userList",
						type: "GET",
						data: {},
						success: function(data){

						if (!data)
								alert("Sign Up Invalid");
						else
						{
								for (let j=0;j<data.length;j++) {

									$("#userList").append("<li>" data[j] "<li>")
								}
						}

						} ,
						dataType: "json"
						});

				return false;
				}


$(document).ready(function(){



	$.get('/userInfo',null,sessionSuccess)

//add or modify.  Do a get request on /userInfo to get user session data
//                about the currently logged in user.  Use that data to
//                modify the DOM to personalize the session.

	$("#submit").onClick( function( event ) {
				postClicked();
				return false;
				});

	$("#allUsers").onClick( function( event ) {
				getUsers();
				return false;
					});

//add or modify.  Call logoutClicked when logout button is pressed.


});
