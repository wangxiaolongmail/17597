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
		var op=this.getbo();
		if(op.method=="get"){
			op[C.MID] =this.queryString[C.MID];
		}else{
			op[C.MID] = this.queryForm[C.MID];
			op[C.CHECK_CODE] =this.queryForm[C.CHECK_CODE];
		}
		op[C.STORED_METHOD] ='Login2';
		this.exec(op);
    },
	draw_get_ex:function($,data){
		var a=[];
		a.push('<form action="?" method="post" class="well span3">');
		a.push("<label>"+I18N[C.CHECK_CODE]+":</label>");
		a.push("<input style=\'height:30px\' class=\'span3\' name=\'"+C.CHECK_CODE+"\'  type=\'text\' >");
		a.push("<img src=\'"+URL[C.EASYSOFT+C.CHECK_CODE]+"?mid="+data[C.MID]+"\' />");
		a.push("<input name=\'mid\' type=\'hidden\' value=\'"+data[C.MID]+"\' >");
		a.push("<button type=\'submit\' class=\'btn btn-primary\'>"+I18N[C.OK]+"</button>");
		a.push("<form>");
		$("#apBody").html(a.join("\n"));
	},
	draw_post:function(data){
		this.enterSystem(data);
	}
});
