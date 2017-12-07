var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');


// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
    console.log('get /user route');
    // check if logged in
    if(req.isAuthenticated()) {
	// send back user object from database
	console.log('logged in', req.user);
	var userInfo = {
	    username : req.user.username,
	    type: req.user.member_type,
	    artist_id: req.user.id
	};
	pool.connect(function(err, db, done){
	    if (err) {
		console.log('Error connecting to DB', err);
		res.sendStatus(500);
	    } else {
		if (req.user.member_type=='artist'){
		    var queryString = 'SELECT * FROM artists WHERE id=$1';
		} else if (req.user.member_type=='venue') {
		    var queryString = 'SELECT * FROM venues WHERE user_id=$1';
		}
		db.query(queryString, [req.user.id], function(queryErr, result){
		    if (queryErr) {
			console.log('Error makeing query', queryErr);
			res.sendStatus(500);
		    } else {
			console.log('results: ', result.rows);
			var info = result.rows[0];
			var newNew = Object.assign(userInfo, info);
			db.query('SELECT * FROM social_media WHERE user_id=$1;', [req.user.id],
				 function(err, result){
				     done();
				     if(err){
					 console.log('Error getting Social', err);
					 res.sendStatus(500);
				     } else {
					 var social = result.rows[0];
					 var total_user = Object.assign(newNew, social);
					 console.log('total user: ', total_user);
					 res.send(total_user);
				     }
				 });
		    }
		});
	    }
	});

    } else {
	// failure best handled on the server. do redirect here.
	console.log('not logged in');
	// should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
	res.send(false);
    }
});



router.get('/detail', function(req, res) {
    console.log('get /user route', req.user);
    // check if logged in
    pool.connect(function(err, db, done){
	if (err) {
	    console.log('Error connecting to DB', err);
	    res.sendStatus(500);
	} else {
	    var queryString = 'SELECT * FROM artists;';
	    db.query(queryString, function(queryErr, result){
		done();
		if (queryErr) {
		    console.log('Error makeing query', queryErr);
		    res.sendStatus(500);
		} else {
		    var info = result.rows[0];
		    res.send(info);
		}
	    });
	}
    });
});


router.put('/social', function(req, res) {
    console.log('put /user/social route', req.body);
    // check if logged in
    pool.connect(function(err, db, done){
	if (err) {
	    console.log('Error connecting to DB', err);
	    res.sendStatus(500);
	} else {
	    var queryString = 'UPDATE social_media SET twitter=$1, facebook=$2, instagram=$3, snapchat=$4, youtube=$5, soundcloud=$6, bandcamp=$7, itunes=$8, spotify=$9 WHERE user_id=$10;';
	    var reqs = [req.body.twitter, req.body.facebook, req.body.instagram, req.body.snapchat, req.body.youtube, req.body.soundcloud, req.body.bandcamp, req.body.itunes, req.body.spotify, req.body.user_id]
	    db.query(queryString, reqs, function(queryErr, result){
		done();
		if (queryErr) {
		    console.log('Error makeing query', queryErr);
		    res.sendStatus(500);
		} else {
		    console.log('success in putting social');
		    res.sendStatus(200);
		}
	    });
	}
    });
});



// clear all server session information about this user
router.get('/logout', function(req, res) {
    // Use passport's built-in method to log out the user
    console.log('Logged out');
    req.logOut();
    res.sendStatus(200);
});


module.exports = router;
