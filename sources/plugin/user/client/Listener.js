//!requires:Plugin.User.Client
//!provides:Plugin.User.Client.Listener
// 
//!requires:JS.Class

Plugin.User.Client.Listener = new JS.Class( 'Plugin.User.Client.Listener', {
	
	initialize : function ( client ) {
		
		this.client = client;
		
		this._users = [ ];
		
		client.network.addObserver( function ( event ) {
			
			if ( event instanceof Network.Event.Message ) {
				
				if ( event.command === 'user.list' ) {
					
					this._onList( event );
					
				} else if ( event.command === 'user.join' ) {
					
					this._onJoin( event );
					
				} else if ( event.command === 'user.part' ) {
					
					this._onPart( event );
					
				}
				
			}
			
		}.bind( this ) );
		
	},
	
	_onList : function ( event ) {
		
		var list = event.data;
		
		for ( var t = 0, l = list.length; t < l; ++ t ) {
			
			var userData = list[ t ];
			
			this._users[ userData.uuid ] = userData;
			
		}
		
	},
	
	_onJoin : function ( event ) {
		
		var userData = event.data;
		
		this.client.output.append( userData.name + ' has joined the game.', { color : 'darkgreen' } );
		
		this._users[ userData.uuid ] = userData;
		
	},
	
	_onPart : function ( event ) {
		
		var userData = this._users[ event.data.uuid ];
		
		this.client.output.append( userData.name + ' has left the game.', { color : 'darkred' } );
		
		delete this._users[ event.data.uuid ];
		
	}
	
} );
