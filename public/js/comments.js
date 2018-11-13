function add(){
  $.ajax({
    url: "/com",
    type: "GET",
    success: function(data) {        
        console.log(data.left);
            if(data != null){
                        var myDiv = document.getElementById("comment");
                    myDiv.style.display = "block";
                    var divClone = myDiv.cloneNode(true); // the true is for deep cloning
                    myDiv.style.display = "none";
                if(data.left == "Ford"){
                    //$( "header ul" ).not( "#list1" ).addClass('listThing').removeClass('active');
                    $("#list1").addClass('active').removeClass('listThing');
                    $("#list1").append(divClone);
                }
                if(data.left == "Be friends with the pope"){
                    //$( "header ul" ).not( "#list2" ).addClass('listThing').removeClass('active');
                    $("#list2").addClass('active').removeClass('listThing');
                    $("#list2").append(divClone);
                }
                if(data.left == "Car of your dreams"){
                    //$( "header ul" ).not( "#list2" ).addClass('listThing').removeClass('active');
                    $("#list3").addClass('active').removeClass('listThing');
                    $("#list3").append(divClone);
                }
                if(data.left == "Golf"){
                    //$( "header ul" ).not( "#list2" ).addClass('listThing').removeClass('active');
                    $("#list4").addClass('active').removeClass('listThing');
                    $("#list4").append(divClone);
                }
                if(data.left == "Have a kangaroo pouch"){
                    //$( "header ul" ).not( "#list2" ).addClass('listThing').removeClass('active');
                    $("#list5").addClass('active').removeClass('listThing');
                    $("#list5").append(divClone);
                }
                if(data.left == "Live in a castle"){
                    //$( "header ul" ).not( "#list2" ).addClass('listThing').removeClass('active');
                    $("#list6").addClass('active').removeClass('listThing');
                    $("#list6").append(divClone);
                }
                if(data.left == "Meet Morgan Freeman"){
                    //$( "header ul" ).not( "#list2" ).addClass('listThing').removeClass('active');
                    $("#list7").addClass('active').removeClass('listThing');
                    $("#list7").append(divClone);
                }
                if(data.left == "Walk barefoot in a lego factory"){
                    //$( "header ul" ).not( "#list2" ).addClass('listThing').removeClass('active');
                    $("#list8").addClass('active').removeClass('listThing');
                    $("#list8").append(divClone);
                }
                if(data.left == "Swallow 3 jawbreakers"){
                    //$( "header ul" ).not( "#list2" ).addClass('listThing').removeClass('active');
                    $("#list9").addClass('active').removeClass('listThing');
                    $("#list9").append(divClone);
                }
                if(data.left == "Sit for 2 years"){
                    //$( "header ul" ).not( "#list2" ).addClass('listThing').removeClass('active');
                    $("#list10").addClass('active').removeClass('listThing');
                    $("#list10").append(divClone);
                }
                if(data.left == "Sneaze on every left step you take"){
                    //$( "header ul" ).not( "#list2" ).addClass('listThing').removeClass('active');
                    $("#list11").addClass('active').removeClass('listThing');
                    $("#list11").append(divClone);
                }
            }
    } ,
    dataType: "json",
  });
  return false;
}
$("#commenter").click(add);
