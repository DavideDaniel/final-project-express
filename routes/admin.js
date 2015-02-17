var express = require( 'express' );
var sqlite3 = require( 'sqlite3' )
	.verbose();
var db = new sqlite3.Database( "patients.db" );
var request = require( 'request' );
var bcrypt = require( "bcrypt" );
var fs = require( "fs" );
var router = express.Router();

var trelloKey = process.env.TRELLO_KEY;

router.get( '/trello', function ( req, res ) {

	// var url = 'https://api.trello.com/1/members/daviddaniel6?&boards=all&key='+ trelloKey
	var url =
		'https://api.trello.com/1/boards/54dd7c92925ee8f0d19be5e4?&cards=all&key=' +
		trelloKey

	request( url, function ( error, response, body ) {
		if ( !error && response.statusCode == 200 ) {
			data = JSON.parse( body );

			var cards = data.cards

			cards.forEach(function(card){
			console.log(card.name);	
			console.log(card.desc);	
			console.log(card.url);	
			card.labels.forEach(function(label){
				console.log(label.id);
				console.log(label.name);
			})	
			})}
			else {

			console.log(error);
			
		}
	} )

} );
module.exports = router;