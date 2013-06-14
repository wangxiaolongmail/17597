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
		var a=[],o={},op={},I18N=dojo.i18n,C=dojo.cst;
		var op=this.getbo();
		op[C.ROLE_NAME] =this.role_name;
		op[C.STORED_METHOD] ='make_favorite';

		this.exec(op);
    },
	postDraw:function(data){
		var a=[],o={},I18N=dojo.i18n,C=dojo.cst;
		var sid=this.sid;
		var $ = this.getDom();
		$("#left_bar").remove();
		$(".brand").html("");
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
		a.push("<a target='_blank' href='"+data[C.EASYSOFT_GO]+"?"+C.TO+"="+list2[j].article_url+"'>"+list2[j].article_title+"</a>");



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
                          a.push("<a href='"+o[C.MODULE_URL]+"'>"+dojo.fi18n(o[C.MODULE_NAME])+"</a>");
                          a.push("</li>");
                        }
                }
                a.push("</ul>");
                var o=data[C.R_MODULE_LIST][0];
		//var len = list.length;
		a.push("<ul class='nav pull-right'>");
    			a.push("<li>");
			a.push("<a target='_blank' href='"+o[C.MODULE_URL]+"'>"+dojo.fi18n(o[C.MODULE_NAME])+"</a>");
			a.push("</li>");
		a.push("</ul>");
                return a.join("");
        }

});
