var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// Use this route for when someone tries to sign-up synchronously.
router.get('/signup-sync', function(req,res){
	//Render to the user the signup-sync.ejs view found inside /views
	res.render('signup-sync');
})

module.exports = router;
