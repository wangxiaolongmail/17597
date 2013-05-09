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
	create:function(){this.postCreate();}, 
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
	}
}); 

dojo.provide("com.easysoft.service.Tempalte"); 
dojo.declare( "com.easysoft.service.Tempalte" , "com.easysoft.Widget" , {
		isUseTemplate:true,
		templateString:'', 
		templatePath:'', 
		template:'',
		getTemplate:function(){
			if(!this.isUseTemplate) return "";
			if(this.templateString){ 
				return this.templateString;  
			}else if(this.templatePath){
				return dojo.requireTemplate(this.templatePath);
			}
		},
		_myReplace:function(s,obj){
			for (var k in obj) { 
				var v = obj[k];
				if(typeof v === "string" || typeof v === "number"){
					var re = new RegExp( "\\$\\{"+k+"\\}" , 'ig' );  
					s = s.replace( re , v ); 
				}
			} 
			return s;
		},
		attachTemplate:function(){ 
			var s = this.getTemplate();
			s=this._myReplace(s,$c);
			s=this._myReplace(s,dojo.conf);
			s=this._myReplace(s,this);
			s=this._myReplace(s,this.queryString);
			this.template = s;
		}, 
		buildRendering:function(){
		}
	});