console.log( "patient" );
var Patient = Backbone.RelationalModel.extend( {

	urlRoot: 'http://localhost:3000/patient',
	idAttribute: '_id',
	relations: [{
		type: Backbone.HasMany,
		key: 'boards',
		relatedModel: Board,
		includeInJSON: 'name',
		collectionType: 'PatientCollection',
		reverseRelation: {
			type: Backbone.HasOne,
			key: 'doctor',
			relatedModel: 'Provider'
			includeInJSON: 'name'

	}
	}]
},

	initialize: function () {
		console.log( "Patient profile created" );
		this.on( 'change', function () {
			console.log( 'Patient profile changed' );
		} );
		this.on( "invalid", function ( model, error ) {
			console.log( 'ERROR ERROR ERROR'+ '\n'+ error );
		} );
	},
	validate: function ( attributes ) {
		if ( attributes.name === undefined ) {
			return "no name entered";
		}
		if ( attributes.dob === undefined ) {
			return "no date of birth entered";
		}
		if (attributes.email === undefined) {
			return "no email entered";	
		}
	}
} );


var PatientsCollection = Backbone.Collection.extend( {
	model: Patient,
	url: 'http://localhost:3000/patients'
} );

var patients = new PatientsCollection();


patients.fetch();
