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
    postCreate:function(){
		var a=[],o={},op={},I18N=dojo.i18n,C=dojo.cst;
		this.sid=this.queryString.sid;
		op["sid"] =this.sid;
		op["page"] =this.queryString.page;
		op["category"] =this.queryString.category;
		op[C.CURRENT_URL]=this.dog.m_urlObject.pathname;
		op[C.REMOTE_ADDRESS]=this.dog.req.connection.remoteAddress;
		op[C.TABLE_NAME] ='favorite';
		op[C.CAT_TABLE_NAME] ='favorite_type';
		op[C.STORED_METHOD] ='admin_Start';
		this.exec(op);
    },
	postDraw:function(data){
		var a=[],o={},I18N=dojo.i18n,C=dojo.cst;
		var sid=this.sid;
		var $ = this.getDom();
		$("#left_bar").remove();
		$("#right_bar").removeClass("span9").addClass("span12");
		$(".nav-collapse").html(this.drawMainMenu(data));
		var s=$.html();
		var a=[];
		s=s.replace("/*script_body_replace*/",a.join("\n"));
		s=s.replace("/*script_debug_replace*/","window.debug="+dojo.toString(data,true));
		return s;
	},
	drawMainMenu:function(data){
		var sid=this.sid;
		var a=[],o={},I18N=dojo.i18n,C=dojo.cst;
		this.cur_obj={};
		var list=data[C.MODULE_LIST];
		var len = list.length;
		a.push("<ul class='nav'>");
		for(var i=0;i<len;i++){
			var o=list[i];
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
		a.push("</ul>");
		var o=data[C.R_MODULE_LIST][0];
		//var len = list.length;
		a.push("<ul class='nav pull-right'>");
    			a.push("<li>");
			a.push("<a href='"+o[C.MODULE_URL]+"?sid="+sid+"'>"+I18N[o[C.MODULE_NAME]]+"</a>");
			a.push("</li>");
		a.push("</ul>");
		return a.join("");
	}
});
