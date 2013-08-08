(function(){
	var C={
		NUMBER:"Number",
		ARRAY:"Array",
		HTMLDivElement:"HTMLDivElement",
		SVGPathElement:"SVGPathElement",
		OBJECT:"Object",
		BOOLEAN:"Boolean",
		UNDEFINED:"Undefined",
		STRING:"String",
		LEFT:"left",
		RIGHT:"right",
		TOP:"top",
		BOTTOM:"bottom",
		WIDTH:"width",
		HEIGHT:"Height"
	};
	var data={
		_d:document,
		_wc:8,
		id:"my_",
		nBodyId:"idbody",
		nBodysvgId:"idsvg",
		nBodysvgGroupId:"idsvgGroup",
		nBodyArrowId:"idarrow",
		colorTouch:"#666699",
		color:"#ddd",
		lstyle:"fill:white;stroke:#ddd;stroke-width:3",
		shaSingle:true,
		orignPoint:{
			w:12,
			h:12
		},
		bg:"#eee",
		border:"2px solid #ddd",
		borderRadius: "5px",
		borderWidth: 2,
		adjustWidth: 6,
		lmode:2,
		zIndex:1,
		w:120,
		h:30,
		iconWidth:50,
		svgWidth:340,
		svgHeight:380,
		linkPad:5,
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
		containerList:[
			{title:"property list 1:"},
			{title:"property list 2:"}
		],
		isFix:true,
		isDrag:true,
		isDragShadow:true,
		isAjustAutoX:true,
		isAjustAutoY:true,
		typelist:[
			{
				isOnlyIcon:false,
				iconClass:"icon"
			},
			{
				isOnlyIcon:false,
				iconClass:"icon1"
			},
			{
				isOnlyIcon:false,
				iconClass:"icon2"
			},
			{
				isOnlyIcon:false,
				iconClass:"icon3"
			},
			{
				isOnlyIcon:false,
				iconClass:"icon4"
			},
			{
				isOnlyIcon:true,
				iconClass:"icon5"
			}
		],
		list:[
		{
			id:"s3",
			typeid:2,
			title:"Property1",
			x:500,
			y:70,
			poolid:0,
			links:[
				{pos:C.RIGHT,isDrag:true}
				]
			},
		{
			id:"s4",
			typeid:2,
			title:"Property2",
			x:500,
			y:70,
			poolid:0,
			links:[
				{pos:C.RIGHT,isDrag:true}
				]
			},
		{
			id:"s5",
			typeid:2,
			title:"Property3",
			x:500,
			y:70,
			poolid:0,
			links:[
				{pos:C.RIGHT,isDrag:true}
				]
			},
		{
			id:"s6",
			typeid:2,
			title:"Property4",
			x:500,
			y:70,
			poolid:0,
			links:[
				{pos:C.RIGHT,isDrag:true}
				]
			},
		{
			id:"s101",
			typeid:4,
			title:"Property1",
			x:680,
			y:70,
			poolid:1,
			links:[
				{pos:C.LEFT}
				]
			},
		{
			id:"s102",
			typeid:4,
			title:"Property2",
			x:680,
			y:70,
			poolid:1,
			links:[
				{pos:C.LEFT}
				]
			},
		{
			id:"s103",
			typeid:4,
			title:"Property3",
			x:680,
			y:70,
			poolid:1,
			links:[
				{pos:C.LEFT}
				]
			},
		{
			id:"s104",
			typeid:4,
			title:"Property4",
			x:680,
			y:70,
			poolid:1,
			links:[
				{pos:C.LEFT}
				]
			}
		],
		listmap:{}
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
		return _get_class(val) === C.NUMBER;
	}
	function _is_array(val) {
		return _get_class(val) ===  C.ARRAY;
	}
	function _is_div(val) {
		return _get_class(val) ===  C.HTMLDivElement;
	}
	function _is_svgpath(val) {
		return _get_class(val) ===  C.SVGPathElement;
	}
	function _is_object(val) {
		return _get_class(val) ===  C.OBJECT;
	}
	function _is_boolean(val) {
		return _get_class(val) ===  C.BOOLEAN;
	}
	function _is_undefine(val) {
		return _get_class(val) ===  C.UNDEFINED;
	}
	function _is_string(val) {
		return _get_class(val) ===  C.STRING;
	}
	function _each(a,f){
		if(_is_array(a)) for(var i=0;i<a.length;i++) f(a[i],i,a);
		if(_is_object(a)){
			for (var i in a) { 
				if (a.hasOwnProperty(i)) { 
					f(a[i],i,a);
				} 
			} 
		}
	}
	function _map(a,f){
		var arr=[];
		if(_is_array(a)) for(var i=0;i<a.length;i++){
			if(f(a[i],i)){
				arr.push(a[i]);
			}
		}
		return arr;
	}
	function __drag(params){
		var oh=params.oh,_d=data._d;
		oh.onmousedown=function(e){
			var x=e.clientX,y=e.clientY;
			oh.setCapture();
			params.mousedown(params);
			_d.onmousemove=function(e){
				params.mousemove(params,e.clientX-x,e.clientY-y);
			};
			_d.onmouseup=function(){
				oh.releaseCapture();
				_d.onmousemove=_d.onmouseup=null;
				params.mouseup(params);
			};
		};
	}
	function _in_array(s,a){
		var flag=false;
		_each(a,function(v,k){
			if(v==s){
				flag=true;
			}
		});
		return flag;
	}
	function __each(a,f,p){
		p=p||[];
		function _inf(v,k,a,p){
			p.push(k);
			if(_in_array(_get_class(v),[C.STRING,C.BOOLEAN,C.NUMBER,C.HTMLDivElement,C.SVGPathElement])){
				f(v,k,a,p);
			}else{
				__each(v,f,p);
			}
		}
		_each(a,function(v,k,a){
			_inf(v,k,a,p);
		}); 
	}
	function _style(node,params){
		$(node).css(params||{});
	}
	function _create(tag,params,pnode){
		if(tag==="path"){
			var node=data._d.createElementNS("http://www.w3.org/2000/svg","path");
			$("#"+data.nBodysvgGroupId).append(node);
			return node;
		}else{			
			var node=$('<'+tag+'></'+tag+'>')[0];
			if(params){
				_style(node,params.style);
				$(node).html(params.innerHTML);
				$(node).addClass(params.className);
			}
			if(pnode){
				pnode.appendChild(node);
			}else{
				$("#"+data.nBodyId).append(node);
			}
			return node;
		}
	}
	function _attr(node,params){
		$(node).attr(params);
	}
	function touchObj(isTouch,dest_obj,src_obj,is_link,dest_i,src_i){
		var obj=data.nTouch;
		if(!obj.n){
			obj.n=_create("div",{
				style:{
					border:data.border,
					position:"absolute",
					width:data.w+data.containerPaddingGap/4+"px",
					height:data.h+data.containerPaddingGap/4+"px",
					backgroundColor:data.colorTouch,
					borderColor:data.colorTouch,
					borderRadius:data.borderRadius
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
			_style(node,{display:"block"});
			_style(node,{left:(dest_obj.x-data.containerPaddingGap/8)+"px",top:(dest_obj.y-data.containerPaddingGap/8)+"px"});
		}else{
			obj.isTouch=false;
			_style(node,{display:"none"});
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
	function _drawContainer(o){
		o.n=_create("div",{
			innerHTML:o.title,
			style:{
				position: "absolute",
				left : o.x+"px",
				top : o.y+"px",
				width : o.w+"px",
				height : o.h+"px",
				zIndex : -1,
				border : "2px solid #FDEADA"
			}
		});
		o.x2=o.x+o.w;
		o.y2=o.y+o.h;
		o.autoy=data.containerPaddingY;
	}
	function _isLeftLink(o){
		var flag=false;
		_each(o.links,function(link){
			if(link.pos==C.LEFT){
				flag=true;
			}
		});
		return flag;
	}
	function _drawElement(o){
		if(!o.n){
			var typeObj=data.typelist[o.typeid];
			o.n=_create("div");
			if(typeObj.isOnlyIcon){
				_create("div",{className:typeObj.iconClass},o.n);
			}else{
				var node=_create("div",{style:{
					position:"absolute",
					left:"0px",
					top:"0px",
					width : o.w+"px",
					height : o.h+"px",
					background : o.bg,
					border : o.border,
					borderRadius : o.borderRadius
				}},o.n);
				var paddingLeft=_isLeftLink(o)?(2*data.linkPad+data.orignPoint.w):data.linkPad;
				_create("div",{style:{paddingLeft:paddingLeft+"px",paddingTop:"3px",width:"70px"},innerHTML:o.title},node);
			}
		}
		_style(o.n,{
			position: "absolute",
			left : o.x+"px",
			top : o.y+"px",
			zIndex : o.zIndex
		});
		_each(o.links,function(link){
			if(!link.nline){
				link.nline=_create("path");
			}
		});
	}
	function _drawElementShadow(o,i){
		var link=o.links[i];
		if(!link.n){
			link.n=_create("div");
			var node=_create("div",{
				style:{
					position:"absolute",
					background : data.bg,
					left:"0px",
					top:"0px",
					width:link.w+"px",
					height:link.h+"px",
					border:data.border,
					borderStyle:"dashed",
					borderRadius:(link.w/2+1),
					zIndex : (data.zIndex+1)
				}
			},link.n);
			var node_inner=_create("div",{
				style:{
					backgroundColor:data.colorTouch,
					position:"absolute",
					left:link.w/4+"px",
					top:link.h/4+"px",
					width:link.w/2+"px",
					height:link.h/2+"px",
					borderWidth:"0px",
					borderRadius:(link.w/4+1)
				}
			},node);
			if(!link.isDrag){
				_style(node_inner,{ backgroundColor : "#ff9999" });
			}
			if( link.to ){
				_style(node,{ borderColor : data.colorTouch });
			}
			if( _isDestLink(o.id,i) ){
				_style(node,{ borderColor : "#ff9999"});
			}
		}
		_style(link.n,{
			position : "absolute",
			left : link.x+"px",
			top : link.y+"px",
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
		var x=o.x-data._wc+data.w-data.buttonWidth+_adjust(flag,isEnd);
		var y=o.y+o.h-data._wc+i*data.buttonHight+(i+1)*data.buttonPadding+(i+1)*2*data.borderWidth+data.buttonHight/2;
		return {x:x,y:y};
	}
	function getLinkPos(pos,o){
		if(pos==C.RIGHT){
			return _getLMPoint(o,1,false,1);
		}
		if(pos==C.LEFT){
			return _getRMPoint(o,1,false,1);
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
			obj.nline=_create("path");
		}
		//tmp
		var paddingLeft=data.linkPad+data.orignPoint.w/2;
		o2.x=o2.x-paddingLeft;
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
				_drawElement(o);
				_each(o.links,function(link,i){
					_update_sha_pos(o,i);
					_drawElementShadow(o,i);
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
				_drawElementShadow(o,i);
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
	function paint(){
		destroy();
		init();
	}
	function destroy(){
		var _d=data._d;
		var o=_d.getElementById(data.nBodyId);
		o.innerHTML="";
		var a=[];
		a.push("<svg width='"+data.svgWidth+"' height='"+data.svgHeight+"'>");
		a.push("<defs>");
		a.push("<marker id='"+data.nBodyArrowId+"' viewBox='0 0 20 20' refX='0' refY='10' markerUnits='strokeWidth' markerWidth='3' markerHeight='10' orient='auto'>");
		a.push("<path d='M 0 0 L 20 10 L 0 20 z' fill='#AAA' stroke='#ddd'/>");
		a.push("</marker>");
		a.push("</defs>");
		a.push("<g id='"+data.nBodysvgGroupId+"'></g>");
		a.push("</svg>");
		var o=_d.getElementById(data.nBodysvgId);
		o.innerHTML=a.join("");
		__each(data,function(v,k,a,p){
			if(k==="n"||k==="nline"){
				a[k]=null;
			}
		});
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
			_drawContainer(o);
		})
		_each(data.list,function(o){
			data.listmap[o.id]=o;
		})
		_each(data.list,function(o){
			if(o.isHidden) return;
			o.bg=o.bg||data.bg;
			o.lmode=o.lmode||data.lmode;
			o.zIndex=data.zIndex;
			o.w=o.w||data.w;
			o.h=o.h||data.h;
			o.border=o.border||data.border;
			o.borderRadius=o.borderRadius||data.borderRadius;

			if(o.to&&!o.lstyle) o.lstyle=data.lstyle;
			_adjustPos(o,o.x,o.y);
			_adjustAutoX(o);
			_adjustAutoY(o);
			_drawElement(o);
			__drag({
				oh:o.n,
				o:o,
				mousedown:function(params){
					var o=params.o;
					o.zIndex=1000;
					o.n.style.cursor="move";
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
					_drawElementShadow(o,i);
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
							link.n.style.cursor="crosshair";
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
	function _make_sha_pos(o,i){
		var obj=o.links[i];
		obj.w=data.orignPoint.w;
		obj.h=data.orignPoint.h;
		_update_sha_pos(o,i);
	}
	function _update_sha_pos(o,i){
		var obj=o.links[i];
		if(obj.pos==C.RIGHT){
			obj.x=o.x+o.w-obj.w-data.linkPad;
			obj.y=o.y+o.h/2-obj.h/2;
		}
		if(obj.pos==C.LEFT){
			obj.x=o.x+data.linkPad;
			obj.y=o.y+o.h/2-obj.h/2;
		}
	}
	function main(node){
		__each(data,function(v,k,a){
			if(k.indexOf("nBody")>=0){
				a[k]=data.id+v;
			}
		});
		var a=[];
		a.push("<div id='"+data.nBodyId+"'></div>");
		a.push("<div id='"+data.nBodysvgId+"'></div>");
		node.innerHTML=a.join("");
		paint();
	}
	var designer={};
	designer=main;
	window.designer=designer;

})();