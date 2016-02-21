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
	db.push("/users/",user);
	console.log(db.getData("/"))

})

module.exports = router;
