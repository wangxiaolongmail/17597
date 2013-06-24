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
dojo.provide("com.easysoft.service.LoginingCheckCode");
dojo.declare( "com.easysoft.service.LoginingCheckCode" , "com.easysoft.service.Index" , {
	template_file:"login.html",
	postCreate:function(){
		var a=[],o={},op={};
		var op=this.getbo();
		op[C.ROLE_NAME] =this.role_name;
		op[C.MID] =this.queryString[C.MID];
		op[C.STORED_METHOD] ='loginingCheckCode';
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
			a.push("<label>"+I18N[C.CHECK_CODE]+":</label>");
			a.push("<input style=\'height:30px\' class=\'span3\' name=\'"+C.CHECK_CODE+"\'  type=\'text\' >");
			a.push("<img src=\'"+URL[C.EASYSOFT+C.CHECK_CODE]+"?mid="+data.mid+"\' />");
			a.push("<input name=\'mid\' type=\'hidden\' value=\'"+data.mid+"\' >");
			a.push("<button type=\'submit\' class=\'btn btn-primary\'>"+I18N[C.OK]+"</button>");
			var url=data[C.MODULE_URL];
			$("form").attr("action",url).html(a.join("\n"));
		var s=$.html();
		return s;
	}
});
