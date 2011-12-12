/**
 * JS.Class: Ruby-style JavaScript
 * http://jsclass.jcoglan.com
 * Copyright (c) 2007-2011 James Coglan and contributors
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * Parts of the Software build on techniques from the following open-source
 * projects:
 * 
 * * The Prototype framework, (c) 2005-2010 Sam Stephenson (MIT license)
 * * Alex Arnell's Inheritance library, (c) 2006 Alex Arnell (MIT license)
 * * Base, (c) 2006-2010 Dean Edwards (MIT license)
 * 
 * The Software contains direct translations to JavaScript of these open-source
 * Ruby libraries:
 * 
 * * Ruby standard library modules, (c) Yukihiro Matsumoto and contributors (Ruby license)
 * * Test::Unit, (c) 2000-2003 Nathaniel Talbott (Ruby license)
 * * Context, (c) 2008 Jeremy McAnally (MIT license)
 * * EventMachine::Deferrable, (c) 2006-07 Francis Cianfrocca (Ruby license)
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function() {
  var $ = (typeof this.global === 'object') ? this.global : this;
  $.JS = $.JS || {};
  JS.ENV = $;
})();

JS.Package = function(loader) {
  var Set = JS.Package.OrderedSet;
  JS.Package._index(this);
  
  this._loader    = loader;
  this._names     = new Set();
  this._deps      = new Set();
  this._uses      = new Set();
  this._styles    = new Set();
  this._observers = {};
  this._events    = {};
};

(function(klass) {
  klass.displayName = 'Package';
  klass.toString = function() { return klass.displayName };
  
  klass.log = function(message) {
    if (typeof window === 'undefined') return;
    if (typeof window.runtime === 'object') window.runtime.trace(message);
    if (window.console && console.info) console.info(message);
  };
  
  //================================================================
  // Ordered list of unique elements, for storing dependencies
  
  var Set = klass.OrderedSet = function(list) {
    this._members = this.list = [];
    this._index = {};
    if (!list) return;
    
    for (var i = 0, n = list.length; i < n; i++)
      this.push(list[i]);
  };

  Set.prototype.push = function(item) {
    var key   = (item.id !== undefined) ? item.id : item,
        index = this._index;
    
    if (index.hasOwnProperty(key)) return;
    index[key] = this._members.length;
    this._members.push(item);
  };
  
  //================================================================
  // Wrapper for deferred values
  
  var Deferred = klass.Deferred = function() {
    this._status    = 'deferred';
    this._value     = null;
    this._callbacks = [];
  };
  
  Deferred.prototype.callback = function(callback, context) {
    if (this._status === 'succeeded') callback.call(context, this._value);
    else this._callbacks.push([callback, context]);
  };
  
  Deferred.prototype.succeed = function(value) {
    this._status = 'succeeded';
    this._value  = value;
    var callback;
    while (callback = this._callbacks.shift())
      callback[0].call(callback[1], value);
  };
  
  //================================================================
  // Environment settings
  
  klass.ENV = JS.ENV;
  
  if ((this.document || {}).getElementsByTagName) {
    var script = document.getElementsByTagName('script')[0];
    klass._isIE = (script.readyState !== undefined);
  }
  
  klass.onerror = function(e) { throw e };
  
  klass._throw = function(message) {
    klass.onerror(new Error(message));
  };
  
  
  //================================================================
  // Configuration methods, called by the DSL
  
  var instance = klass.prototype,
      
      methods = [['requires', '_deps'],
                 ['uses',     '_uses'],
                 ['styling',  '_styles']],
      
      i = methods.length;
  
  while (i--)
    (function(pair) {
      var method = pair[0], list = pair[1];
      instance[method] = function() {
        var n = arguments.length, i;
        for (i = 0; i < n; i++) this[list].push(arguments[i]);
        return this;
      };
    })(methods[i]);
  
  instance.provides = function() {
    var n = arguments.length, i;
    for (i = 0; i < n; i++) {
      this._names.push(arguments[i]);
      klass._getFromCache(arguments[i]).pkg = this;
    }
    return this;
  };
  
  instance.setup = function(block) {
    this._onload = block;
    return this;
  };
  
  //================================================================
  // Event dispatchers, for communication between packages
  
  instance._on = function(eventType, block, context) {
    if (this._events[eventType]) return block.call(context);
    var list = this._observers[eventType] = this._observers[eventType] || [];
    list.push([block, context]);
    this._load();
  };
  
  instance._fire = function(eventType) {
    if (this._events[eventType]) return false;
    this._events[eventType] = true;
    
    var list = this._observers[eventType];
    if (!list) return true;
    delete this._observers[eventType];
    
    for (var i = 0, n = list.length; i < n; i++)
      list[i][0].call(list[i][1]);
    
    return true;
  };
  
  //================================================================
  // Loading frontend and other miscellany
  
  instance._isLoaded = function(withExceptions) {
    if (!withExceptions && this.__isLoaded !== undefined) return this.__isLoaded;
    
    var names = this._names.list,
        i     = names.length,
        name, object;
    
    while (i--) { name = names[i];
      object = klass._getObject(name, this._exports);
      if (object !== undefined) continue;
      if (withExceptions)
        return klass._throw('Expected package at ' + this._loader + ' to define ' + name);
      else
        return this.__isLoaded = false;
    }
    return this.__isLoaded = true;
  };
  
  instance._load = function() {
    if (!this._fire('request')) return;
    this._prefetch();
    
    var allDeps = this._deps.list.concat(this._uses.list),
        i = allDeps.length;
    
    klass.when({load: allDeps});
    
    klass.when({complete: this._deps.list}, function() {
      klass.when({complete: allDeps, load: [this]}, function() {
        this._fire('complete');
      }, this);
      
      var self = this, fireOnLoad = function(exports) {
        self._exports = exports;
        if (self._onload) self._onload();
        self._isLoaded(true);
        self._fire('load');
      };
      
      if (this._isLoaded()) {
        this._fire('download');
        return this._fire('load');
      }
      
      if (this._loader === undefined)
        return klass._throw('No load path found for ' + this._names.list[0]);
      
      typeof this._loader === 'function'
            ? this._loader(fireOnLoad)
            : klass.Loader.loadFile(this._loader, fireOnLoad, this._source);
      
      if (!klass.Loader.loadStyle) return;
      
      var styles = this._styles.list,
          i      = styles.length;
      
      while (i--) klass.Loader.loadStyle(styles[i]);
      
      this._fire('download');
    }, this);
  };
  
  instance._prefetch = function() {
    if (typeof this._loader !== 'string' ||!klass.Loader.fetch) return;
    this._source = this._source ||
                   klass.Loader.fetch(this._loader);
  };
  
  instance.toString = function() {
    return 'Package:' + this._names.list.join(',');
  };
  
  //================================================================
  // Class-level event API, handles group listeners
  
  klass.when = function(eventTable, block, context) {
    var eventList = [], objects = {}, event, packages, i;
    for (event in eventTable) {
      if (!eventTable.hasOwnProperty(event)) continue;
      objects[event] = [];
      packages = new klass.OrderedSet(eventTable[event]);
      i = packages.list.length;
      while (i--) eventList.push([event, packages.list[i], i]);
    }
    
    var waiting = i = eventList.length;
    if (waiting === 0) return block && block.call(context, objects);
    
    while (i--)
      (function(event) {
        var pkg = klass._getByName(event[1]);
        pkg._on(event[0], function() {
          objects[event[0]][event[2]] = klass._getObject(event[1], pkg._exports);
          waiting -= 1;
          if (waiting === 0 && block) block.call(context, objects);
        });
      })(eventList[i]);
  };
  
  //================================================================
  // Indexes for fast lookup by path and name, and assigning IDs
  
  klass._autoIncrement = 1;
  klass._indexByPath = {};
  klass._indexByName = {};
  klass._autoloaders = [];
  
  klass._index = function(pkg) {
    pkg.id = this._autoIncrement;
    this._autoIncrement += 1;
  };
  
  klass._getByPath = function(loader) {
    var path = loader.toString();
    return this._indexByPath[path] = this._indexByPath[path] || new this(loader);
  };
  
  klass._getByName = function(name) {
    if (typeof name !== 'string') return name;
    var cached = this._getFromCache(name);
    if (cached.pkg) return cached.pkg;
    
    var autoloaded = this._manufacture(name);
    if (autoloaded) return autoloaded;
    
    var placeholder = new this();
    placeholder.provides(name);
    return placeholder;
  };
  
  klass.remove = function(name) {
    var pkg = this._getByName(name);
    delete this._indexByName[name];
    delete this._indexByPath[pkg._loader];
  };
  
  //================================================================
  // Auotloading API, generates packages from naming patterns
  
  klass._autoload = function(pattern, options) {
    this._autoloaders.push([pattern, options]);
  };
  
  klass._manufacture = function(name) {
    var autoloaders = this._autoloaders,
        n = autoloaders.length,
        i, autoloader, path;
    
    for (i = 0; i < n; i++) {
      autoloader = autoloaders[i];
      if (!autoloader[0].test(name)) continue;
      
      path = autoloader[1].from + '/' +
             name.replace(/([a-z])([A-Z])/g, function(m,a,b) { return a + '_' + b })
                 .replace(/\./g, '/')
                 .toLowerCase() + '.js';
      
      var pkg = new this(path);
      pkg.provides(name);
      
      if (path = autoloader[1].require)
        pkg.requires(name.replace(autoloader[0], path));
      
      return pkg;
    }
    return null;
  };
  
  //================================================================
  // Cache for named packages and runtime objects
  
  klass._getFromCache = function(name) {
    return this._indexByName[name] = this._indexByName[name] || {};
  };
  
  klass._getObject = function(name, rootObject) {
    if (typeof name !== 'string') return undefined;
    
    var cached = rootObject ? {} : this._getFromCache(name);
    if (cached.obj !== undefined) return cached.obj;
    
    var object = rootObject || this.ENV,
        parts  = name.split('.'), part;
    
    while (part = parts.shift()) object = object && object[part];
    
    if (rootObject && object === undefined)
      return this._getObject(name);
    
    return cached.obj = object;
  };
  
})(JS.Package);


JS.Package.DomLoader = {
  HOST_REGEX: /^https?\:\/\/[^\/]+/i,
  
  usable: function() {
    return !!JS.Package._getObject('window.document.getElementsByTagName');
  },
  
  __FILE__: function() {
    var scripts = document.getElementsByTagName('script');
        src     = scripts[scripts.length - 1].src,
        url     = window.location.href;
    
    if (/^\w+\:\/\//.test(src)) return src;
    if (/^\//.test(src)) return window.location.origin + src;
    return url.replace(/[^\/]*$/g, '') + src;
  },
  
  cacheBust: function(path) {
    var token = new Date().getTime();
    return path + (/\?/.test(path) ? '&' : '?') + token;
  },
  
  fetch: function(path) {
    if (JS.cacheBust) path = this.cacheBust(path);
    
    this.HOST = this.HOST || this.HOST_REGEX.exec(window.location.href);
    var host = this.HOST_REGEX.exec(path);
    
    if (!this.HOST || (host && host[0] !== this.HOST[0])) return null;
    JS.Package.log('Loading ' + path);
    
    var source = new JS.Package.Deferred(),
        self   = this,
        xhr    = window.ActiveXObject
               ? new ActiveXObject("Microsoft.XMLHTTP")
               : new XMLHttpRequest();
    
    xhr.open('GET', path, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;
      xhr.onreadystatechange = self._K;
      source.succeed(xhr.responseText);
      xhr = null;
    };
    xhr.send(null);
    return source;
  },
  
  loadFile: function(path, fireCallbacks, source) {
    if (JS.cacheBust && !source) path = this.cacheBust(path);
    
    var self   = this,
        head   = document.getElementsByTagName('head')[0],
        script = document.createElement('script');
    
    script.type = 'text/javascript';
    
    if (source)
      return source.callback(function(code) {
        JS.Package.log('Executing ' + path);
        head.appendChild(script);
        script.text = code;
        fireCallbacks();
      });
    
    JS.Package.log('Loading and executing ' + path);
    script.src = path;
    
    script.onload = script.onreadystatechange = function() {
      var state = script.readyState, status = script.status;
      if ( !state || state === 'loaded' || state === 'complete' ||
           (state === 4 && status === 200) ) {
        fireCallbacks();
        script.onload = script.onreadystatechange = self._K;
        head   = null;
        script = null;
      }
    };
    head.appendChild(script);
  },
  
  loadStyle: function(path) {
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = path;
    
    document.getElementsByTagName('head')[0].appendChild(link);
  },
  
  _K: function() {}
};


JS.Package.Loader = JS.Package.DomLoader;


JS.Package.DSL = {
  __FILE__: function() {
    return JS.Package.Loader.__FILE__();
  },
  
  pkg: function(name, path) {
    var pkg = path
        ? JS.Package._getByPath(path)
        : JS.Package._getByName(name);
    pkg.provides(name);
    return pkg;
  },
  
  file: function(path) {
    return JS.Package._getByPath(path);
  },
  
  load: function(path, fireCallbacks) {
    JS.Package.Loader.loadFile(path, fireCallbacks);
  },
  
  autoload: function(pattern, options) {
    JS.Package._autoload(pattern, options);
  }
};

JS.Package.DSL.loader = JS.Package.DSL.file;

JS.Packages = function(declaration) {
  declaration.call(JS.Package.DSL);
};

JS.cacheBust = false;

JS.load = function(url, callback) {
  JS.Package.Loader.loadFile(url, function() {
    if (typeof callback === 'function') callback();
  });
  return this;
};
 
JS.require = function() {
  var requirements = [], i = 0;
  
  while (typeof arguments[i] === 'string'){
    requirements.push(arguments[i]);
    i += 1;
  }
  var callback = arguments[i], context = arguments[i+1];
  
  JS.Package.when({complete: requirements}, function(objects) {
    if (!callback) return;
    callback.apply(context || null, objects && objects.complete);
  });
  
  return this;
};

/**
 * JS.Class: Ruby-style JavaScript
 * http://jsclass.jcoglan.com
 * Copyright (c) 2007-2011 James Coglan and contributors
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * Parts of the Software build on techniques from the following open-source
 * projects:
 * 
 * * The Prototype framework, (c) 2005-2010 Sam Stephenson (MIT license)
 * * Alex Arnell's Inheritance library, (c) 2006 Alex Arnell (MIT license)
 * * Base, (c) 2006-2010 Dean Edwards (MIT license)
 * 
 * The Software contains direct translations to JavaScript of these open-source
 * Ruby libraries:
 * 
 * * Ruby standard library modules, (c) Yukihiro Matsumoto and contributors (Ruby license)
 * * Test::Unit, (c) 2000-2003 Nathaniel Talbott (Ruby license)
 * * Context, (c) 2008 Jeremy McAnally (MIT license)
 * * EventMachine::Deferrable, (c) 2006-07 Francis Cianfrocca (Ruby license)
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function() {
  var $ = (typeof this.global === 'object') ? this.global : this;
  $.JS = $.JS || {};
  JS.ENV = $;
})();

JS.END_WITHOUT_DOT = /([^\.])$/;

JS.array = function(enumerable) {
  var array = [], i = enumerable.length;
  while (i--) array[i] = enumerable[i];
  return array;
};

JS.bind = function(method, object) {
  return function() {
    return method.apply(object, arguments);
  };
};

JS.extend = function(destination, source, overwrite) {
  if (!destination || !source) return destination;
  for (var field in source) {
    if (destination[field] === source[field]) continue;
    if (overwrite === false && destination.hasOwnProperty(field)) continue;
    destination[field] = source[field];
  }
  return destination;
};

JS.indexOf = function(list, item) {
  if (list.indexOf) return list.indexOf(item);
  var i = list.length;
  while (i--) {
    if (list[i] === item) return i;
  }
  return -1;
};

JS.isType = function(object, type) {
  if (typeof type === 'string')
    return typeof object === type;
  
  if (object === null || object === undefined)
    return false;
  
  return (typeof type === 'function' && object instanceof type) ||
         (object.isA && object.isA(type)) ||
         object.constructor === type;
};

JS.makeBridge = function(parent) {
  var bridge = function() {};
  bridge.prototype = parent.prototype;
  return new bridge();
};

JS.makeClass = function(parent) {
  parent = parent || Object;
  
  var constructor = function() {
    return this.initialize
         ? this.initialize.apply(this, arguments) || this
         : this;
  };
  constructor.prototype = JS.makeBridge(parent);
  
  constructor.superclass = parent;
  
  constructor.subclasses = [];
  if (parent.subclasses) parent.subclasses.push(constructor);
  
  return constructor;
};

JS.match = function(category, object) {
  if (object === undefined) return false;
  return typeof category.test === 'function'
       ? category.test(object)
       : category.match(object);
};


JS.Method = JS.makeClass();

JS.extend(JS.Method.prototype, {
  initialize: function(module, name, callable) {
    this.module   = module;
    this.name     = name;
    this.callable = callable;
    
    this._words = {};
    if (typeof callable !== 'function') return;
    
    this.arity  = callable.length;
    
    var matches = callable.toString().match(/\b[a-z\_\$][a-z0-9\_\$]*\b/ig),
        i       = matches.length;
    
    while (i--) this._words[matches[i]] = true;
  },
  
  setName: function(name) {
    this.callable.displayName =
    this.displayName = name;
  },
  
  contains: function(word) {
    return this._words.hasOwnProperty(word);
  },
  
  call: function() {
    return this.callable.call.apply(this.callable, arguments);
  },
  
  apply: function(receiver, args) {
    return this.callable.apply(receiver, args);
  },
  
  compile: function(environment) {
    var method     = this,
        trace      = method.module.__trace__ || environment.__trace__,
        callable   = method.callable,
        words      = method._words,
        allWords   = JS.Method._keywords,
        i          = allWords.length,
        keywords   = [],
        keyword;
    
    while  (i--) {
      keyword = allWords[i];
      if (words[keyword.name]) keywords.push(keyword);
    }
    if (keywords.length === 0 && !trace) return callable;
    
    var compiled = function() {
      var N = keywords.length, j = N, previous = {}, keyword, existing, kwd;
      
      while (j--) {
        keyword  = keywords[j];
        existing = this[keyword.name];
        
        if (existing && !existing.__kwd__) continue;
        
        previous[keyword.name] = {
          _value: existing,
          _own:   this.hasOwnProperty(keyword.name)
        };
        kwd = keyword.filter(method, environment, this, arguments);
        kwd.__kwd__ = true;
        this[keyword.name] = kwd;
      }
      var returnValue = callable.apply(this, arguments),
          j = N;
      
      while (j--) {
        keyword = keywords[j];
        if (!previous[keyword.name]) continue;
        if (previous[keyword.name]._own)
          this[keyword.name] = previous[keyword.name]._value;
        else
          delete this[keyword.name];
      }
      return returnValue;
    };
    
    if (trace) return JS.StackTrace.wrap(compiled, method, environment);
    return compiled;
  },
  
  toString: function() {
    var name = this.displayName || (this.module.toString() + '#' + this.name);
    return '#<Method:' + name + '>';
  }
});

JS.Method.create = function(module, name, callable) {
  if (callable && callable.__inc__ && callable.__fns__)
    return callable;
  
  var method = (typeof callable !== 'function')
             ? callable
             : new this(module, name, callable);
  
  this.notify(method);
  return method;
};

JS.Method.compile = function(method, environment) {
  return method && method.compile
       ? method.compile(environment)
       : method;
};

JS.Method.__listeners__ = [];
  
JS.Method.added = function(block, context) {
  this.__listeners__.push([block, context]);
};
  
JS.Method.notify = function(method) {
  var listeners = this.__listeners__,
      i = listeners.length,
      listener;
  
  while (i--) {
    listener = listeners[i];
    listener[0].call(listener[1], method);
  }
};

JS.Method._keywords = [];

JS.Method.keyword = function(name, filter) {
  this._keywords.push({name: name, filter: filter});
};

JS.Method.tracing = function(classes, block, context) {
  JS.require('JS.StackTrace', function() {
    var logger = JS.StackTrace.logger,
        active = logger.active;
    
    classes = [].concat(classes);
    this.trace(classes);
    logger.active = true;
    block.call(context);
    
    this.untrace(classes);
    logger.active = active;
  }, this);
};

JS.Method.trace = function(classes) {
  var i = classes.length;
  while (i--) {
    classes[i].__trace__ = true;
    classes[i].resolve();
  }
};

JS.Method.untrace = function(classes) {
  var i = classes.length;
  while (i--) {
    classes[i].__trace__ = false;
    classes[i].resolve();
  }
};


JS.Module = JS.makeClass();
JS.Module.__queue__ = [];

JS.extend(JS.Module.prototype, {
  initialize: function(name, methods, options) {
    if (typeof name !== 'string') {
      options = arguments[1];
      methods = arguments[0];
      name    = undefined;
    }
    options = options || {};
    
    this.__inc__ = [];
    this.__dep__ = [];
    this.__fns__ = {};
    this.__tgt__ = options._target;
    this.__anc__ = null;
    this.__mct__ = {};
    
    this.setName(name);
    this.include(methods, {_resolve: false});
    
    if (JS.Module.__queue__)
      JS.Module.__queue__.push(this);
  },
  
  setName: function(name) {
    this.displayName = name || '';
    
    for (var field in this.__fns__)
      this.__name__(field);
    
    if (name && this.__meta__)
      this.__meta__.setName(name + '.');
  },
  
  __name__: function(name) {
    if (!this.displayName) return;
    
    var object = this.__fns__[name];
    if (!object) return;
    
    name = this.displayName.replace(JS.END_WITHOUT_DOT, '$1#') + name;
    if (typeof object.setName === 'function') return object.setName(name);
    if (typeof object === 'function') object.displayName = name;
  },
  
  define: function(name, callable, options) {
    var method  = JS.Method.create(this, name, callable),
        resolve = (options || {})._resolve;
    
    this.__fns__[name] = method;
    this.__name__(name);
    if (resolve !== false) this.resolve();
  },
  
  include: function(module, options) {
    if (!module) return this;
    
    var options = options || {},
        resolve = options._resolve !== false,
        extend  = module.extend,
        include = module.include,
        extended, field, value, mixins, i, n;
    
    if (module.__fns__ && module.__inc__) {
      this.__inc__.push(module);
      if ((module.__dep__ || {}).push) module.__dep__.push(this);
      
      if (extended = options._extended) {
        if (typeof module.extended === 'function')
          module.extended(extended);
      }
      else {
        if (typeof module.included === 'function')
          module.included(this);
      }
    }
    else {
      if (this.shouldIgnore('extend', extend)) {
        mixins = [].concat(extend);
        for (i = 0, n = mixins.length; i < n; i++)
          this.extend(mixins[i]);
      }
      if (this.shouldIgnore('include', include)) {
        mixins = [].concat(include);
        for (i = 0, n = mixins.length; i < n; i++)
          this.include(mixins[i], {_resolve: false});
      }
      for (field in module) {
        if (!module.hasOwnProperty(field)) continue;
        value = module[field];
        if (this.shouldIgnore(field, value)) continue;
        this.define(field, value, {_resolve: false});
      }
      if (module.hasOwnProperty('toString'))
        this.define('toString', module.toString, {_resolve: false});
    }
    
    if (resolve) this.resolve();
    return this;
  },
  
  alias: function(aliases) {
    for (var method in aliases) {
      if (!aliases.hasOwnProperty(method)) continue;
      this.define(method, this.instanceMethod(aliases[method]), {_resolve: false});
    }
    this.resolve();
  },
  
  resolve: function(host) {
    var host   = host || this,
        target = host.__tgt__,
        inc    = this.__inc__,
        fns    = this.__fns__,
        i, n, key, compiled;
    
    if (host === this) {
      this.__anc__ = null;
      this.__mct__ = {};
      i = this.__dep__.length;
      while (i--) this.__dep__[i].resolve();
    }
    
    if (!target) return;
    
    for (i = 0, n = inc.length; i < n; i++)
      inc[i].resolve(host);
    
    for (key in fns) {
      compiled = JS.Method.compile(fns[key], host);
      if (target[key] !== compiled) target[key] = compiled;
    }
    if (fns.hasOwnProperty('toString'))
      target.toString = JS.Method.compile(fns.toString, host);
  },
  
  shouldIgnore: function(field, value) {
    return (field === 'extend' || field === 'include') &&
           (typeof value !== 'function' ||
             (value.__fns__ && value.__inc__));
  },
  
  ancestors: function(list) {
    var cachable = !list,
        list     = list || [],
        inc      = this.__inc__;
        
    if (cachable && this.__anc__) return this.__anc__.slice();
    
    for (var i = 0, n = inc.length; i < n; i++)
      inc[i].ancestors(list);
    
    if (JS.indexOf(list, this) < 0)
      list.push(this);
    
    if (cachable) this.__anc__ = list.slice();
    return list;
  },
  
  lookup: function(name) {
    var cached = this.__mct__[name];
    if (cached && cached.slice) return cached.slice();
    
    var ancestors = this.ancestors(),
        methods   = [],
        fns;
    
    for (var i = 0, n = ancestors.length; i < n; i++) {
      fns = ancestors[i].__fns__;
      if (fns.hasOwnProperty(name)) methods.push(fns[name]);
    }
    this.__mct__[name] = methods.slice();
    return methods;
  },
  
  includes: function(module) {
    if (module === this) return true;
    
    var inc  = this.__inc__;
    
    for (var i = 0, n = inc.length; i < n; i++) {
      if (inc[i].includes(module))
        return true;
    }
    return false;
  },
  
  instanceMethod: function(name) {
    return this.lookup(name).pop();
  },
  
  instanceMethods: function(recursive, list) {
    var methods = list || [],
        fns     = this.__fns__,
        field;
    
    for (field in fns) {
      if (!JS.isType(this.__fns__[field], JS.Method)) continue;
      if (JS.indexOf(methods, field) >= 0) continue;
      methods.push(field);
    }
    
    if (recursive !== false) {
      var ancestors = this.ancestors(), i = ancestors.length;
      while (i--) ancestors[i].instanceMethods(false, methods);
    }
    return methods;
  },
  
  match: function(object) {
    return object && object.isA && object.isA(this);
  },
  
  toString: function() {
    return this.displayName;
  }
});


JS.Kernel = new JS.Module('Kernel', {
  __eigen__: function() {
    if (this.__meta__) return this.__meta__;
    var name = this.toString() + '.';
    this.__meta__ = new JS.Module(name, null, {_target: this});
    return this.__meta__.include(this.klass, {_resolve: false});
  },
  
  equals: function(other) {
    return this === other;
  },
  
  extend: function(module, options) {
    var resolve = (options || {})._resolve;
    this.__eigen__().include(module, {_extended: this, _resolve: resolve});
    return this;
  },
  
  hash: function() {
    return JS.Kernel.hashFor(this);
  },
  
  isA: function(module) {
    return (typeof module === 'function' && this instanceof module) ||
           this.__eigen__().includes(module);
  },
  
  method: function(name) {
    var cache = this.__mct__ = this.__mct__ || {},
        value = cache[name],
        field = this[name];
    
    if (typeof field !== 'function') return field;
    if (value && field === value._value) return value._bound;
    
    var bound = JS.bind(field, this);
    cache[name] = {_value: field, _bound: bound};
    return bound;
  },
  
  methods: function() {
    return this.__eigen__().instanceMethods();
  },
  
  tap: function(block, context) {
    block.call(context || null, this);
    return this;
  },
  
  toString: function() {
    if (this.displayName) return this.displayName;
    var name = this.klass.displayName || this.klass.toString();
    return '#<' + name + ':' + this.hash() + '>';
  }
});

(function() {
  var id = 1;
  
  JS.Kernel.hashFor = function(object) {
    if (object.__hash__ !== undefined) return object.__hash__;
    object.__hash__ = (new Date().getTime() + id).toString(16);
    id += 1;
    return object.__hash__;
  };
})();


JS.Class = JS.makeClass(JS.Module);

JS.extend(JS.Class.prototype, {
  initialize: function(name, parent, methods, options) {
    if (typeof name !== 'string') {
      options = arguments[2];
      methods = arguments[1];
      parent  = arguments[0];
      name    = undefined;
    }
    if (typeof parent !== 'function') {
      options = methods;
      methods = parent;
      parent  = Object;
    }
    JS.Module.prototype.initialize.call(this, name);
    options = options || {};
    
    var klass = JS.makeClass(parent);
    JS.extend(klass, this);
    
    klass.prototype.constructor =
    klass.prototype.klass = klass;
    
    klass.__eigen__().include(parent.__meta__, {_resolve: options._resolve});
    klass.setName(name);
    
    klass.__tgt__ = klass.prototype;
    
    var parentModule = (parent === Object)
                     ? {}
                     : (parent.__fns__ ? parent : new JS.Module(parent.prototype, {_resolve: false}));
    
    klass.include(JS.Kernel,    {_resolve: false})
         .include(parentModule, {_resolve: false})
         .include(methods,      {_resolve: false});
    
    if (options._resolve !== false) klass.resolve();
    
    if (typeof parent.inherited === 'function')
      parent.inherited(klass);
    
    return klass;
  }
});


(function() {
  var methodsFromPrototype = function(klass) {
    var methods = {},
        proto   = klass.prototype;
    
    for (var field in proto) {
      if (!proto.hasOwnProperty(field)) continue;
      methods[field] = JS.Method.create(klass, field, proto[field]);
    }
    return methods;
  };
  
  var classify = function(name, parentName) {
    var klass  = JS[name],
        parent = JS[parentName];
    
    klass.__inc__ = [];
    klass.__dep__ = [];
    klass.__fns__ = methodsFromPrototype(klass);
    klass.__tgt__ = klass.prototype;
    
    klass.prototype.constructor =
    klass.prototype.klass = klass;
    
    JS.extend(klass, JS.Class.prototype);
    klass.include(parent || JS.Kernel);
    klass.setName(name);
    
    klass.constructor = klass.klass = JS.Class;
  };
  
  classify('Method');
  classify('Module');
  classify('Class', 'Module');
  
  var eigen = JS.Kernel.instanceMethod('__eigen__');
  
  eigen.call(JS.Method);
  eigen.call(JS.Module);
  eigen.call(JS.Class).include(JS.Module.__meta__);
})();

JS.NotImplementedError = new JS.Class('NotImplementedError', Error);


JS.Method.keyword('callSuper', function(method, env, receiver, args) {
  var methods    = env.lookup(method.name),
      stackIndex = methods.length - 1,
      params     = JS.array(args);
  
  return function() {
    var i = arguments.length;
    while (i--) params[i] = arguments[i];
    
    stackIndex -= 1;
    var returnValue = methods[stackIndex].apply(receiver, params);
    stackIndex += 1;
    
    return returnValue;
  };
});

JS.Method.keyword('blockGiven', function(method, env, receiver, args) {
  var block = Array.prototype.slice.call(args, method.arity),
      hasBlock = (typeof block[0] === 'function');
  
  return function() { return hasBlock };
});

JS.Method.keyword('yieldWith', function(method, env, receiver, args) {
  var block = Array.prototype.slice.call(args, method.arity);
  
  return function() {
    if (typeof block[0] !== 'function') return;
    return block[0].apply(block[1] || null, arguments);
  };
});


JS.Interface = new JS.Class('Interface', {
  initialize: function(methods) {
    this.test = function(object, returnName) {
      var n = methods.length;
      while (n--) {
        if (typeof object[methods[n]] !== 'function')
          return returnName ? methods[n] : false;
      }
      return true;
    };
  },
  
  extend: {
    ensure: function() {
      var args = JS.array(arguments), object = args.shift(), face, result;
      while (face = args.shift()) {
        result = face.test(object, true);
        if (result !== true) throw new Error('object does not implement ' + result + '()');
      }
    }
  }
});


JS.Singleton = new JS.Class('Singleton', {
  initialize: function(name, parent, methods) {
    return new (new JS.Class(name, parent, methods));
  }
});

//!provides:Helper

global.Helper = { };


//!requires:Helper
//!provides:Helper.ifNodeContext

Helper.ifNodeContext = function ( fn ) {
	
	if ( typeof ( process ) !== 'undefined' ) {
		
		fn( );
		
	}
	
};


//!requires:Helper
//!provides:Helper.ifBrowserContext

Helper.ifBrowserContext = function ( fn ) {
	
	if ( typeof ( window ) !== 'undefined' ) {
		
		fn( );
		
	}
	
};


//!provides:Browser
// 
//!requires:JS.Class
// 
//!uses:System.Display
//!uses:Helper.requestAnimationFrame
// 
//!uses:Game.Test

global.Browser = new JS.Class('Browser', {
	
	initialize : function ( ) {
		
		var game = new Game.Test( );
		
		Helper.requestAnimationFrame(function ( ) {
			
//			System.Display.render( game.view );
			
		});
		
	}
	
});


//!provides:System

global.System = { };


//!requires:System
//!provides:System.Display
// 
//!requires:JS.Singleton
//!requires:Helper.ifBrowserContext

Helper.ifBrowserContext(function ( ) {
	
	System.Display = new JS.Singleton('Systems.Display', {
		
		initialize: function ( ) {
			
			this.renderer = new THREE.WebGLRenderer( );
			
			var domElement = this.renderer.domElement;
			domElement.style.position = 'absolute';
			domElement.style.top = domElement.style.left = '0';
			
			var that = this;
			
			var updateSize = function ( ) {
				
				that.size = [ window.innerWidth, window.innerHeight ];
				
				that.renderer.setSize( window.innerWidth, window.innerHeight );
				
			};
			
			window.addEventListener('resize', function ( ) {
				
				updateSize( );
				
			}, false );
			
			window.addEventListener('load', function ( ) {
				
				window.document.body.appendChild( domElement );
				
			}, false);
			
			updateSize( );
		},
		
		render: function ( view ) {
			
			var size = this.size;
			
			view.renderOn( this.renderer, size[ 0 ], size[ 1 ] );
			
		}
		
	});
	
});


//!requires:Helper
//!provides:Helper.requestAnimationFrame

Helper.requestAnimationFrame = function ( fn ) {
	
	var time = + new Date( );
	
	Helper.requestAnimationFrame.gate.call( window, function ( ) {
		
		fn( ( new Date( ) - time ) / 1000 );
		
	});
	
};

Helper.requestAnimationFrame.gate = (function ( ) {
	
	var gate = function ( fn ) { return this.setTimeout( fn, 1000 / 60 ); };
	
	if ( typeof ( window ) === 'object' ) {
		
		var prefixes = [ '', 'moz', 'webkit', 'ms', 'o' ];
		
		for ( var x = 0, l = prefixes.length; x < l; ++ x ) {
			
			var crafted = prefixes[ x ];
			
			if ( crafted.length ) {
				
				crafted += 'RequestAnimationFrame';
				
			} else {
				
				crafted = 'requestAnimationFrame';
				
			}
			
			if ( window[ crafted ] ) {
				
				gate = window[ crafted ];
				
				break ;
				
			}
			
		}
		
	}
	
	return gate;
		
}( ));


//!provides:Game

global.Game = { };


//!provides:Game
//!provides:Game.Base
// 
//!requires:JS.Class

Game.Base = new JS.Class({
	
	initialize: function () {
		
		this.client = null;
		
		this.server = null;
		
	}
	
});


//!requires:Game
//!provides:Game.Test
//!requires:Game.Base
// 
//!requires:JS.Class
// 
//!uses:Client.Local
//!uses:Server.Local

Game.Test = new JS.Class('Game.Test', Game.Base, {
	
	initialize: function () {
		
		this.callSuper();
		
		this.server = new Server.Local();
		this.server.bootstrap( );
		
		this.client = new Client.Local( this.server );
		
	}
	
});


//!provides:Client

global.Client = { };


//!requires:Client
//!provides:Client.Base
// 
//!requires:JS.Class
// 
//!uses:View.Apis

global.Client = new JS.Class('Client', {
	
	initialize: function () {
		
		this.pipeline = null;
		
		this.view = new View.Apis();
		
	}
	
});


//!provides:View

global.View = { };


//!provides:quickfix
// todo : remove it

if (typeof (THREE) !== 'undefined') {

THREE.GeometryUtils.merge = function ( geometry1, object2 /* object3D | geometry */, recursive ) {

		var undefined,
		geometry2 = object2 instanceof THREE.Geometry ? object2 : object2.geometry,
		children2 = object2 instanceof THREE.Object3D ? object2.children : undefined;

		var i, il, j, jl;

		if ( object2 instanceof THREE.Object3D ) {

			object2.updateMatrixWorld( true );

		}

		if ( geometry2 !== undefined ) {

			var matrix, matrixRotation,
			vertexOffset = geometry1.vertices.length,
			uvPosition = geometry1.faceVertexUvs[ 0 ].length,
			vertices1 = geometry1.vertices,
			vertices2 = geometry2.vertices,
			faces1 = geometry1.faces,
			faces2 = geometry2.faces,
			uvs1 = geometry1.faceVertexUvs[ 0 ],
			uvs2 = geometry2.faceVertexUvs[ 0 ];

			var geo1MaterialsMap = {};

			for ( i = 0; i < geometry1.materials.length; ++ i ) {

				var id = geometry1.materials[ i ].id;

				geo1MaterialsMap[ id ] = i;

			}

			if ( object2 instanceof THREE.Mesh ) {

				matrix = object2.matrixWorld;
				matrixRotation = new THREE.Matrix4();
				matrixRotation.extractRotation( matrix, object2.scale );

			}

			// vertices

			for ( i = 0, il = vertices2.length; i < il; ++ i ) {

				var vertex = vertices2[ i ];

				var vertexCopy = new THREE.Vertex( vertex.position.clone() );

				if ( matrix ) matrix.multiplyVector3( vertexCopy.position );

				vertices1.push( vertexCopy );

			}

			// faces

			for ( i = 0, il = faces2.length; i < il; ++ i ) {

				var face = faces2[ i ], faceCopy, normal, color,
				faceVertexNormals = face.vertexNormals,
				faceVertexColors = face.vertexColors;

				if ( face instanceof THREE.Face3 ) {

					faceCopy = new THREE.Face3( face.a + vertexOffset, face.b + vertexOffset, face.c + vertexOffset );

				} else if ( face instanceof THREE.Face4 ) {

					faceCopy = new THREE.Face4( face.a + vertexOffset, face.b + vertexOffset, face.c + vertexOffset, face.d + vertexOffset );

				}

				faceCopy.normal.copy( face.normal );

				if ( matrixRotation ) matrixRotation.multiplyVector3( faceCopy.normal );

				for ( j = 0, jl = faceVertexNormals.length; j < jl; ++ j ) {

					normal = faceVertexNormals[ j ].clone();

					if ( matrixRotation ) matrixRotation.multiplyVector3( normal );

					faceCopy.vertexNormals.push( normal );

				}

				faceCopy.color.copy( face.color );

				for ( j = 0, jl = faceVertexColors.length; j < jl; ++ j ) {

					color = faceVertexColors[ j ];
					faceCopy.vertexColors.push( color.clone() );

				}

				if ( face.materialIndex !== undefined ) {

					var material2 = geometry2.materials[ face.materialIndex ];
					var materialId2 = material2.id;

					var materialIndex = geo1MaterialsMap[ materialId2 ];

					if ( materialIndex === undefined ) {

						materialIndex = geometry1.materials.length;
						geometry1.materials.push( material2 );

					}

					faceCopy.materialIndex = materialIndex;

				}

				faceCopy.centroid.copy( face.centroid );
				if ( matrix ) matrix.multiplyVector3( faceCopy.centroid );

				faces1.push( faceCopy );

			}

			// uvs

			for ( i = 0, il = uvs2.length; i < il; ++ i ) {

				var uv = uvs2[ i ], uvCopy = [];

				for ( j = 0, jl = uv.length; j < jl; ++ j ) {

					uvCopy.push( new THREE.UV( uv[ j ].u, uv[ j ].v ) );

				}

				uvs1.push( uvCopy );

			}

		}

		if ( recursive === true && children2 !== undefined ) {

			for ( i = 0, il = children2.length; i < il; ++ i ) {

				this.merge( geometry1, children2[ i ] );

			}

		}

	};

}


