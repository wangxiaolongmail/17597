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
dojo.provide("com.easysoft.service.admin.favorite.InsertSubmit");
dojo.declare( "com.easysoft.service.admin.favorite.InsertSubmit" , "com.easysoft.service.admin.Start" , {
	table_name:C.FAVORITE,
	postCreate:function(){
		var a=[],o={},op={};
		var op=this.getsbo();
		op[C.INSERT+C.OBJECT] =this.get_form_obj();
		op[C.TABLE_NAME] =this.table_name;
		op[C.STORED_METHOD] ='admin_Insert';
		this.exec(op);
    },
	postDraw:function(data){
		if(data[C.IS_DICT]){
			dojo.mixin(DICT,dojo.clone(data[C.DICT]));
		}
		this.redirect("list?"+C.SID+"="+data[C.SID]);
	}
});
