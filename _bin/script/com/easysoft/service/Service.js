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
 * Service widget.
 * 
 * @author wxlwang
 */
dojo.provide("com.easysoft.service.Service");
dojo.declare( "com.easysoft.service.Service" , "com.easysoft.service.Tempalte" , {
	templatePath:"com.easysoft.service.templates.Service",
	encoding:dojo.conf.default_charset,
	contentType:"text/html",
	isUseSession:true,
	isLoginErr:true,
	create:function(){ 
		var o=dojo.getObject(this.widgetName,false,dojo.mBuffer);
		if(o){
			this.dog.echoLast(o);
		}else{
			this.attachSession(); 
			this.postMixInProperties();
			this.attachTemplate();
			this.buildRendering();
			this.postCreate();
			var o = dojo.atm([$c.c_cache,this.template,$c.c_Last_Modified,dojo.getTimestamp()]);
			dojo.setObject(this.widgetName,o,dojo.mBuffer);
			this.dog.echoLast(o);
		}
		//var s=dojo.toString(dojo.mBuffer,true);
		//dojo.fs.writeFile("/opt/1.txt",s,dojo.conf.default_charset,function(){});
	},
	echo404:function(err){
		this.dog.findNotFile(err);
	},
	get_domain:function(){
		return "http://"+dojo.conf.DOMAIN_NAME;
	},
	attachSession:function(){
		if(!this.isUseSession)return;
		var sid=this.queryString.sid;
		if(sid){
			if(sid in dojo.sessionList){
				this.session = dojo.sessionList[sid];
				this.sid=sid;
				/*
				if(this.isChangesid){
					var s=dojo.path.basename(this.dog.m_urlObject.pathname);
					if(!(s.indexOf($c.get)===0||s.indexOf($c.post)===0)){
						delete dojo.sessionList[sid];
						this.sid=dojo.getSessionId();
						dojo.sessionList[this.sid]=this.session;
					}
				}
				*/
				this.isLoginErr=false;
			}
		}
	},
	attachSessionDb:function(fn){
		if(!this.isUseSession)return;
		var sid=this.queryString.sid;
		dojo.db.collection('session',function(err,collection){
			collection.findOne({_id:dojo.mongodb.ObjectID(sid)},function(err,item){
				if(item&&!item.isExit){
					console.log("attachSessionDb");
					console.log(item);
					var newUpdateDate=(new Date()).getTime();
					var interval = 20*60*1000;
					if((newUpdateDate-item.updateTime)>interval){
						fn(false, null);
					}else{
						dojo.db.collection('session',function(err,collection){
							var query_doc = {_id:dojo.mongodb.ObjectID(sid)};
							collection.update(query_doc,{'$set':{'updateTime':newUpdateDate}});
							fn(err, item);
						});
					}
					
				}else{
					fn(false, null);
				}
			});
		});
	}
});