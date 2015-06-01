if (Meteor.isClient) {

	// On page load lets check the API for our users information 
	Meteor.call( "checkHipChat",  function( error,  results )  {
		hipchat_users = ( results.content ); // Should be a json object of all users
	} );



	// counter starts at 0
	Session.setDefault('counter', 0);

	Template.hello.helpers({
		counter: function () {
			return Session.get('counter');
		}
	});

	Template.hello.events({
		'click button': function () {
			// increment the counter when button is clicked
			Session.set('counter', Session.get('counter') + 1);
		}
	});
}


// If we are on the server side lets run this code
if ( Meteor.isServer ) {
	
	//Define our server side API Check
	Meteor.methods( {
		checkHipChat: function () {
			this.unblock();
			return Meteor.http.call( "GET", "https://api.hipchat.com/v2/user?auth_token=JSxeOOCGgmXMCADwe2nfTzXKcHmWRfMR6By0W0Es" );
		}
	} );
	
	//Define our server side API Check
	Meteor.methods( {
		parseUserInfo: function () {

			this.unblock();
			return Meteor.http.call( "GET", "https://api.hipchat.com/v2/user/?auth_token=JSxeOOCGgmXMCADwe2nfTzXKcHmWRfMR6By0W0Es" );
		}
	} );
	
	Meteor.startup( function () {

		setInterval( function() {
			// Run the cron to fetch users
			console.log( 'test' );
		}, 60 * 60 )

	} );

}
