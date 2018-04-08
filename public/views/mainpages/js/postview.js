

function logoutClicked(){

	return false;
}

function sessionSuccess(user){

}

$(document).ready(function(){
	function addComment()
	{
		var parameters = location.search.substring(1).split("&");

		var temp = parameters[0].split("=");
		l = unescape(temp[1]);

		//temp = parameters[1].split("=");
		//c = unescape(temp[1]);
		l = l.split('_').join(' ');
		console.log(l);
		$("#posttitle").html(l);
		//document.getElementById("log").innerHTML = l;
		//document.getElementById("pass").innerHTML = c;
	}
addComment();
	//$.get('/userInfo',null,sessionSuccess)
	//do get request for viewed post
});
