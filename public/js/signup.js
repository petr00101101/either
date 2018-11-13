


  		function userClicked(){

//add or modify.  Add a post request on path /signup.  Pass the needed data
//                to the server and have the success callback either say
//                signup is bad or redirect to /session.
			 $.ajax({
            url: "/signup",
            type: "POST",
            data: {username:$('#username').val(),password:$('#password').val(),admin:$('#admin').val()},
            success : function(data)
            {
              if (!data)
                alert("Signup Is Bad");
              else{
                localStorage.setItem("admin",$('#admin').val());
                localStorage.setItem("name", $("#username").val());
                var password = $("#password").val();
                var newPass = "";
                for(var i=0;i<1;i++){
                    newPass += password[i];
                }
                for(var i=0;i<password.length-1;i++){
                    newPass += "*";
                }
                localStorage.setItem("thisPass", newPass);
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
            url: "/signin",
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
			$("#signup").click(userClicked);
      $("#goback").click(print);
      $("#signInButton").click(print);
  		});
