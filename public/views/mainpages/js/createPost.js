

function logoutClicked(){

	return false;
}

/*function sessionSuccess(user){
	$('#username').html(user.username+"'s"+" profile");
	$('#name').html("Name: " + user.realname);
	$('#age').html("DOB: " + user.age);
	$('datejoined').html("Date Joined: " + user.sd);
}*/
function submitClicked()
{
	$.ajax({
					url: "/submitPost",
					type: "POST",
					data: {},
					success: function(data){

					if (!data)
							alert("ERROR");
						
					} ,
					dataType: "json"
					});

			return false;
			}



	 $("form").submit(
          function(event)
          {

            if ($("#fileStuff").val() == "") {
              alert("NO IMAGE");
              return false;
            }

            submitClicked();


          });
        });

	//$.get('/userInfo',null,sessionSuccess)

