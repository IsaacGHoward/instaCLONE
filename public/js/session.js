
let user;
function logoutClicked(){
//add or modify.  Do a get request on /logout and have the callback
//                from the server redirect to /login.

	return false;
}

function sessionSuccess(user){
	$('#username').html(user.username+"'s"+" profile");
	$('#name').html("Name: " + user.realname);
	$('#age').html("DOB: " + new Date(user.age));
	$('#datejoined').html("Date Joined: " + user.sd);

	let loc;
  var userposts = user.postObjects;
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

	function userload()
	{
		var parameters = location.search.substring(1).split("&");

		var temp = parameters[0].split("=");
		l = unescape(temp[1]);

		temp = parameters[1].split("=");
		c = unescape(temp[1]);
		c= c.split('_').join(' ');
		l = l.split('_').join(' ');
		console.log(l);
		console.log(c);
		$("#postimage").attr("src",c);
		$("#posttitle").html(l);
		//document.getElementById("log").innerHTML = l;
		//document.getElementById("pass").innerHTML = c;
	}

	$.get('/userInfo',null,sessionSuccess);

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
