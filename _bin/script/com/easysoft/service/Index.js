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
	role_name:"r_easysoft",
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
		$(".brand").html(I18N[C.SITE_NAME]);
		$("#right_bar").removeClass("span9").addClass("span12");
      		$(".nav-collapse").html(this.drawMainMenu(data));
      		
var list=data.list
		a.push("<table class='table table-bordered table-striped'>");

		for(var i=0;i<list.length;i++){

var o=list[i];
		a.push("<tr>");
		a.push("<td>");
			a.push(o.article_title);
			
			var list2=o.list;
for(var j=0;j<list2.length;j++){
		a.push("&nbsp;");
		a.push("<a target='_blank' href='"+data[C.GO]+"?"+C.TO+"="+list2[j].article_url+"'>"+list2[j].article_title+"</a>");



}
		a.push("</td>");

		
		a.push("</tr>");

		}
		
		a.push("</table>");

		$("#right_bar").html(a.join("\n"));


		var s=$.html();
		s=s.replace("/*script_body_replace*/","");
		return s;
	},
    drawMainMenu:function(data){
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
					  a.push("<a href='"+o[C.MODULE_URL]+"'>"+I18N[o[C.MODULE_NAME]]+"</a>");
					  a.push("</li>");
					}
				}
		},this);
		a.push("</ul>");
		var o=mlist[C.RIGHT][0];
		a.push("<ul class='nav pull-right'>");
				a.push("<li>");
			a.push("<a target='_blank' href='"+o[C.MODULE_URL]+"'>"+I18N[o[C.MODULE_NAME]]+"</a>");
			a.push("</li>");
		a.push("</ul>");
		return a.join("");
	}

});
