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
dojo.import("com.easysoft.service.Redirect");
dojo.provide("com.easysoft.service.Logout");
dojo.declare( "com.easysoft.service.Logout" , "com.easysoft.service.Redirect" , {
	create:function(){
		console.log("com.easysoft.service.Logout::create");
		var a=[],
		I18N=dojo.i18n,
		C=dojo.cst;	
		var o={};
		o["sid"] = this.queryString.sid||"0";
		o[C.STORED_METHOD] ='logout';
		var cmd = "main("+dojo.toString(o)+")";
		console.log('db.eval("'+cmd+'");');
		dojo.db.eval(cmd, dojo.hitch(this,this.paint));

	},
	paint:function(err,o){
		console.log("----paint----");
		var a=[],
		I18N=dojo.i18n,
		C=dojo.cst;	
		if(err){
				var o = dojo.atm([$c.c_cache,""+err,$c.c_Last_Modified,dojo.getTimestamp()]);
				this.dog.echoLast(o);
		}else{
			if(o){
				if(o.ok){
					this.set_redirect_url("/e/login");
					this.lastPrint();
				}else{
					var o = dojo.atm([$c.c_cache,o.err,$c.c_Last_Modified,dojo.getTimestamp()]);
					this.dog.echoLast(o);
				}
			}else{
				var o = dojo.atm([$c.c_cache,"db exec error",$c.c_Last_Modified,dojo.getTimestamp()]);
				this.dog.echoLast(o);
			}
		}
	},
	lastPrint:function(){
		this.attachTemplate();
		this.buildRendering();
		this.postCreate();
		this.echo();
	}
});