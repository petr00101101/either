var timeout = false;
function createClicked() {
  if(!timeout)
  {
    timeout=true;
  let obj = new Object();
  obj.left = $("#left").val();
  obj.right = $("#right").val();
  console.log($("#right").val())
  if ($("#left").val() == "" || $("#right").val() == "") {
    alert("ERROR");
    return false;
  }
  $.ajax({
    url: "/create",
    type: "POST",
    data: { left: obj.left, right:obj.right },
    dataType: "json"
  });
  setTimeout("timeout=false;", 60000);
  return false;
}
return(false);
}

function updateClicked() {
  let obj = new Object();
  obj.left = $("#left").val();
  obj.right = $("#right").val();
  if ($("#left").val() == "" || $("#right").val() == "" || $("#ident").val() == "") {
    alert("ERROR");
    return false;
  }
  $.ajax({
    url: "/update",
    type: "PUT",
    data: { ident: Number($("#ident").val()), left: obj.left, right:obj.right },
    dataType: "json"
  });
  return false;
}
function deleteClicked() {
  console.log($("#ident").val())
  if ($("#ident").val() == "") {
    alert("ERROR");
    return false;
  }
  $.ajax({
    url: "/delete/" + Number($("#ident").val()),
    type: "DELETE",
    success: function (data) {
      if (!data)
        alert("NO DELETE");
      else if (data)
        alert("GOOD DELETE");
    },
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
function print2(){
    let useless = true;
    $.ajax({
        url: "/index",
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

$(document).ready(function () {

  $("#outIt").click(print);
  $("#homer").click(print2);
  $("#createButton").click(createClicked);
  $("#updateButton").click(updateClicked);
  $("#deleteButton").click(deleteClicked);
  $.get("/getImage",function(data){
   console.log("jim")
     $("#todd").attr("src","./uploads/" + data);
    });
});
