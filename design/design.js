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
 * @author wangxiaolongmail@163.com
 * 
 */
(function($,_w,_d,_nav){

	if (!_w.console) {
		_w.console = {};
	}
	if (!_w.console.log) {
		_w.console.log = function () {};
	}
	var 
	dr={},
	data={},
	_VERSION = '1.0.0 (2013-08-18)',
	_ua = _nav.userAgent.toLowerCase(),
	_IE = _ua.indexOf('msie') > -1 && _ua.indexOf('opera') == -1,
	_GECKO = _ua.indexOf('gecko') > -1 && _ua.indexOf('khtml') == -1,
	_WEBKIT = _ua.indexOf('applewebkit') > -1,
	_OPERA = _ua.indexOf('opera') > -1,
	_MOBILE = _ua.indexOf('mobile') > -1,
	_IOS = /ipad|iphone|ipod/.test(_ua),
	_QUIRKS = document.compatMode != 'CSS1Compat',
	_matches = /(?:msie|firefox|webkit|opera)[\/:\s](\d+)/.exec(_ua),
	_V = _matches ? _matches[1] : '0',
	_TIME = new Date().getTime(),
	CUR={
		CROSSHAIR:"crosshair",
		MOVE:"move",
		W_RESIZE:"w-resize",
		N_RESIZE:"n-resize"
	},

	DT={
		NUMBER:"Number",
		ARRAY:"Array",
		HTMLDivElement:"HTMLDivElement",
		SVGPathElement:"SVGPathElement",
		OBJECT:"Object",
		BOOLEAN:"Boolean",
		UNDEFINED:"Undefined",
		STRING:"String",
		POOL:"Pool"
	},

	C={
		LEFT:"left",
		RIGHT:"right",
		TOP:"top",
		BOTTOM:"bottom",
		WIDTH:"width",
		HEIGHT:"height",
		DIV:"div",
		ABSOLUTE:"absolute",
		PATH:"path",
		BLOCK:"block",
		NONE:"none",
		borderWIDTH:"borderWidth",
		borderRADIUS:"borderRadius",
		paddingLEFT:"paddingLeft",
		paddingTOP:"paddingTop",
		paddingRIGHT:"paddingRight",
		paddingBOTTOM:"paddingBottom",
		HTTP_W3_SVG:"http://www.w3.org/2000/svg",
		SOLID:"solid",
		zIndex:"zIndex",
		SRC:"src",
		DELETE:"delete",
		EDIT:"edit",
		FLOAT:"float",
		STYLE:"style",
		innerHTML:"innerHTML",
		className:"className",
		SVG:"svg",
		PX:"px"
	},

	COLOR={
		BLACK:"#000000",
		WHITE:"#FFFFFF",
		GRAY:"#dddddd",
		GRAY_BG:"#eeeeee",
		GREEN:"#666699",
		RED:"#ff9999",
		TOUCH:"#666699",
		POOL:"#B5BCC7",
		BLUE:"#ABD6FF"
	};
	_w.$dr=dr;

	var _conf={
		_wc:0,
		isSP:false,
		totalWidth:900,
		totalHeight:500,
		shaSingle:true,
		orignPoint:{
			w:12,
			h:12
		},
		borderRadius: 5,
		borderWidth: 2,
		poolBorderWidth: 1,
		poolMinWidth: 1,
		adjustWidth: 6,
		zIndex:1,
		iconWidth:50,
		buttonWidth:100,
		buttonHight:30,
		buttonPadding:2,
		containerMargginX:10,
		containerMargginY:10,
		containerMargginGap:10,
		containerPaddingY:60,
		containerPaddingX:60,
		containerPaddingGap:20,
		isDragShadow:true,
		isAjustAutoX:true,
		isAjustAutoY:true
	};
	var shiptypes={
		fatrecord:{
			w:120,
			h:60,
			format:function(o){
				var node=o.divNodeShip;
				if(o.className){
					_create(C.DIV,{className:o.className,style:{float:C.LEFT}},node);
					_create(C.DIV,{style:{paddingLeft:45,paddingTop:9,width:70},innerHTML:o.title},node);
				}else if(o.imagePath){
					var tmp=_create(C.DIV,{style:{float:C.LEFT}},node);
					_create("img",{src:o.imagePath},tmp);
					_create(C.DIV,{style:{paddingLeft:45,paddingTop:9,width:70},innerHTML:o.title},node);
				}else{
					_create(C.DIV,{style:{paddingLeft:3,paddingTop:9,width:70},innerHTML:o.title},node);
				}
			}
		},
		onlyIcon:{
			w:16,
			h:16,
			format:function(o){
				_attr(o.divNodeShip,{className:o.className,style:{borderWidth:0,backgroundColor:""}});
				o.oh=_create(C.DIV,{style:{display:C.NONE}},o.divNodeShip);
			}
		},
		record:{
			w:120,
			h:30,
			format:function(o){
				_create(C.DIV,{style:{paddingLeft:3,paddingTop:3,width:70},innerHTML:o.title},o.divNodeShip);
			}
		}
	};

	function _remove_node(id){
		var obj=null;
		data.list=_map(data.list,function(o){
			if(o.id!=id){
				return true;
			}else{
				obj=o;
				return false;
			}
		});
		return obj;
	}

	function _get_class(object) {
		return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
	}

	function _is_number(val) {
		return _get_class(val) === DT.NUMBER;
	}

	function _is_array(val) {
		return _get_class(val) ===  DT.ARRAY;
	}

	function _is_div(val) {
		return _get_class(val) ===  DT.HTMLDivElement;
	}

	function _is_svgpath(val) {
		return _get_class(val) ===  DT.SVGPathElement;
	}

	function _is_object(val) {
		return _get_class(val) ===  DT.OBJECT;
	}

	function _is_boolean(val) {
		return _get_class(val) ===  DT.BOOLEAN;
	}

	function _is_undefine(val) {
		return _get_class(val) ===  DT.UNDEFINED;
	}

	function _is_string(val) {
		return _get_class(val) ===  DT.STRING;
	}

	function _in_array(s,a){
		var flag=false;
		_each(a,function(v,k){
			if(v===s){
				flag=true;
			}
		});
		return flag;
	}

	function _each(a,f){
		if(_is_array(a)){ 
			for(var i=0;i<a.length;i++) {
				f(a[i],i,a);
			}
		}else if(_is_object(a)){
			for (var i in a) {
				if (a.hasOwnProperty(i)) { 
					f(a[i],i,a);
				} 
			} 
		}
	}

	function _mixin(src,dest) {
		if( _is_object(src) ){
			if(_is_object(dest)){
				_each(src,function(v,k){
					dest[k]=v;
				});
			}else if(_in_array(_get_class(dest),[DT.HTMLDivElement,DT.SVGPathElement])){
				_each(src,function(v,k){
					if(k===C.FLOAT) k=_IE?"styleFloat":"cssFloat";
					dest.style[k]=v;
				});
			}
		}
	}

	function _map(a,f){
		var arr=[];
		if(_is_array(a)) 
			for(var i=0;i<a.length;i++){
				if(f(a[i],i)){
					arr.push(a[i]);
				}
			}
		return arr;
	}
	
	function _hitch( obj , fn ){ 

		var _obj = obj; 
		return function(){ 
			fn.apply( _obj, arguments); 
		}; 
	}

	function __drag(params){
		var oh=params.oh;
		oh.onmousedown=function(e){
			var e = e || _w.event;
			var x=e.clientX,y=e.clientY;
			oh.setCapture();
			params.mousedown(params);
			_d.onmousemove=function(e){
				var e = e || _w.event;
				params.mousemove(params,e.clientX-x,e.clientY-y);
			};
			_d.onmouseup=function(){
				oh.releaseCapture();
				_d.onmousemove=_d.onmouseup=null;
				params.mouseup(params);
			};
		};
	}

	function __each(a,f){
		function __each_(a){
			_each(a,function(v,k,obj){
				if(f(v,k,obj)){
					__each_(v);
				}
			}); 
		}
		__each_(a);
	}

	function _style(node,params){
		_each(params,function(v,k){
			if(_is_number(v)&&!_in_array(k,[C.zIndex])){
				v=v+C.PX;
			}
			node.style[k]=v;
		});
	}

	function _create(tag,params,pnode){
		var pnode=pnode||data._nBodyId;
		if(_in_array(tag,[C.PATH,C.SVG,"g","defs","marker","path"])){
			var node=_d.createElementNS(C.HTTP_W3_SVG,tag);
		}else{
			var node=_d.createElement(tag);
		}
		_attr(node,params);
		pnode.appendChild(node);
		return node;
	}
	
	function _attr(node,params){
		_each(params,function(v,k){
			if(k===C.STYLE){
				if(_is_object(v)){
					_style(node,v);
				}else if(_is_string(v)){
					if(_IE){
						node.style.cssText=v;
					}else{
						node.setAttribute(k,v);
					}
				}
			}else if(_in_array(k,[C.innerHTML,C.className])){
				node[k]=v;
			}else{
				node.setAttribute(k,v);
			}
		});
	}

	function touchObj(params){
		_mixin(params,data.nTouch);
		var obj=data.nTouch;
		if(!obj.divNode){
			obj.divNode=_create(C.DIV,{
				style:{
					position:C.ABSOLUTE,
					borderRadius:data.borderRadius,
					borderColor:COLOR.TOUCH,
					borderStyle:C.SOLID
				}
			})
		}
		_style(obj.divNode,{display:C.NONE});
		if(obj.isTouch){
			var width=obj.dest_obj.borderWidth;
			_style(obj.divNode,{
				display:C.BLOCK,
				left:obj.dest_obj.x-width,
				top:obj.dest_obj.y-width,
				width:obj.dest_obj.w+2*width,
				height:obj.dest_obj.h+2*width,
				borderWidth:width
			});
		}
	}

	function swapObj(){
		var obj=data.nTouch;
		if(obj.isTouch){
			if(obj.dest_obj.isPool){
				obj.src_obj.poolid=obj.dest_obj.poolid;
			}else{
				var a=[];
				var dest_poolid=obj.dest_obj.poolid;
				var src_poolid=obj.src_obj.poolid;
				obj.src_obj.poolid=dest_poolid;
				obj.dest_obj.poolid=src_poolid;
				_each(data.list,function(item){
					if(item==obj.src_obj){
						a.push(obj.dest_obj);
					}else if(item==obj.dest_obj){
						a.push(obj.src_obj);
					}else{
						a.push(item);
					}
				});
				data.list=a;
			}
		}
	}

	function collide(a,b){
		if( 
				a.x+a.w/2 > b.x && 
				a.x+a.w/2 < (b.x+b.w) && 
				(a.y+a.h/2) > b.y && 
				(a.y+a.h/2) < (b.y+b.h)
		){
			return true;
		}else{
			return false;
		}
	}

	function getPool(o){
		var pool=null;
		_each(data.containerList,function(item){
			if(item.poolid==o.poolid){
				pool=item;
			}
		});
		return pool;
	}
	function detectionTouch(oo){
		var to=oo;
		touchObj({isTouch:false});
		var isTouchedShip=false;
		_each(data.list,function(item){
			if( item==oo ) return;
			if( collide(to,item) ){
				isTouchedShip=true;
				touchObj({isTouch:true,dest_obj:item,src_obj:oo});
			}
		});
		if(!isTouchedShip){
			var house=getPool(oo);
			if(house.isEscape){
				_each(data.containerList,function(item,i){
					if( i==oo.poolid ) return;
					if( collide(to,item) ){
						touchObj({isTouch:true,dest_obj:item,src_obj:oo});
					}
				});
			}
		}
	}

	function detectionTouchLink(src_obj,src_i){
		var src_touch_obj=src_obj.links[src_i];
		touchObj({isTouch:false});
		_each(data.list,function(dest_obj){
			if( dest_obj==src_obj ) return;
			_each(dest_obj.links,function(link,dest_i){
				if( link.isShow && !link.isDrag && collide(src_touch_obj,link) ){
					touchObj({isTouch:true,dest_obj:dest_obj,src_obj:src_obj,is_link:true,dest_i:dest_i,src_i:src_i});
				}
			});
		});
	}

	function _drawPool(o){
		o.divNode=_create(C.DIV,{
			style:{
				position: C.ABSOLUTE,
				left : o.x,
				top : o.y,
				width : o.w,
				height : o.h,
				zIndex : data.zIndex,
				borderStyle:C.SOLID,
				borderWidth:data.poolBorderWidth,
				borderColor:COLOR.POOL
			}
		});
		o.borderWidth=data.poolBorderWidth;
		o.x2=o.x+o.w;
		o.y2=o.y+o.h;
		o.autoy=data.containerPaddingY;
		o.autox=data.containerPaddingX;
	}

	function _drawBoundary(o,x,y){
		if(!o.boundary.divNode){
			if(data.isSP){
				o.boundary.divNode=_create(C.DIV,{
					style:{
						position: C.ABSOLUTE,
						left : x,
						top : y,
						width : data.containerMargginGap,
						height : o.h,
						zIndex : data.zIndex,
						borderStyle:C.SOLID,
						borderWidth:0,
						borderColor:COLOR.POOL
					}
				});
				o.boundary.x=x;
				o.boundary.y=y;
			}else{
				o.boundary.divNode=_create(C.DIV,{
					style:{
						position: C.ABSOLUTE,
						left : x,
						top : y,
						width : o.w,
						height : data.containerMargginGap,
						zIndex : data.zIndex,
						borderStyle:C.SOLID,
						borderWidth:0,
						borderColor:COLOR.POOL
					}
				});
				o.boundary.x=x;
				o.boundary.y=y;
			}
		}
		_style(o.boundary.divNode,{
			zIndex : data.zIndex,
			position: C.ABSOLUTE,
			left : x,
			top : y
		});
	}

	function _drawShip(o){
		if(!o.divNode){
			o.divNode=_create(C.DIV);
			o.divNodeShip=_create(C.DIV,{style:{
					position:C.ABSOLUTE,
					left:0,
					top:0,
					width : o.w,
					height : o.h,
					backgroundColor : COLOR.GRAY_BG,
					borderRadius : o.borderRadius,
					borderStyle:C.SOLID,
					borderWidth:data.borderWidth,
					borderColor:o.isFocus?COLOR.BLUE:COLOR.GRAY
				}},o.divNode);
			o.borderWidth=data.borderWidth;
			var right=3;
			if(o.isDelete){
				o.nShipDelete=_create(C.DIV,{
					className:C.DELETE,
					style:{
						position:C.ABSOLUTE,
						top:-7,
						right:right,
						width : 16,
						height : 16,
						borderRadius : o.borderRadius,
						borderStyle:C.SOLID,
						borderWidth:0
				}},o.divNodeShip);
				right+=16+3;
			}
			if(o.isEdit){
				o.nShipEdit=_create(C.DIV,{
					className:C.EDIT,
					style:{
						position:C.ABSOLUTE,
						top:-7,
						right:right,
						width : 16,
						height : 16,
						borderRadius : o.borderRadius,
						borderStyle:C.SOLID,
						borderWidth:0
				}},o.divNodeShip);
			}
			o.format(o);
		}
		_style(o.divNode,{
			position: C.ABSOLUTE,
			left : o.x,
			top : o.y,
			zIndex : o.zIndex
		});
	}

	function _drawLink(o,i){
		var link=o.links[i];
		if(!link.divNode){
			link.divNode=_create(C.DIV);
			link.divNodeLink=_create(C.DIV,{
				style:{
					position:C.ABSOLUTE,
					background : COLOR.GRAY_BG,
					left:0,
					top:0,
					width:link.w,
					height:link.h,
					borderRadius:(link.w/2+1),
					zIndex : (data.zIndex+1),
					borderStyle:C.SOLID,
					borderWidth:2,
					borderColor:o.isFocus?COLOR.BLUE:COLOR.GRAY
				}
			},link.divNode);
			var node_inner=_create(C.DIV,{
				style:{
					backgroundColor:COLOR.TOUCH,
					position:C.ABSOLUTE,
					left:link.w/4,
					top:link.h/4,
					width:link.w/2,
					height:link.h/2,
					borderWidth:0,
					borderRadius:(link.w/4+1),
					fontSize:1
				}
			},link.divNodeLink);
			if(!link.isDrag){
				_style(node_inner,{ backgroundColor : COLOR.RED });
			}
			if( !o.isFocus&&link.to ){
				_style(link.divNodeLink,{ borderColor : COLOR.TOUCH });
			}
			if( !o.isFocus&&_isDestLink(o.id,i) ){
				_style(link.divNodeLink,{ borderColor : COLOR.RED});
			}
		}
		_style(link.divNode,{
			position : C.ABSOLUTE,
			left : link.x,
			top : link.y,
			zIndex : (data.zIndex+1)
		});
	}

	function _isDestLink(id,i){
		var flag=false;
		_each(data.list,function(o){
			_each(o.links,function(link){
				_each(link.to,function(item){
					if(item.id==id&&item.i==i){
						flag=true;
					}
				});
			});
		});
		return flag;
	}

	function _adjust(flag,isEnd){
		return isEnd?flag*data.adjustWidth:0;
	}

	function _getLMPoint(o,flag,isEnd,i){
		var x=o.x+o.w-data._wc+_adjust(flag,isEnd)+2*data.borderWidth;
		var y=o.y+o.h/2-data._wc;
		return {x:x,y:y};
	}

	function _getRMPoint(o,flag,isEnd,i){
		var x=o.x-data._wc+_adjust(flag,isEnd);
		var y=o.y+o.h/2-data._wc;
		return {x:x,y:y};
	}

	function _getTMPoint(o,flag,isEnd,i){
		var y=o.y-data._wc;
		var x=o.x+o.w/2-data._wc+_adjust(flag,isEnd);
		return {x:x,y:y};
	}

	function _getButtonHeight(o){
		if(o.isBranch){
			var len=o.to.length;
			var y=len*(data.buttonHight+data.buttonPadding+2*data.borderWidth);
			return y;
		}else{
			return 0;
		}
	}

	function _getBMPoint(o,flag,isEnd,i){
		var y=o.y+o.h-data._wc+_adjust(flag,isEnd);
		var x=o.x+o.w/2-data._wc;
		y=y+_getButtonHeight(o);
		return {x:x,y:y};
	}

	function _getLBPoint(o,flag,isEnd,i){
		var x=o.x+o.w-data._wc+_adjust(flag,isEnd);
		var y=o.y+o.h-data._wc+i*data.buttonHight+(i+1)*data.buttonPadding+(i+1)*2*data.borderWidth+data.buttonHight/2;
		return {x:x,y:y};
	}

	function _getRBPoint(o,flag,isEnd,i){
		var x=o.x-data._wc+o.w-data.buttonWidth+_adjust(flag,isEnd);
		var y=o.y+o.h-data._wc+i*data.buttonHight+(i+1)*data.buttonPadding+(i+1)*2*data.borderWidth+data.buttonHight/2;
		return {x:x,y:y};
	}

	function getLinkPos(pos,o){
		if(pos==C.RIGHT){
			return _getLMPoint(o,1,false,1);
		}
		if(pos==C.LEFT){
			var xy=_getRMPoint(o,1,false,1);
			if(!o.isShow){
				xy.x=xy.x+o.w-7;
			}else{
				xy.x=xy.x-7;
			}
			return xy;
		}
	}

	function drawLine(){
		_each(data.list,function(src){
			if(!src.divNodeShip) return;
			_each(src.links,function(link){
				_each(link.to,function(item){
					var o1=getLinkPos(link.pos,src);
					var dest=data.listmap[item.id];
					if(!dest.divNodeShip) return;
					var tmplink=dest.links[item.i];
					var o2=getLinkPos(tmplink.pos,tmplink);
					_drawLineEx(item,o1,o2,src);
				});
			});
		});
	}

	function _drawLineEx(obj,o1,o2,srcShip){
		if(_IE){
		}else{			
			if(!obj.pathNode){
				obj.pathNode=_create(C.PATH,null,data._nBodysvgGroupId);
			}
			_drawLine(obj.pathNode,o1,o2,srcShip);
		}
	}

	function _drawLine(node,o1,o2,srcShip){
		var a=[];
		a.push("M "+o1.x+","+o1.y+" ");
		var x=(o2.x-o1.x)/2+o1.x;
		a.push("Q "+x+","+o1.y+" ");
		var y=(o2.y-o1.y)/2+o1.y;
		a.push(" "+x+","+y+" ");
		a.push("T "+(o2.x)+","+o2.y+" ");
		if(srcShip.isFocus){
			var stroke=COLOR.BLUE;
			var marker_end="url(#focusArraw)";
		}else{
			var stroke=COLOR.GRAY;
			var marker_end="url(#Arraw)";
		}
		var style={fill:COLOR.WHITE,stroke:stroke,strokeWidth:data.borderWidth};
		_attr(node,{d:a.join(""),"marker-start":"url(#markerStartArrow)","marker-end":marker_end,style:style});
	}

	function _adjustPos(o,x,y){
		var house=getPool(o);
		if(house.isEscape){
			o.x=x; o.y=y;
		}else{
			var nx=x>house.x?x:house.x;
			var ny=y>house.y?y:house.y;
			var nx=(nx+o.w)<house.x2?nx:(house.x2-o.w);
			var h=o.h+_getButtonHeight(o);
			var ny=(ny+h)<house.y2?ny:(house.y2-h);
			o.x=nx; o.y=ny;
		}
	}

	function _adjustPosShadow(o,x,y){
		o.x=x; o.y=y;
	}

	function _adjustAutoX(o,house){
		if(data.isSP){
			if(data.isAjustAutoX){
				var x=(house.w)/2-(o.w)/2;
				o.x=house.x+x;
			}
		}else{
			if(data.isAjustAutoX){
				o.x=house.autox;
				house.autox=house.autox+o.w+data.containerPaddingGap;
			}
		}
	}

	function _adjustAutoY(o,house){
		if(data.isSP){
			if(data.isAjustAutoY){
				o.y=house.autoy;
				house.autoy=house.autoy+o.h+_getButtonHeight(o)+data.containerPaddingGap;
			}
		}else{
			if(data.isAjustAutoY){
				var y=(house.h)/2-(o.h)/2;
				o.y=house.y+y;
			}
		}
	}

	function draw(o,x,y){
		_each(data.list,function(obj){
			if(o==obj){
				_adjustPos(o,x,y);
				_drawShip(o);
				_each(o.links,function(link,i){
					_update_sha_pos(o,i);
					if(!link.isShow) return;
					_drawLink(o,i);
				});
			}
		});
		drawLine();
	}

	function drawNewLine(){
		var obj=data.nTouch;
		if(obj.isTouch){
			var src=obj.src_obj;
			var dest=obj.dest_obj;
			_each(data.list,function(o){
				_each(o.links,function(link){
					_each(link.to,function(item){
						if(item.id==dest.id){
							link.to=null;
						}
					});
				});
			});
			src.links[obj.src_i].to=[{id:dest.id,i:obj.dest_i}];
		}
	}

	function drawShadow(o,x,y,i){
		_each(data.list,function(obj){
			if(o==obj){
				var link=o.links[i]
				_adjustPosShadow(link,x,y);
				_drawLink(o,i);
			}
		});
		drawShadowLine(o,i);
	}

	function drawShadowLine(o,i){
		var link=o.links[i];
		var o1=getLinkPos(link.pos,o);
		var o2=_getRMPoint(link,1,false,1);
		_drawLineEx(link,o1,o2,o);
	}

	function _make_sha_pos(o,i){
		var obj=o.links[i];
		obj.w=data.orignPoint.w;
		obj.h=data.orignPoint.h;
		_update_sha_pos(o,i);
	}

	function _update_sha_pos(o,i){
		var obj=o.links[i];
		if(obj.pos==C.RIGHT){
			obj.x=o.x+o.w;
			obj.y=o.y+o.h/2-obj.h/2;
		}
		if(obj.pos==C.LEFT){
			obj.x=o.x-obj.w;
			obj.y=o.y+o.h/2-obj.h/2;
		}
	}

	function paint(){
		destroy();
		_createFrame();
		init();
		data.customPaint();
	}

	function _createFrame(){
		
		var node=data.node;
		node.innerHTML="";
		if(data.isSP){
			if(!data.configContainerWidth){
				var len=data.containerList.length;
				var totalWidth=data.totalWidth;
				var i=0;
				data.configContainerWidth=true;
				_each(data.containerList,function(item){
					if(_is_number(item.w)){
						totalWidth=totalWidth-item.w;
						totalWidth=totalWidth-data.containerMargginGap;
						totalWidth=totalWidth-2*data.poolBorderWidth;
						i++;
					}
				});
				totalWidth=totalWidth-2*data.containerMargginX;
				len=len-i;
				totalWidth=totalWidth-(len-1)*data.containerMargginGap;
				data.containerWidth=(totalWidth/len)-2*data.poolBorderWidth;
				data.containerHeight=data.totalHeight-2*data.containerMargginY-4;
			}
		}else{
			if(!data.configContainerHeight){
				var len=data.containerList.length;
				var totalHeight=data.totalHeight;
				var i=0;
				data.configContainerHeight=true;
				_each(data.containerList,function(item){
					if(_is_number(item.w)){
						totalHeight=totalHeight-item.h;
						totalHeight=totalHeight-data.containerMargginGap;
						totalHeight=totalHeight-2*data.poolBorderWidth;
						i++;
					}
				});
				totalHeight=totalHeight-2*data.containerMargginX;
				len=len-i;
				totalHeight=totalHeight-(len-1)*data.containerMargginGap;
				data.containerHeight=(totalHeight/len)-2*data.poolBorderWidth;
				data.containerWidth=data.totalWidth-2*data.containerMargginY-4;
			}
		}
		var sizeObj={width:data.totalWidth,height:data.totalHeight};
		var node=_create(C.DIV,{id:data.id,style:sizeObj},node);
		var tmp=_create(C.DIV,{style:{position:C.ABSOLUTE}},node);
		data._nBodyId=_create(C.DIV,null,tmp);
		if(_IE){
		}else{
			_createSvg(sizeObj,tmp);
		}
		
	}
	function _createSvg(sizeObj,tmp){
		
		var _nBodysvg=_create("svg",sizeObj,tmp);
		var defs=_create("defs",null,_nBodysvg);

			var marker=_create("marker",{
					id:'Arraw',
					viewBox:'0 0 20 20',
					refX:'0',refY:'10',
					markerUnits:'strokeWidth',
					markerWidth:'3',
					markerHeight:'10',
					orient:'auto'
				},defs);

			_create("path",{ 
				d:'M 0 0 L 20 10 L 0 20 z',
				fill:_darkColor(COLOR.GRAY),
				stroke:COLOR.GRAY
			},marker);

			var marker=_create("marker",{
					id:'focusArraw',
					viewBox:'0 0 20 20',
					refX:'0',refY:'10',
					markerUnits:'strokeWidth',
					markerWidth:'3',
					markerHeight:'10',
					orient:'auto'
				},defs);

			_create("path",{ 
				d:'M 0 0 L 20 10 L 0 20 z',
				fill:_darkColor(COLOR.BLUE),
				stroke:COLOR.BLUE
			},marker);

			var marker=_create("marker",{
					id:'markerStartArrow',
					viewBox:'0 0 30 30',
					refX:'10',refY:'25',
					markerUnits:'strokeWidth',
					markerWidth:'9',
					markerHeight:'20',
					orient:'auto'
				},defs);

			_create("path",{ 
				d:'M0,25,A12.5,12.5,0,1,1,0,25.01Z'
			},marker);

		data._nBodysvgGroupId=_create("g",null,_nBodysvg);
	}
	function destroy(){
		__each(data,function(v,k,a){
			var type=_get_class(v);
			if(_is_string(k)&&k.indexOf("Node")>=0){
				a[k]=null;
			}
			if(_in_array(type,[DT.OBJECT])){
				if(v&&v.all){
					return false;
				}
				return true;
			}
			if(_in_array(type,[DT.ARRAY])){
				return true;
			}
		});
		data.listmap={};
		data.nTouch={};
	}

	function init(){
		var x=data.containerMargginX;
		var y=data.containerMargginY;
		var pad=data.containerMargginGap;
		_each(data.containerList,function(o,i){
			if(data.isSP){
				o.w=o.w||data.containerWidth;
				o.h=o.h||data.containerHeight;
				o.y=y;
				o.x=x;
				x=x+o.w+pad;
				_drawPool(o);
				if(data.containerList.length-1>i){
					o.boundary=o.boundary||{};
					_drawBoundary(o,o.x+o.w,o.y);
					if( !o.boundary.isDrag ) return;
					__drag({
						data:data,
						oh:o.oh||o.boundary.divNode,
						o:o,
						nexto:data.containerList[i+1],
						mousedown:function(params){
							data=params.data;
							var o=params.o;
							_style(o.boundary.divNode,{backgroundColor:COLOR.BLUE});
							o.zIndex=1000;
							o.boundary.divNode.style.cursor=CUR.W_RESIZE;
							o.bx=o.boundary.x;
							o.by=o.boundary.y;
							o.vx=0;
						},
						mousemove:function(params,x,y){
							var o=params.o;
							var nexto=params.nexto;
							if(x>0){
								if(nexto.w-x<0){
									x=nexto.w;
								}
							}else{
								if(o.w+x<0){
									x=-1*o.w;
								}
							}
							o.vx=x;
							_drawBoundary(o,o.bx+x,o.by);
						},
						mouseup:function(params){
							var o=params.o;
							o.w=o.w+o.vx;
							if(o.w<=0){
								o.w=data.poolMinWidth;
							}
							var nexto=params.nexto;
							nexto.w=nexto.w-o.vx;
							if(nexto.w<=0){
								nexto.w=data.poolMinWidth;
							}
							paint();
						}
					});
				}
			}else{
				o.w=o.w||data.containerWidth;
				o.h=o.h||data.containerHeight;
				o.y=y;
				o.x=x;
				y=y+o.h+pad;
				_drawPool(o);
				if(data.containerList.length-1>i){
					o.boundary=o.boundary||{};
					_drawBoundary(o,o.x,o.y+o.h);
					if( !o.boundary.isDrag ) return;
					__drag({
						data:data,
						oh:o.oh||o.boundary.divNode,
						o:o,
						nexto:data.containerList[i+1],
						mousedown:function(params){
							data=params.data;
							var o=params.o;
							_style(o.boundary.divNode,{backgroundColor:COLOR.BLUE});
							o.zIndex=1000;
							o.boundary.divNode.style.cursor=CUR.N_RESIZE;
							o.bx=o.boundary.x;
							o.by=o.boundary.y;
							o.vx=0;
							o.vy=0;
						},
						mousemove:function(params,x,y){
							var o=params.o;
							var nexto=params.nexto;
							if(y>0){
								if(nexto.h-y<0){
									y=nexto.h;
								}
							}else{
								if(o.h+y<0){
									y=-1*o.h;
								}
							}
							o.vy=y;
							_drawBoundary(o,o.bx,o.by+y);
						},
						mouseup:function(params){
							var o=params.o;
							o.h=o.h+o.vy;
							if(o.h<=0){
								o.h=data.poolMinWidth;
							}
							var nexto=params.nexto;
							nexto.h=nexto.h-o.vy;
							if(nexto.h<=0){
								nexto.h=data.poolMinWidth;
							}
							paint();
						}
					});
				}
			}
		})
		_each(data.list,function(o){
			data.listmap[o.id]=o;
		})
		_each(data.list,function(o){
			var house=getPool(o);
			if(data.isSP){
				if( house.w < o.w ) return;
			}else{
				if( house.h < o.h ) return;
			}
			o.zIndex=data.zIndex;
			var shiptype=shiptypes[o.typeid]||{};
			_mixin(shiptype,o);
			o.borderRadius=o.borderRadius||data.borderRadius;
			_adjustPos(o,o.x,o.y);
			_adjustAutoX(o,house);
			_adjustAutoY(o,house);
			_drawShip(o);
			__drag({
				data:data,
				oh:o.oh||o.divNode,
				o:o,
				mousedown:function(params){
					data=params.data;
					var o=params.o;
					_each(data.list,function(ship){
						ship.isFocus=false;
					});
					o.isFocus=true;
					_style(o.divNodeShip,{borderColor:COLOR.BLUE});
					_each(o.links,function(link){
						if(link.isShow){
							_style(link.divNodeLink,{borderColor:COLOR.BLUE});
						}
					});
					o.zIndex=1000;
					o.divNode.style.cursor=CUR.MOVE;
					o.bx=o.x;
					o.by=o.y;
				},
				mousemove:function(params,x,y){
					var o=params.o;
					draw(o,o.bx+x,o.by+y);
					detectionTouch(o);
				},
				mouseup:function(params){
					data=params.data;
					swapObj();
					paint();
				}
			});
			_each(o.links,function(link,i){
					_make_sha_pos(o,i);
					if(!link.isShow) return;
					_drawLink(o,i);
					if(!link.isDrag) return;
					__drag({
						data:data,
						oh:o.links[i].divNode,
						o:o,
						i:i,
						mousedown:function(params){
							data=params.data;
							var o=params.o;
							var i=params.i;
							var link=o.links[i];
							link.divNode.style.zIndex=1000;
							link.divNode.style.cursor=CUR.CROSSHAIR;
							o.bx=link.x;
							o.by=link.y;
						},
						mousemove:function(params,x,y){
							data=params.data;
							var i=params.i;
							var o=params.o;
							drawShadow(o,o.bx+x,o.by+y,i);
							detectionTouchLink(o,i);
						},
						mouseup:function(params){
							data=params.data;
							drawNewLine();
							paint();
						}
					});
				
			});
		})
		drawLine();
	}

	function _darkColor(beginColor,endColor)
	{
		var endColor=endColor||COLOR.BLACK;
		var begin = getRGB(beginColor);
		var curColor = getRGB(beginColor);
		var end = getRGB(endColor);
		var bo = true;
		var rate = getRate(begin, end);
        curColor.r = getCur(begin.r, end.r, curColor.r, bo, rate.r);
        curColor.g = getCur(begin.g, end.g, curColor.g, bo, rate.g);
        curColor.b = getCur(begin.b, end.b, curColor.b, bo, rate.b);
        return getColor(curColor);
	}

	function getCur(beginValue, endValue, curValue, bo, rateValue)
	{
	    if(beginValue == endValue)
	    {
	        return beginValue;
	    }
	    
	    rateValue = beginValue < endValue ? rateValue : -rateValue;
	    curValue += bo ? rateValue : -rateValue;
	    if(curValue < Math.min(beginValue, endValue))
	    {
	        curValue = Math.min(beginValue, endValue);
	    }
	    if(curValue > Math.max(beginValue, endValue))
	    {
	        curValue = Math.max(beginValue, endValue);
	    }
	    
	    return curValue;
	}

	function getRate(b, e)
	{
	    var obj = new Object();
	    obj.r = Math.abs(b.r - e.r) / 5;
	    obj.g = Math.abs(b.g - e.g) / 5;
	    obj.b = Math.abs(b.b - e.b) / 5;
	    
	    return obj;
	}

	function getRGB(color)
	{
	    var obj = new Object();
	    obj.r = parseInt(color.substr(1,2), 16);
	    obj.g = parseInt(color.substr(3,2), 16);
	    obj.b = parseInt(color.substr(5,2), 16);
	    
	    return obj;
	}

	function getColor(obj)
	{
	    obj.r = Math.round(obj.r);
	    obj.g = Math.round(obj.g);
	    obj.b = Math.round(obj.b);
	    var color = '#';
	    color += (obj.r < 16 ? '0':'') + obj.r.toString(16);
	    color += (obj.g < 16 ? '0':'') + obj.g.toString(16);
	    color += (obj.b < 16 ? '0':'') + obj.b.toString(16);
	    
	    return color;
	}
	
	function self_checking(){
		var flag=true;
		var error="Error ";
		return flag;
	}

	function main(node,params,_shiptypes){
		
		var inst={
			containerList:[],
			typelist:[],
			list:[],
			listmap:{},
			customPaint:function(){}
		};
		data=inst;
		_mixin(_conf,data);
		_mixin(_shiptypes,shiptypes);
		_mixin(params,data);
		_each(data.containerList,function(item,i){
			item.isPool=true;
		});
		data.node=node;
		if( self_checking() ){
			paint();
		}
		return data;
	}

	dr.C=C;
	dr.COLOR=COLOR;
	dr.main=main;
	dr.create=_create;
	dr.style=_style;
	dr.each=_each;

})(null,window,document,navigator);