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
		//test
		
		console.log("---test---start");

		var self=this;
		var user_name = self.queryForm[$c.c_user_name];
		var newPassword=dojo.md5(self.queryForm[$c.c_user_password]);
		
		dojo.db.eval("checkLogining('"+user_name+"','"+newPassword+"')", dojo.hitch(this,this.doLogin));

	},
	doLogin:function(err,o){
		console.log("----doLogin----");
		var self=this;
		if(err){
			console.log("unknow err");
			this.set_redirect_url(this.error_redirect_url);
			this.lastPrint();
		}else{
			if(o.ok){
				self.set_redirect_url(self.success_redirect_url+"?sid="+o.id);
				self.lastPrint();
				dojo.sendMail({title:o.user+" loging system successful"});
			}else{
				this.set_redirect_url(this.error_redirect_url);
				this.lastPrint();
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