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
 * Index widget.
 * 
 * @author wxlwang
 */
dojo.import("com.easysoft.Widget");
dojo.import("com.easysoft.constant.Constant");
dojo.import("com.easysoft.zoo.Spider");
dojo.import("com.easysoft.zoo.Dog");
dojo.import("com.easysoft.schedule.Schedule");

dojo.provide("com.easysoft.zoo.Elephant");
dojo.declare("com.easysoft.zoo.Elephant","com.easysoft.Widget",{
	postCreate:function(){
		dojo.$ele=this;
		this.init(); 
		dojo.http.createServer(dojo.hitch(this,function(req,res){
			try{
				
				var remoteAddress=dojo.toString(req.connection.remoteAddress);
				if( remoteAddress != dojo.conf.DOMAIN_IP &&  remoteAddress != dojo.conf.default_vm_ip ){
					var timestamp=new Date().getTime();
					//console.log("req.headers:"+timestamp+":"+dojo.toString(req.headers));
					//console.log("req.connection.remoteAddress:"+timestamp+":"+dojo.toString(req.connection.remoteAddress));
					//console.log("req.method:"+timestamp+":"+dojo.toString(req.method));
					var timestamp=new Date();
					refer=req.headers.referer||req.headers.refer;
					console.log("request|"+timestamp+"|"+dojo.toString(req.method)+"|"+dojo.toString(req.connection.remoteAddress)+"|"+req.headers["user-agent"]+"|"+refer);
				}
				dojo.createObject("com.easysoft.zoo.Dog",{ req:req , res:res });
			}
			catch(err){
				this._findNotFile(res,"source:elephant,"+err);
			}
		})).listen(dojo.conf.port);
	},
	init:function(){
		dojo.import("route");
		var widgetNameSpider="com.easysoft.zoo.Spider";
		return;
		dojo.createObject("com.easysoft.cmd.ipconfig",{fn:function(listIp){
			dojo.localListIp=listIp;
			console.log(listIp);
		}});  
		//dojo.createObject("com.easysoft.cmd.restartWebContainer",{});
		if(dojo.conf.port==$c.c_port_9080){
			dojo.createObject("com.easysoft.test.TestWeb",{});
		}
	}
});