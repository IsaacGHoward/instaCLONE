



  		function userClicked(){

//.  Add a post request on path /login.  Pass the needed data
//                to the server and have the success callback either say
//                login is bad or redirect to /session.

		$.ajax({
            url: "/signup",
            type: "POST",

            data: {username:$("#username").val(), password:$("#password").val(),
            password2:$("#password2").val(), realname:$("#realname").val(),
            age:$("#age").val()},

            data: {username:$("#username").val(), password:$("#password").val()},

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


  		$(document).ready(function(){

//.  Add code to call userClicked() when enter key is pressed
//                for username and password text input.

		$("#username").keydown( function( event ) {
            if ( event.which === 13 ) {
              userClicked();
              event.preventDefault();
              return false;
            }
        });
		$("#password").keydown( function( event ) {
            if ( event.which === 13 ) {
              userClicked();
              event.preventDefault();
              return false;
            }
        });
      $("#password2").keydown( function( event ) {
            if ( event.which === 13 ) {
              userClicked();
              event.preventDefault();
              return false;
            }
        });
     $("#realname").keydown( function( event ) {
            if ( event.which === 13 ) {
              userClicked();
              event.preventDefault();
              return false;
            }
        });
      $("#age").keydown( function( event ) {
            if ( event.which === 13 ) {
              userClicked();
              event.preventDefault();
              return false;
            }
        });
      $("#submit").click(function(){
         userClicked();
      }); 


  		});
