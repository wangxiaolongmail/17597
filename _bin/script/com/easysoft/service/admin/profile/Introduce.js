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
dojo.provide("com.easysoft.service.admin.profile.Introduce");
dojo.declare( "com.easysoft.service.admin.profile.Introduce" , "com.easysoft.service.admin.Start" , {
	table_name:C.USER,
	postCreate:function(){
		var a=[],o={},op={};
		var op=this.getsbo();
		op[C.TABLE_NAME] =this.table_name;
		op[C.STORED_METHOD] =C.ADMIN;
		this.exec(op);
	},
	postDraw:function($,data){
		return "";
	}
});
