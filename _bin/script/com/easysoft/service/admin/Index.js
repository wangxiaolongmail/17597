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
dojo.provide("com.easysoft.service.admin.Index");
dojo.declare( "com.easysoft.service.admin.Index" , "com.easysoft.service.Login" , {
	template_file:"index.html",
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
		op[C.STORED_METHOD] ='admin_Index';
		this.beginPaint();
		this.exec(op);
    },
	postDraw:function(){
		var a=[],o={},I18N=dojo.i18n,C=dojo.cst;
		var sid=this.sid;
		var $ = this.getDom();
		$("#left_bar").remove();
		$("#right_bar").removeClass("span9").addClass("span12");
		$(".nav-collapse").html(this.drawMainMenu());
		var s=$.html();
		var a=[];
		s=s.replace("/*script_body_replace*/",a.join("\n"));
		s=s.replace("/*script_debug_replace*/","window.debug="+dojo.toString(this.obj,true));
		this.endPaint(s);
	},
	exec:function(op){
		var cmd = "main("+dojo.toString(op)+")";
		console.log('dojo.db.eval("'+cmd+'");');
		dojo.db.eval(cmd, dojo.hitch(this,this.draw));
	},
	draw:function(err,obj){
		if(err){
			var o = dojo.atm([$c.c_cache,""+dojo.toString(err),$c.c_Last_Modified,dojo.getTimestamp()]);
			this.dog.echoLast(o);
			return;
		}
		if(!obj.ok){
			var o = dojo.atm([$c.c_cache,""+obj.err,$c.c_Last_Modified,dojo.getTimestamp()]);
			this.dog.echoLast(o);
			return;
		}
		this.m_obj=obj;
		this.postDraw();
	},
	drawMainMenu:function(){
		var sid=this.sid;
		var obj=this.m_obj;
		var a=[],o={},I18N=dojo.i18n,C=dojo.cst;
		
		var a=[];
		this.cur_obj={};
		var list=obj[C.MODULE_LIST];
		var len = list.length;
		a.push("<ul class='nav'>");
		for(var i=0;i<len;i++){
			var o=list[i];
			if(obj[C.CURRENT_MODULE]==o[C.MODULE_NAME]){
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
		a.push("<ul class='nav pull-right'>");
    	a.push("<li>");
			a.push("<a href='/e/Logout?sid="+sid+"'>"+I18N[C.LOGOUT]+"</a>");
			a.push("</li>");
		a.push("</ul>");
		return a.join("");
	}
});
