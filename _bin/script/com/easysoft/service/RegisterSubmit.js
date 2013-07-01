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
dojo.import("com.easysoft.service.Tempalte");
dojo.provide("com.easysoft.service.RegisterSubmit");
dojo.declare( "com.easysoft.service.RegisterSubmit" , "com.easysoft.service.Tempalte" , {
	template_dir:"/wy/",
	template_file:"login.html",
	role_name:C.ROLE+C.PUBLIC,
	table_name:C.USER,
	postCreate:function(){
		var op=this.getbo();
		op[C.INSERT+C.OBJECT] =this.get_form_obj();
		op[C.MID] =this.queryForm[C.MID];
		op[C.ROLE_NAME] =this.role_name;
		op[C.STORED_METHOD] =C.REGISTER+C.SUBMIT;
		this.exec(op);
	},
	postDraw:function(data){
		var a=[];	
		var $ = this.getDom();
		$("#apbody").html(a.join("\n"));
		return $.html();
	}
});