//!requires:View
//!provides:View.Details
//
//!requires:JS.Module
//!requires:quickfix
// 
//!uses:Value3

View.Details = new JS.Class('View.Details', {
	
	initialize: function () {
		
		this.scene = new THREE.Scene();
		
		this.cameras = [];
		
		this.voxels = {};
		
		this.pendingVoxels = {};
		
		this.voxelGeometry = null;
		
		this.voxelEntity = null;
		
	},
	
	refreshVoxelFaces: function (point) {
		
		var that = this;
		
		var voxels = this.voxels;
		
		var copy = new Value3();
		
		var refreshCoordFaces = function (x, y, z) {
			
			copy.set(point.x + x, point.y + y, point.z + z);
			
			if (voxels.hasOwnProperty(copy)) {
				
				voxels[copy].setFaces(that.getVoxelFaces(copy));
				
			}
			
		};
		
		refreshCoordFaces(00, 0, 0);
		
		refreshCoordFaces(+1, 0, 0);
		refreshCoordFaces(-1, 0, 0);
		
		refreshCoordFaces(0, +1, 0);
		refreshCoordFaces(0, -1, 0);
		
		refreshCoordFaces(0, +1, 0);
		refreshCoordFaces(0, -1, 0);
		
	},
	
	getVoxelFaces: function (point) {
		
		var voxels = this.voxels;
		
		var copy = new Value3();
		
		return {
			
			px: !voxels.hasOwnProperty(copy.add(point, { x: +1, y: 0, z: 0 })),
			nx: !voxels.hasOwnProperty(copy.add(point, { x: -1, y: 0, z: 0 })),
			
			py: !voxels.hasOwnProperty(copy.add(point, { x: 0, y: +1, z: 0 })),
			ny: !voxels.hasOwnProperty(copy.add(point, { x: 0, y: -1, z: 0 })),
			
			pz: !voxels.hasOwnProperty(copy.add(point, { x: 0, y: 0, z: +1 })),
			nz: !voxels.hasOwnProperty(copy.add(point, { x: 0, y: 0, z: -1 }))
			
		};
		
	},
	
	finishPendingVoxels: function () {
		
		var voxels = this.voxels;
		
		var pendings = this.pendingVoxels;
		
		this.pendingVoxels = {};
		
		for (var x in pendings) {
			
			if (pendings.hasOwnProperty(x)) {
				
				var voxel = voxels[x];
				
				var pending = pendings[x];
				
				voxel.setFaces(this.getVoxelFaces(pending));
				
				voxel.setVoxelPosition(pending);
				
			}
			
		}
		
	},
	
	buildVoxelGeometry: function () {
		
		var voxels = this.voxels;
		
		var geometry = this.voxelGeometry = new THREE.Geometry();
		
		for (var x in voxels) {
			
			if (voxels.hasOwnProperty(x)) {
				
				var voxel = voxels[x];
				
				var mesh = voxel.object3D;
				
				if (mesh) {
					
					THREE.GeometryUtils.merge(geometry, mesh, true);
					
				}
				
			}
			
		}
		
	},
	
	buildVoxelEntity: function () {
		
		this.voxelEntity && this.scene.remove(this.voxelEntity);
		
		this.voxelEntity = new THREE.Mesh(this.voxelGeometry, new THREE.MeshFaceMaterial());
		
		this.scene.add(this.voxelEntity);
		
	}
	
});


