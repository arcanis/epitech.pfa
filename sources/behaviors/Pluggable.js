//!provides:Pluggable
// 
//!requires:JS.CLass

global.Pluggable = new JS.Module({
	initialize: function () {
		this.klass.triggerPlugins('setup', this);
		this.setup && this.setup();
		this.klass.triggerPlugins('startup', this);
	},
	
	terminate: function () {
		this.klass.triggerPlugins('shutdown', this);
	},
	
	extend: {
		registerPlugin: function (type, plugin) {
			this.plugins = this.plugins || {};
			this.plugins[type] = this.plugins[type] || [];
			this.plugins[type].push(plugin);
		},
		
		triggerPlugins: function (type, instance) {
			if (!this.plugins || !this.plugins[type]) return ;
			var pluginList = this.plugins[type];
			for (var x = 0, y = pluginList.length; x < y; ++x) {
				pluginList[x].call(this, instance);
			}
		},
		
		registerSetupPlugin: function (plugin) {
			this.registerPlugin('setup', plugin);
		},
		
		registerStartupPlugin: function (plugin) {
			this.registerPlugin('startup', plugin);
		},
		
		registerShutdownPlugin: function (plugin) {
			this.registerPlugin('shutdown', plugin);
		}
	}
});
