



  		function userClicked(){

//add or modify.  Add a post request on path /login.  Pass the needed data
//                to the server and have the success callback either say
//                login is bad or redirect to /session.
  console.log("Login Requested");
			$.ajax({
            url: "/login",
            type: "POST",
            data: {username:$('#username').val(),password:$('#password').val()},
             success:function(data){
              if (!data)
                alert("Login Is Bad");
              else{
                
                  window.location = data.redirect;
              }

            } ,
            dataType: "json"
          });

    			return false;
    		}

      function print(){

         let useless = true;
        $.ajax({
            url: "/signupPage",
            type: "POST",
            data: {useless},
             success:function(data){
                //console.log("gots");
                window.location = data.redirect;
            } ,
            dataType: "json"
          });

          return false;
      }
  		$(document).ready(function(){

//add or modify.  Add code to call userClicked() when enter key is pressed
//                for username and password text input.
				$('#login').click(userClicked);
        $('#registar').click(print);
        $("#signUpbutton").click(print);
  		});