//!provides:Value3

global.Value3 = new JS.Class({
	
	initialize: function (x, y, z) {
		
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
		
	},
	
	clone: function () {
		
		return new (this.klass)(this.x, this.y, this.z);
		
	},
	
	copy: function (c3) {
		
		this.x = c3.x;
		this.y = c3.y;
		this.z = c3.z;
		
		return this;
		
	},
	
	set: function (x, y, z) {
		
		this.x = x;
		this.y = y;
		this.z = z;
		
		return this;
		
	},
	
	setX: function (x) {
		
		this.x = x;
		
		return this;
		
	},
	
	setY: function (y) {
		
		this.y = y;
		
		return this;
		
	},
	
	setZ: function (z) {
		
		this.z = z;
		
		return this;
		
	},
	
	add: function (c3a, c3b) {
		
		this.x = c3a.x + c3b.x;
		this.y = c3a.y + c3b.y;
		this.z = c3a.z + c3b.z;
		
		return this;
		
	},
	
	substract: function (c3a, c3b) {
		
		this.x = c3a.x - c3b.x;
		this.y = c3a.y - c3b.y;
		this.z = c3a.z - c3b.z;
		
		return this;
		
	},
	
	multiply: function (c3a, c3b) {
		
		this.x = c3a.x * c3b.x;
		this.y = c3a.y * c3b.y;
		this.z = c3a.z * c3b.z;
		
		return this;
		
	},
	
	divide: function (c3a, c3b) {
		
		this.x = c3a.x / c3b.x;
		this.y = c3a.y / c3b.y;
		this.z = c3a.z / c3b.z;
		
		return this;
		
	},
	
	addSelf: function (c3) {
		
		this.x += c3.x;
		this.y += c3.y;
		this.z += c3.z;
		
		return this;
		
	},
	
	substractSelf: function (c3) {
		
		this.x -= c3.x;
		this.y -= c3.y;
		this.z -= c3.z;
		
		return this;
		
	},
	
	multiplySelf: function (c3) {
		
		this.x *= c3.x;
		this.y *= c3.y;
		this.z *= c3.z;
		
		return this;
		
	},
	
	divideSelf: function (c3) {
		
		this.x /= c3.x;
		this.y /= c3.y;
		this.z /= c3.z;
		
		return this;
		
	},
	
	addScalar: function (n) {
		
		this.x += n;
		this.y += n;
		this.z += n;
		
		return this;
		
	},
	
	substractScalar: function (n) {
		
		this.x -= n;
		this.y -= n;
		this.z -= n;
		
		return this;
		
	},
	
	multiplyScalar: function (n) {
		
		this.x *= n;
		this.y *= n;
		this.z *= n;
		
		return this;
		
	},
	
	divideScalar: function (n) {
		
		this.x /= n;
		this.y /= n;
		this.z /= n;
		
		return this;
		
	},
	
	toString: function () {
		
		return [ this.x, this.y, this.z ].toString();
		
	}
	
});


