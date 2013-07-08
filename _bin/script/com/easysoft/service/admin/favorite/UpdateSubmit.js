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
dojo.provide("com.easysoft.service.admin.favorite.UpdateSubmit");
dojo.declare( "com.easysoft.service.admin.favorite.UpdateSubmit" , "com.easysoft.service.admin.Start" , {
	table_name:C.FAVORITE,
	postCreate:function(){
		var op=this.getsbo();
		op[C.UPDATE+C.SUBMIT] =this.get_form_obj();
		op[C.TABLE_NAME] =this.table_name;
		op[C.STORED_METHOD] ='admin_Update';
		this.exec(op); 
	},
	postDraw:function(data){
		this.redirect(C.LIST+"?"+C.SID+"="+data[C.SID]);
	}
});
