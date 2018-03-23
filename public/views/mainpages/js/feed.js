

function logoutClicked(){

	return false;
}

function sessionSuccess(user){

}

$(document).ready(function(){
	$.get('/sessionInfo',null,sessionSuccess)
});