//!requires:View
//!provides:View.Modules

View.Modules = { };


//!requires:View.Modules
//!provides:View.Modules.Cameras
// 
//!requires:JS.Module
// 
//!uses:View.Camera

View.Modules.Cameras = new JS.Module({
	
	createCamera: function () {
		
		var camera = new View.Camera();
		
		this.cameras.push(camera.object3D);
		this.scene.add(camera.object3D);
		
		return camera;
		
	},
	
	removeCamera: function (camera) {
		
		var index = this.cameras.indexOf(camera);
		
		if (index === -1) {
			
			this.cameras.slice(index, 1);
			this.scene.remove(camera);
			
		}
		
	}
	
});


//!requires:View
//!provides:View.Object
// 
//!requires:JS.Class
// 
//!uses:Value3

View.Object = new JS.Class('View.Object3D', {
	
	setPosition: function (position) {
		
		this.object3D.position.copy(position);
		
	},
	
	getPosition: function ( ) {
		
		return new Value3().copy(this.object3D.position);
		
	},
	
	setXPosition: function ( x ) {
		
		this.object3D.position.x = x;
		
	},
	
	getXPosition: function ( ) {
		
		return this.object3D.position.x;
		
	},
	
	setYPosition: function ( y ) {
		
		this.object3D.position.y = y;
		
	},
	
	getYPosition: function ( ) {
		
		return this.object3D.position.y;
		
	},
	
	setZPosition: function ( z ) {
		
		this.object3D.position.z = z;
		
	},
	
	getZPosition: function ( ) {
		
		return this.object3D.position.z;
		
	},
	
	setOrientation: function ( orientation ) {
		
		this.object3D.rotation.copy( orientation );
		
	},
	
	getOrientation: function ( ) {
		
		return new Value3( ).copy( this.object3D.rotation );
		
	},
	
	setRollOrientation: function ( x ) {
		
		this.object3D.rotation.x = x;
		
	},
	
	getRollOrientation: function ( ) {
		
		return this.object3D.rotation.x;
		
	},
	
	setPitchOrientation: function ( y ) {
		
		this.object3D.rotation.y = y;
		
	},
	
	getPitchOrientation: function ( ) {
		
		return this.object3D.rotation.y;
		
	},
	
	setYawOrientation: function ( z ) {
		
		this.object3D.rotation.z = z;
		
	},
	
	getYawOrientation: function ( ) {
		
		return this.object3D.rotation.z;
		
	},
	
	move: function ( distance, axis ) {
		
		var object3D = this.object3D;
		
		object3D.matrixAutoUpdate && object3D.updateMatrix( );
		
		object3D.translate( distance, axis );
		
	},
	
	moveFront: function ( distance ) {
		
		this.move( distance, new THREE.Vector3( 0, 0, 1 ) );
		
	},
	
	moveBack: function ( distance ) {
		
		this.moveFront( - distance );
		
	},
	
	moveLeft: function ( distance ) {
		
		this.move( distance, new THREE.Vector3( 1, 0, 0 ) );
		
	},
	
	moveRight: function ( distance ) {
		
		this.moveLeft( - distance );
		
	},
	
	moveUp: function ( distance ) {
		
		this.move( distance, new THREE.Vector3( 0, 1, 0 ) );
		
	},
	
	moveDown: function ( distance ) {
		
		this.moveUp( - distance );
		
	},
	
	lookAt: function ( position ) {
		
		this.object3D.lookAt( new THREE.Vector3( ).copy( position ) );
		
	}
	
});


