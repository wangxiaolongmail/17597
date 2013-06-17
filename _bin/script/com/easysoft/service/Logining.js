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
		var a=[],C=dojo.C,op={};
		var op=this.getbo();
		op[C.USER_NAME] = this.queryForm[C.USER_NAME];
		op[C.PASSWORD] =dojo.md5(this.queryForm[C.PASSWORD]);
		op[C.MID] = this.queryForm[C.MID];
		op[C.CHECK_CODE] = this.queryForm[C.CHECK_CODE];
		op[C.STORED_METHOD] ='logining';
		this.exec(op);
	},
	postDraw:function(data){
		var a=[],C=dojo.C,op={};
		var url=(data[C.MODULE_LIST])[0][C.MODULE_URL];
		this.redirect(url+"?sid="+data.sid);
		dojo.sendMail({title:data[C.USER_NAME]+" loging system successful"});
	}
});
