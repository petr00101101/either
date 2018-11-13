

function logoutClicked(){
//add or modify.  Do a get request on /logout and have the callback
//                from the server redirect to /login.
		$.ajax({
            url: "/logout",
            type: "GET",

             success:function(data){
              if (!data)
                alert("Login Is Bad");
              else
               window.location = data.redirect;
            } ,
            dataType: "json"
          });
	return false;
}
function print(){
console.log("this");
 let useless = true;
 $.ajax({
		url: "/outIt",
		type: "POST",
		data: {useless},
		 success:function(data){
				console.log(data.redirect);
				window.location = data.redirect;
		} ,
		dataType: "json"
	});

	return false;
}
function print2(){
    console.log("thisisthis");
 	let useless = true;
	$.ajax({
		url: "/index",
		type: "POST",
		data: {useless},
		 success:function(data){
				//console.log(data.redirect);
				window.location = data.redirect;
		} ,
		dataType: "json"
	});

	return false;
}
///////////////////////////////////////////////////////////////////////////////
function getRED(){
 	let useless = true;
	$.ajax({
		url: "/getred/"+ $("#leftButtons").html(),
		type: "GET",
		data: {useless},
		 success:function(data){
				addRed(data, $("#leftButtons").html());
		} ,
		dataType: "json"
	});

	return false;
}

function getBlue(){
 	let useless = true;
	$.ajax({
		url: "/getblue/"+ $("#rightButtons").html(),
		type: "GET",
		data: {useless},
		 success:function(data){
			 addBlue(data, $("#rightButtons").html());
		} ,
		dataType: "json"
	});

	return false;
}
function addBlue(word, right){
 	let useless = true;
	$.ajax({
		url: "/blue/"+word,
		type: "PUT",
		data: {"word":word,"right":right},
		 success:function(data){
             getValues( $("#leftButtons").html());
		} ,
		dataType: "json"
	});

	return false;
}
function addRed(word, left){
 	let useless = true;
	$.ajax({
		url: "/red/"+word,
		type: "PUT",
		data: {"word":word,"left":left},
		 success:function(data){
             getValues( $("#leftButtons").html());
		} ,
		dataType: "json"
	});

	return false;
}

function getValues(left){
		//var otherName = _otherName;
 	let useless = true;
	$.ajax({
		url: "/getValues/"+left,
		type: "GET",
		data: {useless},
		 success:function(data){
             console.log("values are:" +data);
             //console.log("left:" +(data[0]/(data[1]+data[0]))*100);
             //console.log("right:" +(data[1]/(data[1]+data[0]))*100);
             let left = (data[0]/(data[1]+data[0]))*100;
             let right = (data[1]/(data[1]+data[0]))*100;
             
             //percentages
             $("#peoplePercentLEFT").css("display", "block");
             $("#peoplePercentRIGHT").css("display", "block");
             $("#peoplePercentLEFT").css("margin-bottom", "2px");
             $("#peoplePercentRIGHT").css("margin-bottom", "2px");
             $("#peoplePercentLEFT").css("margin-top", "2px");
             $("#peoplePercentRIGHT").css("margin-top", "2px");
          
             for(let i=0;i<=left;i++)
                 $("#peoplePercentLEFT").html(  i + "%" );
             for(let b=0;b<=right;b++)
                $("#peoplePercentRIGHT").html( b + "%" );
             //numbers
             $("#peopleLEFT").css("display", "block");
             $("#peopleRIGHT").css("display", "block");
             $("#peopleLEFT").html(data[0] + " people chose");
             $("#peopleRIGHT").html(data[1] + " people chose");
		} ,
		dataType: "json"
	});

	return false;
}
////////////////////////////////////////////////////////////////////////////////
$(document).ready(function(){

//add or modify.  Do a get request on /userInfo to get user session data
//                about the currently logged in user.  Use that data to
//                modify the DOM to personalize the session.
  $.ajax({
            url: "/userInfo",
            type: "GET",

             success:function(data){
              if (!data)
              {
                  $('#session').html("Session ERROR");
                  console.log("Login Is Bad");
              }
              else
              {
                $('#personName').html("Welcome, " + data.username);
                console.log(data);
                console.log("session is Good");
              }

            } ,
            dataType: "json"
    });
		$('#LEFT').click(getRED);
		$('#RIGHT').click(getBlue);

///	$('#logout').click(logoutClicked);
//	$('#outIt').click(print);
//	$('#homer').click(print2);

//add or modify.  Call logoutClicked when logout button is pressed.


});
