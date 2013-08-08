(function(){

var data={
		_wc:8,
		nBodyId:"my",
		nsvgBodyId:"mysvg",
		colorTouch:"#666699",
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
		buttonHight:30,
		buttonWidth:100,
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
			houseid:0,
			links:[
				{pos:"right"}
				]
			},
		{
			id:"s4",
			typeid:2,
			title:"Property2",
			x:500,
			y:70,
			houseid:0,
			links:[
				{pos:"right"}
				]
			},
		{
			id:"s41",
			typeid:2,
			title:"Property3",
			x:500,
			y:70,
			houseid:0
			},
		{
			id:"s42",
			typeid:2,
			title:"Property4",
			x:500,
			y:70,
			houseid:0
			},
		{
			id:"s6",
			typeid:4,
			title:"Property1",
			x:680,
			y:70,
			houseid:1
			},
		{
			id:"s7",
			typeid:4,
			title:"Property2",
			x:680,
			y:70,
			houseid:1,
			links:[
				{pos:"left"}
				]
			},
		{
			id:"s71",
			typeid:4,
			title:"Property3",
			x:680,
			y:70,
			houseid:1,
			links:[
				{pos:"left"}
				]
			},
		{
			id:"s72",
			typeid:4,
			title:"Property4",
			x:680,
			y:70,
			houseid:1
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
		return _get_class(val) === 'Number';
	}
	function _is_array(val) {
		return _get_class(val) === 'Array';
	}
	function _is_boolean(val) {
		return _get_class(val) === 'Boolean';
	}
	function _is_undefine(val) {
		return _get_class(val) === 'Undefined';
	}
	function _each(a,f){
		if(_is_array(a)) for(var i=0;i<a.length;i++) f(a[i],i);
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
		var oh=params.oh,_d=document;
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
	function _style(node,params){
		$(node).css(params||{});
	}
	function _create(tag,params,pnode){
		if(tag==="path"){
			var node=document.createElementNS("http://www.w3.org/2000/svg","path");
			$("#group").append(node);
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
	function detectionTouch(isSameHouse,oo){
		var to=oo;
		touchObj(false);
		_each(data.list,function(item){
			if( item==oo ) return;
			var flag=(oo.houseid==item.houseid)?true:false;
			var flag=isSameHouse?flag:!flag;
			if(flag){
				if( collide(to,item) ){
					touchObj(true,item,oo);
				}
			}
		});
	}
	function detectionTouchLink(isSameHouse,src_obj,src_i){
		var src_touch_obj=src_obj.links[src_i];
		touchObj(false);
		_each(data.list,function(dest_obj){
			if( dest_obj==src_obj ) return;
			var flag=(src_obj.houseid==dest_obj.houseid)?true:false;
			var flag=isSameHouse?flag:!flag;
			if(flag){
				_each(dest_obj.links,function(link,dest_i){
					if( collide(src_touch_obj,link) ){
						touchObj(true,dest_obj,src_obj,true,dest_i,src_i);
					}
				});
			}
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
				//_create("div",{style:{float:"left"},className:typeObj.iconClass},node);
				_create("div",{style:{paddingLeft:"7px",paddingTop:"3px",width:"70px"},innerHTML:o.title},node);
				/*
				if(o.isBranch){
					_each(o.to,function(item){
						var n=_d.createElement("div");
						var sty=n.style;
						sty.width = data.buttonWidth+"px";
						sty.height = data.buttonHight+"px";
						sty.background = o.bg;
						sty.border = o.border;
						sty.borderRadius = o.borderRadius;
						sty.marginTop=data.buttonPadding+"px";
						n.innerHTML=item.title;
						o.wrapButton.appendChild(n);
						item.n=n;
					});
				}
				*/
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
	function _drawElementShadow(obj,i){
		var o=obj.links[i];
		if(!o.n){
			o.n=_create("div");
			var node=_create("div",{
				style:{
					position:"absolute",
					background : data.bg,
					left:"0px",
					top:"0px",
					width:o.w+"px",
					height:o.h+"px",
					border:data.border,
					borderStyle:"dashed",
					borderRadius:(o.w/2+1),
					zIndex : (data.zIndex+1)
				}
			},o.n);
			_create("div",{
				style:{
					backgroundColor : data.colorTouch,
					position:"absolute",
					left:o.w/4+"px",
					top:o.h/4+"px",
					width:o.w/2+"px",
					height:o.h/2+"px",
					borderWidth:"0px",
					borderRadius:(o.w/4+1)
				}
			},node);
		}
		_style(o.n,{
			position : "absolute",
			left : o.x+"px",
			top : o.y+"px",
			zIndex : (data.zIndex+1)
		});
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
		if(pos=="right"){
			return _getLMPoint(o,1,false,1);
		}
		if(pos=="left"){
			return _getRMPoint(o,1,false,1);
		}
	}
	function drawLine(){
		_each(data.list,function(obj){
			_each(obj.links,function(link,i){
				_each(link.to,function(item){
					var o1=getLinkPos(link.pos,link);
					var tmplink=data.listmap[item.id].links[item.i];
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
		_attr(node,{"d":a.join(""),"marker-end":"url(#idArrow)","style":data.lstyle});
	}
	function _adjustPos(o,x,y){
		if(data.isFix&&_is_number(o.houseid)){
			var house=data.containerList[o.houseid];
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
		if(data.isAjustAutoX&&_is_number(o.houseid)){
			var house=data.containerList[o.houseid];
			var x=(house.w)/2-(o.w)/2;
			o.x=house.x+x;
		}
	}
	function _adjustAutoY(o){
		if(data.isAjustAutoY&&_is_number(o.houseid)){
			var house=data.containerList[o.houseid];
			o.y=house.autoy;
			house.autoy=house.autoy+o.h+_getButtonHeight(o)+data.containerPaddingGap;
		}
	}
	function draw(o,x,y){
		_each(data.list,function(obj){
			if(o==obj){
				_adjustPos(o,x,y);
				_drawElement(o);
				_each(o.links,function(item,i){
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
			/*
			_each(data.list,function(o){
				if(_is_array(o.to)&&o.to[0]){
					if(o.to[0].destid==dest.id){
						o.to=[];
					}
				}
			});
			*/
			//o.to=[{destid:dest.id}];
			src.links[obj.src_i].to=[{id:dest.id,i:obj.dest_i}];
			console.log(src);
			console.log(obj);
		}
	}
	function drawShadow(o,x,y,i){
		_each(data.list,function(obj){
			if(o==obj){
				var obj=o.links[i]
				_adjustPosShadow(obj,x,y);
				_drawElementShadow(o,i);
			}
		});
		drawShadowLine(o,i);
	}
	function drawShadowLine(o,i){
		var link=o.links[i];
		if(!link.nline){
			link.nline=_create("path");
		}
		if(link.pos=="right"){
			var o1=_getLMPoint(o,1,false,1);
		}
		if(link.pos=="left"){
			var o1=_getRMPoint(o,1,false,1);
		}
		var o2=_getRMPoint(link,1,false,1);
		_drawLine(link.nline,o1,o2);
	}
	function paint(){
		destroy();
		init();
	}
	function destroy(){
		var _d=document;
		var o=_d.getElementById(data.nBodyId);
		o.innerHTML="";
		var a=[];
		a.push("<svg width='640' height='480'>");
		a.push("<defs>");
		a.push("<marker id='idArrow' viewBox='0 0 20 20' refX='0' refY='10' markerUnits='strokeWidth' markerWidth='3' markerHeight='10' orient='auto'>");
		a.push("<path d='M 0 0 L 20 10 L 0 20 z' fill='#AAA' stroke='#ddd'/>");
		a.push("</marker>");
		a.push("</defs>");
		a.push("<g id='group'></g>");
		a.push("</svg>");
		var o=_d.getElementById(data.nsvgBodyId);
		o.innerHTML=a.join("");
		_each(data.list,function(o){
			o.n=null;
			_each(o.links,function(link){
				link.n=null;
				link.nline=null;
			});
		})
		_each(data.containerList,function(o){
			o.n=null;
		})
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
					detectionTouch(true,o)
				},
				mouseup:function(){
					swapObj();
					paint();
				}
			});
			_each(o.links,function(item,i){
					_make_sha_pos(o,i);
					_drawElementShadow(o,i);
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
							detectionTouchLink(false,o,i);
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
		if(obj.pos=="right"){
			obj.x=o.x+o.w-obj.w/2;
			obj.y=o.y+o.h/2-obj.h/2;
		}
		if(obj.pos=="left"){
			obj.x=o.x-obj.w/2;
			obj.y=o.y+o.h/2-obj.h/2;
		}
	}
	function main(node){
		var a=[];
		a.push("<div id='"+data.nBodyId+"'></div>");
		a.push("<div id='"+data.nsvgBodyId+"'></div>");
		node.innerHTML=a.join("");
		paint();
	}
	
	var designer={};
	designer=main;
	window.designer=designer;

})();