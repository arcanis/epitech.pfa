//!requires:Plugin.User.Client
//!provides:Plugin.User.Client.Listener
// 
//!requires:JS.Class
// 
//!uses:Engine.Event.Cycle
//!uses:Input.Event.KeyDown
//!uses:Input.Event.KeyUp

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
					
				} else if ( event.command === 'user.frontward.start' ) {
					
					this._onFrontwardStart( event );
					
				} else if ( event.command === 'user.frontward.stop' ) {
					
					this._onFrontwardStop( event );
					
				} else if ( event.command === 'user.backward.start' ) {
					
					this._onBackwardStart( event );
					
				} else if ( event.command === 'user.backward.stop' ) {
					
					this._onBackwardStop( event );
					
				}
				
			}
			
		}.bind( this ) );
		
		client.input.addObserver( function ( event ) {
			
			if ( event instanceof Input.Event.KeyDown ) {
				
				if ( event.key === 'z' ) {
					
					this.client.network.pipeline.send( 'user.frontward.start' );
					
				} else if ( event.key === 's' ) {
					
					this.client.network.pipeline.send( 'user.backward.start' );
					
				}
				
			} else if ( event instanceof Input.Event.KeyUp ) {
				
				if ( event.key === 'z' ) {
					
					this.client.network.pipeline.send( 'user.frontward.stop' );
					
				} else if ( event.key === 's' ) {
					
					this.client.network.pipeline.send( 'user.backward.stop' );
					
				}
				
			}
			
		}.bind( this ) );
		
	},
	
	_onList : function ( event ) {
		
		var list = event.data;
		
		for ( var t = 0, l = list.length; t < l; ++ t ) {
			
			this._addUser( list[ t ] );
			
		}
		
	},
	
	_onJoin : function ( event ) {
		
		var user = this._addUser( event.data );
		
		this.client.output.append( user.name + ' has joined the game.', { color : 'darkgreen' } );
		
	},
	
	_onPart : function ( event ) {
		
		var user = this._users[ event.data.uuid ];
		
		this.client.engine.removeCharacter( user.character );
		
		delete this._users[ event.data.uuid ];
		
		this.client.output.append( user.name + ' has left the game.', { color : 'darkred' } );
		
	},
	
	_onFrontwardStart : function ( event ) {
		
		var user = this._users[ event.data.uuid ];
		
		if ( ! user.actions.forward ) {
			
			var x = 0;
			
			this.client.engine.addObserver( user.actions.forward = function ( event ) {
				
				if ( event instanceof Engine.Event.Cycle ) {
					
					var distance = 50 * event.delta;
					
					var position = user.data.position;
					
					position[ 0 ] -= distance * Math.sin( user.data.orientation[ 1 ] );
					position[ 2 ] -= distance * Math.cos( user.data.orientation[ 1 ] );
					
					user.character.setProperty( 'position', position ); 
					
				}
				
			} );
			
		}
		
	},
	
	_onFrontwardStop : function ( event ) {
		
		var user = this._users[ event.data.uuid ];
		
		if ( user.actions.forward ) {
			
			this.client.engine.removeObserver( user.actions.forward );
			
			delete user.actions.forward;
			
		}
		
	},
	
	_onBackwardStart : function ( event ) {
		
		var user = this._users[ event.data.uuid ];
		
		if ( ! user.actions.backward ) {
			
			var x = 0;
			
			this.client.engine.addObserver( user.actions.backward = function ( event ) {
				
				if ( event instanceof Engine.Event.Cycle ) {
					
					var distance = 50 * event.delta;
					
					var position = user.data.position;
					
					position[ 0 ] += distance * Math.sin( user.data.orientation[ 1 ] );
					position[ 2 ] += distance * Math.cos( user.data.orientation[ 1 ] );
					
					user.character.setProperty( 'position', position ); 
					
				}
				
			} );
			
		}
		
	},
	
	_onBackwardStop : function ( event ) {
		
		var user = this._users[ event.data.uuid ];
		
		if ( user.actions.backward ) {
			
			this.client.engine.removeObserver( user.actions.backward );
			
			delete user.actions.backward;
			
		}
		
	},
	
	_addUser : function ( userInfos ) {
		
		var character = this.client.engine.createCharacter( );
		
		var user = this._users[ userInfos.uuid ] = {
			name : userInfos.name,
			character : character,
			actions : Object.create( null ),
			data : userInfos.data
		};
		
		character.setProperties( {
			position : user.data.position,
			orientation : user.data.orientation
		} );
		
		character.setProperty( 'position', [ 0, 0, 0 ] );
		
		return user;
		
	}
	
} );