//!requires:View
//!provides:View.Camera
//!requires:View.Object
// 
//!requires:JS.Class

View.Camera = new JS.Class('View.Camera', View.Object, {
	
	initialize: function ( ) {
		
		this.object3D = new THREE.PerspectiveCamera( 60, 0, .1, 20000 );
		
	}
	
});


//!requires:View.Modules
//!provides:View.Modules.Characters
// 
//!requires:JS.Module

View.Modules.Characters = new JS.Module({
	
	createCharacter: function ( characterType ) {
		
		var character = new characterType( );
		
		this.scene.add( character.object3D );
		
		return character;
		
	},
	
	removeCharacter: function ( character ) {
		
		this.scene.remove( character.object3D );
		
	}
	
});


//!requires:View.Modules
//!provides:View.Modules.Debug
// 
//!requires:JS.Module

View.Modules.Debug = new JS.Module({
	
	activateAxes: function ( ) {
		
		this.scene.add( new THREE.Axes( ) );
		
	},
	
	activateLights: function ( ) {
		
		this.scene.add( new THREE.AmbientLight( 0xbbbbbb ) );
		this.scene.add( new THREE.PointLight( 0xffffff ) );
		
	}
	
});


//!requires:View.Modules
//!provides:View.Modules.Voxels
// 
//!requires:JS.Module

View.Modules.Voxels = new JS.Module({
	
	setVoxelType: function ( point, type ) {
		
		var voxel = new type( );
		
		this.voxels[ point ] = voxel;
		
		this.pendingVoxels[ point ] = point.clone( );
		
		this.voxelGeometry = null;
		
	},
	
	clearVoxel: function ( point ) {
		
		this.voxels[ point ] = null;
		
		this.refreshVoxelFaces( point );
		
		this.voxelGeometry = null;
		
	}
	
});


//!requires:View
//!provides:View.Apis
//!requires:View.Details
// 
//!requires:JS.Class
// 
//!requires:View.Modules.Cameras
//!requires:View.Modules.Characters
//!requires:View.Modules.Debug
//!requires:View.Modules.Voxels

View.Apis = new JS.Class('View.Apis', View.Details, {
	
	include: [
		
		View.Modules.Cameras,
		
		View.Modules.Characters,
		
		View.Modules.Debug,
		
		View.Modules.Voxels
		
	],
	
	renderOn: function ( renderer, width, height ) {
		
		if ( this.hasOwnProperty( 'cameras' ) ) {
			
			var cameras = this.cameras;
			
			if ( cameras.length > 0 ) {
				
				if ( this.voxelGeometry === null ) {
					
					this.finishPendingVoxels( );
					
					this.buildVoxelGeometry( );
					
					this.buildVoxelEntity( );
					
				}
				
				var camera = cameras[ 0 ];
				camera.aspect = width / height;
				camera.updateProjectionMatrix( );
				
				renderer.render( this.scene, camera );
				
			}
			
		}
		
	}
	
});


//!requires:Client
//!provides:Client.Local
//!requires:Client.Base
// 
//!requires:JS.Class
// 
//!uses:Pipeline.Local

Client.Local = new JS.Class('Client.Local', Client, {
	
	initialize: function ( server ) {
		
		this.callSuper( );
		
	    this.pipeline = new Pipeline.Local()
	    this.pipeline.connect( server.multiplexer );
	    this.pipeline.send( "test", "message");
		
	}
	
});


//!provides:Pipeline

global.Pipeline = { };


//!requires:Pipeline
//!provides:Pipeline.Base
// 
//!requires:JS.Class
//
//!uses:JS.Hash
//!uses:Pipeline.Broadcast

Pipeline.Base = new JS.Class('Pipeline.Base', {
	
	initialize : function ( ) {
		
		this.multiplexer = null;
		
		this.broadcast = new Pipeline.Broadcast( this );
		
		this.commands = new JS.Hash( );
		
		this.clients = [ ];
		
	},
	
	trigger : function ( command, message ) {
		
		if ( this.commands.hasKey( command ) ) {
			
			this.commands.get( command ).forEach(function ( fn ) {
				
				fn( message, command );
				
			});
			
		}

    },

    send : function ( command, message ) {
	    
	    Helper.pure( this, 'sendCommand' );
	    
    },
	
	register : function ( command, callback ) {
		
		if ( ! this.commands.hasKey( command ) ) {
			
			this.commands.store( command, new Array( callback ) );
			
		} else {
			
			this.commands.get( command ).push( callback );
			
		}
		
	},
	
	unregister : function ( command, callback ) {
		
		var commands = this.commands;
		
		if ( commands.hasKey( command ) ) {	
			
			var callbacks = commands.get( command ).filter(function ( fn ) {
				
				return fn !== callback;
				
			});
			
			if ( callbacks.length ) {
				
				commands.store( command, callbacks );
				
			} else {
				
				this.commands.remove( command );
				
			}
			
		}
		
	},
	
	close : function ( command, callback ) {
		
		
		
	}
	
});

