(function(){var a=typeof this.global=="object"?this.global:this;a.JS=a.JS||{},JS.ENV=a})(),JS.Package=function(a){var b=JS.Package.OrderedSet;JS.Package._index(this),this._loader=a,this._names=new b,this._deps=new b,this._uses=new b,this._styles=new b,this._observers={},this._events={}},function(a){a.displayName="Package",a.toString=function(){return a.displayName},a.log=function(a){if(typeof window=="undefined")return;typeof window.runtime=="object"&&window.runtime.trace(a),window.console&&console.info&&console.info(a)};var b=a.OrderedSet=function(a){this._members=this.list=[],this._index={};if(!a)return;for(var b=0,c=a.length;b<c;b++)this.push(a[b])};b.prototype.push=function(a){var b=a.id!==undefined?a.id:a,c=this._index;if(c.hasOwnProperty(b))return;c[b]=this._members.length,this._members.push(a)};var c=a.Deferred=function(){this._status="deferred",this._value=null,this._callbacks=[]};c.prototype.callback=function(a,b){this._status==="succeeded"?a.call(b,this._value):this._callbacks.push([a,b])},c.prototype.succeed=function(a){this._status="succeeded",this._value=a;var b;while(b=this._callbacks.shift())b[0].call(b[1],a)},a.ENV=JS.ENV;if((this.document||{}).getElementsByTagName){var d=document.getElementsByTagName("script")[0];a._isIE=d.readyState!==undefined}a.onerror=function(a){throw a},a._throw=function(b){a.onerror(new Error(b))};var e=a.prototype,f=[["requires","_deps"],["uses","_uses"],["styling","_styles"]],g=f.length;while(g--)(function(a){var b=a[0],c=a[1];e[b]=function(){var a=arguments.length,b;for(b=0;b<a;b++)this[c].push(arguments[b]);return this}})(f[g]);e.provides=function(){var b=arguments.length,c;for(c=0;c<b;c++)this._names.push(arguments[c]),a._getFromCache(arguments[c]).pkg=this;return this},e.setup=function(a){return this._onload=a,this},e._on=function(a,b,c){if(this._events[a])return b.call(c);var d=this._observers[a]=this._observers[a]||[];d.push([b,c]),this._load()},e._fire=function(a){if(this._events[a])return!1;this._events[a]=!0;var b=this._observers[a];if(!b)return!0;delete this._observers[a];for(var c=0,d=b.length;c<d;c++)b[c][0].call(b[c][1]);return!0},e._isLoaded=function(b){if(!b&&this.__isLoaded!==undefined)return this.__isLoaded;var c=this._names.list,d=c.length,e,f;while(d--){e=c[d],f=a._getObject(e,this._exports);if(f!==undefined)continue;return b?a._throw("Expected package at "+this._loader+" to define "+e):this.__isLoaded=!1}return this.__isLoaded=!0},e._load=function(){if(!this._fire("request"))return;this._prefetch();var b=this._deps.list.concat(this._uses.list),c=b.length;a.when({load:b}),a.when({complete:this._deps.list},function(){a.when({complete:b,load:[this]},function(){this._fire("complete")},this);var c=this,d=function(a){c._exports=a,c._onload&&c._onload(),c._isLoaded(!0),c._fire("load")};if(this._isLoaded())return this._fire("download"),this._fire("load");if(this._loader===undefined)return a._throw("No load path found for "+this._names.list[0]);typeof this._loader=="function"?this._loader(d):a.Loader.loadFile(this._loader,d,this._source);if(!a.Loader.loadStyle)return;var e=this._styles.list,f=e.length;while(f--)a.Loader.loadStyle(e[f]);this._fire("download")},this)},e._prefetch=function(){if(typeof this._loader!="string"||!a.Loader.fetch)return;this._source=this._source||a.Loader.fetch(this._loader)},e.toString=function(){return"Package:"+this._names.list.join(",")},a.when=function(b,c,d){var e=[],f={},g,h,i;for(g in b){if(!b.hasOwnProperty(g))continue;f[g]=[],h=new a.OrderedSet(b[g]),i=h.list.length;while(i--)e.push([g,h.list[i],i])}var j=i=e.length;if(j===0)return c&&c.call(d,f);while(i--)(function(b){var e=a._getByName(b[1]);e._on(b[0],function(){f[b[0]][b[2]]=a._getObject(b[1],e._exports),j-=1,j===0&&c&&c.call(d,f)})})(e[i])},a._autoIncrement=1,a._indexByPath={},a._indexByName={},a._autoloaders=[],a._index=function(a){a.id=this._autoIncrement,this._autoIncrement+=1},a._getByPath=function(a){var b=a.toString();return this._indexByPath[b]=this._indexByPath[b]||new this(a)},a._getByName=function(a){if(typeof a!="string")return a;var b=this._getFromCache(a);if(b.pkg)return b.pkg;var c=this._manufacture(a);if(c)return c;var d=new this;return d.provides(a),d},a.remove=function(a){var b=this._getByName(a);delete this._indexByName[a],delete this._indexByPath[b._loader]},a._autoload=function(a,b){this._autoloaders.push([a,b])},a._manufacture=function(a){var b=this._autoloaders,c=b.length,d,e,f;for(d=0;d<c;d++){e=b[d];if(!e[0].test(a))continue;f=e[1].from+"/"+a.replace(/([a-z])([A-Z])/g,function(a,b,c){return b+"_"+c}).replace(/\./g,"/").toLowerCase()+".js";var g=new this(f);return g.provides(a),(f=e[1].require)&&g.requires(a.replace(e[0],f)),g}return null},a._getFromCache=function(a){return this._indexByName[a]=this._indexByName[a]||{}},a._getObject=function(a,b){if(typeof a!="string")return undefined;var c=b?{}:this._getFromCache(a);if(c.obj!==undefined)return c.obj;var d=b||this.ENV,e=a.split("."),f;while(f=e.shift())d=d&&d[f];return b&&d===undefined?this._getObject(a):c.obj=d}}(JS.Package),JS.Package.DomLoader={HOST_REGEX:/^https?\:\/\/[^\/]+/i,usable:function(){return!!JS.Package._getObject("window.document.getElementsByTagName")},__FILE__:function(){var a=document.getElementsByTagName("script");return src=a[a.length-1].src,url=window.location.href,/^\w+\:\/\//.test(src)?src:/^\//.test(src)?window.location.origin+src:url.replace(/[^\/]*$/g,"")+src},cacheBust:function(a){var b=(new Date).getTime();return a+(/\?/.test(a)?"&":"?")+b},fetch:function(a){JS.cacheBust&&(a=this.cacheBust(a)),this.HOST=this.HOST||this.HOST_REGEX.exec(window.location.href);var b=this.HOST_REGEX.exec(a);if(!this.HOST||b&&b[0]!==this.HOST[0])return null;JS.Package.log("Loading "+a);var c=new JS.Package.Deferred,d=this,e=window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest;return e.open("GET",a,!0),e.onreadystatechange=function(){if(e.readyState!==4)return;e.onreadystatechange=d._K,c.succeed(e.responseText),e=null},e.send(null),c},loadFile:function(a,b,c){JS.cacheBust&&!c&&(a=this.cacheBust(a));var d=this,e=document.getElementsByTagName("head")[0],f=document.createElement("script");f.type="text/javascript";if(c)return c.callback(function(c){JS.Package.log("Executing "+a),e.appendChild(f),f.text=c,b()});JS.Package.log("Loading and executing "+a),f.src=a,f.onload=f.onreadystatechange=function(){var a=f.readyState,c=f.status;if(!a||a==="loaded"||a==="complete"||a===4&&c===200)b(),f.onload=f.onreadystatechange=d._K,e=null,f=null},e.appendChild(f)},loadStyle:function(a){var b=document.createElement("link");b.rel="stylesheet",b.type="text/css",b.href=a,document.getElementsByTagName("head")[0].appendChild(b)},_K:function(){}},JS.Package.Loader=JS.Package.DomLoader,JS.Package.DSL={__FILE__:function(){return JS.Package.Loader.__FILE__()},pkg:function(a,b){var c=b?JS.Package._getByPath(b):JS.Package._getByName(a);return c.provides(a),c},file:function(a){return JS.Package._getByPath(a)},load:function(a,b){JS.Package.Loader.loadFile(a,b)},autoload:function(a,b){JS.Package._autoload(a,b)}},JS.Package.DSL.loader=JS.Package.DSL.file,JS.Packages=function(a){a.call(JS.Package.DSL)},JS.cacheBust=!1,JS.load=function(a,b){return JS.Package.Loader.loadFile(a,function(){typeof b=="function"&&b()}),this},JS.require=function(){var a=[],b=0;while(typeof arguments[b]=="string")a.push(arguments[b]),b+=1;var c=arguments[b],d=arguments[b+1];return JS.Package.when({complete:a},function(a){if(!c)return;c.apply(d||null,a&&a.complete)}),this},function(){var a=typeof this.global=="object"?this.global:this;a.JS=a.JS||{},JS.ENV=a}(),JS.END_WITHOUT_DOT=/([^\.])$/,JS.array=function(a){var b=[],c=a.length;while(c--)b[c]=a[c];return b},JS.bind=function(a,b){return function(){return a.apply(b,arguments)}},JS.extend=function(a,b,c){if(!a||!b)return a;for(var d in b){if(a[d]===b[d])continue;if(c===!1&&a.hasOwnProperty(d))continue;a[d]=b[d]}return a},JS.indexOf=function(a,b){if(a.indexOf)return a.indexOf(b);var c=a.length;while(c--)if(a[c]===b)return c;return-1},JS.isType=function(a,b){return typeof b=="string"?typeof a===b:a===null||a===undefined?!1:typeof b=="function"&&a instanceof b||a.isA&&a.isA(b)||a.constructor===b},JS.makeBridge=function(a){var b=function(){};return b.prototype=a.prototype,new b},JS.makeClass=function(a){a=a||Object;var b=function(){return this.initialize?this.initialize.apply(this,arguments)||this:this};return b.prototype=JS.makeBridge(a),b.superclass=a,b.subclasses=[],a.subclasses&&a.subclasses.push(b),b},JS.match=function(a,b){return b===undefined?!1:typeof a.test=="function"?a.test(b):a.match(b)},JS.Method=JS.makeClass(),JS.extend(JS.Method.prototype,{initialize:function(a,b,c){this.module=a,this.name=b,this.callable=c,this._words={};if(typeof c!="function")return;this.arity=c.length;var d=c.toString().match(/\b[a-z\_\$][a-z0-9\_\$]*\b/ig),e=d.length;while(e--)this._words[d[e]]=!0},setName:function(a){this.callable.displayName=this.displayName=a},contains:function(a){return this._words.hasOwnProperty(a)},call:function(){return this.callable.call.apply(this.callable,arguments)},apply:function(a,b){return this.callable.apply(a,b)},compile:function(a){var b=this,c=b.module.__trace__||a.__trace__,d=b.callable,e=b._words,f=JS.Method._keywords,g=f.length,h=[],i;while(g--)i=f[g],e[i.name]&&h.push(i);if(h.length===0&&!c)return d;var j=function(){var c=h.length,e=c,f={},g,i,j;while(e--){g=h[e],i=this[g.name];if(i&&!i.__kwd__)continue;f[g.name]={_value:i,_own:this.hasOwnProperty(g.name)},j=g.filter(b,a,this,arguments),j.__kwd__=!0,this[g.name]=j}var k=d.apply(this,arguments),e=c;while(e--){g=h[e];if(!f[g.name])continue;f[g.name]._own?this[g.name]=f[g.name]._value:delete this[g.name]}return k};return c?JS.StackTrace.wrap(j,b,a):j},toString:function(){var a=this.displayName||this.module.toString()+"#"+this.name;return"#<Method:"+a+">"}}),JS.Method.create=function(a,b,c){if(c&&c.__inc__&&c.__fns__)return c;var d=typeof c!="function"?c:new this(a,b,c);return this.notify(d),d},JS.Method.compile=function(a,b){return a&&a.compile?a.compile(b):a},JS.Method.__listeners__=[],JS.Method.added=function(a,b){this.__listeners__.push([a,b])},JS.Method.notify=function(a){var b=this.__listeners__,c=b.length,d;while(c--)d=b[c],d[0].call(d[1],a)},JS.Method._keywords=[],JS.Method.keyword=function(a,b){this._keywords.push({name:a,filter:b})},JS.Method.tracing=function(a,b,c){JS.require("JS.StackTrace",function(){var d=JS.StackTrace.logger,e=d.active;a=[].concat(a),this.trace(a),d.active=!0,b.call(c),this.untrace(a),d.active=e},this)},JS.Method.trace=function(a){var b=a.length;while(b--)a[b].__trace__=!0,a[b].resolve()},JS.Method.untrace=function(a){var b=a.length;while(b--)a[b].__trace__=!1,a[b].resolve()},JS.Module=JS.makeClass(),JS.Module.__queue__=[],JS.extend(JS.Module.prototype,{initialize:function(a,b,c){typeof a!="string"&&(c=arguments[1],b=arguments[0],a=undefined),c=c||{},this.__inc__=[],this.__dep__=[],this.__fns__={},this.__tgt__=c._target,this.__anc__=null,this.__mct__={},this.setName(a),this.include(b,{_resolve:!1}),JS.Module.__queue__&&JS.Module.__queue__.push(this)},setName:function(a){this.displayName=a||"";for(var b in this.__fns__)this.__name__(b);a&&this.__meta__&&this.__meta__.setName(a+".")},__name__:function(a){if(!this.displayName)return;var b=this.__fns__[a];if(!b)return;a=this.displayName.replace(JS.END_WITHOUT_DOT,"$1#")+a;if(typeof b.setName=="function")return b.setName(a);typeof b=="function"&&(b.displayName=a)},define:function(a,b,c){var d=JS.Method.create(this,a,b),e=(c||{})._resolve;this.__fns__[a]=d,this.__name__(a),e!==!1&&this.resolve()},include:function(a,b){if(!a)return this;var b=b||{},c=b._resolve!==!1,d=a.extend,e=a.include,f,g,h,i,j,k;if(a.__fns__&&a.__inc__)this.__inc__.push(a),(a.__dep__||{}).push&&a.__dep__.push(this),(f=b._extended)?typeof a.extended=="function"&&a.extended(f):typeof a.included=="function"&&a.included(this);else{if(this.shouldIgnore("extend",d)){i=[].concat(d);for(j=0,k=i.length;j<k;j++)this.extend(i[j])}if(this.shouldIgnore("include",e)){i=[].concat(e);for(j=0,k=i.length;j<k;j++)this.include(i[j],{_resolve:!1})}for(g in a){if(!a.hasOwnProperty(g))continue;h=a[g];if(this.shouldIgnore(g,h))continue;this.define(g,h,{_resolve:!1})}a.hasOwnProperty("toString")&&this.define("toString",a.toString,{_resolve:!1})}return c&&this.resolve(),this},alias:function(a){for(var b in a){if(!a.hasOwnProperty(b))continue;this.define(b,this.instanceMethod(a[b]),{_resolve:!1})}this.resolve()},resolve:function(a){var a=a||this,b=a.__tgt__,c=this.__inc__,d=this.__fns__,e,f,g,h;if(a===this){this.__anc__=null,this.__mct__={},e=this.__dep__.length;while(e--)this.__dep__[e].resolve()}if(!b)return;for(e=0,f=c.length;e<f;e++)c[e].resolve(a);for(g in d)h=JS.Method.compile(d[g],a),b[g]!==h&&(b[g]=h);d.hasOwnProperty("toString")&&(b.toString=JS.Method.compile(d.toString,a))},shouldIgnore:function(a,b){return(a==="extend"||a==="include")&&(typeof b!="function"||b.__fns__&&b.__inc__)},ancestors:function(a){var b=!a,a=a||[],c=this.__inc__;if(b&&this.__anc__)return this.__anc__.slice();for(var d=0,e=c.length;d<e;d++)c[d].ancestors(a);return JS.indexOf(a,this)<0&&a.push(this),b&&(this.__anc__=a.slice()),a},lookup:function(a){var b=this.__mct__[a];if(b&&b.slice)return b.slice();var c=this.ancestors(),d=[],e;for(var f=0,g=c.length;f<g;f++)e=c[f].__fns__,e.hasOwnProperty(a)&&d.push(e[a]);return this.__mct__[a]=d.slice(),d},includes:function(a){if(a===this)return!0;var b=this.__inc__;for(var c=0,d=b.length;c<d;c++)if(b[c].includes(a))return!0;return!1},instanceMethod:function(a){return this.lookup(a).pop()},instanceMethods:function(a,b){var c=b||[],d=this.__fns__,e;for(e in d){if(!JS.isType(this.__fns__[e],JS.Method))continue;if(JS.indexOf(c,e)>=0)continue;c.push(e)}if(a!==!1){var f=this.ancestors(),g=f.length;while(g--)f[g].instanceMethods(!1,c)}return c},match:function(a){return a&&a.isA&&a.isA(this)},toString:function(){return this.displayName}}),JS.Kernel=new JS.Module("Kernel",{__eigen__:function(){if(this.__meta__)return this.__meta__;var a=this.toString()+".";return this.__meta__=new JS.Module(a,null,{_target:this}),this.__meta__.include(this.klass,{_resolve:!1})},equals:function(a){return this===a},extend:function(a,b){var c=(b||{})._resolve;return this.__eigen__().include(a,{_extended:this,_resolve:c}),this},hash:function(){return JS.Kernel.hashFor(this)},isA:function(a){return typeof a=="function"&&this instanceof a||this.__eigen__().includes(a)},method:function(a){var b=this.__mct__=this.__mct__||{},c=b[a],d=this[a];if(typeof d!="function")return d;if(c&&d===c._value)return c._bound;var e=JS.bind(d,this);return b[a]={_value:d,_bound:e},e},methods:function(){return this.__eigen__().instanceMethods()},tap:function(a,b){return a.call(b||null,this),this},toString:function(){if(this.displayName)return this.displayName;var a=this.klass.displayName||this.klass.toString();return"#<"+a+":"+this.hash()+">"}}),function(){var a=1;JS.Kernel.hashFor=function(b){return b.__hash__!==undefined?b.__hash__:(b.__hash__=((new Date).getTime()+a).toString(16),a+=1,b.__hash__)}}(),JS.Class=JS.makeClass(JS.Module),JS.extend(JS.Class.prototype,{initialize:function(a,b,c,d){typeof a!="string"&&(d=arguments[2],c=arguments[1],b=arguments[0],a=undefined),typeof b!="function"&&(d=c,c=b,b=Object),JS.Module.prototype.initialize.call(this,a),d=d||{};var e=JS.makeClass(b);JS.extend(e,this),e.prototype.constructor=e.prototype.klass=e,e.__eigen__().include(b.__meta__,{_resolve:d._resolve}),e.setName(a),e.__tgt__=e.prototype;var f=b===Object?{}:b.__fns__?b:new JS.Module(b.prototype,{_resolve:!1});return e.include(JS.Kernel,{_resolve:!1}).include(f,{_resolve:!1}).include(c,{_resolve:!1}),d._resolve!==!1&&e.resolve(),typeof b.inherited=="function"&&b.inherited(e),e}}),function(){var a=function(a){var b={},c=a.prototype;for(var d in c){if(!c.hasOwnProperty(d))continue;b[d]=JS.Method.create(a,d,c[d])}return b},b=function(b,c){var d=JS[b],e=JS[c];d.__inc__=[],d.__dep__=[],d.__fns__=a(d),d.__tgt__=d.prototype,d.prototype.constructor=d.prototype.klass=d,JS.extend(d,JS.Class.prototype),d.include(e||JS.Kernel),d.setName(b),d.constructor=d.klass=JS.Class};b("Method"),b("Module"),b("Class","Module");var c=JS.Kernel.instanceMethod("__eigen__");c.call(JS.Method),c.call(JS.Module),c.call(JS.Class).include(JS.Module.__meta__)}(),JS.NotImplementedError=new JS.Class("NotImplementedError",Error),JS.Method.keyword("callSuper",function(a,b,c,d){var e=b.lookup(a.name),f=e.length-1,g=JS.array(d);return function(){var a=arguments.length;while(a--)g[a]=arguments[a];f-=1;var b=e[f].apply(c,g);return f+=1,b}}),JS.Method.keyword("blockGiven",function(a,b,c,d){var e=Array.prototype.slice.call(d,a.arity),f=typeof e[0]=="function";return function(){return f}}),JS.Method.keyword("yieldWith",function(a,b,c,d){var e=Array.prototype.slice.call(d,a.arity);return function(){if(typeof e[0]!="function")return;return e[0].apply(e[1]||null,arguments)}}),JS.Interface=new JS.Class("Interface",{initialize:function(a){this.test=function(b,c){var d=a.length;while(d--)if(typeof b[a[d]]!="function")return c?a[d]:!1;return!0}},extend:{ensure:function(){var a=JS.array(arguments),b=a.shift(),c,d;while(c=a.shift()){d=c.test(b,!0);if(d!==!0)throw new Error("object does not implement "+d+"()")}}}}),JS.Singleton=new JS.Class("Singleton",{initialize:function(a,b,c){return new new JS.Class(a,b,c)}}),global.Helpers={},global.Helpers.requestAnimationLoop=function(a){var b=function(c){Helpers.requestAnimationFrame(b),a(c)};b(0)},global.Helpers.requestAnimationFrame=function(a){var b=+(new Date);Helpers.requestAnimationFrame.gate.call(window,function(){a((new Date-b)/1e3)})},global.Helpers.requestAnimationFrame.gate=function(){var a=function(a){return this.setTimeout(a,1e3/60)};if(typeof window=="object"){var b=["","moz","webkit","ms","o"];for(var c=0,d=b.length;c<d;++c){var e=b[c];e.length?e+="RequestAnimationFrame":e="requestAnimationFrame";if(window[e]){a=window[e];break}}}return a}(),Helpers.ifBrowserContext=function(a){typeof window!="undefined"&&a()},Helpers.ifNodeContext=function(a){typeof process!="undefined"&&a()},global.Value3=new JS.Class({initialize:function(a,b,c){this.x=a||0,this.y=b||0,this.z=c||0},clone:function(){return new this.klass(this.x,this.y,this.z)},copy:function(a){return this.x=a.x,this.y=a.y,this.z=a.z,this},set:function(a,b,c){return this.x=a,this.y=b,this.z=c,this},setX:function(a){return this.x=a,this},setY:function(a){return this.y=a,this},setZ:function(a){return this.z=a,this},add:function(a,b){return this.x=a.x+b.x,this.y=a.y+b.y,this.z=a.z+b.z,this},substract:function(a,b){return this.x=a.x-b.x,this.y=a.y-b.y,this.z=a.z-b.z,this},multiply:function(a,b){return this.x=a.x*b.x,this.y=a.y*b.y,this.z=a.z*b.z,this},divide:function(a,b){return this.x=a.x/b.x,this.y=a.y/b.y,this.z=a.z/b.z,this},addSelf:function(a){return this.x+=a.x,this.y+=a.y,this.z+=a.z,this},substractSelf:function(a){return this.x-=a.x,this.y-=a.y,this.z-=a.z,this},multiplySelf:function(a){return this.x*=a.x,this.y*=a.y,this.z*=a.z,this},divideSelf:function(a){return this.x/=a.x,this.y/=a.y,this.z/=a.z,this},addScalar:function(a){return this.x+=a,this.y+=a,this.z+=a,this},substractScalar:function(a){return this.x-=a,this.y-=a,this.z-=a,this},multiplyScalar:function(a){return this.x*=a,this.y*=a,this.z*=a,this},divideScalar:function(a){return this.x/=a,this.y/=a,this.z/=a,this},toString:function(){return[this.x,this.y,this.z].toString()}}),global.View={},typeof THREE!="undefined"&&(THREE.GeometryUtils.merge=function(a,b,c){var d,e=b instanceof THREE.Geometry?b:b.geometry,f=b instanceof THREE.Object3D?b.children:d,g,h,i,j;b instanceof THREE.Object3D&&b.updateMatrixWorld(!0);if(e!==d){var k,l,m=a.vertices.length,n=a.faceVertexUvs[0].length,o=a.vertices,p=e.vertices,q=a.faces,r=e.faces,s=a.faceVertexUvs[0],t=e.faceVertexUvs[0],u={};for(g=0;g<a.materials.length;++g){var v=a.materials[g].id;u[v]=g}b instanceof THREE.Mesh&&(k=b.matrixWorld,l=new THREE.Matrix4,l.extractRotation(k,b.scale));for(g=0,h=p.length;g<h;++g){var w=p[g],x=new THREE.Vertex(w.position.clone());k&&k.multiplyVector3(x.position),o.push(x)}for(g=0,h=r.length;g<h;++g){var y=r[g],z,A,B,C=y.vertexNormals,D=y.vertexColors;y instanceof THREE.Face3?z=new THREE.Face3(y.a+m,y.b+m,y.c+m):y instanceof THREE.Face4&&(z=new THREE.Face4(y.a+m,y.b+m,y.c+m,y.d+m)),z.normal.copy(y.normal),l&&l.multiplyVector3(z.normal);for(i=0,j=C.length;i<j;++i)A=C[i].clone(),l&&l.multiplyVector3(A),z.vertexNormals.push(A);z.color.copy(y.color);for(i=0,j=D.length;i<j;++i)B=D[i],z.vertexColors.push(B.clone());if(y.materialIndex!==d){var E=e.materials[y.materialIndex],F=E.id,G=u[F];G===d&&(G=a.materials.length,a.materials.push(E)),z.materialIndex=G}z.centroid.copy(y.centroid),k&&k.multiplyVector3(z.centroid),q.push(z)}for(g=0,h=t.length;g<h;++g){var H=t[g],I=[];for(i=0,j=H.length;i<j;++i)I.push(new THREE.UV(H[i].u,H[i].v));s.push(I)}}if(c===!0&&f!==d)for(g=0,h=f.length;g<h;++g)this.merge(a,f[g])}),View.Details=new JS.Class("View.Details",{initialize:function(){this.scene=new THREE.Scene,this.cameras=[],this.voxels={},this.pendingVoxels={},this.voxelGeometry=null,this.voxelEntity=null},refreshVoxelFaces:function(a){var b=this,c=this.voxels,d=new Value3,e=function(e,f,g){d.set(a.x+e,a.y+f,a.z+g),c.hasOwnProperty(d)&&c[d].setFaces(b.getVoxelFaces(d))};e(0,0,0),e(1,0,0),e(-1,0,0),e(0,1,0),e(0,-1,0),e(0,1,0),e(0,-1,0)},getVoxelFaces:function(a){var b=this.voxels,c=new Value3;return{px:!b.hasOwnProperty(c.add(a,{x:1,y:0,z:0})),nx:!b.hasOwnProperty(c.add(a,{x:-1,y:0,z:0})),py:!b.hasOwnProperty(c.add(a,{x:0,y:1,z:0})),ny:!b.hasOwnProperty(c.add(a,{x:0,y:-1,z:0})),pz:!b.hasOwnProperty(c.add(a,{x:0,y:0,z:1})),nz:!b.hasOwnProperty(c.add(a,{x:0,y:0,z:-1}))}},finishPendingVoxels:function(){var a=this.voxels,b=this.pendingVoxels;this.pendingVoxels={};for(var c in b)if(b.hasOwnProperty(c)){var d=a[c],e=b[c];d.setFaces(this.getVoxelFaces(e)),d.setVoxelPosition(e)}},buildVoxelGeometry:function(){var a=this.voxels,b=this.voxelGeometry=new THREE.Geometry;for(var c in a)if(a.hasOwnProperty(c)){var d=a[c],e=d.object3D;e&&THREE.GeometryUtils.merge(b,e,!0)}},buildVoxelEntity:function(){this.voxelEntity&&this.scene.remove(this.voxelEntity),this.voxelEntity=new THREE.Mesh(this.voxelGeometry,new THREE.MeshFaceMaterial),this.scene.add(this.voxelEntity)}}),View.Modules={},View.Modules.Cameras=new JS.Module({createCamera:function(){var a=new View.Camera;return this.cameras.push(a.object3D),this.scene.add(a.object3D),a},removeCamera:function(a){var b=this.cameras.indexOf(a);b===-1&&(this.cameras.slice(b,1),this.scene.remove(a))}}),View.Object=new JS.Class("View.Object3D",{setPosition:function(a){this.object3D.position.copy(a)},getPosition:function(){return(new Value3).copy(this.object3D.position)},setXPosition:function(a){this.object3D.position.x=a},getXPosition:function(){return this.object3D.position.x},setYPosition:function(a){this.object3D.position.y=a},getYPosition:function(){return this.object3D.position.y},setZPosition:function(a){this.object3D.position.z=a},getZPosition:function(){return this.object3D.position.z},setOrientation:function(a){this.object3D.rotation.copy(a)},getOrientation:function(){return(new Value3).copy(this.object3D.rotation)},setRollOrientation:function(a){this.object3D.rotation.x=a},getRollOrientation:function(){return this.object3D.rotation.x},setPitchOrientation:function(a){this.object3D.rotation.y=a},getPitchOrientation:function(){return this.object3D.rotation.y},setYawOrientation:function(a){this.object3D.rotation.z=a},getYawOrientation:function(){return this.object3D.rotation.z},move:function(a,b){var c=this.object3D;c.matrixAutoUpdate&&c.updateMatrix(),c.translate(a,b)},moveFront:function(a){this.move(a,new THREE.Vector3(0,0,1))},moveBack:function(a){this.moveFront(-a)},moveLeft:function(a){this.move(a,new THREE.Vector3(1,0,0))},moveRight:function(a){this.moveLeft(-a)},lookAt:function(a){this.object3D.lookAt((new THREE.Vector3).copy(a))}}),View.Camera=new JS.Class("View.Camera",View.Object,{initialize:function(){this.object3D=new THREE.PerspectiveCamera(60,0,.1,2e4)}}),View.Modules.Characters=new JS.Module({createCharacter:function(a){var b=new a;return this.scene.add(b.object3D),b},removeCharacter:function(a){this.scene.remove(a.object3D)}}),View.Modules.Debug=new JS.Module({activateAxes:function(){this.scene.add(new THREE.Axes)},activateLights:function(){this.scene.add(new THREE.AmbientLight(12303291)),this.scene.add(new THREE.PointLight(16777215))}}),View.Modules.Voxels=new JS.Module({setVoxelType:function(a,b){var c=new b;this.voxels[a]=c,this.pendingVoxels[a]=a.clone(),this.voxelGeometry=null},clearVoxel:function(a){this.voxels[a]=null,this.refreshVoxelFaces(a),this.voxelGeometry=null}}),View.Apis=new JS.Class("View.Apis",View.Details,{include:[View.Modules.Cameras,View.Modules.Characters,View.Modules.Debug,View.Modules.Voxels],renderOn:function(a,b,c){if(this.hasOwnProperty("cameras")){var d=this.cameras;if(d.length>0){this.voxelGeometry===null&&(this.finishPendingVoxels(),this.buildVoxelGeometry(),this.buildVoxelEntity());var e=d[0];e.aspect=b/c,e.updateProjectionMatrix(),a.render(this.scene,e)}}}}),global.Systems={},Helpers.ifBrowserContext(function(){Systems.Keyboard=new JS.Singleton("Systems.Keyboard",{KEY_A:65,KEY_B:66,KEY_C:67,KEY_D:68,KEY_E:69,KEY_F:70,KEY_G:71,KEY_H:72,KEY_I:73,KEY_J:74,KEY_K:75,KEY_L:76,KEY_M:77,KEY_N:78,KEY_O:79,KEY_P:80,KEY_Q:81,KEY_R:82,KEY_S:83,KEY_T:84,KEY_U:85,KEY_V:86,KEY_W:87,KEY_X:88,KEY_Y:89,KEY_Z:90,KEY_ARROW_LEFT:37,KEY_ARROW_UP:38,KEY_ARROW_RIGHT:39,KEY_ARROW_DOWN:40,KEY_NUMPAD_1:97,KEY_NUMPAD_2:98,KEY_NUMPAD_3:99,KEY_NUMPAD_4:100,KEY_NUMPAD_5:101,KEY_NUMPAD_6:102,KEY_NUMPAD_7:103,KEY_NUMPAD_8:104,KEY_NUMPAD_9:105,initialize:function(){var a=this.active={};window.document.addEventListener("keydown",function(b){a[b.keyCode]=!0},!1),window.document.addEventListener("keyup",function(b){delete a["down",b.keyCode]},!1)},check:function(a){return this.active.hasOwnProperty(a)}})}),Helpers.ifBrowserContext(function(){Systems.Display=new JS.Singleton("Systems.Display",{initialize:function(){this.renderer=new THREE.WebGLRenderer;var a=this.renderer.domElement;a.style.position="absolute",a.style.top=a.style.left="0";var b=this,c=function(){b.size=[window.innerWidth,window.innerHeight],b.renderer.setSize(window.innerWidth,window.innerHeight)};window.addEventListener("resize",function(){c()},!1),window.addEventListener("load",function(){window.document.body.appendChild(a)},!1),c()},render:function(a){var b=this.size;a.renderOn(this.renderer,b[0],b[1])}})}),View.Characters={},View.Characters.Base=new JS.Class("View.Characters.Base",View.Object,{initialize:function(){}}),View.Characters.Cube=new JS.Class("View.Characters.Cube",View.Characters.Base,{extend:{initialize:function(){this.hasOwnProperty("geometry")===!1&&(this.geometry=new THREE.CubeGeometry(5,50,50)),this.hasOwnProperty("material")===!1&&(this.material=new THREE.MeshNormalMaterial)}},initialize:function(){this.callSuper();var a=this.klass;a.initialize(),this.object3D=new THREE.Mesh(a.geometry,a.material)}}),View.Voxels={},View.Voxels.Base=new JS.Class("View.Voxels.Base",View.Object,{initialize:function(){this.object3D=null,this.klass.initialize()},setFaces:function(a){var b=this.klass.geometriesPacks[Helpers.getFacesIdentifier(a)],c=this.object3D=new THREE.Object3D;for(var d=0,e=b.length;d<e;++d)c.add(new THREE.Mesh(b[d]))},setVoxelPosition:function(a){var b=10;this.setPosition((new Value3).copy(a).multiplyScalar(b).addScalar(b/2))}}),Helpers.getFacesIdentifier=function(a){return a.px*1+a.nx*2+a.py*4+a.ny*8+a.pz*16+a.nz*32},View.Voxels.Grass=new JS.Class("View.Voxels.Grass",View.Voxels.Base,{extend:{initialize:function(){if(this.hasOwnProperty("materials")===!1){var a=new THREE.MeshBasicMaterial({map:new THREE.ImageUtils.loadTexture(ASSETS_DIR+"/dirt.jpg")});this.materials={top:new THREE.MeshBasicMaterial({map:new THREE.ImageUtils.loadTexture(ASSETS_DIR+"/grass-top.jpg"),color:6924607,blending:THREE.SubstractiveBlending}),sides:[a,new THREE.MeshBasicMaterial({map:new THREE.ImageUtils.loadTexture(ASSETS_DIR+"/grass-sides.png"),color:6924607})],bottom:a}}if(this.hasOwnProperty("geometriesPacks")===!1){var b=this.materials;this.geometriesPacks=Helpers.generateBlockGeometries([b.sides,b.sides,b.top,b.bottom,b.sides,b.sides])}}},initialize:function(){this.callSuper()}}),Helpers.generateBlockGeometries=function(){var a=function(a){var b=[];for(var c=0;c<6;++c){var d=a[c];d instanceof Array||(d=[d]);for(var e=0,f=d.length;e<f;++e)b.length<=e&&b.push(new Array(6)),b[e][c]=d[e]}return b},b=function(a){var b={px:0,nx:0,py:0,ny:0,pz:0,nz:0};for(b.px=0;b.px<=1;++b.px)for(b.nx=0;b.nx<=1;++b.nx)for(b.py=0;b.py<=1;++b.py)for(b.ny=0;b.ny<=1;++b.ny)for(b.pz=0;b.pz<=1;++b.pz)for(b.nz=0;b.nz<=1;++b.nz)a(b)};return function(c){var d=a(c),e={},f={};for(var g=0,h=d.length;g<h;++g)f[g]={};return b(function(a){var b=Helpers.getFacesIdentifier(a),c=e[b]=[];for(var g=0,h=d.length;g<h;++g){var i=d[g];a={px:Boolean(a.px&&i[0]),nx:Boolean(a.nx&&i[1]),py:Boolean(a.py&&i[2]),ny:Boolean(a.ny&&i[3]),pz:Boolean(a.pz&&i[4]),nz:Boolean(a.nz&&i[5])},b=Helpers.getFacesIdentifier(a),b>0&&(f[g].hasOwnProperty(b)||(f[g][b]=new THREE.CubeGeometry(10,10,10,1,1,1,i,a)),c.push(f[g][b]))}}),e}}(),View.Voxels.Dirt=new JS.Class("View.Voxels.Dirt",View.Voxels.Base,{extend:{initialize:function(){this.hasOwnProperty("material")===!1&&(this.material=new THREE.MeshBasicMaterial({map:new THREE.ImageUtils.loadTexture(ASSETS_DIR+"/dirt.jpg")}));if(this.hasOwnProperty("geometriesPacks")===!1){var a=this.material;this.geometriesPacks=Helpers.generateBlockGeometries([a,a,a,a,a,a])}}},initialize:function(){this.callSuper()}});var Main=new JS.Singleton("Main",{node:function(){console.log("Node code running.")},browser:function(){function a(){var a=j.getPosition(),b=j.getPitchOrientation(),c=(new Value3).copy(a);c.x-=Math.sin(b)*50,c.y+=50,c.z-=Math.cos(b)*50,i.setPosition(c),i.lookAt(a)}function b(b){j.moveFront(b),a()}function c(b){j.moveBack(b),a()}function d(b){j.moveLeft(b),a()}function e(b){j.moveRight(b),a()}function f(b){j.setPitchOrientation(j.getPitchOrientation()+b),a()}function g(b){j.setPitchOrientation(j.getPitchOrientation()-b),a()}var h=new View.Apis;h.activateAxes(),h.activateLights();var i=h.createCamera(),j=h.createCharacter(View.Characters.Cube),k=10,l=1;for(var m=0;m<k;++m)for(var n=0;n<l;++n)for(var o=0;o<k;++o){var p=n===l-1?View.Voxels.Grass:View.Voxels.Dirt;h.setVoxelType(new Value3(m,n,o),p)}var q=100,r=Math.PI/2;a(),Helpers.requestAnimationLoop(function(a){var i=a*q;Systems.Keyboard.check(Systems.Keyboard.KEY_Z)&&b(i),Systems.Keyboard.check(Systems.Keyboard.KEY_S)&&c(i),Systems.Keyboard.check(Systems.Keyboard.KEY_Q)&&d(i),Systems.Keyboard.check(Systems.Keyboard.KEY_D)&&e(i);var j=a*r;Systems.Keyboard.check(Systems.Keyboard.KEY_A)&&f(j),Systems.Keyboard.check(Systems.Keyboard.KEY_E)&&g(j),Systems.Display.render(h)}),console.log("Browser code running.")},initialize:function(){var a=this;Helpers.ifNodeContext(function(){a.node()}),Helpers.ifBrowserContext(function(){window.addEventListener("load",function(){a.browser()},!1)})}});