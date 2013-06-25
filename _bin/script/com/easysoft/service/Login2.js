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
dojo.import("com.easysoft.service.Login");
dojo.provide("com.easysoft.service.Login2");
dojo.declare( "com.easysoft.service.Login2" , "com.easysoft.service.Login" , {
	postCreate:function(){
		var a=[],o={},op={};
		var op=this.getbo();
		op[C.ROLE_NAME] =this.role_name;
		op[C.MID] =this.queryString[C.MID];
		op[C.STORED_METHOD] ='Login2';
		this.exec(op);
    },
	postDraw:function(data){
		var a=[];	
		var $ = this.getDom();
			a.push("<label>"+I18N[C.CHECK_CODE]+":</label>");
			a.push("<input style=\'height:30px\' class=\'span3\' name=\'"+C.CHECK_CODE+"\'  type=\'text\' >");
			a.push("<img src=\'"+URL[C.EASYSOFT+C.CHECK_CODE]+"?mid="+data[C.MID]+"\' />");
			a.push("<input name=\'mid\' type=\'hidden\' value=\'"+data[C.MID]+"\' >");
			a.push("<button type=\'submit\' class=\'btn btn-primary\'>"+I18N[C.OK]+"</button>");
			$("form").attr("action",URL[C.EASYSOFT+C.LOGINING2]).html(a.join("\n"));
		var s=$.html();
		return s;
	}
});
