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
dojo.provide("com.easysoft.service.Logining");
dojo.declare( "com.easysoft.service.Logining" , "com.easysoft.service.Redirect" , {
	success_redirect_url:$c.c_url_001_701,
	error_redirect_url:$c.c_url_001_707,
	db_path:"/_d/maodan/table/user",
	create:function(){
		console.log("com.easysoft.service.Logining::create");
		var a=[],
		I18N=dojo.i18n,
		C=dojo.cst;	
		var o={};
		o[C.USER_NAME] = this.queryForm[C.USER_NAME];
		o[C.PASSWORD] =dojo.md5(this.queryForm[C.PASSWORD]);
		o[C.REMOTE_ADDRESS]=this.dog.req.connection.remoteAddress;
		o[C.STORED_METHOD] ='checkLogining';
		var cmd = "main("+dojo.toString(o)+")";
		console.log('db.eval("'+cmd+'");');
		dojo.db.eval(cmd, dojo.hitch(this,this.doLogin));

	},
	doLogin:function(err,o){
		console.log("----doLogin----");
		var a=[],
		I18N=dojo.i18n,
		C=dojo.cst;	
		if(err){
				var o = dojo.atm([$c.c_cache,""+err,$c.c_Last_Modified,dojo.getTimestamp()]);
				this.dog.echoLast(o);
		}else{
			if(o.ok){
				var url=(o[C.MODULE_LIST])[0][C.MODULE_URL];
				this.set_redirect_url(url+"?sid="+o.sid);
				this.lastPrint();
				dojo.sendMail({title:o[C.USER_NAME]+" loging system successful"});
			}else{
				var o = dojo.atm([$c.c_cache,o.err,$c.c_Last_Modified,dojo.getTimestamp()]);
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