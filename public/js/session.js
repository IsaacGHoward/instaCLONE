
let user;
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
	
	let loc;
	
	console.log("/public/images/" + String("bison.jpg") +"");
	for (let i=0;user.postObjects.length;i++) {
		loc = user.postObjects[i].imageName;
	
	$('#postlist').append($('<img>',{src:'/public/images/' + String(loc)}));
	$('#postlist').append(user.postObjects[i].caption);
	}
	
	//$('#postlist').append(user.postObjects[0].image);


}
function postClicked()
{
	console.log(user);
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
	function getUserProfile()
			{
				console.log(user);
				$.ajax({
								url: "/getUserProfile",
								type: "GET",
								data: {username:user},
								success: function(data){

								if (!data)
										alert("Sign Up Invalid");
									else
									alert("Success")
									 window.location = data.redirect;
								} ,
								dataType: "json"
								});

						return false;
						}
	function getUsers()
	{

		console.log('getUsers function called');
		$.ajax({
						url: "/userList",
						type: "GET",
						success: function(data){
						console.log('get users success');
						if (!data)
								alert("No Users");
						else
						{
								for (let j=0;j<data.length;j++)
								{
									user = data[j];
									console.log(data[j]);
										$("#userList").append("<button> <a href='javaScript:getUserProfile()';>" +
										 											data[j] + "</a></button>");
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



	$("#allUsers").click( function( event ) {
				console.log('all users clicked');
				getUsers();
				return false;
					});
	


//add or modify.  Call logoutClicked when logout button is pressed.


});
