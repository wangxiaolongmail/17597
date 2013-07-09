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
dojo.provide("com.easysoft.service.admin.organize_type.List");
dojo.declare( "com.easysoft.service.admin.organize_type.List" , "com.easysoft.service.admin.favorite.List" , {
	table_name:C.ORGANIZE_TYPE,
    postCreate:function(){
		var a=[],o={},op={};
		var op=this.getsbo();
		op[C.PAGE] =this.queryString[C.PAGE];
		op[C.TABLE_NAME] =this.table_name;
		op[C.STORED_METHOD] ='admin_List';
		this.exec(op);
    },
	postDrawEx:function($,data){
		var metadata=this.define_schema(data);
		var s="";
		s+="<h4>"+data.tablename+"</h4>";
		s+=this.drawButton(data);
		s+="<div class=\"input-append\">";
		s+="<input class=\"span2\" id=\"appendedInputButton\" type=\"text\">";
		s+="<button class=\"btn\" type=\"button\">Go!</button>";
   		s+="</div>";
		s+=this.drawTable(data,metadata);
		s+=this.drawPage(data);
		$("#apBody").html(s);
	}
});
