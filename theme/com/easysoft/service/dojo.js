	;(function(){
		try{document.execCommand('BackgroundImageCache',false,true);}catch(e){}
		var win = window,doc=document,d={};
		win.dojo=d;
		d.win=win;
		d.doc=doc;
		function _getClass(object) { 
			return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
		} 
		function _isObject(val){ 
			if (!val) return false;
			return _getClass(val) === 'Object';
		}
		function _isArray(val) { 
			if (!val) return false;
			return _getClass(val) === 'Array'; 
		}
		function _isFunction(val) { 
			if (!val) return false;
			return _getClass(val) === 'Function'; 
		}
		function _isString(val) { 
			if (!val) return false;
			return _getClass(val) === 'String'; 
		}
		d.isString=_isString;
		;function _get(s){
			if(typeof s == "string"){
				return doc.getElementById(s);
			}else if(typeof s == "object"){
				return s;
			}else{
				return null;
			}
		}
		d.get=_get;
		;function _create(tag,attrs){
			var o=doc.createElement(tag);
			for(var k in attrs){
				o[k]=attrs[k];
			}
			return o;
		}
		d.create=_create;
		;function _getBody(){
			return doc.documentElement;
		}
		d.getBody=_getBody;
		;function _getArray( id_name , tag ){
			var oDiv=_get(id_name);
			var a=oDiv.getElementsByTagName(tag);
			return a;
		}
		d.getArray=_getArray;
		;function _bind(el, type, fn) {
			if (el.addEventListener){
				el.addEventListener(type, fn, false);
			} else if (el.attachEvent){
				el.attachEvent('on' + type, fn);
			}
		}
		d.bind=_bind;
		;function _getTarget(e){
			return e.srcElement||e.target;
		}
		d.getTarget=_getTarget;
		;function _stop(e){
			if (e.preventDefault) e.preventDefault();
			if (e.stopPropagation) e.stopPropagation();
			if (e.cancelBubble !== undefined) e.cancelBubble = true;
			if (e.returnValue !== undefined) e.returnValue = false;
		}
		d.stopBubble=_stop;
		;function _each(a,fn){
			var len=a.length;
			for(i=0;i<len;i++)
			{
				if(fn(i,a[i],i,len)){
					break;
				}
			}
		}
		d.each=_each;
		;function _setCls(a,cls){
			var cls=cls||"";
			_each(a,function(k,v){
				v.className=cls;
			});
		}
		d.setCls=_setCls;
	})();