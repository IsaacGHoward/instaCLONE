

<<<<<<< HEAD
 		
  		function userClicked(){

//add or modify.  Add a post request on path /signup.  Pass the needed data
//                to the server and have the success callback either say
//                signup is bad or redirect to /session.

    			return false;
    		}


  		$(document).ready(function(){ 

//add or modify.  Add code to call userClicked() when enter key is pressed
//                for username and password text input.


  		});  		
    

=======


  		function userClicked(){

//.  Add a post request on path /login.  Pass the needed data
//                to the server and have the success callback either say
//                login is bad or redirect to /session.

		$.ajax({
            url: "/signup",
            type: "POST",
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



  		});
>>>>>>> 61adf9c66bc999411b113a43644bdea28c883c1c
