if (Meteor.isClient) {

	// On page load lets check the API for our users information 
	Meteor.call( "checkHipChat", function( error,  results )  {
		var users = JSON.parse( results.content ); // Should be a json object of all users
		users.items.forEach( function(  ) {
			Meteor.call( 'getUserInfo', '713611', function( error, results )  {
				console.log( 'test' );
			} );
		} );
	} );

	Template.users.helpers ( {
		user: [{
			email: 'brandon@10up.com', 
			last_active: '2015-06-01T23:26:07+0000', 
			name: 'Brandon Camenisch', 
			mention_name: 'brandon', 
			photo_url: 'https://s3.amazonaws.com/uploads.hipchat.com/photos/713611/vIXhHRIiclQw7Fm_125.png', 
			is_online: true, 
			show: 'chat'
		},
		{
			email: 'brandon@10up.com', 
			last_active: '2015-06-01T23:26:07+0000', 
			name: 'Brandon Camenisch', 
			mention_name: 'brandon', 
			photo_url: 'https://s3.amazonaws.com/uploads.hipchat.com/photos/713611/vIXhHRIiclQw7Fm_125.png', 
			is_online: true, 
			show: 'chat'
		}
	]	

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