JS.Enumerable = new JS.Module('Enumerable', {
  extend: {
    ALL_EQUAL: {},
    
    forEach: function(block, context) {
      if (!block) return new JS.Enumerator(this, 'forEach');
      for (var i = 0; i < this.length; i++)
        block.call(context || null, this[i]);
      return this;
    },
    
    isComparable: function(list) {
      return list.all(function(item) { return typeof item.compareTo === 'function' });
    },
    
    areEqual: function(expected, actual) {
      var result;
      
      if (expected === actual)
        return true;
      
      if (expected && typeof expected.equals === 'function')
        return expected.equals(actual);
      
      if (expected instanceof Function)
        return expected === actual;
      
      if (expected instanceof Array) {
        if (!(actual instanceof Array)) return false;
        for (var i = 0, n = expected.length; i < n; i++) {
          result = this.areEqual(expected[i], actual[i]);
          if (result === this.ALL_EQUAL) return true;
          if (!result) return false;
        }
        if (expected.length !== actual.length) return false;
        return true;
      }
      
      if ((expected instanceof Object)) {
        if (!(actual instanceof Object)) return false;
        if (this.objectSize(expected) !== this.objectSize(actual)) return false;
        for (var key in expected) {
          if (!this.areEqual(expected[key], actual[key]))
            return false;
        }
        return true;
      }
      
      return false;
    },
    
    objectKeys: function(object, includeProto) {
      var keys = [];
      for (var key in object) {
        if (object.hasOwnProperty(key) || includeProto !== false)
          keys.push(key);
      }
      return keys;
    },
    
    objectSize: function(object) {
      return this.objectKeys(object).length;
    },
    
    Collection: new JS.Class({
      initialize: function(array) {
        this.length = 0;
        JS.Enumerable.forEach.call(array, this.push, this);
      },
      
      push: function(item) {
        Array.prototype.push.call(this, item);
      },
      
      clear: function() {
        var i = this.length;
        while (i--) delete this[i];
        this.length = 0;
      }
    })
  },
  
  all: function(block, context) {
    block = JS.Enumerable.toFn(block);
    var truth = true;
    this.forEach(function(item) {
      truth = truth && (block ? block.apply(context || null, arguments) : item);
    });
    return !!truth;
  },
  
  any: function(block, context) {
    block = JS.Enumerable.toFn(block);
    var truth = false;
    this.forEach(function(item) {
      truth = truth || (block ? block.apply(context || null, arguments) : item);
    });
    return !!truth;
  },
  
  count: function(block, context) {
    if (typeof this.size === 'function') return this.size();
    var count = 0, object = block;
    
    if (block && typeof block !== 'function')
      block = function(x) { return JS.Enumerable.areEqual(x, object) };
    
    this.forEach(function() {
      if (!block || block.apply(context || null, arguments))
        count += 1;
    });
    return count;
  },
  
  cycle: function(n, block, context) {
    if (!block) return this.enumFor('cycle', n);
    block = JS.Enumerable.toFn(block);
    while (n--) this.forEach(block, context);
  },
  
  drop: function(n) {
    var entries = [];
    this.forEachWithIndex(function(item, i) {
      if (i >= n) entries.push(item);
    });
    return entries;
  },
  
  dropWhile: function(block, context) {
    if (!block) return this.enumFor('dropWhile');
    block = JS.Enumerable.toFn(block);
    
    var entries = [],
        drop    = true;
    
    this.forEach(function(item) {
      if (drop) drop = drop && block.apply(context || null, arguments);
      if (!drop) entries.push(item);
    });
    return entries;
  },
  
  forEachCons: function(n, block, context) {
    if (!block) return this.enumFor('forEachCons', n);
    block = JS.Enumerable.toFn(block);
    
    var entries = this.toArray(),
        size    = entries.length,
        limit   = size - n,
        i;
    
    for (i = 0; i <= limit; i++)
      block.call(context || null, entries.slice(i, i+n));
    
    return this;
  },
  
  forEachSlice: function(n, block, context) {
    if (!block) return this.enumFor('forEachSlice', n);
    block = JS.Enumerable.toFn(block);
    
    var entries = this.toArray(),
        size    = entries.length,
        m       = Math.ceil(size/n),
        i;
    
    for (i = 0; i < m; i++)
      block.call(context || null, entries.slice(i*n, (i+1)*n));
    
    return this;
  },
  
  forEachWithIndex: function(offset, block, context) {
    if (typeof offset === 'function') {
      context = block;
      block   = offset;
      offset  = 0;
    }
    offset = offset || 0;
    
    if (!block) return this.enumFor('forEachWithIndex', offset);
    block = JS.Enumerable.toFn(block);
    
    return this.forEach(function(item) {
      var result = block.call(context || null, item, offset);
      offset += 1;
      return result;
    });
  },
  
  forEachWithObject: function(object, block, context) {
    if (!block) return this.enumFor('forEachWithObject', object);
    block = JS.Enumerable.toFn(block);
    
    this.forEach(function() {
      var args = [object].concat(JS.array(arguments));
      block.apply(context || null, args);
    });
    return object;
  },
  
  find: function(block, context) {
    if (!block) return this.enumFor('find');
    block = JS.Enumerable.toFn(block);
    
    var needle = {}, K = needle;
    this.forEach(function(item) {
      if (needle !== K) return;
      needle = block.apply(context || null, arguments) ? item : needle;
    });
    return needle === K ? null : needle;
  },
  
  findIndex: function(needle, context) {
    if (needle === undefined) return this.enumFor('findIndex');
    
    var index = null,
        block = (typeof needle === 'function');
    
    this.forEachWithIndex(function(item, i) {
      if (index !== null) return;
      if (JS.Enumerable.areEqual(needle, item) || (block && needle.apply(context || null, arguments)))
        index = i;
    });
    return index;
  },
  
  first: function(n) {
    var entries = this.toArray();
    return (n === undefined) ? entries[0] : entries.slice(0,n);
  },
  
  grep: function(pattern, block, context) {
    block = JS.Enumerable.toFn(block);
    var results = [];
    this.forEach(function(item) {
      var match = (typeof pattern.match === 'function') ? pattern.match(item)
                : (typeof pattern.test === 'function')  ? pattern.test(item)
                : JS.isType(item, pattern);
      
      if (!match) return;
      if (block) item = block.apply(context || null, arguments);
      results.push(item);
    });
    return results;
  },
  
  groupBy: function(block, context) {
    if (!block) return this.enumFor('groupBy');
    block = JS.Enumerable.toFn(block);
    
    var hash = new JS.Hash();
    this.forEach(function(item) {
      var value = block.apply(context || null, arguments);
      if (!hash.hasKey(value)) hash.store(value, []);
      hash.get(value).push(item);
    });
    return hash;
  },
  
  inject: function(memo, block, context) {
    var args    = JS.array(arguments),
        counter = 0,
        K       = {};
    
    switch (args.length) {
      case 1:   memo      = K;
                block     = args[0];
                break;
      
      case 2:   if (typeof memo === 'function') {
                  memo    = K;
                  block   = args[0];
                  context = args[1];
                }
    }
    block = JS.Enumerable.toFn(block);
    
    this.forEach(function(item) {
      if (!counter++ && memo === K) return memo = item;
      var args = [memo].concat(JS.array(arguments));
      memo = block.apply(context || null, args);
    });
    return memo;
  },
  
  map: function(block, context) {
    if (!block) return this.enumFor('map');
    block = JS.Enumerable.toFn(block);
    
    var map = [];
    this.forEach(function() {
      map.push(block.apply(context || null, arguments));
    });
    return map;
  },
  
  max: function(block, context) {
    return this.minmax(block, context)[1];
  },
  
  maxBy: function(block, context) {
    if (!block) return this.enumFor('maxBy');
    return this.minmaxBy(block, context)[1];
  },
  
  member: function(needle) {
    return this.any(function(item) { return JS.Enumerable.areEqual(item, needle) });
  },
  
  min: function(block, context) {
    return this.minmax(block, context)[0];
  },
  
  minBy: function(block, context) {
    if (!block) return this.enumFor('minBy');
    return this.minmaxBy(block, context)[0];
  },
  
  minmax: function(block, context) {
    var list = this.sort(block, context);
    return [list[0], list[list.length - 1]];
  },
  
  minmaxBy: function(block, context) {
    if (!block) return this.enumFor('minmaxBy');
    var list = this.sortBy(block, context);
    return [list[0], list[list.length - 1]];
  },
  
  none: function(block, context) {
    return !this.any(block, context);
  },
  
  one: function(block, context) {
    block = JS.Enumerable.toFn(block);
    var count = 0;
    this.forEach(function(item) {
      if (block ? block.apply(context || null, arguments) : item) count += 1;
    });
    return count === 1;
  },
  
  partition: function(block, context) {
    if (!block) return this.enumFor('partition');
    block = JS.Enumerable.toFn(block);
    
    var ayes = [], noes = [];
    this.forEach(function(item) {
      (block.apply(context || null, arguments) ? ayes : noes).push(item);
    });
    return [ayes, noes];
  },
  
  reject: function(block, context) {
    if (!block) return this.enumFor('reject');
    block = JS.Enumerable.toFn(block);
    
    var map = [];
    this.forEach(function(item) {
      if (!block.apply(context || null, arguments)) map.push(item);
    });
    return map;
  },
  
  reverseForEach: function(block, context) {
    if (!block) return this.enumFor('reverseForEach');
    block = JS.Enumerable.toFn(block);
    
    var entries = this.toArray(),
        n       = entries.length;
    
    while (n--) block.call(context || null, entries[n]);
    return this;
  },
  
  select: function(block, context) {
    if (!block) return this.enumFor('select');
    block = JS.Enumerable.toFn(block);
    
    var map = [];
    this.forEach(function(item) {
      if (block.apply(context || null, arguments)) map.push(item);
    });
    return map;
  },
  
  sort: function(block, context) {
    var comparable = JS.Enumerable.isComparable(this),
        entries    = this.toArray();
    
    block = block || (comparable
        ? function(a,b) { return a.compareTo(b); }
        : null);
    return block
        ? entries.sort(function(a,b) { return block.call(context || null, a, b); })
        : entries.sort();
  },
  
  sortBy: function(block, context) {
    if (!block) return this.enumFor('sortBy');
    block = JS.Enumerable.toFn(block);
    
    var util       = JS.Enumerable,
        map        = new util.Collection(this.map(block, context)),
        comparable = util.isComparable(map);
    
    return new util.Collection(map.zip(this).sort(function(a, b) {
      a = a[0]; b = b[0];
      return comparable ? a.compareTo(b) : (a < b ? -1 : (a > b ? 1 : 0));
    })).map(function(item) { return item[1]; });
  },
  
  take: function(n) {
    var entries = [];
    this.forEachWithIndex(function(item, i) {
      if (i < n) entries.push(item);
    });
    return entries;
  },
  
  takeWhile: function(block, context) {
    if (!block) return this.enumFor('takeWhile');
    block = JS.Enumerable.toFn(block);
    
    var entries = [],
        take    = true;
    this.forEach(function(item) {
      if (take) take = take && block.apply(context || null, arguments);
      if (take) entries.push(item);
    });
    return entries;
  },
  
  toArray: function() {
    return this.drop(0);
  },
  
  zip: function() {
    var util    = JS.Enumerable,
        args    = [],
        counter = 0,
        n       = arguments.length,
        block, context;
    
    if (typeof arguments[n-1] === 'function') {
      block = arguments[n-1]; context = {};
    }
    if (typeof arguments[n-2] === 'function') {
      block = arguments[n-2]; context = arguments[n-1];
    }
    util.forEach.call(arguments, function(arg) {
      if (arg === block || arg === context) return;
      if (arg.toArray) arg = arg.toArray();
      if (JS.isType(arg, Array)) args.push(arg);
    });
    var results = this.map(function(item) {
      var zip = [item];
      util.forEach.call(args, function(arg) {
        zip.push(arg[counter] === undefined ? null : arg[counter]);
      });
      return ++counter && zip;
    });
    if (!block) return results;
    util.forEach.call(results, block, context);
  }
});
  
// http://developer.mozilla.org/en/docs/index.php?title=Core_JavaScript_1.5_Reference:Global_Objects:Array&oldid=58326
JS.Enumerable.define('forEach', JS.Enumerable.forEach);

JS.Enumerable.alias({
  collect:    'map',
  detect:     'find',
  entries:    'toArray',
  every:      'all',
  findAll:    'select',
  filter:     'select',
  some:       'any'
});

