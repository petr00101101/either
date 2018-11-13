
function getList() {
    let useless = true;
    $.ajax({
        url: "/lists",
        type: "GET",
        data: { useless },
        success: function (data) {

            var j=1;
            for(var i=0;i<data.length;i++){
                var left = data[i].left;
                var right = data[i].right;
                var vsString = " vs ";
                var newLeft = left;
                var newRight = right;
                var newVsString = vsString.fontcolor("white");
                var newContent = "<button>"+newLeft + newVsString +newRight +"</button>";
                var cut = "<br>";
              //  $('#listQuestions').append(
              //      $(newContent).css({'backgroundColor' : 'black','border' : 'none','font-size' : '20px'}).attr({'id': 'test_id'+j,"onclick" : "print7()" }),
               //     cut,cut
                //);
           var newString = newLeft + vsString + newRight; 
            var newListItem = $('<li>',{
                html: newString,
                "id":data[i].left
            });

                $('#listQuestions').append(newListItem);
                $('#listQuestions').append("<br>");
                j++;
            }

        },
        dataType: "json"
    });
    return false;
}
function print7() {
    let useless = true;
    $.ajax({
        url: "/index",
        type: "POST",
        data: { useless },
        success: function (data) {
          //console.log("gots");
           window.location = data.redirect;

        },
        dataType: "json"
    });
    return false;
}
function print8() {
    let useless = true;
    $.ajax({
        url: "/index",
        type: "POST",
        data: { useless },
        success: function (data) {
          //console.log("gots");
           window.location = data.redirect;
        },
        dataType: "json"
    });
    return false;
}
function print9() {
    let useless = true;
    $.ajax({
        url: "/signin",
        type: "POST",
        data: { useless },
        success: function (data) {
          //console.log("gots");
           window.location = data.redirect;
        },
        dataType: "json"
    });
    return false;
}
function print10() {
    let useless = true;
    $.ajax({
        url: "/profile",
        type: "POST",
        data: { useless },
        success: function (data) {
          //console.log("gots");
           window.location = data.redirect;
        },
        dataType: "json"
    });
    return false;
}
function deleter(){
    let useless = true;
    $.ajax({
        url: "/lists",
        type: "GET",
        data: { useless },
        success: function (data) {
            if($("#searchText2").val() != ""){
                $.each($("#listQuestions button"), function() {
                    $(this).css("display","none");
                });
                for(var i=0;i<data.length;i++){
                    //alert( data[i].left);
                    //alert($("#listQuestions button").html());
                    if($("#searchText2").val() ==  data[i].left){
                        $("#test_id"+(i+1)).css("display","block");
                    }
                }
            }
            else{
                $.each($("#listQuestions button"), function() {
                    $(this).css("display","block");
                });
            }
        },
        dataType: "json"
    });
    return false;

}
 function changing(meme) { 
      $.ajax({
        url: "/change",
        type: "POST",
        data: {mem:meme},
        success: function (data) {
        
          window.location = data.redirect;
          
        },
        dataType: "json"
      });

      return false;
    }
$(document).ready(function(){
    var lists;
    window.onload = getList;
    $("#profile").click(print10);
    $("#signOut").click(print9);
    $("#home").click(print8);
    $("#searchButton2").click(deleter);

   function getEventTarget(e) {
        e = e || window.event;
        return e.target || e.srcElement; 
    }

    var ul = document.getElementById('listQuestions');
    ul.onclick = function(event) {
        var target = getEventTarget(event);
        
        changing(target.id);
    };
    
   /* var ul = document.getElementById('listQuestions');
ul.onclick = function(event) {
    var target = event.target;
    alert(event.target.id);
};  
*/
});
