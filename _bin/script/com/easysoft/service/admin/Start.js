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
dojo.declare( "com.easysoft.service.admin.Start" , "com.easysoft.service.Index" , {
	getsbo:function(sname){
		var op=this.getbo();
		this.sid=this.queryString.sid;
		this.rmid=this.queryString.rmid;
		op["sid"] =this.sid;
		op["rmid"] =this.rmid;
		return op;
	},
     postCreate:function(){
		var a=[],o={},op={};
		var op=this.getsbo();
		op[C.STORED_METHOD] ='admin_Start';
		this.exec(op);
    },
	drawMainMenu:function(data){
		var sid=this.sid;
		var a=[],o={};
		this.cur_obj={};
		var mlist=this.getMenuList(data);
		var list=mlist[C.LEFT];
		var len = list.length;
		a.push("<ul class='nav'>");
		dojo.each(list,function(k,v,i){
			var o=v;
			if(o[C.IS_MENU]){
				if(data[C.URL_NAME]==o[C.URL_NAME]){
				  this.cur_obj=o;
				  a.push("<li class='active'>");
				  a.push("<a href='#'>"+I18N[o[C.MODULE_NAME]]+"</a>");
				  a.push("</li>");
				}else{
				  a.push("<li>");
				  a.push("<a href='"+o[C.URL]+"?sid="+sid+"'>"+I18N[o[C.MODULE_NAME]]+"</a>");
				  a.push("</li>");
				}
			}
		},this);
		a.push("</ul>");
		var o=mlist[C.RIGHT][0];
		a.push("<ul class='nav pull-right'>");
    		a.push("<li>");
				a.push("<a href='"+URL[C.PROFILE+C.INTRODUCE]+"?sid="+sid+"&rmid="+data[C.USER_NAME]+"'>"+data[C.USER_NAME]+"</a>");
			a.push("</li>");
    		a.push("<li>");
				a.push("<a href='"+URL[C.LOGOUT]+"?sid="+sid+"'>"+I18N[o[C.MODULE_NAME]]+"</a>");
			a.push("</li>");
		a.push("</ul>");
		return a.join("");
	}
});
