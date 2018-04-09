

function logoutClicked(){

	return false;
}

function sessionSuccess(user){

}

$(document).ready(function(){
	function initpost()
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
initpost();
$("#submitcomment").click( function( event ) {
			console.log('Comment : ' + $('#commentinput').val());
			var postcap = $('#posttitle').val();
			console.log(postcap);
			$.post('/addcomment',{'postcaption' : postcap},null);
			//getUsers();
			return false;
				});
	//$.get('/userInfo',null,sessionSuccess)
	//do get request for viewed post
});
