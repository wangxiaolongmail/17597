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
dojo.provide("com.easysoft.service.Go");
dojo.declare( "com.easysoft.service.Go" , "com.easysoft.Widget" , {
	postCreate:function(){
		var a=[],C=dojo.C,op={};
		var op=this.getbo();
		op[C.TO] =this.queryString[C.TO];
		op[C.STORED_METHOD] ='goto';
		this.exec(op);
	},
	postDraw:function(data){
		var C=dojo.C;
		this.redirect(data[C.INPUT][C.TO]);
	}
});
