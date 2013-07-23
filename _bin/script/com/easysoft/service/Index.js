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
       postCreate:function(){
		var a=[],o={},op={};
		var op=this.getbo();
		op[C.STORED_METHOD] =C.SHOW_FAVORITE;
		 this.exec(op);
    },
	draw_get:function(data){
		var a=[],o={};
		var sid=this.sid;
		var $ = this.getDom();
		var tilte=I18N[C.SITE_NAME];
		$("title").html(tilte);
		$(".brand").html(tilte);
      	$(".nav-collapse").html(this.drawMainMenu(data));
		this.draw_get_ex($,data);
		return $.html();
	},
	draw_post:function(data){
		var a=[],o={};
		var sid=this.sid;
		var $ = this.getDom();
		var tilte=I18N[C.SITE_NAME];
		$("title").html(tilte);
		$(".brand").html(tilte);
      	$(".nav-collapse").html(this.drawMainMenu(data));
		this.draw_post_ex($,data);
		return $.html();
	},
	draw_get_ex:function($,data){
		var s=this.draw_view1($,data);
		$("#apBody").html(s);
	},
	draw_post_ex:function($,data){
	},
    drawMainMenu:function(data){
		var a=[],o={};
		this.cur_obj={};
		var mlist=this.getMenuList(data);
		a.push("<ul class='nav'>");
		dojo.each(mlist[C.LEFT],function(k,v,i){
			var o=v;
			if(o[C.IS_MENU]){
				if(data[C.URL_NAME]==o[C.URL_NAME]){
					this.cur_obj=o;
					a.push("<li class='active'>");
					a.push("<a href='#'>"+I18N[o[C.MODULE_NAME]]+"</a>");
					a.push("</li>");
				}else{
					a.push("<li>");
					a.push("<a href='"+o[C.URL]+"'>"+I18N[o[C.MODULE_NAME]]+"</a>");
					a.push("</li>");
				}
			}
		},this);
		a.push("</ul>");
		a.push("<ul class='nav pull-right'>");
		dojo.each(mlist[C.RIGHT],function(k,v,i){
			a.push("<li>");
			a.push("<a href='"+v[C.URL]+"'>"+I18N[v[C.MODULE_NAME]]+"</a>");
			a.push("</li>");
		});
		a.push("</ul>");
		return a.join("");
	}

});
