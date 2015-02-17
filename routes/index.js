var express = require( 'express' );
var sqlite3 = require( 'sqlite3' )
	.verbose();
var db = new sqlite3.Database( "patients.db" );
var bcrypt = require( "bcrypt" );
var fs = require( "fs" );
var router = express.Router();
html_dir = './html/'
/* GET home page. */
router.get( '/', function ( req, res, next ) {
	res.render( 'index.ejs', {
		// 			title: 'Express'
	} )
} );

router.get( '/provider', function ( req, res, next ) {
	res.sendfile( html_dir + 'provider.html' )
} );

//CRUD routes for patients - admin side
//GET all patients
router.get( '/patients', function ( req, res ) {
	db.all( "SELECT * FROM patients", function ( err, rows ) {
		if ( err ) {
			throw err;
		}
		res.json( rows );
	} );
} );
//POST to all patients
router.post( '/patients', function ( req, res ) {
	var name = req.body.name;
	var dob = req.body.dob;
	console.log( name + 'is :' + dob );
	db.run( "INSERT INTO patients (name, dob) VALUES (?,?)", name, dob, function (
		err ) {
		if ( err ) {
			throw err
		};
		var id = this.lastID;
		db.get( "SELECT * FROM patients WHERE id = ?", id, function ( err, row ) {
			if ( err ) {
				throw err
			};
			res.json( row );
		} )
	} );
} );
//DELETE a patient with :id
router.delete( '/patient/:id', function ( req, res ) {
	var id = req.params.id;

	db.run( "DELETE FROM patients WHERE id = ?", id,
		function ( err ) {
			if ( err ) {
				throw err
			}
			res.json( {
				deleted: true
			} )
		} );
} );
//UPDATE a patiend with :id
router.put( "/patient/:id", function ( req, res ) {
	var id = req.params.id;
	var name = req.body.name;
	var dob = req.body.dob;

	db.run( "UPDATE patients SET name = ?, dob = ? WHERE id = ?", name, dob, id,
		function ( err ) {
			if ( err ) {
				throw err;
			}
			db.get( "SELECT * FROM patients WHERE id = ?", id, function ( err, row ) {
				if ( err ) {
					throw err;
				}
				res.json( row );
			} );
		} );
} );

// router.get( '/provider', function ( req, res, next ) {
// 			res.sendFile( 'provider.html', {root: '/html'} );
// 		})

module.exports = router;