JS.Enumerable.extend({
  toFn: function(object) {
    if (!object) return object;
    if (object.toFunction) return object.toFunction();
    if (this.OPS[object]) return this.OPS[object];
    if (JS.isType(object, 'string') || JS.isType(object, String))
    return function() {
        var args   = JS.array(arguments),
            target = args.shift(),
            method = target[object];
        return (typeof method === 'function') ? method.apply(target, args) : method;
      };
    return object;
  },
  
  OPS: {
    '+':    function(a,b) { return a + b },
    '-':    function(a,b) { return a - b },
    '*':    function(a,b) { return a * b },
    '/':    function(a,b) { return a / b },
    '%':    function(a,b) { return a % b },
    '^':    function(a,b) { return a ^ b },
    '&':    function(a,b) { return a & b },
    '&&':   function(a,b) { return a && b },
    '|':    function(a,b) { return a | b },
    '||':   function(a,b) { return a || b },
    '==':   function(a,b) { return a == b },
    '!=':   function(a,b) { return a != b },
    '>':    function(a,b) { return a > b },
    '>=':   function(a,b) { return a >= b },
    '<':    function(a,b) { return a < b },
    '<=':   function(a,b) { return a <= b },
    '===':  function(a,b) { return a === b },
    '!==':  function(a,b) { return a !== b },
    '[]':   function(a,b) { return a[b] },
    '()':   function(a,b) { return a(b) }
  },
  
  Enumerator: new JS.Class({
    include: JS.Enumerable,
    
    extend: {
      DEFAULT_METHOD: 'forEach'
    },
    
    initialize: function(object, method, args) {
      this._object = object;
      this._method = method || this.klass.DEFAULT_METHOD;
      this._args   = (args || []).slice();
    },
    
    // this is largely here to support testing
    // since I don't want to make the ivars public
    equals: function(enumerator) {
      return JS.isType(enumerator, this.klass) &&
             this._object === enumerator._object &&
             this._method === enumerator._method &&
             JS.Enumerable.areEqual(this._args, enumerator._args);
          },
          
          forEach: function(block, context) {
      if (!block) return this;
      var args = this._args.slice();
      args.push(block);
      if (context) args.push(context);
      return this._object[this._method].apply(this._object, args);
    }
  })
});

JS.Enumerable.Enumerator.alias({
  cons:       'forEachCons',
  reverse:    'reverseForEach',
  slice:      'forEachSlice',
  withIndex:  'forEachWithIndex',
  withObject: 'forEachWithObject'
});

JS.Enumerable.Collection.include(JS.Enumerable);

JS.Kernel.include({
  enumFor: function(method) {
    var args   = JS.array(arguments),
        method = args.shift();
    return new JS.Enumerable.Enumerator(this, method, args);
  }
}, {_resolve: false});

JS.Kernel.alias({toEnum: 'enumFor'});

JS.Comparable = new JS.Module('Comparable', {
  extend: {
    ClassMethods: new JS.Module({
      compare: function(one, another) {
        return one.compareTo(another);
      }
    }),
    
    included: function(base) {
      base.extend(this.ClassMethods);
    }
  },
  
  lt: function(other) {
    return this.compareTo(other) < 0;
  },
  
  lte: function(other) {
    return this.compareTo(other) < 1;
  },
  
  gt: function(other) {
    return this.compareTo(other) > 0;
  },
  
  gte: function(other) {
    return this.compareTo(other) > -1;
  },
  
  eq: function(other) {
    return this.compareTo(other) === 0;
  },
  
  between: function(a, b) {
    return this.gte(a) && this.lte(b);
  }
});

JS.Hash = new JS.Class('Hash', {
  include: JS.Enumerable || {},
  
  extend: {
    Pair: new JS.Class({
      include: JS.Comparable || {},
      length: 2,
      
      setKey: function(key) {
        this[0] = this.key = key;
      },
      
      hasKey: function(key) {
        return JS.Enumerable.areEqual(this.key, key);
      },
      
      setValue: function(value) {
        this[1] = this.value = value;
      },
      
      hasValue: function(value) {
        return JS.Enumerable.areEqual(this.value, value);
      },
      
      compareTo: function(other) {
        return this.key.compareTo
            ? this.key.compareTo(other.key)
            : (this.key < other.key ? -1 : (this.key > other.key ? 1 : 0));
      },
      
      hash: function() {
        var key   = JS.Hash.codeFor(this.key),
            value = JS.Hash.codeFor(this.value);
        
        return [key, value].sort().join('/');
      }
    }),
    
    codeFor: function(object) {
      if (typeof object !== 'object') return String(object);
      return (typeof object.hash === 'function')
          ? object.hash()
          : object.toString();
    }
  },
  
  initialize: function(object) {
    this.clear();
    if (!JS.isType(object, Array)) return this.setDefault(object);
    for (var i = 0, n = object.length; i < n; i += 2)
      this.store(object[i], object[i+1]);
  },
  
  forEach: function(block, context) {
    if (!block) return this.enumFor('forEach');
    block = JS.Enumerable.toFn(block);
    
    var hash, bucket, i;
    
    for (hash in this._buckets) {
      if (!this._buckets.hasOwnProperty(hash)) continue;
      bucket = this._buckets[hash];
      i = bucket.length;
      while (i--) block.call(context || null, bucket[i]);
    }
    return this;
  },
  
  _bucketForKey: function(key, createIfAbsent) {
    var hash   = this.klass.codeFor(key),
        bucket = this._buckets[hash];
    
    if (!bucket && createIfAbsent)
      bucket = this._buckets[hash] = [];
    
    return bucket;
  },
  
  _indexInBucket: function(bucket, key) {
    var i     = bucket.length,
        ident = !!this._compareByIdentity;
        
    while (i--) {
      if (ident ? (bucket[i].key === key) : bucket[i].hasKey(key))
        return i;
    }
    return -1;
  },
  
  assoc: function(key, createIfAbsent) {
    var bucket, index, pair;
    
    bucket = this._bucketForKey(key, createIfAbsent);
    if (!bucket) return null;
    
    index = this._indexInBucket(bucket, key);
    if (index > -1) return bucket[index];
    if (!createIfAbsent) return null;
    
    this.size += 1; this.length += 1;
    pair = new this.klass.Pair;
    pair.setKey(key);
    bucket.push(pair);
    return pair;
  },
  
  rassoc: function(value) {
    var key = this.key(value);
    return key ? this.assoc(key) : null;
  },
  
  clear: function() {
    this._buckets = {};
    this.length = this.size = 0;
  },
  
  compareByIdentity: function() {
    this._compareByIdentity = true;
    return this;
  },
  
  comparesByIdentity: function() {
    return !!this._compareByIdentity;
  },
  
  setDefault: function(value) {
    this._default = value;
    return this;
  },
  
  getDefault: function(key) {
    return (typeof this._default === 'function')
        ? this._default(this, key)
        : (this._default || null);
  },
  
  equals: function(other) {
    if (!JS.isType(other, JS.Hash) || this.length !== other.length)
      return false;
    var result = true;
    this.forEach(function(pair) {
      if (!result) return;
      var otherPair = other.assoc(pair.key);
      if (otherPair === null || !otherPair.hasValue(pair.value)) result = false;
    });
    return result;
  },
  
  hash: function() {
    var hashes = [];
    this.forEach(function(pair) { hashes.push(pair.hash()) });
    return hashes.sort().join('');
  },
  
  fetch: function(key, defaultValue, context) {
    var pair = this.assoc(key);
    if (pair) return pair.value;
    
    if (defaultValue === undefined) throw new Error('key not found');
    if (typeof defaultValue === 'function') return defaultValue.call(context || null, key);
    return defaultValue;
  },
  
  forEachKey: function(block, context) {
    if (!block) return this.enumFor('forEachKey');
    block = JS.Enumerable.toFn(block);
    
    this.forEach(function(pair) {
      block.call(context || null, pair.key);
    });
    return this;
  },
  
  forEachPair: function(block, context) {
    if (!block) return this.enumFor('forEachPair');
    block = JS.Enumerable.toFn(block);
    
    this.forEach(function(pair) {
      block.call(context || null, pair.key, pair.value);
    });
    return this;
  },
  
  forEachValue: function(block, context) {
    if (!block) return this.enumFor('forEachValue');
    block = JS.Enumerable.toFn(block);
    
    this.forEach(function(pair) {
      block.call(context || null, pair.value);
    });
    return this;
  },
  
  get: function(key) {
    var pair = this.assoc(key);
    return pair ? pair.value : this.getDefault(key);
  },
  
  hasKey: function(key) {
    return !!this.assoc(key);
  },
  
  hasValue: function(value) {
    var has = false, ident = !!this._compareByIdentity;
    this.forEach(function(pair) {
      if (has) return;
      if (ident ? value === pair.value : JS.Enumerable.areEqual(value, pair.value))
        has = true;
    });
    return has;
  },
  
  invert: function() {
    var hash = new this.klass;
    this.forEach(function(pair) {
      hash.store(pair.value, pair.key);
    });
    return hash;
  },
  
  isEmpty: function() {
    for (var hash in this._buckets) {
      if (this._buckets.hasOwnProperty(hash) && this._buckets[hash].length > 0)
        return false;
    }
    return true;
  },
  
  key: function(value) {
    var result = null;
    this.forEach(function(pair) {
      if (!result && JS.Enumerable.areEqual(value, pair.value))
        result = pair.key;
    });
    return result;
  },
  
  keys: function() {
    var keys = [];
    this.forEach(function(pair) { keys.push(pair.key) });
    return keys;
  },
  
  merge: function(hash, block, context) {
    var newHash = new this.klass;
    newHash.update(this);
    newHash.update(hash, block, context);
    return newHash;
  },
  
  rehash: function() {
    var temp = new this.klass;
    temp._buckets = this._buckets;
    this.clear();
    this.update(temp);
  },
  
  remove: function(key, block) {
    if (block === undefined) block = null;
    var bucket, index, result;
    
    bucket = this._bucketForKey(key);
    if (!bucket) return (typeof block === 'function')
                      ? this.fetch(key, block)
                      : this.getDefault(key);
    
    index = this._indexInBucket(bucket, key);
    if (index < 0) return (typeof block === 'function')
                        ? this.fetch(key, block)
                        : this.getDefault(key);
    
    result = bucket[index].value;
    this._delete(bucket, index);
    this.size -= 1;
    this.length -= 1;
    
    if (bucket.length === 0)
      delete this._buckets[this.klass.codeFor(key)];
    
    return result;
  },
  
  _delete: function(bucket, index) {
    bucket.splice(index, 1);
  },
  
  removeIf: function(block, context) {
    if (!block) return this.enumFor('removeIf');
    block = JS.Enumerable.toFn(block);
    
    var toRemove = [];
    
    this.forEach(function(pair) {
      if (block.call(context || null, pair))
        toRemove.push(pair.key);
    }, this);
    
    var i = toRemove.length;
    while (i--) this.remove(toRemove[i]);
    
    return this;
  },
  
  replace: function(hash) {
    this.clear();
    this.update(hash);
  },
  
  shift: function() {
    var keys = this.keys();
    if (keys.length === 0) return this.getDefault();
    var pair = this.assoc(keys[0]);
    this.remove(pair.key);
    return pair;
  },
  
  store: function(key, value) {
    this.assoc(key, true).setValue(value);
    return value;
  },
  
  toString: function() {
    return 'Hash:{' + this.map(function(pair) {
      return pair.key.toString() + '=>' + pair.value.toString();
    }).join(',') + '}';
  },
  
  update: function(hash, block, context) {
    var givenBlock = (typeof block === 'function');
    hash.forEach(function(pair) {
      var key = pair.key, value = pair.value;
      if (givenBlock && this.hasKey(key))
        value = block.call(context || null, key, this.get(key), value);
      this.store(key, value);
    }, this);
  },
  
  values: function() {
    var values = [];
    this.forEach(function(pair) { values.push(pair.value) });
    return values;
  },
  
  valuesAt: function() {
    var i = arguments.length, results = [];
    while (i--) results.push(this.get(arguments[i]));
    return results;
  }
});

