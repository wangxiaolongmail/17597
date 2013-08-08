(function(){
	var _d=document,
	_w=window,
	CUR={
		CROSSHAIR:"crosshair",
		MOVE:"move"
	},
	DT={
		NUMBER:"Number",
		ARRAY:"Array",
		HTMLDivElement:"HTMLDivElement",
		SVGPathElement:"SVGPathElement",
		OBJECT:"Object",
		BOOLEAN:"Boolean",
		UNDEFINED:"Undefined",
		STRING:"String"
	},
	C={
		LEFT:"left",
		RIGHT:"right",
		TOP:"top",
		BOTTOM:"bottom",
		WIDTH:"width",
		HEIGHT:"Height",
		DIV:"div",
		ABSOLUTE:"absolute",
		PATH:"path",
		BLOCK:"block",
		NONE:"none",
		borderWIDTH:"borderWidth",
		borderRADIUS:"borderRadius",
		HTTP_W3_SVG:"http://www.w3.org/2000/svg",
		SOLID:"solid"
	},
	COLOR={
		GRAY:"#ddd",
		GRAY_BG:"#eee",
		GREEN:"#666699",
		RED:"#ff9999",
		TOUCH:"#666699",
		POOL:"#FDEADA"
	};
	var data={
		_wc:8,
		id:"my_",
		prefix:"nBody",
		nBodyId:"idbody",
		nBodysvgId:"idsvg",
		nBodysvgGroupId:"idsvgGroup",
		nBodyArrowId:"idarrow",
		lstyle:"fill:white;stroke:#ddd;stroke-width:3",
		shaSingle:true,
		orignPoint:{
			w:12,
			h:12
		},
		borderRadius: 5,
		borderWidth: 2,
		adjustWidth: 6,
		zIndex:1,
		iconWidth:50,
		buttonWidth:100,
		buttonHight:30,
		buttonPadding:2,
		containerWidth:180,
		containerHeight:300,
		containerMargginX:10,
		containerMargginY:10,
		containerMargginGap:10,
		containerPaddingY:60,
		containerPaddingGap:20,
		containerList:[],
		isFix:true,
		isDrag:true,
		isDragShadow:true,
		isAjustAutoX:true,
		isAjustAutoY:true,
		typelist:[],
		list:[],
		listmap:{}
	};
	var shiptypes={
		record:{
			w:120,
			h:30,
			format:function(o){
				o.n=_create(C.DIV);
				var node=_create(C.DIV,{style:{
					position:C.ABSOLUTE,
					left:0,
					top:0,
					width : o.w,
					height : o.h,
					background : COLOR.GRAY_BG,
					borderRadius : o.borderRadius,
					borderStyle:C.SOLID,
					borderWidth:2,
					borderColor:COLOR.GRAY
				}},o.n);
				_create(C.DIV,{style:{paddingLeft:3,paddingTop:3,width:70},innerHTML:o.title},node);
			}
		},
		fatrecord:{
			w:120,
			h:60,
			format:function(o){
				o.n=_create(C.DIV);
				var node=_create(C.DIV,{style:{
					position:C.ABSOLUTE,
					left:0,
					top:0,
					width : o.w,
					height : o.h,
					background : COLOR.GRAY_BG,
					borderRadius : o.borderRadius,
					borderStyle:C.SOLID,
					borderWidth:2,
					borderColor:COLOR.GRAY
				}},o.n);
				_create(C.DIV,{style:{paddingLeft:3,paddingTop:3,width:70},innerHTML:o.title},node);
			}
		},
		fatrecordshut:{
			w:120,
			h:60,
			format:function(o){
				o.n=_create(C.DIV);
				var node=_create(C.DIV,{style:{
					position:C.ABSOLUTE,
					left:0,
					top:0,
					width : o.w,
					height : o.h,
					background : COLOR.GRAY_BG,
					borderRadius : o.borderRadius,
					borderStyle:C.SOLID,
					borderWidth:2,
					borderColor:COLOR.GRAY
				}},o.n);
				var closeNode=_create(C.DIV,{style:{
					position:C.ABSOLUTE,
					top:2,
					right:2,
					width : 12,
					height : 12,
					background : COLOR.GRAY_BG,
					borderRadius : o.borderRadius,
					borderStyle:C.SOLID,
					borderWidth:1,
					borderColor:COLOR.GRAY
				}},node);
				o.oh=_create(C.DIV,{style:{
					position:C.ABSOLUTE,
					top:2,
					right:18,
					width : 12,
					height : 12,
					background : COLOR.GRAY_BG,
					borderRadius : o.borderRadius,
					borderStyle:C.SOLID,
					borderWidth:1,
					borderColor:COLOR.GRAY
				}},node);
				_click(closeNode,function(){
					alert("a");
				});
				_create(C.DIV,{style:{paddingLeft:3,paddingTop:3,width:70},innerHTML:o.title},node);
			}
		}
	}
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
	function _each(a,f){
		if(_is_array(a)){ 
			for(var i=0;i<a.length;i++) {
				f(a[i],i,a);
			}
		}
		if(_is_object(a)){
			for (var i in a) { 
				if (a.hasOwnProperty(i)) { 
					f(a[i],i,a);
				} 
			} 
		}
	}
	function _mixin(src,dest) {
		if( _is_object(src) && _is_object(dest) ){
			_each(src,function(v,k){
				dest[k]=v;
			});
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
	function _click(node,f){
		if(!node) return;
		$(node).click(f);
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
	function __each(a,f,ta){
		var ta=ta||DT;
		function __each_(a){
			_each(a,function(v,k,obj){
				var t=_get_class(v);
				if(_in_array(t,ta)){
					f(v,k,obj);
				}else{
					__each_(v);
				}
			}); 
		}
		__each_(a);
	}
	function _style(node,params){
		var params=params||{};
		__each(params,function(v,k,a){
			if(_in_array(k,[C.LEFT,C.TOP,C.WIDTH,C.HEIGHT,C.borderWIDTH,C.borderRADIUS])){
				a[k]=v+"px";
			}
		},[DT.NUMBER]);
		if($){
			$(node).css(params);
		}else{
			dojo.style(params);
		}
	}
	function _create(tag,params,pnode){
		if(tag===C.PATH){
			var node=_d.createElementNS(C.HTTP_W3_SVG,C.PATH);
			$("#"+data.nBodysvgGroupId).append(node);
			return node;
		}else{			
			var node=$('<'+tag+'></'+tag+'>')[0];
			if(params){
				_style(node,params.style);
				if($){
					$(node).html(params.innerHTML);
					$(node).addClass(params.className);
				}else{
					$(node).html(params.innerHTML);
					$(node).addClass(params.className);
				}
			}
			if(pnode){
				pnode.appendChild(node);
			}else{
				if($){
					$("#"+data.nBodyId).append(node);
				}else{
					$("#"+data.nBodyId).append(node);
				}
			}
			return node;
		}
	}
	function _attr(node,params){
		if($){
			$(node).attr(params);
		}else{
			$(node).attr(params);
		}
	}
	function touchObj(isTouch,dest_obj,src_obj,is_link,dest_i,src_i){
		var obj=data.nTouch;
		if(!obj.n){
			obj.n=_create(C.DIV,{
				style:{
					position:C.ABSOLUTE,
					backgroundColor:COLOR.TOUCH,
					borderRadius:data.borderRadius,
					borderColor:COLOR.TOUCH,
					borderStyle:C.SOLID,
					borderWidth:2
				}
			})
		}
		var node=obj.n;
		if(isTouch){
			obj.isTouch=true;
			obj.src_obj=src_obj;
			obj.dest_obj=dest_obj;
			if(is_link){
				obj.is_link=is_link;
				obj.dest_i=dest_i;
				obj.src_i=src_i;
			}
			_style(node,{
				display:C.BLOCK,
				left:dest_obj.x-data.containerPaddingGap/8,
				top:dest_obj.y-data.containerPaddingGap/8,
				width:dest_obj.w+data.containerPaddingGap/4,
				height:dest_obj.h+data.containerPaddingGap/4
			});
		}else{
			obj.isTouch=false;
			_style(node,{display:C.NONE});
		}
	}
	function swapObj(){
		var obj=data.nTouch;
		if(obj.isTouch){
			var a=[];
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
	function detectionTouch(oo){
		var to=oo;
		touchObj(false);
		_each(data.list,function(item){
			if( item==oo ) return;
			if( collide(to,item) ){
				touchObj(true,item,oo);
			}
		});
	}
	function detectionTouchLink(src_obj,src_i){
		var src_touch_obj=src_obj.links[src_i];
		touchObj(false);
		_each(data.list,function(dest_obj){
			if( dest_obj==src_obj ) return;
			_each(dest_obj.links,function(link,dest_i){
				if( !link.isDrag && collide(src_touch_obj,link) ){
					touchObj(true,dest_obj,src_obj,true,dest_i,src_i);
				}
			});
		});
	}
	function _drawPool(o){
		o.n=_create(C.DIV,{
			innerHTML:o.title,
			style:{
				position: C.ABSOLUTE,
				left : o.x,
				top : o.y,
				width : o.w,
				height : o.h,
				zIndex : -1,
				borderStyle:C.SOLID,
				borderWidth:2,
				borderColor:COLOR.POOL
			}
		});
		o.x2=o.x+o.w;
		o.y2=o.y+o.h;
		o.autoy=data.containerPaddingY;
	}
	function _drawShip(o){
		if(!o.n){
			o.format(o);
		}
		_style(o.n,{
			position: C.ABSOLUTE,
			left : o.x,
			top : o.y,
			zIndex : o.zIndex
		});
		_each(o.links,function(link){
			if(!link.nline){
				link.nline=_create(C.PATH);
			}
		});
	}
	function _drawLink(o,i){
		var link=o.links[i];
		if(!link.n){
			link.n=_create(C.DIV);
			var node=_create(C.DIV,{
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
					borderColor:COLOR.GRAY
				}
			},link.n);
			var node_inner=_create(C.DIV,{
				style:{
					backgroundColor:COLOR.TOUCH,
					position:C.ABSOLUTE,
					left:link.w/4,
					top:link.h/4,
					width:link.w/2,
					height:link.h/2,
					borderWidth:0,
					borderRadius:(link.w/4+1)
				}
			},node);
			if(!link.isDrag){
				_style(node_inner,{ backgroundColor : COLOR.RED });
			}
			if( link.to ){
				_style(node,{ borderColor : COLOR.TOUCH });
			}
			if( _isDestLink(o.id,i) ){
				_style(node,{ borderColor : COLOR.RED});
			}
		}
		_style(link.n,{
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
			if(!xy.isShow){
				xy.x=xy.x+o.w;
			}
			return xy;
		}
	}
	function drawLine(){
		_each(data.list,function(src){
			_each(src.links,function(link){
				_each(link.to,function(item){
					var o1=getLinkPos(link.pos,src);
					var dest=data.listmap[item.id];
					var tmplink=dest.links[item.i];
					var o2=getLinkPos(tmplink.pos,tmplink);
					_drawLineEx(item,o1,o2);
				});
			});
		});
	}
	function _drawLineEx(obj,o1,o2){
		if(!obj.nline){
			obj.nline=_create(C.PATH);
		}
		_drawLine(obj.nline,o1,o2);
	}
	function _drawLine(node,o1,o2){
		var a=[];
		a.push("M "+o1.x+","+o1.y+" ");
		var x=(o2.x-o1.x)/2+o1.x;
		a.push("Q "+x+","+o1.y+" ");
		var y=(o2.y-o1.y)/2+o1.y;
		a.push(" "+x+","+y+" ");
		a.push("T "+(o2.x)+","+o2.y+" ");
		_attr(node,{"d":a.join(""),"marker-end":"url(#"+data.nBodyArrowId+")","style":data.lstyle});
	}
	function _adjustPos(o,x,y){
		if(data.isFix&&_is_number(o.poolid)){
			var house=data.containerList[o.poolid];
			var nx=x>house.x?x:house.x;
			var ny=y>house.y?y:house.y;
			var nx=(nx+o.w)<house.x2?nx:(house.x2-o.w);
			var h=o.h+_getButtonHeight(o);
			var ny=(ny+h)<house.y2?ny:(house.y2-h);
			o.x=nx; o.y=ny;
		}else{
			o.x=x; o.y=y;
		}
	}
	function _adjustPosShadow(o,x,y){
		o.x=x; o.y=y;
	}
	function _adjustAutoX(o){
		if(data.isAjustAutoX&&_is_number(o.poolid)){
			var house=data.containerList[o.poolid];
			var x=(house.w)/2-(o.w)/2;
			o.x=house.x+x;
		}
	}
	function _adjustAutoY(o){
		if(data.isAjustAutoY&&_is_number(o.poolid)){
			var house=data.containerList[o.poolid];
			o.y=house.autoy;
			house.autoy=house.autoy+o.h+_getButtonHeight(o)+data.containerPaddingGap;
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
		_drawLineEx(link,o1,o2);
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
		init();
	}
	function destroy(){
		var w=data.containerList.length*data.containerWidth;
		var h=data.containerHeight;
		var o=_d.getElementById(data.nBodyId);
		o.innerHTML="";
		var a=[];
		a.push("<svg width='"+w+"' height='"+h+"'>");
		a.push("<defs>");
		a.push("<marker id='"+data.nBodyArrowId+"' viewBox='0 0 20 20' refX='0' refY='10' markerUnits='strokeWidth' markerWidth='3' markerHeight='10' orient='auto'>");
		a.push("<path d='M 0 0 L 20 10 L 0 20 z' fill='#AAA' stroke='#ddd'/>");
		a.push("</marker>");
		a.push("</defs>");
		a.push("<g id='"+data.nBodysvgGroupId+"'></g>");
		a.push("</svg>");
		var o=_d.getElementById(data.nBodysvgId);
		o.innerHTML=a.join("");
		__each(data,function(v,k,a){
			a[k]=null;
		},[DT.HTMLDivElement,DT.SVGPathElement]);
		data.listmap={};
		data.nTouch={};
	}
	function init(){
		var x=data.containerMargginX;
		var y=data.containerMargginY;
		var pad=data.containerMargginGap;
		_each(data.containerList,function(o){
			o.w=o.w||data.containerWidth;
			o.h=o.h||data.containerHeight;
			o.y=y;
			o.x=x;
			x=x+o.w+pad;
			_drawPool(o);
		})
		_each(data.list,function(o){
			data.listmap[o.id]=o;
		})
		_each(data.list,function(o){
			o.zIndex=data.zIndex;
			var shiptype=shiptypes[o.typeid]||{};
			_mixin(shiptype,o);
			o.borderRadius=o.borderRadius||data.borderRadius;

			if(o.to&&!o.lstyle) o.lstyle=data.lstyle;
			_adjustPos(o,o.x,o.y);
			_adjustAutoX(o);
			_adjustAutoY(o);
			_drawShip(o);
			__drag({
				oh:o.oh||o.n,
				o:o,
				mousedown:function(params){
					var o=params.o;
					o.zIndex=1000;
					o.n.style.cursor=CUR.MOVE;
					o.bx=o.x;
					o.by=o.y;
				},
				mousemove:function(params,x,y){
					var o=params.o;
					draw(o,o.bx+x,o.by+y);
					detectionTouch(o);
				},
				mouseup:function(){
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
						oh:o.links[i].n,
						o:o,
						i:i,
						mousedown:function(params){
							var o=params.o;
							var i=params.i;
							var link=o.links[i];
							link.n.style.zIndex=1000;
							link.n.style.cursor=CUR.CROSSHAIR;
							o.bx=link.x;
							o.by=link.y;
						},
						mousemove:function(params,x,y){
							var i=params.i;
							var o=params.o;
							drawShadow(o,o.bx+x,o.by+y,i);
							detectionTouchLink(o,i);
						},
						mouseup:function(){
							drawNewLine();
							paint();
						}
					});
				
			});
		})
		drawLine();
	}
	function main(node,params){
		_each(data,function(v,k,a){
			if(k.indexOf(data.prefix)>=0){
				a[k]=data.id+v;
			}
		});
		var a=[];
		a.push("<div id='"+data.nBodyId+"'></div>");
		a.push("<div id='"+data.nBodysvgId+"'></div>");
		node.innerHTML=a.join("");
		_mixin(params,data);
		paint();
		console.log(data);
	}
	var designer={};
	designer=main;
	if($){
		$.designer=designer;
	}else{
		dojo.designer=designer;
	}
})();