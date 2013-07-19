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
dojo.provide("com.easysoft.service.admin.favorite.View");
dojo.declare( "com.easysoft.service.admin.favorite.View" , "com.easysoft.service.admin.Start" , {
	table_name:C.FAVORITE, 
    postCreate:function(){
		var a=[],o={},op={};
		var op=this.getsbo();
		op[C.TABLE_NAME] =this.table_name;
		op[C.TABLE+C.TYPE] =C.FAVORITE_TYPE;
		op[C.STORED_METHOD] ='admin_View';
		this.exec(op);
    },
	postDrawEx:function($,data){
		var s="";
		s+="<h4>"+data.tablename+"</h4>";
		s+="<div class=\"input-append\">";
		s+="<input class=\"span2\" id=\"appendedInputButton\" type=\"text\">";
		s+="<button class=\"btn\" type=\"button\">Go!</button>";
   		s+="</div>";
		s+=this.draw_view1($,data);
		$("#apBody").html(s); 
	}
});
