var express = require( 'express' );
var app = require( '../app' )
var sqlite3 = require( 'sqlite3' )
	.verbose();
var db = new sqlite3.Database( "patients.db" );
var request = require( 'request' );
var bcrypt = require( "bcrypt" );
var fs = require( "fs" );
var adminrouter = express.Router();

var trelloKey = process.env.TRELLO_KEY;

adminrouter.get( '/trello/board', function ( req, res ) {

	var boardUrl =
		'https://api.trello.com/1/members/daviddaniel6?&boards=all&key=' + trelloKey

	request( boardUrl, function ( error, response, body ) {
		if ( !error && response.statusCode == 200 ) {
			board = JSON.parse( body );
			console.log( board );
			console.log(board.idBoards[0]);
			var board_id = board.idBoards[ 0 ];

			var cardUrl =
				'https://api.trello.com/1/boards/' + board_id + '?&cards=all&key=' +
				trelloKey

			request( cardUrl, function ( error, response, body ) {
				if ( !error && response.statusCode == 200 ) {
					data = JSON.parse( body );

					var cards = data.cards
					var card_array = [];

					for ( var i = 0; i < cards.length; i++ ) {
						var card = {
							name: cards[ i ].name,
							url: cards[ i ].desc,
							language: cards[ i ].labels[1].name,
							issue: cards[i].labels[0].name
							// labels: cards[ i ].labels
						}
						console.log(card.labels);
						card_array.push( card )
					}
					console.log(card_array);
					res.json(card_array);
				}
				else {

					console.log( error );

				}
			} )
		}
		else {

			console.log( error );

		}
	} )

} );

var cardConstructor = function (name, desc, labels) {
	this.name = name
	this.desc = desc
	this.labels = labels

}

module.exports = adminrouter;