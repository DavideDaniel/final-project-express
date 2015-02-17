var express = require('express');
var sqlite3 = require( 'sqlite3' )
	.verbose();
var db = new sqlite3.Database( "patients.db" );
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users.ejs', { });
});

router.get('/consumerEJS', function(req, res, next) {
  res.render('consumer.ejs');
});

router.get('/consumer', function(req, res, next) {
 res.sendfile(html_dir+'consumer.html')

} );

//GET 1 patient
router.get('/patients/:id', function(req, res, next) {
 var id = req.params.id;
 db.all( "SELECT * FROM patients where id = ?", id, function ( err, rows ) {
		if ( err ) {
			throw err;
		}
		res.json( rows );
	} );

 res.sendfile(html_dir+'consumer.html')

} );

module.exports = router;
