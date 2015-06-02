if (Meteor.isClient) {

	// On page load lets check the API for our users information 
	Meteor.call( "checkHipChat", function( error,  results )  {
		var users = JSON.parse( results.content ); // Should be a json object of all users
		Session.set( 'users', users.items );
		users.items.forEach( function(  ) {
			Meteor.call( 'getUserInfo', '713611', function( error, results )  {
				console.log( 'test' );
			} );
		} );
	} );

	Template.users.helpers ( {
	  user: function () {
			return Session.get( 'users' );
		}
	} );

}

// If we are on the server side lets run this code
if ( Meteor.isServer ) {
	
	Meteor.methods( {
		//Define our server side API Check
		checkHipChat: function () {
			this.unblock();
			return Meteor.http.call( "GET", "https://api.hipchat.com/v2/user?auth_token=JSxeOOCGgmXMCADwe2nfTzXKcHmWRfMR6By0W0Es" );
		},
		getUserInfo: function ( user ) {
			this.unblock();
			return;
			return Meteor.http.call( "GET", "https://api.hipchat.com/v2/user/" + user + "?auth_token=JSxeOOCGgmXMCADwe2nfTzXKcHmWRfMR6By0W0Es" );
		}
	} );
	
	
	Meteor.startup( function () {

		setInterval( function() {
			// Run the cron to fetch users
			console.log( 'test' );
		}, 60 * 60 )

	} );

}
