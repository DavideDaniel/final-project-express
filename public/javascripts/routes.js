console.log('router');
ModelsRouter = Backbone.Router.extend( {
    routes: {

        "patients": "show_patient_list",
        "patient/:_id/": "show_patient",
    },

    show_patient_list: function () {
        var patient_collection = new PatientsCollection();
        var patient_list_view = new PatientsListView( {
            el: $( '#content' ),
            model: patient_collection
        } );
        patient_collection.fetch();
    },

    show_patient: function ( _id ) {
        var patient = new Patient( {
            _id: _id
        } );
        var patient_view = new PatientView( {
            el: $( '#content' ),
            model: patient
        } );
        patient.fetch();
    },

} );

var appRouter = new ModelsRouter;

 appRouter.on('route:show_patient', function( id ){ 

        });

        appRouter.on('route:show_patient_list', function( ){ 
 
        });