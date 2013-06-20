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
dojo.provide("com.easysoft.service.admin.Start");
dojo.declare( "com.easysoft.service.admin.Start" , "com.easysoft.service.Login" , {
	template_file:"start.html",
	getsbo:function(sname){
		var op=this.getbo();
		this.sid=this.queryString.sid;
		op["sid"] =this.sid;
		return op;
	},
     postCreate:function(){
		var a=[],o={},op={},C=dojo.C;
		var op=this.getsbo();
		op[C.STORED_METHOD] ='admin_Start';
		this.exec(op);
    },
	postDraw:function(data){
		var a=[],o={},C=dojo.C;
		var sid=this.sid;
		var $ = this.getDom();
		$("#left_bar").remove();
		$("#right_bar").removeClass("span9").addClass("span12");
		$(".nav-collapse").html(this.drawMainMenu(data));
		var s=$.html();
		var a=[];
		s=s.replace("/*script_body_replace*/",a.join("\n"));
		return s;
	},
	drawMainMenu:function(data){
		var sid=this.sid;
		var a=[],o={},I18N=dojo.I18N,C=dojo.C;
		this.cur_obj={};
		var mlist=this.getMenuList(data);
		var list=mlist[dojo.C.LEFT];
		var len = list.length;
		a.push("<ul class='nav'>");
		dojo.each(list,function(k,v,i){
			var o=v;
			if(o[C.IS_MENU]){
				if(data[C.CURRENT_MODULE]==o[C.MODULE_NAME]){
				  this.cur_obj=o;
				  a.push("<li class='active'>");
				  a.push("<a href='#'>"+I18N[o[C.MODULE_NAME]]+"</a>");
				  a.push("</li>");
				}else{
				  a.push("<li>");
				  a.push("<a href='"+o[C.MODULE_URL]+"?sid="+sid+"'>"+I18N[o[C.MODULE_NAME]]+"</a>");
				  a.push("</li>");
				}
			}
		},this);
		a.push("</ul>");
		var o=mlist[C.RIGHT][0];
		//var len = list.length;
		a.push("<ul class='nav pull-right'>");
    			a.push("<li>");
			a.push("<a href='"+o[C.MODULE_URL]+"?sid="+sid+"'>"+I18N[o[C.MODULE_NAME]]+"</a>");
			a.push("</li>");
		a.push("</ul>");
		return a.join("");
	}
});
