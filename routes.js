var express = require("express");
var router = express.Router();
var questions = require("./questions");
var db = new questions();
var clientSessions = require('client-sessions');
var path = require("path");

var formidable = require('formidable');
var fs = require('fs');
var Images = require("./models/Images");

const myDatabase = require('./mongoDatabase');

let mb = new myDatabase();


router.get("/", function (request, response) {
	let thePath = path.resolve(__dirname,"public/views/signin.html");
  response.sendFile(thePath);
});

router.get("/UpdateImage", function (request, response) {
	 console.log("as");
	let thePath = path.resolve(__dirname,"public/views/profile.html");
  response.sendFile(thePath);
});

router.get('/getImage', function (req, res){
  //console.log("tord");
    return(mb.getImage(req.user.username,res));

});

router.post('/UpdateImage', function (req, res){
  //let obj;
  console.log("jimbo");
  var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
    	if( file.name = null)
    	{
    		console.log("bobeert");
    		return(null);
    	}
        file.path = __dirname + '/uploads/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
        let obj = {ident:req.user.username,name:file.name};
        let taco = mb.changeObject(obj,res);
    });
    let thePath = path.resolve(__dirname,"public/views/profile.html");
  res.sendFile(thePath);


});

router.post('/', function (req, res){
  //let obj;
  //console.log("goats");
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/uploads/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
        let obj = {ident:req.user.username,name:file.name};
        let taco = mb.addObject(obj,res);
    });



    let thePath = path.resolve(__dirname,"public/views/index.html");
  res.sendFile(thePath);


});

router.post('/change', function (req, res) {
	console.log(req.body.mem);
	db.changeCurrQuestion(req.body.mem);
	res.json({ redirect: "/session" });
});
router.get("/signup", function (request, response) {
	//add or modify.  Send back to the client signup.html.
	response.sendFile(__dirname + "/public/views/signup.html");
});
router.get("/index", function (request, response) {
	//add or modify.  Send back to the client signup.html.
	response.sendFile(__dirname + "/public/views/index.html");
});
router.get("/signin", function (request, response) {
	//add or modify.  Send back to the client login.html.
	response.sendFile(__dirname + "/public/views/signin.html");
});
router.get("/lookup", function (request, response) {
	//add or modify.  Send back to the client login.html.
	response.sendFile(__dirname + "/public/views/search.html");
});
router.get("/profile", function (request, response) {
	//add or modify.  Send back to the client login.html.
	//	response.json({redirect:"C:\Users\146004216\Desktop\Good Stuff\public\views\profile"});
	response.sendFile(__dirname + "/public/views/profile.html");
	//	response.json(__dirname + "/public/views/profile.html");
});
router.get("/signupPage", function (request, response) {
	//console.log("goos");
	response.sendFile(__dirname + "/public/views/signup.html");
});


/////////////////////////////////////////////////
var commentsList = [];
var currentLeft = "";
var quest;
///////////////comments section stuff////////////////////////
router.get("/com", function (request, response) {
	response.json(quest);
});
///////////////getting animations stuff////////////////////////
router.put("/red/:word", function (request, response) {
	return (db.addObjectsRED(response, request.body.word, request.body.left));
});
router.put("/blue/:word", function (request, response) {
	return (db.addObjectsBLUE(response, request.body.word, request.body.right));
});
router.get("/getred/:leftValue", function (request, response) {
	return (db.getRedObject(response, request.params.leftValue));
});
router.get("/getblue/:rightValue", function (request, response) {
	return (db.getBlueObject(response, request.params.rightValue));
});
router.get("/getValues/:left", function (request, response) {
	//console.log("params is : "+request.params.otherName);
	return (db.getValues(response, request.params.left));
});
///////////////comments section stuff////////////////////////
router.get("/lists", function (request, res) {
	// var questionList = db.returnQuestions();
	// response.json(questionList);
	var questionList = db.returnQuestions(res);
	//res.json(questionList);
	return (questionList);
});
//////////////////////////////
let userInfo = [];
userInfo.push({ username: 'Bob', password: 'boB', answers: [] });
//////////////////////////////
////////////////////////////////////////////////////
////////QUESTION STUFF/////////////////
router.get('/read', function (req, res) {
	// var quest = db.getQuestion(res);
	// console.log(quest.left + " "+ quest.right)
	// res.json(quest);
	//res.json(questions.getQuestion().left, questions.getQuestion().right);
	//console.log(questions())
	//res.json(undefined);
	return (db.getQuestion(res));
});
router.post('/store', function (req, res) {
	for (var i = 0; i < userInfo.length; i++) {
		if (userInfo[i] == req.session_state.username) {
			currentLeft = userInfo[i].left;
			userInfo[i].answers.push({ left: req.body.left, right: req.body.right, choice: req.body.choice })
		}
	}
	res.json(true);
});
router.post('/create', function (req, res) {
	let obj = { left: req.body.left, right: req.body.right, leftValue:0, rightValue:0 }
	//console.log(obj)
	return (db.addQuestion(obj, res));
	res.json(null)
});
router.put('/update', function (req, res) {
	var index = parseInt(req.body.ident);
	//var options = { left: req.body.question.left, right: req.body.question.right};
	let obj = { left: req.body.left, right: req.body.right }
	return (db.changeQuestion(index, obj, res))
	//var quest = db.changeQuestion(index, options);
	//res.json(quest);
	res.json(null);
});
router.delete('/delete/:ident', function (req, res) {
	//res.json(db.deleteQuestion(req.params.ident));
	return (db.deleteQuestion(req.params.ident, res));
});
//////////////////////////////
////////////////////////////////////////////////////
////////COMMENT STUFF/////////////////
router.post('/getComment', function (req, res) {
	console.log("the left question is probably " + req.body.left)
	return (db.getSpecificComment(req.body.left, res));
	//return(null)
});
router.post('/createComment', function (req, res) {
	let newComment = { user: req.body.user, comment: req.body.comment }
    //console.log("comment is: "+ newComment.comment);
	var leftQ = req.body.left;
	return (db.addComment(leftQ, newComment, res));
	res.json(null)
});
//////////////////////////////
router.post('/lookup', function (req, res) {
	//console.log("goats");
	res.json({ redirect: "/lookup" });
});
router.post('/signupPage', function (req, res) {
	//console.log("goats");
	res.json({ redirect: "/signup" });
});
router.post('/profile', function (req, res) {
	//console.log("goats");
	res.json({ redirect: "/profile" });
});
router.post('/signin', function (req, res) {
	//console.log("goats");
	res.json({ redirect: "/signin" });
});
router.post('/index', function (req, res) {
	//console.log("goats");
	res.json({ redirect: "/index" });
});
/////////////////////////////////////////////////////////////
module.exports = router;
