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
dojo.import("com.easysoft.service.Login");
dojo.provide("com.easysoft.service.Logining2");
dojo.declare( "com.easysoft.service.Logining2" , "com.easysoft.service.Logining" , {
	postCreate:function(){
		var a=[],op={};
		var op=this.getbo();
		op[C.MID] = this.queryForm[C.MID];
		op[C.CHECK_CODE] =this.queryForm[C.CHECK_CODE];
		op[C.STORED_METHOD] ='Logining2';
		this.exec(op);
	},
	postDraw:function(data){
		this.enterSystem(data);
	}
});
