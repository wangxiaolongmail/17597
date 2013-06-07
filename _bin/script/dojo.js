/*
 *+--------------------------------------------------------------------------+
 *| Licensed Materials - Property of EasySoft 								 |
 *| (c) Copyright EasySoft Corporation 2011. All Rights Reserved. 			 |
 *| 																		 |
 *|  |
 *|  |
 *+--------------------------------------------------------------------------+
 */
/**
 * 
 * 
 * @author wxlwang
 */
;(function(){
	var d = {
		loadedModules : {},
		loadedTemplates : {},
		hashObject : {},
		txt_extname:".js|.html|.css|.json",
		image_extname:".png|.jpg|.gif|.bmp",
		BEFORE:"before",
		SCRIPT:"script",
		UTF8:"utf-8", 
		EXT_JSON:".json",
		EXT_JS:".js",
		EXT_HTML:".html",
		EXT_CSS:".css",
		testFlag:true,
		firebug:false,
		isClientDebug:false,
		isServerDebug:false,
		iFileName:0,
		widgetRegisterId:0,
		widgetObjectList:{}
	};
	
	d.all_extname=d.txt_extname+"|"+d.image_extname;
	d.binary_extname= d.image_extname;
	var dojo = d;
	d.isDebug=true;
	(function(){
		try{
			d.global = global; 
			d.isServer = true; 
			d.isClient = false; 
		} catch(err) { 
			d.global = window; 
			d.isServer = false; 
			d.isClient = true; 
		} 
	})();
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
	function _trim(str) {
		//return str.replace(/^\s+|\s+$/g, "");
		return str.replace(/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, '');
	}
	function _each(obj, fn , context ) { 
		var flag = false; 
		if ( _isArray(obj) ) { 
			for (var i = 0, len = obj.length; i < len; i++) { 
				if (fn.call(context||obj[i], i, obj[i],i,len) === true) { 
					flag = true; 
					break; 
				} 
			} 
		} else if( _isObject(obj) ){ 
			var i = 0; 
			for (var key in obj) { 
				if (obj.hasOwnProperty(key)) { 
					if (fn.call(context||obj[key], key, obj[key],i) === true) { 
						flag = true; 
						break; 
					} 
					i++; 
				} 
			} 
		} else{
		}
		return flag; 
	}
	function _mixin(t,s){
		if( !_isObject(t) ) return t;
		if( !_isObject(s) ) return t;
		_each(s,function(k,v){
			t[k]=v;
		});
		return t;
	}
	function _filterArray( arr,val ){
		var a=[];
		if( !_isArray(arr) ) return a;
		_each(arr,function(k,v,i){ 
			if(_isFunction(val)){
				if (val(v)){
					a.push(v); 
				}
			}else{
				if (val == v){
					a.push(v);
				}
			}
		});
		return a;
	}
	function _hasArray(arr,val){ 
		return _filterArray( arr , val ).length >0;
	}
	function _toString(a,isbr,isShowCache,ispace){
		function __zfj(isp){
			while(isp>0){
				n+='  ';
				isp--;
			}
		}
		var ispace=ispace||0;
		ispace++;
		if(_isFunction(a)){
            return "0";
    }

		if(_isObject(a)){
			var n="{";
			if(isbr){ n+='\n'; }
			_each(a,function(k,v,i){
				if(i>0){ 
					n += ','; 
					if(isbr){ 
						n+='\n'; 
					} 
				} 
				__zfj(ispace);
				n += "'";
				n += k;
				n += "'";
				n += ":"; 
				if(typeof v ==="string"){
					if( k == "cache" ){
						if(isShowCache){
							n += "'";
							n += v; 
							n += "'";
						}else{
							n += "'";
							n += "..."; 
							n += "'";
						}
					}else{
						n += "'";
						n += v; 
						n += "'";
					}
				}else if(typeof v ==="boolean"){
					if(v){
						n += "true"; 
					}else{
						n += "false"; 
					}
				}else if(typeof v ==="undefined"){
					n += "undefined";
				}else{
					n += _toString(v,isbr,isShowCache,ispace);
				}
			});
			if(isbr) n+='\n'; 
			__zfj(ispace-1);
			n+="}"; 
			return n; 
		}else if(_isArray(a)){ 
			var n = "[";
			_each(a,function(k,v,i){
				if(i>0) n+=",";
				if(_isString(v)){
					n += "'"+v+"'";
				}else{
					n += _toString(v,isbr,isShowCache,ispace);
				}
			}); 
			if(isbr){n+='\n';}
			__zfj(ispace-1);
			n += "]"; 
			return n;
		}else{
			return a||"";
		}
	}
	function _clone(a){ 
		if(_isObject(a)){
			var n={};
			_each(a,function(k,v,i){
				n[k]=_clone(v);
			});
			return n;
		}else if(_isArray(a)){
			var n = [];
			_each(a,function(k,v,i){
				n.push(_clone(v));
			});
			return n;
		} else{
			return a;
		}
	}
	function _toLine(txtValue){
		return txtValue.replace(/[\r|\n]/g,"");
	}
	function _getTimestamp(objDate,pattern){
		var a = objDate||(new Date());
		var _year=a.getFullYear();
		var _month=a.getMonth()+1;
		var _month=_month<=9?("0"+_month):(""+_month);
		var _date=a.getDate();
		var _date=_date<=9?("0"+_date):(""+_date);
		var _hours=a.getHours();
		var _hours=_hours<=9?("0"+_hours):(""+_hours);
		var _minute=a.getMinutes();
		var _minute=_minute<=9?("0"+_minute):(""+_minute);
		var _second=a.getSeconds();
		var _second=_second<=9?("0"+_second):(""+_second);
		var _milSecond = a.getMilliseconds();
		var _milSecond=_milSecond>99?(""+_milSecond):(_milSecond>9?("0"+_milSecond):("00"+_milSecond));
		if(pattern){
			if(pattern==="YYYY-MM-DD HH:MM:SS"){
				var s = _year+"-"+_month+"-"+_date+" "+_hours+":"+_minute+":"+_second;
			}else if(pattern==="YYYY-MM-DD HH:MM:SS MMM"){
				var s = _year+"-"+_month+"-"+_date+" "+_hours+":"+_minute+":"+_second+" "+_milSecond;
			}else if(pattern==="YYYY_MM_DD HH:MM:SS MMM"){
				var s = _year+"_"+_month+"_"+_date+" "+_hours+":"+_minute+":"+_second+" "+_milSecond;
			}else if(pattern==="YYYY_MM_DD__HH_MM_SS__MMM"){
				var s = _year+"_"+_month+"_"+_date+"__"+_hours+"_"+_minute+"_"+_second+"__"+_milSecond;
			}else if(pattern==="YYYY-MM-DD"){
				var s = _year+"-"+_month+"-"+_date;
			}else{
				//YYYYMMDDHHMMSSMMM
				var s = _year+""+_month+_date+_hours+_minute+_second+_milSecond;
			}
		}else{
			//YYYYMMDDHHMMSSMMM
			//var s = _year+""+_month+_date+_hours+_minute+_second+_milSecond;
			var d = a.getTime();
			//var s = Math.round(d/1000);
			var s = d;
		}
		return s;
	}
	function _hitch( obj , fn ){ 
		var _obj = obj; 
		return function(){ 
			fn.apply( _obj, arguments); 
		}; 
	}
	function _getModulePath( moduleName , extendName){ 
		if(!moduleName) return "";
		extendName=extendName||"";
		if(extendName&&extendName[0]!=="."){
			extendName="."+extendName;
		}
		var relpath = moduleName.split(".").join("/") + extendName; 
		return relpath; 
	}
	function _getProp( /*Array*/parts, /*Boolean*/create, /*Object*/context ){ 
		var obj = context || d.global; 
		for(var i=0, p; obj && (p=parts[i]); i++){ 
			obj = (p in obj ? obj[p] : (create ? obj[p]={} : undefined)); 
		} 
		return obj; 
	}
	function _getObject(/*String*/name, /*Boolean?*/create, /*Object?*/context , splitChar ){ 
		var splitChar=splitChar||".";
		if(name[0]==splitChar) name=name.substring(1);
		return _getProp(name.split(splitChar), create, context); 
	} 
	function _setObject(/*String*/name, /*Object*/value, /*Object?*/context , splitChar ){ 
		var splitChar=splitChar||".";
		if(name[0]==splitChar) name=name.substring(1);
		var parts=name.split(splitChar), 
			p=parts.pop(), 
			obj=_getProp(parts, true, context); 
		return obj && p ? (obj[p]=value) : undefined; 
	}
	function _createObjectEx( widgetName, params ) {
		if(!widgetName) return null;
		dojo.require ( widgetName ); 
		var params = params || {}; 
		params.widgetName = widgetName; 
		var widgetConstructor = _getObject( widgetName , false ); 
		if( widgetConstructor ){ 
			var widgetObject = new widgetConstructor(); 
			_mixin(widgetObject,params); 
			return widgetObject; 
		}else{ 
			return null; 
		}
	};
	function _provide( resourceName ){ 
		resourceName = resourceName + ""; 
		return (d.loadedModules[resourceName] = _getObject(resourceName, true ));
	};
	function _declare( _self , _super , param ){  
		var _ctor=function(){}; 
		var _proto;
		if( _super ){ 
			_proto = _createObjectEx( _super ); 
			param.parentWidgetName=_super; 
		}else{
			_proto = new function(){};
			param.parentWidgetName=""; 
		}
		_ctor.prototype = _proto;
		_setObject( _self , _ctor );
		_mixin( _proto , param );
	};
	function _createObject( widgetName, params ) { 
		var obj = _createObjectEx(widgetName, params); 
		if(obj&&obj.create) obj.create();
		return obj;
	};
	function _toObject(str){
		try{
			var o=null;
			eval( "o=("+str+")" );
			return o;
		}catch(new_err){
			return null;
		}
	}
	function _filter(list,fn,ctx){
		var arr=[];
		_each(list,function(k,v,i){
			if(fn.call(ctx,k,v,i)){
				arr.push(v);
			}
		});
		return arr;
	}
	function _isToNumber(ch){
		var re = /^\d+(\.\d+)?$/;
		if(re.test(ch)){
			return true;
		}
		return false;
	}
	function _getMillisecond(){
		return (new Date()).getTime();
	}
	function _getDefaultFileName(){
		return _getMillisecond()+"_"+(++d.iFileName);
	}
	function _getDFileName(s){
		return s.split("_")[0];
	}
	function _toDate(val){
		try{
			var o = new Date(eval(val));
		}catch(err){
			var o = null;
		}
		return o;
	}
	function _sortByFilename(arr){
		//console.log(arr);
		return arr.sort(function(x,y){
			var aa=x["article_filename"].split("_")[0];
			var bb=y["article_filename"].split("_")[0];
			var a=aa.split("");
			var b=bb.split("");
			var arr=a.length>b.length?a:b;
			var flag=false;
			dojo.each(arr,function(k,v,i){
				if(aa.charCodeAt(i)==bb.charCodeAt(i)){
					return false;
				}else{
					if(aa.charCodeAt(i)<bb.charCodeAt(i)){
						flag=true;
					}
					return true;
				}
			});
			return flag;
		});
	}
	function _mpto(s,mapping){
		var s=dojo.toLine(s||"");
		var obj={};
		dojo.each(mapping,function(k,v,i){
			var val="";
			var re="(<[^>]*)(class=\""+v+"\")([^>]*>)(.*?)(</[^>]*)([^>]*>)";
			var re = new RegExp( re , 'ig' );
			s.replace( re , function(){
				val=dojo.trim(arguments[4]);
			});
			obj[v]=val;
		},this);
		return obj;
	}
	function _getPPath(path){
		var arr=path.split("/");
		arr.pop();
		var new_path=arr.join("/");
		return new_path;
	}
	function _isWebFolder(isDirectory,filename){
		return isDirectory&&filename!="image";
	}
	function _map(_a,fn,cotent){
		var a=[];
		dojo.each(_a,function(k,v,i){
			a.push(fn.call(cotent,k,v,i));
		},this);
		return a;
	}
	function _atm(a){
		var o={};
		if(dojo.isArray(a)){
			for(var i=0;i<a.length;i++,i++){
				o[a[i]]=a[i+1];
			}
		}
		return o;
	}
	function _ksort(paramArr){
		var keys=[];
		for(var k in paramArr){
			keys.push(k);
		}
		keys=keys.sort();
		var params={};
		for(var k in keys){
			params[keys[k]]=paramArr[keys[k]];
		}
		return params;
	}
	function _encode(s){
		s = encodeURIComponent(s);
		s = s.replace(/\!/g, "%21");
		s = s.replace(/\*/g, "%2A");
		s = s.replace(/\'/g, "%27");
		s = s.replace(/\(/g, "%28");
		s = s.replace(/\)/g, "%29");
		return s;
	}
	function _parseXML( key_list , s ){
		function getEx(key_list,o,s){
			function get(o,key,s){
				var len=s.length;
				var start=key.length+2;
				var end=s.length-key.length-3;
				o[key]=s.substring(start,end);
			}
			dojo.each(key_array,function(k,v,i){
				if(s&&s.indexOf(v)>0){
					get(o,v,s);
				}
			});
		}
		var key_array=key_list;
		var key_array_string=key_list.join("|");
		var re="(<[^>]?)("+key_array_string+")([^>]*>)(.*?)(</[^>]*)("+key_array_string+")([^>]*>)";
		
		var re = new RegExp( re , 'ig' );
		var a = s.match(re);
		var list=[];
		if(a&&a.length){
			for (var i=0;i<a.length;) {
				var o={};
				dojo.each(key_array,function(k,v,ii){
					getEx(key_list,o,a[i+ii]);
				});
				list.push(o);
				i=i+key_array.length;
			}
		}
		return list;
	}
	function _mts(map){
		var s = "";
		if( !dojo.isObject(map) ) return s;
		dojo.each(map,function(k,v,i){
			if(i) s+="&";
			s+=k;
			s+="=";
			s+=dojo.encode(v);
		});
		return s;
	}
	function _run( objName , methodName , param ){
		if(arguments.length===1){
			var s = arguments[0];
			if(dojo.isString(s)){
				var arr = s.split(",");
			}else if(dojo.isArray(s)){
				var arr = s;
			}else if(dojo.isObject(s)){
				var arr=[s.objName,s.methodName,s.param];
			}else{
				return;
			}
			if(arr.length<3) return;
			var objName=arr.shift();
			var methodName=arr.shift();
		}else{
			if(dojo.isString(param)){
				var arr = param.split(",");
			}else{
				var arr = [param];
			}
		}
		var obj=d.widgetObjectList[objName];
		if(obj){
			if(dojo.isString(methodName)){
				if(methodName){
					obj[methodName].apply(obj,arr);
				}else{
					console.log("_run "+objName+" "+methodName);
				}
			}else if(dojo.isFunction(methodName)){
				methodName.apply(obj,arr);
			}else{
				console.log("_run "+objName+" "+methodName);
			}
		}else{
			console.log("_run "+objName+" "+methodName);
		}
	}
	d.run=_run;
	d.mts=_mts;
	d.atm=_atm;
	d.parseXML=_parseXML;
	d.encode=_encode;
	d.ksort=_ksort;
	d.map=_map;
	d.isWebFolder=_isWebFolder;
	d.mpto=_mpto;
	d.sortByFilename=_sortByFilename;
	d.getPPath=_getPPath;
	d.getDFileName=_getDFileName;
	d.getDefaultFileName=_getDefaultFileName;
	d.getMillisecond=_getMillisecond;
	d.getModulePath = _getModulePath;
	d.getProp=_getProp;
	d.getObject = _getObject;
	d.getClass=_getClass;
	d.toDate=_toDate;
	d.isToNumber=_isToNumber;
	d.toLine=_toLine;
	d.filter=_filter;
	d.toObject=_toObject;
	d.isObject = _isObject;
	d.isFunction = _isFunction;
	d.isArray = _isArray;
	d.isString=_isString;
	d.trim=_trim;
	d.getTimestamp = _getTimestamp;
	d.toString = _toString;
	d.hasArray = _hasArray;
	d.each = _each;
	d.filterArray = _filterArray;
	d.declare = _declare;
	d.setObject = _setObject;
	d.hitch = _hitch;
	d.mixin = _mixin;
	d.provide = _provide;
	d.clone = _clone;
	d.createObject = _createObject;
	d.global.dojo = d;
})();
