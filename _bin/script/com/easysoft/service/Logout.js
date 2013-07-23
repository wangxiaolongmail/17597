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
dojo.provide("com.easysoft.service.Logout");
dojo.declare( "com.easysoft.service.Logout" , "com.easysoft.Widget" , {
	postCreate:function(){
		var a=[],o={},op={};
		var op=this.getbo();
		op["sid"] = this.queryString.sid;
		op[C.STORED_METHOD] ='admin_Logout';
		this.exec(op);
	},
	draw_get:function(data){
		this.redirect(URL[C.EASYSOFT+C.LOGIN]);
	}
});