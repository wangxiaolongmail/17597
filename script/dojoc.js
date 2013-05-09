;(function(){
	var d = dojo;
	d.isIE=false;
	d.conf={
		editor_basePath:"/editor/kindeditor-4.1.5"
	};
	d.path={};
	d.path.basename=function(s){
		var a=s.split("/");
		return a.pop();
	};
	d.querystring={};
	d.querystring.stringify=function(obj){
		var sep=sep||'&', eq=eq||'=',s="";
		dojo.each(obj,function(k,v,i){
			if( i > 0)s+=sep;
			s+=k+eq+v;
		});
		return s;
	};
	d.JSON={};
	d.JSON.parse=function(s){
		return dojo.toObject(s);
	};
	d.JSON.stringify=function(){
	};
	(function () {
		var ua = navigator.userAgent.toLowerCase();
		if (ua.indexOf("msie") > -1) {
			d.isIE=true;
		} else if (ua.indexOf("gecko") > -1) {
		} else if (ua.indexOf("opera") > -1) {
		}
	})();
	function _iframeDoc(iframe) {
		return iframe.contentDocument || iframe.contentWindow.document;
	}
	function _log(s){
		if(d.isDebug && dojo.global.$debug){
			dojo.global.$debug.log(s);
		}
		if(dojo.isIE){
		}else{
			if(d.firebug){
				console.log(s);
			}
		}
	}
	function _isDocumentOk(http){
		var stat = http.status || 0,
			lp = location.protocol;
		return (stat >= 200 && stat < 300) || 	// Boolean
			stat == 304 || 						// allow any 2XX response code
			stat == 1223 || 						// get it out of the cache
			(!stat && (lp == "file:" || lp == "chrome:" || lp == "app:") ); // Internet Explorer mangled the status code OR we're Titanium requesting a local file
	}
	function _getText(/*URI*/ uri, /*Boolean*/ fail_ok){
		_log('GET '+uri);
		var http = _xhrObj();
		http.open('GET', uri, false);
		try{
			http.send(null);
			if(!_isDocumentOk(http)){
				var err = Error("Unable to load "+uri+" status:"+ http.status);
				err.status = http.status;
				err.responseText = http.responseText;
				throw err;
			}
		}catch(e){
			if(fail_ok){ return null; } // null
			// rethrow the exception
			throw e;
		}
		return http.responseText; // String
	}
	function _requestHttpPost( param ){
		if(!param.onError){
			param.onError=function(http){
				alert(http.responseText);
			};
		}
		if(!param.onLoad) param.onLoad=function(){};
		var uri=param.uri,
		fail_ok=param.fail_ok;
		_log("POST "+uri);
		var http = _xhrObj();
		http.open("POST", uri, true);
		try{
			http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			var postBody=dojo.mts(param.data||param.params);
			http.onreadystatechange=(function(){
				var _http=http;
				var _param=param;
				return function(){
					if(http.readyState == 4){  
						if(http.status == 200){  
							_param.onLoad.call(_param.content||window,_http);
						}else{ 
							_param.onError.call(_param.content||window,_http);
						}
					}  
				};
			})();
			http.send(postBody);
		}catch(e){
			if(fail_ok){ return null; } // null
			// rethrow the exception
			throw e;
		}
	}
	function _requestHttpGet( param ){
		if(!param.onError){
			param.onError=function(http){
				alert(http.responseText);
			};
		}
		if(!param.onLoad) param.onLoad=function(){};
		var uri=param.uri,
		fail_ok=param.fail_ok;
		_log("Get "+uri);
		var http = _xhrObj();
		var postBody=dojo.mts(param.data||param.params);
		var uri=uri+"?"+postBody;
		http.open("GET", uri );
		try{
			http.onreadystatechange=(function(){
				var _http=http;
				var _param=param;
				return function(){
					if(http.readyState == 4){  
						if(http.status == 200){  
							_param.onLoad.call(_param,_http);
						}else{ 
							_param.onError.call(_param,_http);
						}
					}  
				};
			})();
			http.send(null);
		}catch(e){
			if(fail_ok){ return null; } // null
			// rethrow the exception
			throw e;
		}
	}
	function _xhrObj(){
		var http, last_e;
		if( !d.isIE ){
			try{ http = new XMLHttpRequest(); }catch(e){}
		}
		var _XMLHTTP_PROGIDS = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"];
		if(!http){
			for(var i=0; i<3; ++i){
				var progid = _XMLHTTP_PROGIDS[i];
				try{
					http = new ActiveXObject(progid);
				}catch(e){
					last_e = e;
				}

				if(http){
					_XMLHTTP_PROGIDS = [progid];  // so faster next time
					break;
				}
			}
		}
		
		if(!http){
			throw new Error("XMLHTTP not available: "+last_e);
		}

		return http; // XMLHTTPRequest instance
	}
	function _require ( moduleName ){
		if( !!!d.loadedModules[moduleName] ){
			d.loadedModules[moduleName] = true;
			var text = _requireFile(moduleName , 'js');
			eval(text);
		}
	}
	function _getScript ( path ){
		if( !!!d.loadedModules[path] ){
			d.loadedModules[path] = true;
			var text = _getText( path );
			eval(text);
		}
	}
	function _requireFile ( moduleName , ext ){
		var relpath = dojo.getModulePath( moduleName , ext );
		var path = "/script/"+relpath;
		var text = _getText( path );
		return text;
	};
	function _requireTemplate ( moduleName ){
		if( !!!d.loadedTemplates[moduleName] ){
			var text = _requireFile(moduleName , "html");
			d.loadedTemplates[moduleName] = text;
		}else{
			var text = d.loadedTemplates[moduleName];
		}
		return text;
	};
	d.iframeDoc=_iframeDoc;
	d.requestHttpPost = _requestHttpPost;
	d.requestHttpGet = _requestHttpGet;
	d.require = _require;
	d.requireTemplate = _requireTemplate;
	d.getScript=_getScript;
})();
(function(){
	var d = dojo;
	var  _ua = navigator.userAgent.toLowerCase(),
	_IE = _ua.indexOf("msie") > -1 && _ua.indexOf("opera") == -1,
	_GECKO = _ua.indexOf("gecko") > -1 && _ua.indexOf("khtml") == -1,
	_WEBKIT = _ua.indexOf("applewebkit") > -1,
	_OPERA = _ua.indexOf("opera") > -1,
	_MOBILE = _ua.indexOf("mobile") > -1,
	_QUIRKS = document.compatMode != "CSS1Compat",
	_matches = /(?:msie|firefox|webkit|opera)[\/:\s](\d+)/.exec(_ua),
	_V = _matches ? _matches[1] : '0';
	d.doc = document;
	
	function _bindEvent(el, type, fn) {
		if (el.addEventListener){
			el.addEventListener(type, fn, false);
		} else if (el.attachEvent){
			el.attachEvent('on' + type, fn);
		}
	}
	function _unbindEvent(el, type, fn) {
		if (el.removeEventListener){
			el.removeEventListener(type, fn, false);
		} else if (el.detachEvent){
			el.detachEvent('on' + type, fn);
		}
	}
	function _ready(fn) {
		var loaded = false,doc = d.doc,win = d.global;
		function readyFunc() {
			if (!loaded) {
				loaded = true;
				fn();
			}
		}
		function ieReadyFunc() {
			if (!loaded) {
				try {
					doc.documentElement.doScroll("left");
				} catch(e) {
					setTimeout(ieReadyFunc, 100);
					return;
				}
				readyFunc();
			}
		}
		function ieReadyStateFunc() {
			if (doc.readyState === "complete") {
				readyFunc();
			}
		}
		if (doc.addEventListener) {
			_bindEvent(doc, "DOMContentLoaded", readyFunc);
		} else if (doc.attachEvent) {
			_bindEvent(doc, "readystatechange", ieReadyStateFunc);
			if (doc.documentElement.doScroll && win.frameElement === undefined) {
				ieReadyFunc();
			}
		}
		_bindEvent(win, "load", readyFunc);
	}
	function _getDoc(node) {
		if (!node) {
			return document;
		}
		return node.ownerDocument || node.document || node;
	}
	
	function _getWin(node) {
		if (!node) {
			return window;
		}
		var doc = _getDoc(node);
		return doc.parentWindow || doc.defaultView;
	}
	function _getNodeName(node) {
		if (!node || !node.nodeName) {
			return '';
		}
		return node.nodeName.toLowerCase();
	}
	
	function _getAttrList(tag) {
		var list = {},
			reg = /\s+(?:([\w\-:]+)|(?:([\w\-:]+)=([^\s"'<>]+))|(?:([\w\-:"]+)="([^"]*)")|(?:([\w\-:"]+)='([^']*)'))(?=(?:\s|\/|>)+)/g,
			match;
		while ((match = reg.exec(tag))) {
			var key = (match[1] || match[2] || match[4] || match[6]).toLowerCase(),
				val = (match[2] ? match[3] : (match[4] ? match[5] : match[7])) || "";
			list[key] = val;
		}
		return list;
	}
	function _getAttr(el, key) {
		key = key.toLowerCase();
		var val = null;
		if (_IE && _V < 8 && el.nodeName.toLowerCase() != "script") {
			var div = el.ownerDocument.createElement("div");
			div.appendChild(el.cloneNode(false));
			var list = _getAttrList(div.innerHTML.toLowerCase());
			if (key in list) {
				val = list[key];
			}
		} else {
			try {
				val = el.getAttribute(key, 2);
			} catch(e) {
				val = el.getAttribute(key, 1);
			}
		}
		if (key === "style" && val !== null) {
			val = _formatCss(val);
		}
		return val;
	}
	function _addClass(el,cls){
		if(!_hasClass(el, cls)){
			el.className = dojo.trim(el.className + " " + cls);
		}
	}
	function _hasClass(el, cls) {
		return _inString(cls, el.className, " ");
	}
	function _removeClass(el,cls) {
		var className=el.className;
		className = dojo.trim(className.replace(new RegExp('(^|\\s)' + cls + '(\\s|$)'), ' '));
		el.className=className;
		/*
		if (_hasClass(el, cls)) {
			this.className = _trim(this.className.replace(new RegExp('(^|\\s)' + cls + '(\\s|$)'), ' '));
		}*/
	}
	function _inString(val, str, delimiter) {
		return dojo.hasArray(str.split(delimiter||","),val);
	}
	function _setAttr(el, key, val) {
		if (_IE && _V < 8 && key.toLowerCase() == "class") {
			key = "className";
		}else if(key.toLowerCase() == "classname"){
			if(_IE && _V < 8){
			}else{
				key = "class";
			}
		}
		el.setAttribute(key, '' + val);
	}
	function _attr(el,hash){
		dojo.each(hash,function(k,v){
			if(k!="innerHTML"){
				_setAttr(el, k, v);
			}
		});
	};
	function _removeAttr(el, key) {
		if (_IE && _V < 8 && key.toLowerCase() == "class") {
			key = "className";
		}
		_setAttr(el, key, "");
		el.removeAttribute(key);
	}
	function _getNodeName(node) {
		if (!node || !node.nodeName) {
			return "";
		}
		return node.nodeName.toLowerCase();
	}
	function _computedCss(el, key) {
		var self = this, win = _getWin(el), camelKey = _toCamel(key), val = "";
		if (win.getComputedStyle) {
			var style = win.getComputedStyle(el, null);
			val = style[camelKey] || style.getPropertyValue(key) || el.style[camelKey];
		} else if (el.currentStyle) {
			val = el.currentStyle[camelKey] || el.style[camelKey];
		}
		return val;
	}
	function _hasVal(node) {
		return !!_VALUE_TAG_MAP[_getNodeName(node)];
	}
	function _docElement(doc) {
		doc = doc || document;
		return _QUIRKS ? doc.body : doc.documentElement;
	}
	function _docHeight(doc) {
		var el = _docElement(doc);
		return Math.max(el.scrollHeight, el.clientHeight);
	}
	function _loadStyle(_href){
		var head = document.getElementsByTagName('head')[0] || (_QUIRKS ? document.body : document.documentElement);
		dojo.create("link", {
			rel : "Stylesheet",
			type : "text/css",
			media : "screen",
			href : _href
		}, head);
	}
	d.loadStyle=_loadStyle;
	d.removeClass=_removeClass;
	d.bindEvent=_bindEvent;
	d.unbindEvent=_unbindEvent;
  	d.addClass=_addClass;
	d.ready = _ready;
    d.attr=_attr;
})();
(function(){
	var d = dojo;
	var _attr = d.attr;
	function _eachNode (node, func , context ) {
		var walkNodes = function(parent) {
			//if (KE.util.getNodeType(parent) != 1) return true;
			var n = parent.firstChild;
			while (n) {
				var next = n.nextSibling;
				if (!func.call( this , n )) return false;
				if (!walkNodes.call( this, n)) return false;
				n = next;
			}
			return true;
		};
		walkNodes.call( context , node);
	};
	function _create (tag, attrs, refNode, pos){
		var doc = d.doc;
		if(typeof tag == "string"){ 
			tag = doc.createElement(tag);
		}
		if(attrs){ 
			_attr(tag, attrs); 
			if(attrs.innerHTML){
				tag.innerHTML = attrs.innerHTML;
			}
		}
		if(refNode){ refNode.appendChild(tag); }
		return tag; // DomNode
	}
	function _place(node, refNode, position){
		if(position){
			if(position===d.BEFORE){
				refNode.parentNode.insertBefore(node, refNode);
			}
		}else{
			refNode.appendChild(node);
		}
	}
	var _bSchedule = true;
	function _createPage(widgetName,param){
		if(_bSchedule){
			dojo.require("com.easysoft.client.control.Table");
			dojo.createObject("com.easysoft.constant.Constant");
			dojo.createObject("com.easysoft.schedule.Schedule");
    		dojo.createObject("com.easysoft.client.service.Service");
			dojo.global.$debug=d.createPageEx("com.easysoft.client.debug.Debug");
			_bSchedule = false;
		}
		//try{
			_createPageEx2(widgetName,param);
		//}catch(e){
			//console.log(e.message);
		//}
	}
	function _initPage(projectName,sid,navIndex){
		if(_bSchedule){
			var projectName=projectName||"easysoft";
			dojo.require("com.easysoft.client.control.Table");
			dojo.createObject("com."+projectName+".client.i18n.I18n");
			dojo.global.$debug=d.createPageEx("com.easysoft.client.debug.Debug");
			dojo.sid=sid||"";
			dojo.navIndex=dojo.isToNumber(navIndex)?parseInt(navIndex):0;
			_bSchedule = false;
		}
	}
	function _getBObject(a){
		var o=dojo.atm(a);
		o.sid=dojo.sid;
		return o;
	}
	function _getBString(url,a){
		var navIndex="navIndex";
		var o=dojo.atm(a);
		o.sid=dojo.sid;
		if(!o[navIndex]){
			o[navIndex]=dojo.navIndex;
		}
		return url+"?"+dojo.querystring.stringify(o);
	}
	function _createPageEx(widgetName,param){
		var o=dojo.createObject(widgetName,param);
		dojo.place(o.domNode,dojo.doc.body);
		return o;
	}
	function _createPageEx2(widgetName,param){
		var o=dojo.createObject(widgetName,param);
		var nDebug = _byId("Debug");
		_place(o.domNode,nDebug,d.BEFORE);
		return o;
	}
	function _byId(id,doc){
		var doc = doc||d.doc;
		return doc.getElementById(id);
	}
	function _addWidget( o , id ){
		if( o && id && o.domNode ){
			if(dojo.isString(id)){
				var node=dojo.byId(id);
			}else{
				var node=id;
			}
			if(node){
				dojo.place(o.domNode,node);
			}
		}
	}
	function _createTable(params){
		return d.createObject($c.c_widget_Table,params);
	}
	d.getBString=_getBString;
	d.getBObject=_getBObject;
	d.createTable=_createTable;
	d.addWidget=_addWidget;
	d.initPage=_initPage;
	d.byId = _byId;
	d.createPageEx = _createPageEx;
	d.createPage = _createPage;
	d.create = _create;
	d.place = _place;
	d.eachNode = _eachNode;
})();