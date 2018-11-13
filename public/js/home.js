function postComment() {
  let obj;
  if ($("#commentBox").val() == "") {
    return false;
  }
  ////////get the username
     
  $.ajax({
     
    url: "/userInfo",
    type: "GET",
    success: function (userStuff) {
      if (userStuff) {
        obj = userStuff.username;
         // console.log($("#boxText").val());
        $.ajax({
          url: "/createComment",
          type: "POST",
          data: { left: $("#leftButtons").html(), user: obj, comment: $("#boxText").val() },
          success: function (data) {
              
                getComm($("#leftButtons").html());
          },
          dataType: "json"
        });
      }
    },
    dataType: "json"
  });

  //append the comment to the current list

  return false;
}
function print() {
  console.log("hi");
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
function print2() {
  console.log("himynameis");
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
function print5() {
  let useless = true;
  $.ajax({
    url: "/lookup",
    type: "POST",
    data: { useless },
    success: function (data) {
      //console.log("gots");
      localStorage.setItem("search", $("#searchText"));
      window.location = data.redirect;
    },
    dataType: "json"
  });
  return false;
}
function nextClicked() {
  var currLeft;
  $.ajax({
    url: "/read/",
    type: "GET",
    success: function (data) {
      currLeft = data.left;
      // $("#leftButtons").val(data.left)
      // $("#RIGHT").val(data.right)
        $("#list1").empty();
        getComm(currLeft);
      $("#leftButtons").html(data.left);
      $("#rightButtons").html(data.right);
      $("#comment").css("display", "none");
      //define questions
      $("#title").html($("#leftButtons").html() + " vs " + $("#rightButtons").html());
      //reset values
      $("#peoplePercentLEFT").css("display", "none");
      $("#peoplePercentRIGHT").css("display", "none");
      $("#peopleLEFT").css("display", "none");
      $("#peopleRIGHT").css("display", "none");

      $("#header ul").each(function () {
        $(this).removeClass('active');
        $(this).addClass('listThing');
      });
      getComm(currLeft)
    },
    dataType: "json",
  });
  return false;
}
function getComm(getLeft) {

  $.ajax({
    url: "/getComment",
    type: "POST",
    data: { left: getLeft },
    success(data) {
      if (data) {
        $("#list1").empty();
        for (let i = 0; i < data.length; i++) {
          if (data[i].comment.comment) {
            console.log(data[i].comment.comment);
            //append all the comments and clear the old list
              
                $("#list1").append('<li style="list-style-type: none;font-size:20px;margin-top:5px">' + data[i].comment.user + " <br> "+ ' <h3 style="font-size:12px; border:1px solid #444;padding-left: 10px;width:60%">' + "<br>" +data[i].comment.comment + "<br>" +  "<br>" + "</h3>" + '</li>'); 
              
          }
        }
      }
    },
    dataType: "json"
  })
}
$(document).ready(function () {
  //    console.log(localStorage.getItem("list1"));
  //   $("#list1").append(localStorage.getItem("list1"));
  //$("#readButton").click(readClicked);
  $("#NEXTBUTTON").click(nextClicked);
  $("#thing2").click(print);
  $("#thing3").click(print2);
  $("#searchButton").click(print5);
  $("#buttonComment").click(postComment)
    getComm($("#leftButtons").html());
  nextClicked();
});
