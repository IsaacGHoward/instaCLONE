



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
    $("#username").keyup(function(e){     
    var str = $.trim( $(this).val() );
    if( str != "" ) {
      var regx = /^[A-Za-z0-9]+$/;
      if (!regx.test(str)) {
       alert("Alphanumeric Only (No Spaces)");
      }
    }
    else {
       //empty value -- do something here
    }
    });
		$("#password").keydown( function( event ) {
            if ( event.which === 13 ) {
              userClicked();
              event.preventDefault();
              return false;
            }
        });
    $("#password").keyup(function(e){     
    var str = $.trim( $(this).val() );
    if( str != "" ) {
      var regx = /^[A-Za-z0-9]+$/;
      if (!regx.test(str)) {
       alert("Alphanumeric Only (No Spaces)");
      }
    }
    else {
       //empty value -- do something here
    }
    });
      $("#password2").keydown( function( event ) {
            if ( event.which === 13 ) {
              userClicked();
              event.preventDefault();
              return false;
            }
        });
      $("#password2").keyup(function(e){     
    var str = $.trim( $(this).val() );
    if( str != "" ) {
      var regx = /^[A-Za-z0-9]+$/;
      if (!regx.test(str)) {
       alert("Alphanumeric Only (No Spaces)");
      }
    }
    else {
       //empty value -- do something here
    }
    });
     $("#realname").keydown( function( event ) {
            if ( event.which === 13 ) {
              userClicked();
              event.preventDefault();
              return false;
            }
        });
     $("#realname").keyup(function(e){     
    var str = $.trim( $(this).val() );
    if( str != "" ) {
      var regx = /^[A-Za-z ]+$/;
      if (!regx.test(str)) {
       alert("Only letters please, yain't a robot");
      }
    }
    else {
       //empty value -- do something here
    }
    });
      $("#age").keydown( function( event ) {
            if ( event.which === 13 ) {
              userClicked();
              event.preventDefault();
              return false;
            }
        });
      $("#email").keydown( function( event ) {
            if ( event.which === 13 ) {
              userClicked();
              event.preventDefault();
              return false;
            }
        });
      $("#submit").click(function(){

        var selectedText = $("#age").val();
        var selectedDate = new Date(selectedText);
          var now = new Date();
       

        if($("#password").val() != $("#password2").val())
          alert("Passwords must match");
        else if ($("#age").val() > Date.now()) {
          alert("Enter Valid Birthday");
        }
        else if (!$("#email").val()) {
          alert("Enter Valid Email");
        }
        else if (!$("#username").val()) {
          alert("Fill all fields");
        }
        else if (!$("#password").val()) {
          alert("Fill all fields");
        }
         else if (!$("#password2").val()) {
          alert("Fill all fields");
        }
         else if (!$("#realname").val()) {
          alert("Fill all fields");
        }
         else if (selectedDate > now) {
         alert("Date must be valid");
        }
        else
        userClicked();
      });


  		});
