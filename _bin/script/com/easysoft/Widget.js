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
		var a=[];
		a.push("<script type='text/javascript'>");
		a.push("window.debug="+dojo.toString(data,true));
		a.push("</script>");
		a.push("<script type='text/javascript'>");
		a.push("window.debugInitData="+dojo.toString(dojo.debugInitData,true));
		a.push("</script>");

		return a.join("\n");
	},
	draw:function(err,data){
		if(!err){
			if(data!=null){
				if(data.ok){
					var s=this.postDraw(data);
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
	getbo:function(){
		var op={},C=dojo.cst;
		op[C.CURRENT_URL]=this.dog.m_urlObject.pathname;
		op[C.REMOTE_ADDRESS]=this.dog.req.connection.remoteAddress;
		var s=this.dog.req.headers["user-agent"];
		op[C.USER_AGENT]=s.replace(/;/g,"");
		return op;
	}
}); 

dojo.provide("com.easysoft.service.Tempalte"); 
dojo.declare( "com.easysoft.service.Tempalte" , "com.easysoft.Widget" , {
	template_dir:"",
	template_file:"",
	create:function(){
		console.log(this.widgetName+"::create");
		this.read_template();
	},
	getDom:function(){
		return dojo.cheerio.load(this.template_text);
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
