var express = require('express');
var router = express.Router();
var fs = require('fs');
//The file where users will be stored.
var JsonDB = require('node-json-db');
var db = new JsonDB("database",true,false);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// Use this route for when someone tries to sign-up synchronously.
router.get('/signup-sync', function(req,res){
	//Render to the user the signup-sync.ejs view found inside /views
	res.render('signup-sync');
})

//Use this route for when someone posts the sign-up-sync form.
router.post('/submit-registration-sync',function(req,res){
	console.log("Someone submitted a registration form synchronously. \n" +
		"It contained: \n");
	//Output the contents of the request's body.
	console.log(req.body);
	//Lets create a user out of what we've got.
	var user = new Object();
	user.name = req.body.InputName;
	user.password = req.body.InputPassword;
	user.email = req.body.InputEmail;

	//Lets also store it in a file (usually it would be stored in a database);
	db.push("/users[]",user);
	// Output the contents of the users, just to ensure that our save worked.
	console.log(db.getData("/"))
	//After they've signed up, send them the signup-successful page!
	res.render('signup-successful-sync',{username: user.name});

})

router.get('/users-sync',function(req,res){
	//First get all the users
	var database = db.getData("/");
	console.log(database.users);
	//Then render the users-sync page, feed in the users.
	res.render('users-sync',{users: database.users});
})

//ASYNC STUFF
// Usually these should be at the very top of the document
var path = require('path');

//GET the async signup form.
router.get('/signup-async', function(req,res){
	res.sendFile(path.resolve(__dirname+'/../public/signup-async.html'));
})

router.post('/submit-registration-async',function(req,res){
	console.log(req.body);

	//Lets create a user out of what we've got.
	var user = new Object();
	user.name = req.body.name;
	user.password = req.body.password;
	user.email = req.body.email;

	//Lets also store it in a file (usually it would be stored in a database);
	db.push("/users[]",user);
	// Output the contents of the users, just to ensure that our save worked.
	console.log(db.getData("/"))
	//After they've signed up, send them the sucess message!
	res.status(200).send({"Success":true, "Message":"User" + user.name +" was"
	+" successful!"})
})

//GET all the current signed-up users.
router.get('/users-async',function(req,res){
	//First get all the users
	var database = db.getData("/");
	console.log(database.users);
	//Then render the users-sync page, feed in the users.
	res.status(200).send({users: database.users});
})

router.get('/users-async-page', function(req,res){
	res.sendFile(path.resolve(__dirname+'/../public/users-async-page.html'));
})
module.exports = router;
