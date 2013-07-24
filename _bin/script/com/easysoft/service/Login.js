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
		var op=this.getbo();
		if(op.method=="get"){
			op[C.STORED_METHOD] ='';
		}else{
			op[C.USER_NAME] = this.queryForm[C.USER_NAME];
			op[C.PASSWORD] =dojo.md5(this.queryForm[C.PASSWORD]);
			op[C.STORED_METHOD] ='Login';
		}
		this.exec(op);
    },
	draw_get_ex:function($,data){
		var a=[];	
		a.push('<form action="?" method="post" class="well span3">');
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
	},
	draw_post:function(data){
		if(data[C.IS+C.CHECK_CODE]){
			this.redirect(URL[C.EASYSOFT+C.LOGIN2]+"?"+C.MID+"="+data[C.MID]);
		}else{
			this.enterSystem(data);
		}
	},
	enterSystem:function(data){
		var flag=true;
		var a=this.getMenuList(data)[C.LEFT];
		dojo.each(a,function(k,v,i){
			if(v[C.IS_MENU]){
				flag=false;
				this.redirect(v[C.URL]+"?sid="+data.sid);
				dojo.sendMail({title:data[C.USER_NAME]+" loging system successful"});
			}
		},this);
		if(flag){
			this._findNotFile();
		}
	}
});
