console.log( 'view' );
$( document )
	.ready( function () {
		var PatientsView = Backbone.View.extend( {
			el: '#patientsList',
			initialize: function () {
				this.listenTo( this.collection, 'sync remove', this.render );
			},

			render: function () {
				var el = this.$el;
				el.html( '' );
				this.collection.each( function ( patient ) {
					el.append( new PatientView( {
							model: patient
						} )
						.render()
						.el );
				} )
				return this;
			}
		} );

		var PatientView = Backbone.View.extend( {
			tagName: 'li',
			template: _.template( $( '#patientTemplate' )
				.html() ),

			events: {
				'click .deleteButton': 'deletePatient',
				'click .editButton': 'editPatient',
				'click .updateButton': 'updatePatient',
				'click .viewPatient': 'viewPatient'
			},

			viewPatient: function () {
				var consumerView = new ConsumersView( {

				} )
			},

			editPatient: function () {
				this.$( '.patient' )
					.hide();
				this.$( '.editForm' )
					.show();
			},

			updatePatient: function () {

				var newName = this.$( '#newName' + this.model.id )
					.val();
				var newDob = this.$( '#newDob' + this.model.id )
					.val();
				this.model.set( {
					name: newName,
					dob: newDob
				}, {
					validate: true
				} );
				this.model.save( {
					name: newName,
					dob: newDob
				}, {
					validate: true
				} );
			},

			deletePatient: function () {
				this.model.destroy();
			},

			render: function () {
				this.$el.html( _.template( this.template( {
						patient: this.model.toJSON()
					} ) )

				)
				return this
			}
		} );

		var ConsumerView = Backbone.View.extend({
			tagName: ".patient",
			template: _.template( $( '#consumer' )
				.html() ),


			initialize: function () {
				this.listenTo( this.collection, 'sync remove', this.render );
			},

			render: function () {
				var el = this.$el;
				el.html( '' );
				this.collection.each( function ( patient ) {
					el.append( new ConsumerView( {
							model: patient
						} )
						.render()
						.el );
				} )
				return this;
			},

				this.$el.html( _.template( this.template( {
						patient: this.model.toJSON()
					} ) )

				)
				return this
			}


		})

		var CreatePatientView = Backbone.View.extend( {
			el: '#addPatientForm',
			events: {
				'click #addNewPatient': 'createPatient'
			},
			createPatient: function () {
				var nameField = this.$( '#newPatientName' );
				var dobField = this.$( '#newPatientDob' );
				var newPatientName = nameField.val();
				var newPatientDob = dobField.val();

				this.collection.create( {
					name: newPatientName,
					dob: newPatientDob
				} );

				nameField.val( '' );
				dobField.val( '' );
			}

		} );

		var createPatientView = new CreatePatientView( {
			collection: patients
		} );

		var patientsView = new PatientsView( {
			collection: patients
		} );

		var consumerView = new ConsumerView( {
			collection: patients
		} );
	} );