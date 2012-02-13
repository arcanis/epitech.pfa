//!requires:Plugin.User.Server
//!provides:Plugin.User.Server.Listener
// 
//!requires:JS.Class
// 
//!uses:Network.Event.Disconnection
//!uses:Network.Event.Message
//!uses:Plugin.Authentification.Server.Event.Accept
//!uses:Plugin.User.Server.Event.Join
//!uses:Plugin.User.Server.Event.Part

Plugin.User.Server.Listener = new JS.Class( 'Plugin.User.Server.Listener', {
	
	initialize : function ( server ) {
		
		this.server = server;
		
		this._storage = server.storage.namespace( 'user' );
		
		this._users = Object.create( null );
		
		Plugin.Authentification.addObserver( function ( event ) {
			
			if ( event instanceof Plugin.Authentification.Server.Event.Accept && event.listener.server === server ) {
				
				this._join( event.pipeline, event.name );
				
			}
			
		}.bind( this ) );
		
		server.network.addObserver( function ( event ) {
			
			if ( event instanceof Network.Event.Disconnection ) {
				
				if ( event.pipeline.uuid in this._users ) {
					
					this._part( event.pipeline );
					
				}
				
			} else if ( event instanceof Network.Event.Message ) {
				
				if ( event.pipeline.uuid in this._users ) {
					
					if ( event.command === 'user.frontward.start' ) {
						
						event.pipeline.broadcast( 'user.frontward.start', {
							uuid : event.pipeline.uuid
						} );
						
					} else if ( event.command === 'user.frontward.stop' ) {
						
						event.pipeline.broadcast( 'user.frontward.stop', {
							uuid : event.pipeline.uuid
						} );
						
					} else if ( event.command === 'user.backward.start' ) {
						
						event.pipeline.broadcast( 'user.backward.start', {
							uuid : event.pipeline.uuid
						} );
						
					} else if ( event.command === 'user.backward.stop' ) {
						
						event.pipeline.broadcast( 'user.backward.stop', {
							uuid : event.pipeline.uuid
						} );
						
					}
					
				}
				
			}
			
		}.bind( this ) );
		
	},
	
	_join : function ( pipeline, name ) {
		
		var uuid = pipeline.uuid;
		
		var item = this._users[ uuid ] = this._storage.open( name );
		
		if ( ! item.exists( ) )
		{
			item.set( {
				position : [ 0, 0, 0 ],
				orientation : [ 0, 0, 0 ]
			} );
		}
		
		pipeline.broadcast( 'user.join', this._publicData( uuid ) );
		
		pipeline.send( 'user.list', this._userList( uuid ) );
		
		var joinEvent = new Plugin.User.Server.Event.Join( this, pipeline, name );
		Plugin.User.notifyObservers( joinEvent );
		
	},
	
	_part : function ( pipeline ) {
		
		var uuid = pipeline.uuid;
		
		this._users[ uuid ].discard( );
		delete this._users[ uuid ];
		
		pipeline.broadcast( 'user.part', {
			uuid : uuid
		} );
		
		var partEvent = new Plugin.User.Server.Event.Part( this, pipeline );
		Plugin.User.notifyObservers( partEvent );
		
	},
	
	_publicData : function ( uuid ) {
		
		var item = this._users[ uuid ];
		var data = item.value( );
		
		return {
			uuid : uuid,
			name : item.name( ),
			data : {
				position : data.position,
				orientation : data.orientation
			}
		};
		
	},
	
	_userList : function ( exclude ) {
		
		var list = [ ];
		
		var users = this._users;
		
		for ( var uuid in users ) {
			
			if ( uuid !== exclude ) {
				
				list.push( this._publicData( uuid ) );
				
			}
			
		}
		
		return list;
		
	}
	
} );
