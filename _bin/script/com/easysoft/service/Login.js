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
dojo.import("com.easysoft.service.Index");
dojo.provide("com.easysoft.service.Login");
dojo.declare( "com.easysoft.service.Login" , "com.easysoft.service.Index" , {
	template_file:"login.html",
	postCreate:function(){
		var a=[],o={},op={};
		var op=this.getbo();
		op[C.ROLE_NAME] =this.role_name;
		op[C.STORED_METHOD] ='login';
		this.exec(op);
    },

		
	postDraw:function(data){
		var a=[];	
		var $ = this.getDom();
			a.push('<h3>'+I18N[C.SITE_NAME]+'</h3>');
			a.push('<label>'+I18N[C.USER_NAME]+':</label>');
			a.push('<input style="height:30px" class="span3" name="'+C.USER_NAME+'" type="text">');
			a.push('<label>'+I18N[C.PASSWORD]+':</label>');
			a.push('<input style="height:30px" class="span3" name="'+C.PASSWORD+'" type="password">');
			a.push("<button type=\'submit\' class=\'btn btn-primary\'>"+I18N[C.OK]+"</button>");
			$("form").attr("action",URL[C.EASYSOFT+C.LOGINING]).html(a.join("\n"));
		var s=$.html();
		return s;
	}
});
