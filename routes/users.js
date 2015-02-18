var express = require('express');
var app = require('../app')
var sqlite3 = require( 'sqlite3' )
	.verbose();
var db = new sqlite3.Database( "patients.db" );
var usersrouter = express.Router();
html_dir = './html/'


/* GET users listing. */
usersrouter.get('/', function(req, res, next) {
  res.render('users.ejs', { });
});

usersrouter.get('/consumerEJS', function(req, res, next) {
  res.render('consumer.ejs');
});

usersrouter.get('/consumer', function(req, res, next) {
 res.sendfile(html_dir+'consumer.html')

} );

//GET 1 patient
usersrouter.get('/patient/:id', function(req, res, next) {
 var id = req.params.id;
db.all( "SELECT * FROM patients where id = ?", id, function ( err, rows ) {
		if ( err ) {
			throw err;
		}
	var strPatient = JSON.stringify(rows[0])		
	console.log(strPatient);
		res.sendfile(html_dir+'consumer.html');
	} );

 

} );

module.exports = usersrouter;
