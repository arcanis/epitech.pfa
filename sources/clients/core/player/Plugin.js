//!requires:Client.Core.Player
//!provides:Client.Core.Player.Plugin
// 
//!requires:JS.Class

Client.Core.Player.Plugin = new JS.Class('Client.Core.Player.Plugin', {
	
	extend : {
		
		attachClient : function ( client ) {
			
			new this( client );
			
		}
		
	},
	
	initialize : function ( client ) {
		
		this.client = client;
		
		this.camera = null;
		
		this.characters = [ ];
		
		this.client.pipeline.addObserver( this.method( 'observer' ) );
		
	},
	
	observer : function ( e ) {
		
		switch ( e.klass ) {
			
		case Client.Core.Protocol.Event.Player.Join :
			break ;
			
		case Client.Core.Protocol.Event.Player.Part :
			break ;
			
		case Client.Core.Protocol.Event.Player.Move :
			this.moveOther( e );
			break ;
			
		}
		
	},
	
	moveSelf : function ( e ) {
		
		if ( this.camera === null ) {
			
			this.camera = this.client.view.createCamera( View.Camera.ThirdPerson );
			console.log( 'camera created ... id ' );
			
		}
		
		var camera = this.camera;
		
		camera.setPosition( e.position );
		camera.setPitchOrientation( e.pitch );
		
	},
	
	moveOther : function ( e ) {
		
		var characters = this.characters;
		
		if ( ! characters.hasOwnProperty( e.playerId ) )
			return ;
		
		var character = characters[ e.playerId ];
		
		character.setPosition( e.position );
		character.setOrientation( e.orientation );
		
	}
	
});
