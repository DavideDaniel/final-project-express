console.log( "provider" );
var Provider = Backbone.RelationalModel.extend( {

    urlRoot: 'http://localhost:3000/doctor',
    idAttribute: '_id',
    relations: [ {
        type: Backbone.HasMany,
        key: 'patients',

        relatedModel: Patient,
        includeInJSON: 'name',
        includeInJSON: 'idAttribute',
        reverseRelation: {
            type: Backbone.HasOne,
            key: 'board',
            relatedModel: Board,
            includeInJSON: 'name'
        }
    } ],

    initialize: function () {
        console.log( "Provider profile created" );
        this.on( 'change', function () {
            console.log( 'Provider profile changed' );
        } );
        this.on( "invalid", function ( model, error ) {
            console.log( 'ERROR ERROR ERROR' + '\n' + error );
        } );
    },
    validate: function ( attributes ) {
        if ( attributes.name === undefined ) {
            return "no name entered";
        }
        if ( attributes.email === undefined ) {
            return "no email entered";
        }
    }
} );

console.log( "patient" );
var Patient = Backbone.RelationalModel.extend( {

    urlRoot: 'http://localhost:3000/patient',
    idAttribute: '_id',
    relations: [ {
        // type: Backbone.HasMany,
        // key: 'boards',
        // relatedModel: Board,
        // includeInJSON: 'name',
        collectionType: 'PatientCollection',
        reverseRelation: {
            type: Backbone.HasOne,
            key: 'doctor',
            relatedModel: Provider,
            includeInJSON: 'name'

        }
    } ],

    initialize: function () {
        console.log( "Patient profile created" );
        this.on( 'change', function () {
            console.log( 'Patient profile changed' );
            console.log( this );
        } );
        this.on( "invalid", function ( model, error ) {
            console.log( 'ERROR ERROR ERROR' + '\n' + error );
        } );
    },
    validate: function ( attributes ) {
        if ( attributes.name === undefined ) {
            return "no name entered";
        }
        if ( attributes.dob === undefined ) {
            return "no date of birth entered";
        }
        if ( attributes.email === undefined ) {
            return "no email entered";
        }
    }
} );

console.log( "board" );
var Board = Backbone.RelationalModel.extend( {

    urlRoot: 'http://localhost:3000/board',
    idAttribute: '_id',
    // relations: [ {
    //     type: Backbone.HasOne,
    //     key: 'patient',
    //     relatedModel: Patient,
    //     includeInJSON: 'name',
    //     reverseRelation: {
    //         type: Backbone.HasOne,
    //         key: 'board',
    //         relatedModel: Board,
    //         includeInJSON: 'name'

    //     }
    // } ],

    initialize: function () {
        console.log( "Board profile created" );
        this.on( 'change', function () {
            console.log( 'Board profile changed' );
        } );
        this.on( "invalid", function ( model, error ) {
            console.log( 'ERROR ERROR ERROR' + '\n' + error );
        } );
    }
} );

console.log( "card" );
var Card = Backbone.RelationalModel.extend( {

    urlRoot: 'http://localhost:3000/card',
    idAttribute: '_id',

    initialize: function () {
        console.log( "Card profile created" );
        this.on( 'change', function () {
            console.log( 'Card profile changed' );
        } );
        this.on( "invalid", function ( model, error ) {
            console.log( 'ERROR ERROR ERROR' + '\n' + error );
        } );
    }
} );

console.log('PatientsCollection');
 var PatientsCollection = Backbone.Collection.extend( {
    model: Patient,
    url: 'http://localhost:3000/patients'
} );

var patients = new PatientsCollection();
var patient = new Patient();
var doctor = new Provider();
var board = new Board();
var card = new Card();


// console.log('patients fetch');
patients.fetch();