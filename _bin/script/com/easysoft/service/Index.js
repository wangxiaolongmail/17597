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
dojo.import("com.easysoft.service.Tempalte");
dojo.provide("com.easysoft.service.Index");
dojo.declare( "com.easysoft.service.Index" , "com.easysoft.service.Tempalte" , {
	template_dir:"/wy/",
	template_file:"index.html",
	role_name:dojo.C.ROLE+dojo.C.PUBLIC,
       postCreate:function(){
		var a=[],o={},op={},C=dojo.C;
		var op=this.getbo();
		op[C.ROLE_NAME] =this.role_name;
		op[C.STORED_METHOD] =C.SHOW_FAVORITE;
		 this.exec(op);
       },
	postDraw:function(data){
		var a=[],o={},I18N=dojo.I18N,C=dojo.C;
		var sid=this.sid;
		var $ = this.getDom();
		$("#left_bar").remove();
		var tilte=I18N[C.SITE_NAME];
		$("title").html(tilte);
		$(".brand").html(tilte);
		$("#right_bar").removeClass("span9").addClass("span12");
      		$(".nav-collapse").html(this.drawMainMenu(data));
      		
		a.push("<table class='table table-bordered table-striped'>");
		dojo.each(data.list,function(k,v,i){
			var o=v;
			a.push("<tr>");
			a.push("<td>");
			a.push(o.article_title);
			dojo.each(o.list,function(k,v,i){
				a.push("&nbsp;");
				a.push("<a target='_blank' href='"+data[C.URL+C.GO]+"?"+C.TO+"="+v.article_url+"'>"+v.article_title+"</a>");

			});
			a.push("</td>");
			a.push("</tr>");
		});
		a.push("</table>");

		$("#right_bar").html(a.join("\n"));

		var s=$.html();
		return s;
	},
    drawMainMenu:function(data){
		var a=[],o={},I18N=dojo.I18N,C=dojo.C;
		this.cur_obj={};
		var mlist=this.getMenuList(data);
		a.push("<ul class='nav'>");
		dojo.each(mlist[C.LEFT],function(k,v,i){
			var o=v;
			if(o[C.IS_MENU]){
				if(data[C.CURRENT_MODULE]==o[C.MODULE_NAME]){
					this.cur_obj=o;
					a.push("<li class='active'>");
					a.push("<a href='#'>"+I18N[o[C.MODULE_NAME]]+"</a>");
					a.push("</li>");
				}else{
					a.push("<li>");
					a.push("<a href='"+o[C.MODULE_URL]+"'>"+I18N[o[C.MODULE_NAME]]+"</a>");
					a.push("</li>");
				}
			}
		},this);
		a.push("</ul>");
		a.push("<ul class='nav pull-right'>");
		dojo.each(mlist[C.RIGHT],function(k,v,i){
			a.push("<li>");
			a.push("<a target='_blank' href='"+v[C.MODULE_URL]+"'>"+I18N[v[C.MODULE_NAME]]+"</a>");
			a.push("</li>");
			
		});
		a.push("</ul>");
		return a.join("");
	}

});
