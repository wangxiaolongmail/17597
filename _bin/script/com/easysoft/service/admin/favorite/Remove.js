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
dojo.provide("com.easysoft.service.admin.favorite.Remove");
dojo.declare( "com.easysoft.service.admin.favorite.Remove" , "com.easysoft.service.admin.favorite.Add" , {
	table_name:C.FAVORITE,
       postCreate:function(){
		var op=this.getsbo();
		op[C.RMID] =this.queryString[C.RMID];;
		op[C.TABLE_NAME] =this.table_name;
		op[C.STORED_METHOD] ='admin_Remove';
		this.exec(op);
       },
	postDraw:function(data){
		this.redirect("list?"+C.SID+"="+data[C.SID]);
	}
});