JS.Hash.alias({
  includes: 'hasKey',
  index:    'key',
  put:      'store'
});

JS.OrderedHash = new JS.Class('OrderedHash', JS.Hash, {
  assoc: function(key, createIfAbsent) {
    var _super = JS.Hash.prototype.assoc;
    
    var existing = _super.call(this, key, false);
    if (existing || !createIfAbsent) return existing;
    
    var pair = _super.call(this, key, true);
    
    if (!this._first) {
      this._first = this._last = pair;
    } else {
      this._last._next = pair;
      pair._prev = this._last;
      this._last = pair;
    }
    return pair;
  },
  
  clear: function() {
    this.callSuper();
    this._first = this._last = null;
  },
  
  _delete: function(bucket, index) {
    var pair = bucket[index];
    
    if (pair._prev) pair._prev._next = pair._next;
    if (pair._next) pair._next._prev = pair._prev;
    
    if (pair === this._first) this._first = pair._next;
    if (pair === this._last) this._last = pair._prev;
    
    return this.callSuper();
  },
  
  forEach: function(block, context) {
    if (!block) return this.enumFor('forEach');
    block = JS.Enumerable.toFn(block);
    
    var pair = this._first;
    while (pair) {
      block.call(context || null, pair);
      pair = pair._next;
    }
  },
  
  rehash: function() {
    var pair = this._first;
    this.clear();
    while (pair) {
      this.store(pair.key, pair.value);
      pair = pair._next;
    }
  }
});

//!requires:Pipeline
//!provides:Pipeline.Broadcast
// 
//!requires:JS.Class

Pipeline.Broadcast = new JS.Class('Pipeline.Broadcast', {
	
	initialize: function ( pipeline ) {
		
		this.pipeline = pipeline;
		
	},
	
	send: function ( command, message ) {
		
		this.pipeline( command, message );
		
	}
	
});


//!requires:Pipeline
//!provides:Pipeline.Local
//!requires:Pipeline.Base
//
//!requires:JS.Class

/*
 * @class
 */

Pipeline.Local = new JS.Class('Pipeline.Local', Pipeline.Base, {
	
	/*
	 * @constructor
	 */
	
	initialize: function ( ) {
		
		this.callSuper( );
		
	},

	/*
	 * @param {LocalPipeline} client Pipeline client avec lequel communiquer
	 */

    connect: function ( multiplexer ) {
	    
	    this.multiplexer = multiplexer;

    },
	
	/*
	 * @param {String} command La command a envoyer
	 * @param {Object} message Data a envoyer
	 */
	
	send: function ( command, message ) {
		
		if ( typeof ( this.multiplexer ) !== 'undefined' ) {
			
		    this.multiplexer.trigger( this, command, message );
			
		} else {
			
			throw "Pipeline.Local: send: multiplexer doesn't set";
			
		}
		
	}
	
});


//!provides:Server

global.Server = { };


JS.Observable = new JS.Module('Observable', {
  extend: {
    DEFAULT_METHOD: 'update'
  },
  
  addObserver: function(observer, context) {
    (this.__observers__ = this.__observers__ || []).push({_block: observer, _context: context || null});
  },
  
  removeObserver: function(observer, context) {
    this.__observers__ = this.__observers__ || [];
    context = context || null;
    var i = this.countObservers();
    while (i--) {
      if (this.__observers__[i]._block === observer && this.__observers__[i]._context === context) {
        this.__observers__.splice(i,1);
        return;
      }
    }
  },
  
  removeObservers: function() {
    this.__observers__ = [];
  },
  
  countObservers: function() {
    return (this.__observers__ = this.__observers__ || []).length;
  },
  
  notifyObservers: function() {
    if (!this.isChanged()) return;
    var i = this.countObservers(), observer, block, context;
    while (i--) {
      observer = this.__observers__[i];
      block    = observer._block;
      context  = observer._context;
      if (typeof block === 'function') block.apply(context || null, arguments);
      else block[context || JS.Observable.DEFAULT_METHOD].apply(block, arguments);
    }
  },
  
  setChanged: function(state) {
    this.__changed__ = !(state === false);
  },
  
  isChanged: function() {
    if (this.__changed__ === undefined) this.__changed__ = true;
    return !!this.__changed__;
  }
});

JS.Observable.alias({
  subscribe:    'addObserver',
  unsubscribe:  'removeObserver'
}, true);

//!provides:Generator

global.Generator = { };


//!requires:Generator
//!provides:Generator.Base
// 
//!requires:JS.Class

Generator.Base = new JS.Class('Generator.Base', {
	
});


//!requires:Generator
//!provides:Generator.Flat
//!requires:Generator.Base
// 
//!requires:JS.Class

Generator.Flat = new JS.Class('Generator.Flat', {
	
});


//!provides:Persistor

global.Persistor = { };


//!requires:Persistor
//!provides:Persistor.Base
// 
//!requires:JS.Class

Persistor.Base = new JS.Class('Persistor.Base', {
	
});


//!requires:Persistor
//!provides:Persistor.Volatile
//!requires:Persistor.Base
// 
//!requires:JS.Class

Persistor.Volatile = new JS.Class('Persistor.Volatile', Persistor.Base, {
	
});


//!requires:Server
//!provides:Server.Base
// 
//!requires:JS.Class
//!requires:JS.Observable
// 
//!requires:Generator.Flat
//!requires:Persistor.Volatile
// 
//!uses:Server.Core.Logs
// 
//!uses:Server.Event.Bootstrap

Server.Base = new JS.Class('Server.Base', {
	
	include : JS.Observable,
	
	initialize : function ( ) {
		
		this.multiplexer = null;
		
		this.generator = new Generator.Flat( );
		
		this.persistor = new Persistor.Volatile( );
		
		this.logic = null;
		
	},
	
	bootstrap : function ( ) {
		
		this.plug( Server.Core.Logs );
		
		var event = new Server.Event.Bootstrap( );
		this.notifyObservers( event );
		
		return ! event.canceled;
		
	},
	
	plug : function ( plugin ) {
		
		plugin.attachServer( this );
		
	}
	
});


//!requires:Server
//!provides:Server.Core

Server.Core = { };


//!requires:Server.Core
//!provides:Server.Core.Logs
// 
//!requires:JS.Singleton

Server.Core.Logs = new JS.Singleton('Server.Core.Logs', {
	
	observer : function ( e ) {
		
		switch ( e.klass ) {
			
		case Server.Event.Bootstrap:
			console.log( 'Server bootstraped !' );
			break;
			
		}
		
	},
	
	attachServer : function ( server ) {
		
		server.addObserver( this.method( 'observer' ) );
		
	}
	
});


//!requires:Server
//!provides:Server.Event

Server.Event = { };


//!requires:Server.Event
//!provides:Server.Event.Base
// 
//!requires:JS.Class

Server.Event.Base = new JS.Class('Server.Event.Base', {
	
});


//!requires:Server.Event
//!provides:Server.Event.State
//!requires:Server.Event.Base
// 
//!requires:JS.Class

Server.Event.State = new JS.Class('Server.Event.State', Server.Event.State, {
	
	initialize : function ( ) {
		
		this.canceled = false;
		
	},
	
	cancel : function ( ) {
		
		this.canceled = true;
		
	}
	
});


//!requires:Server.Event
//!provides:Server.Event.Bootstrap
//!requires:Server.Event.State
// 
//!requires:JS.Class

Server.Event.Bootstrap = new JS.Class('Server.Event.Bootstrap', Server.Event.State, {
	
});


//!requires:Pipeline
//!provides:Pipeline.Multiplexer

global.Pipeline.Multiplexer = { };


//!provides:Pipeline.Multiplexer
//!provides:Pipeline.Multiplexer.Base
// 
//!requires:JS.Class
//
//!uses:JS.Hash
//!uses:Pipeline.Base

Pipeline.Multiplexer.Base = new JS.Class('Pipeline.Multiplexer.Base', {
	
	/*
	 * @constructor
	 * 
	 * @param {Number} port Le numero du port a ecouter
	 */
	
	initialize : function ( port ) {
		
		this.commands = new JS.Hash( );
		
	},
	
	/*
	 * @function
	 * 
	 * @param {Pipeline.Base} pipeline pipeline qui send
	 * @param {String} command La command qui est renvoyé
	 * @param {Object} message Data recue
	 */
	
	trigger : function ( pipeline, command, message ) {
		
		if ( this.commands.hasKey( command ) ) {
			
			var listCommands = this.commands.get( command );
			
			for ( var i in listCommands ) {
				
				if ( typeof ( listCommands[ i ] ) !== 'undefined' )
				{
					listCommands[ i ]( pipeline, message );
				}
				
			}
			
		}
		
	},
	
	register : function ( command, callback ) {
		
		if ( ! this.commands.hasKey( command ) ) {
			
			this.commands.store( command, new Array( callback ) );
			
		} else {
			
			this.commands.get( command ).push( callback );
			
		}
		
	},
	
	unregister : function ( command, callback ) {
		
		var commands = this.commands;
		
		if ( commands.hasKey( command ) ) {	
			
			var callbacks = commands.get( command ).filter(function ( fn ) {
				
				return fn !== callback;
				
			});
			
			if ( callbacks.length ) {
				
				commands.store( command, callbacks );
				
			} else {
				
				this.commands.remove( command );
				
			}
			
		}

	}

});

//!requires:Pipeline.Multiplexer
//!provides:Pipeline.Multiplexer.Local
//
//!requires:JS.Class
//!requires:Pipeline.Multiplexer.Base

/*
 * @class
 */

Pipeline.Multiplexer.Local = new JS.Class('Pipeline.Multiplexer.Local', Pipeline.Multiplexer.Base, {
	
	/*
	 * @constructor
	 */
	
	initialize: function ( ) {
		
		this.callSuper( );
		
	}

});


//!requires:Server
//!provides:Server.Local
//!requires:Server.Base
// 
//!requires:JS.Class
// 
//!requires:Pipeline.Multiplexer.Local

Server.Local = new JS.Class('Server.Local', Server.Base, {
	
	initialize : function ( ) {
		
		this.callSuper( );
		
		this.multiplexer = new Pipeline.Multiplexer.Local( );
	    this.multiplexer.register("test", function (pipeline, object) {
		    alert(object);
		});
		
	}
	
});


//!provides:Node
// 
//!requires:JS.Class

global.Node = new JS.Class('Node', {
	
	initialize : function ( ) {
	}
	
});


//!provides:Main
// 
//!requires:JS.Singleton
//!requires:Helper.ifNodeContext
//!requires:Helper.ifBrowserContext
// 
//!requires:Browser
//!requires:Node

new JS.Singleton('Main', {
	
	initialize: function ( ) {
		var that = this;
		
		Helper.ifNodeContext(function ( ) {
			new Node( );
		});
		
		Helper.ifBrowserContext(function () {
			window.addEventListener('load', function ( ) {
				new Browser( );
			}, false);
		});
	}
	
});

