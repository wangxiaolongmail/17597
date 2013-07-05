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
	postCreate:function(){
		var a=[],o={},op={};
		var op=this.getbo();
		op[C.STORED_METHOD] ='';
		this.exec(op);
    },
	postDrawEx:function($,data){
		var a=[];	
		a.push('<form action="'+URL[C.EASYSOFT+C.LOGINING]+'" method="post" class="well span3">');
		a.push('<label>'+I18N[C.USER_NAME]+':</label>');
		a.push('<input style="height:30px" class="span3" name="'+C.USER_NAME+'" type="text">');
		a.push('<label>'+I18N[C.PASSWORD]+':</label>');
		a.push('<input style="height:30px" class="span3" name="'+C.PASSWORD+'" type="password">');
		a.push("<button type=\'submit\' class=\'btn btn-primary\'>"+I18N[C.OK]+"</button>");
		a.push("<form>");
		$("#apBody").html(a.join("\n"));
	},
	drawFormEvent:function(){
		var a=[];
		a.push("");
		a.push("<script type='text/javascript'>");
		a.push("var fn="+this.clientFormEvent);
		a.push("$(document).ready(function(){");
			a.push("fn();");
		a.push("});");
		a.push("</script>");
		a.push("");
		return a.join("\n");
	},
	clientFormEvent:function(){
		$("input")[0].focus();
	}
});
