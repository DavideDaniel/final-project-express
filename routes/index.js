var express = require( 'express' );
var app = require('../app')
var sqlite3 = require( 'sqlite3' )
	.verbose();
var db = new sqlite3.Database( "patients.db" );
var bcrypt = require( "bcrypt" );
var indexrouter = express.Router();

html_dir = './html/'
/* GET home page. */
indexrouter.get( '/', function ( req, res, next ) {
	res.render( 'index.ejs', {
	} )
} );


//GET all patients on provider route
indexrouter.get( '/provider', function ( req, res, next ) {
	// res.sendfile( html_dir + 'provider.html' )
	res.sendfile( html_dir + 'provider.html' )

} );

//GET 1 patient
indexrouter.get( '/patient/:id', function ( req, res ) {
	var id = req.params.id;
	db.all( "SELECT * FROM patients where id = ?", id, function ( err, rows ) {
		if ( err ) {
			throw err;
		}
		var patient = JSON.stringify( rows )
		console.log( patient );
		res.sendfile( html_dir + 'consumer.html' )
	} );

} );

//CRUD routes for patients - admin side
//GET all patients
indexrouter.get( '/patients', function ( req, res ) {
	db.all( "SELECT * FROM patients", function ( err, rows ) {
		if ( err ) {
			throw err;
		}
		res.json( rows );
		console.log(rows);
	} );
} );
//POST to all patients
indexrouter.post( '/patients', function ( req, res ) {
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
indexrouter.delete( '/patients/:id', function ( req, res ) {
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
indexrouter.put( "/patients/:id", function ( req, res ) {
	console.log( "INSIDE THE EDIT ROUTE" );
	var id = req.params.id;
	var name = req.body.name;
	var dob = req.body.dob;
	console.log( name + " born on " + dob );
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

// indexrouter.get( '/provider', function ( req, res, next ) {
// 			res.sendFile( 'provider.html', {root: '/html'} );
// 		})

module.exports = indexrouter;