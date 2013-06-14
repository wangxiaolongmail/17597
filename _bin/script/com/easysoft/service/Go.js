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
		var a=[],I18N=dojo.i18n,C=dojo.cst,op={};
		var op=this.getbo();
		this.gotourl = this.queryString["gotourl"];
		op[C.STORED_METHOD] ='goto';
		this.exec(op);
	},
	postDraw:function(data){
		var a=[],I18N=dojo.i18n,C=dojo.cst,op={};
		var url=this.gotourl;
		this.redirect(url);
	}
});
