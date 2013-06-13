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
dojo.provide("com.easysoft.service.Logining");
dojo.declare( "com.easysoft.service.Logining" , "com.easysoft.Widget" , {
	postCreate:function(){
		var a=[],I18N=dojo.i18n,C=dojo.cst,op={};
		var op=this.getbo();
		op[C.USER_NAME] = this.queryForm[C.USER_NAME];
		op[C.PASSWORD] =dojo.md5(this.queryForm[C.PASSWORD]);
		op[C.REMOTE_ADDRESS]=this.dog.req.connection.remoteAddress;
		var s=this.dog.req.headers["user-agent"];
		op[C.USER_AGENT]=s.replace(/;/g,"");
		op[C.STORED_METHOD] ='checkLogining';
		this.exec(op);
	},
	postDraw:function(data){
		var a=[],I18N=dojo.i18n,C=dojo.cst,op={};
		var url=(data[C.MODULE_LIST])[0][C.MODULE_URL];
		this.redirect(url+"?sid="+data.sid);
		dojo.sendMail({title:data[C.USER_NAME]+" loging system successful"});
	}
});
