console.log( "provider" );
var Provider = Backbone.RelationalModel.extend( {

	urlRoot: 'http://localhost:3000/provider',
	idAttribute: '_id',
	relations: [{
		type: Backbone.HasMany,
		key: 'patients',
		relatedModel: Patient,
		includeInJSON: 'name',
		includeInJSON: Backbone.Model.prototype.idAttribute ,
		reverseRelation: {
			type: Backbone.HasOne,
			key: 'board',
			relatedModel: 
			includeInJSON: 'name'

	}
	}]
},

	initialize: function () {
		console.log( "Provider profile created" );
		this.on( 'change', function () {
			console.log( 'Provider profile changed' );
		} );
		this.on( "invalid", function ( model, error ) {
			console.log( 'ERROR ERROR ERROR'+ '\n'+ error );
		} );
	},
	validate: function ( attributes ) {
		if ( attributes.name === undefined ) {
			return "no name entered";
		}
		if (attributes.email === undefined) {
			return "no email entered";	
		}
	}
} );