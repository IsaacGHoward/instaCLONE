



function success(data){

}
function submitClicked(){
	console.log("submit clicked");
	let indexval = $("#index").val();
	let objval = $("#username").val();
	let colval = $("#color").val();
	let ratingval = $('#rating').val();
	$.get("/changeobj",{index : indexval , object : objval , color : colval , rating : ratingval},success);
	return false;
}
function doChecks(){
	if($("#index").val() < 0)
		return("index");
	else if($("#username").val() == "")
		return("object");
	return("good");
}
function feedClicked(){
  console.log("feedClicked");
  $.get("/feed");
  return false;
}
$(document).ready(function(){

    $("#feed").click(feedClicked);

	//$("#submitButton").click(submitClicked);

});
