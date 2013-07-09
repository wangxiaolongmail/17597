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
 * Widget widget.
 * 
 * @author wxlwang
 */
dojo.provide("com.easysoft.Widget"); 
dojo.declare( "com.easysoft.Widget" , "" , { 
	m_timerId:0,
	m_timerCountId:1000,
	create:function(){
		console.log(this.widgetName+"::create");
		this.postCreate();
	}, 
	postCreate:function(){},
	postMixInProperties:function(){}, 
	buildRendering:function(){}, 
	destroy:function(){}, 
	_findNotFile:function(res,buf){
		var headers= {};
		headers[$c.c_contentType]=$c.c_contentType_text_html;
		res.writeHead( $c.httpStatusCode404 , headers );
		res.write( buf , dojo.conf.default_charset );
		res.end();
	},
	register:function(){
		this.registerId=++dojo.widgetRegisterId;
		dojo.widgetObjectList[this.registerId]=this;
		return this.registerId;
	},
	addTimer:function(){
		dojo.global.$t.pushMsg(this.registerId,$c.c_onTimer);
	},
	onTimerEx:function(){
	},
	onTimer:function(){
		this.m_timerId--;
		if(this.m_timerId<=0){
			this.onTimerEx();
			this.m_timerId=this.m_timerCountId;
		}else{
			this.addTimer();
		}
	},
	exec:function(op){
		this.beginPaint();
		var cmd = "main("+dojo.toString(op)+")";
		console.log('dojo.db.eval("'+cmd+'");');
		dojo.db.eval(cmd, dojo.hitch(this,this.draw));
	},
	drawDebug:function(data){
		if(ROLE[data[C.ROLE_NAME]][C.IS_DEBUG]){
			var a=[];
			a.push("<script type='text/javascript'>");
			a.push("window.debug="+dojo.toString(data,true));
			a.push("</script>");
			a.push("<script type='text/javascript'>");
			a.push("window.debugInitData="+dojo.toString(dojo.debugInitData,true));
			a.push("</script>");
			return a.join("\n");
		}else{
			return "";
		}
	},
	drawFormEvent:function(){
		return "";
	},
	draw:function(err,data){
		if(!err){
			if(data!=null){
				if(data.ok){
					var s=this.postDraw(data);
					s=s+this.drawFormEvent();
					s=s+this.drawDebug(data);
					this.endPaint(s);
				}else{
					this.endPaint(data.err);
				}
			}else{
				this.endPaint("database exec error");
			}
		}else{
			this.endPaint(dojo.toString(err));
		}
	},
	redirect:function(url){
		this.res.writeHead( 302 , dojo.atm([$c.c_location,url])); 
		this.res.end();
		console.log(this.widgetName+"::redirect--");
		console.log(url);
	},
	beginPaint:function(){
		this.dog.res.writeHead( 200 , {"Content-Type":"text/html"} );
		console.log(this.widgetName+"::beginPaint");
	},
	endPaint:function(s){
		if(s){
			this.dog.res.write( s , "utf-8" );
			this.dog.res.end();
			console.log(this.widgetName+"::endPaint");
		}
	},
	getMenuList:function(data){
		return ROLE[data[C.ROLE_NAME]];
	},
	getbo:function(){
		var op={};
		op[C.CURRENT_URL]=this.dog.m_urlObject.pathname;
		op[C.REMOTE+C.ADDRESS]=this.dog.req.connection.remoteAddress;
		var s=this.dog.req.headers["user-agent"];
		op[C.USER+C.AGENT]=s.replace(/;/g,"");
		op[C.METHOD]=this.dog.req.method.toLowerCase();
		return op;
	}
}); 

dojo.provide("com.easysoft.service.Tempalte"); 
dojo.declare( "com.easysoft.service.Tempalte" , "com.easysoft.Widget" , {
	template_dir:"",
	template_file:"",
	reqList:[],
	create:function(){
		console.log(this.widgetName+"::create");
		this.read_template();
	},
	getDom:function(){
		return dojo.cheerio.load(this.template_text);
	},
     	addReqList:function(v){
		if(v[C.IS_REQUIRED]){
			this.reqList.push(v[C.FIELD]);
		}
	},
	get_schema_list:function(){
		return dojo.clone(SCHEMA[this.table_name][C.LIST]);
	},
	get_form_obj:function(){
		var obj={};
		var a=this.get_schema_list();
		dojo.each(a,function(k,v,i){
			var field=v[C.FIELD];
			var type=v[C.TYPE];
			val=this.queryForm[field];
			if(typeof val != "undefined"){
				if(type==C.PRI){
					obj[field]= parseInt(val);
				}else if(type==C.URL){
					var s= val ;
					if(s.indexOf("http://")<0){
						s="http://"+s;
					}
					obj[field]= s;
				}else{
					obj[field]= val;
				}
			}
		},this);
		return obj;
	},
	_define_schema:function(){},
	define_schema:function(){
		this.reqList=[];
		 var a=this.get_schema_list();
		 dojo.each(a,function(k,v,i){
			this.addReqList(v);
			this._define_schema(k,v,i);
		 },this);
		 return a;
	},
	 drawLinkSelect:function(o,val){
		var a=[];
		a.push("<select name=\""+o[C.FIELD]+"\">");
		if(o[C.LINK]){		
			a.push("<option value=''>");
			a.push("</option>");
			dojo.each(DICT[o[C.LINK]],function(k,v,i){
				if(k===val){
					a.push("<option selected value='"+k+"'>");
					a.push(v);
					a.push("</option>");
				}else{
					a.push("<option value='"+k+"'>");
					a.push(v);
					a.push("</option>");

				}
			});
		}
		a.push("</select");
		return a.join("\n");
	 },
	read_template:function(){
		this.beginPaint();
		this.m_fimename= dojo.dir+this.template_dir+this.template_file;
		var text=dojo.getObject(this.m_fimename, false, dojo.mBuffer,"/");
		if(text){
			this.template_text=text;
			this.postCreate();
		}else{
			console.log("Load:"+this.m_fimename);
			dojo.fs.readFile( this.m_fimename , dojo.conf.default_charset , dojo.hitch( this , function ( err , text ) {
				if( !err ){
					dojo.setObject(this.m_fimename,text,dojo.mBuffer,"/");
					this.template_text=text;
					this.postCreate();
				}else{
					this.endPaint("template file error");
				}
			}));
		}
	}
});
