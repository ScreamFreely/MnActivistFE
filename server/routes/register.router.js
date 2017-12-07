var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');
var encryptLib = require('../modules/encryption');

// Handles request for HTML file
router.get('/', function(req, res, next) {
    console.log('get /register route');
    res.sendFile(path.resolve(__dirname, '../public/views/templates/register.html'));
});

// Handles POST request with new user data
// Handles POST request with new user data
router.post('/', function(req, res, next) {

    var saveUser = {
	username: req.body.username,
	password: encryptLib.encryptPassword(req.body.password),
	type: req.body.type
    };
    console.log('new user:', saveUser);

    pool.connect(function(err, client, done) {
	if(err) {
	    console.log("Error connecting: ", err);
	    res.sendStatus(500);
	}
	client.query("INSERT INTO users (username, password, member_type) VALUES ($1, $2, $3) RETURNING id",
		     [saveUser.username, saveUser.password, saveUser.type],
		     function (err, result) {
			 if(err) {
			     client.end();

			     console.log("Error inserting data: ", err);
			     res.sendStatus(500);
			 } else {
			     var user_id = result.rows[0]['id'];
			     client.query("INSERT INTO social_media (user_id) VALUES($1);", [user_id], function(err, result){
				 if (err) {
				     console.log('Error setting up Social', err);
				     res.sendStatus(500);
				 } else {
				     if (req.body.type == 'artist') {
					 var queryString = "INSERT INTO artists (user_id, artist, website) VALUES ($1, $2, $3)";
					 var reqs = [user_id, req.body.artist, req.body.website];
				     } else if (req.body.type == 'venue') {
					 if (!req.body.neighborhood){
					     req.body.neighborhood = 'None';
					 }
					 var queryString = "INSERT INTO venues (user_id, venue, street_number, route, barrio, locality, region, zip_code, phone, latitude, longitude, google_place_id, google_rating, website, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)";
					 var reqs = [user_id, req.body.name, req.body.street_number, req.body.route, req.body.neighborhood, req.body.locality, req.body.administrative_area_level_1, req.body.postal_code, req.body.phone, req.body.longitude, req.body.latitude, req.body.google_place_id, req.body.google_rating, req.body.website, req.body.description];
				     }
				     client.query(queryString, reqs, function (err, result) {
					 client.end();
					 if (err) {
					     console.log("Error inserting data: ", err);
					     res.sendStatus(500);
					 } else {
					     res.sendStatus(201);
					 }
				     });
				 }
			     });
			 }
		     });
    });

});


module.exports = router;
