
let user;
let post;




function getPosts()
{

	console.log('getPosts function called');
	$.ajax({
					url: "/followerPosts",
					type: "GET",
					success: function(data){
					console.log('get follower posts success');
					if (!data)
							alert("No Posts");
					else
					{
						let postarr;
							for (let j=0;j<data.length;j++)
							{
								post = data[j].imageName;
								$("#postlist").append($('<img>',{src:'/public/images/' + String(post)}));
								$('#postlist').append(data[j].caption);
								//console.log(data[j]);
								//	$("#postlist").append("<li> " +
								//												data[j].image + "</li>");
							}
					}

					} ,
					dataType: "json"
					});

			return false;
			}

$(document).ready(function(){



	//$.get('/userInfo',null,sessionSuccess)

//add or modify.  Do a get request on /userInfo to get user session data
//                about the currently logged in user.  Use that data to
//                modify the DOM to personalize the session.



	$("#getposts").click( function( event ) {
				console.log('get posts clicked');
				getPosts();
				return false;
					});

//add or modify.  Call logoutClicked when logout button is pressed.


});
