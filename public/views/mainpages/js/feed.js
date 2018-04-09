
let user;
let post;


function sessionSuccess(user){
	//$('#username').html(user.username+"'s"+" profile");
	//$('#name').html("Name: " + user.realname);
	//$('#age').html("DOB: " + new Date(user.age));
	//$('#datejoined').html("Date Joined: " + user.sd);
for (let i=0;user;i++) {
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
}
	//$('#postlist').append(user.postObjects[0].image);


}

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
						data.sort(function(a, b) {
						  return b.timestamp - a.timestamp;
						});
							for (let j=0;j<data.length;j++)
							{
								post = data[j].imageName;

								$("#postlist").append($('<img>',{src:'/public/images/' + String(post)}));
								console.log('/public/images/' + String(post));
								var imgdir = '/public/images/' + String(post);
								imgdir = imgdir.split(' ').join('_');
								$('#postlist').append("<br>");
								$('#postlist').append(data[j].caption);
								var caption = data[j].caption;
								caption = caption.split(' ').join('_');
								console.log(caption);
								$('#postlist').append(
								  '<form action="postview.html">' +
  								'<input type="hidden" name="varname" value=' + caption  +' />' +
									'<input type="hidden" name="imagedir" value=' + imgdir + ' />' +
  								'<input type="submit" value="View Post">' +
									'</form>'

								)
								$('#postlist').append("<br><br><br><hr><br><br><br>");
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



	//$("#getposts").click( function( event ) {
				console.log('get posts clicked');
				getPosts();
				return false;
	//				});

//add or modify.  Call logoutClicked when logout button is pressed.


});
