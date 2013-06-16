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
		var a=[],o={},op={},C=dojo.C;
		var op=this.getbo();
		op["sid"] = this.queryString.sid;
		op[C.STORED_METHOD] ='logout';
		console.log(this.queryString);
		console.log(op);
		this.exec(op);

	},
	postDraw:function(data){
		var a=[],o={},op={},C=dojo.C;
		this.redirect(data[C.MODULE_URL]);
	}
});