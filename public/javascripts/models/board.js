console.log( "board" );
var Board = Backbone.RelationalModel.extend( {

	urlRoot: 'http://localhost:3000/board',
	idAttribute: '_id',
	relations: [{
		type: Backbone.HasOne,
		key: 'patient',
		relatedModel: Patient,
		includeInJSON: 'name',
		reverseRelation: {
			type: Backbone.HasOne,
			key: 'board',
			relatedModel: 
			includeInJSON: 'name'

	}
	}]
},

	initialize: function () {
		console.log( "Board profile created" );
		this.on( 'change', function () {
			console.log( 'Board profile changed' );
		} );
		this.on( "invalid", function ( model, error ) {
			console.log( 'ERROR ERROR ERROR'+ '\n'+ error );
		} );
	}
} );