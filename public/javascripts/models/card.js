console.log( "card" );
var Card = Backbone.RelationalModel.extend( {

	urlRoot: 'http://localhost:3000/card',
	idAttribute: '_id',

},

	initialize: function () {
		console.log( "Card profile created" );
		this.on( 'change', function () {
			console.log( 'Card profile changed' );
		} );
		this.on( "invalid", function ( model, error ) {
			console.log( 'ERROR ERROR ERROR'+ '\n'+ error );
		} );
	}
} );