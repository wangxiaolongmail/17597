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
		var a=[],o={},op={},I18N=dojo.i18n,C=dojo.cst;
		op[C.STORED_METHOD] ='get_view_favorite';
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
		var s=$.html();
		s=s.replace("/*script_body_replace*/",a.join("\n"));
		s=s.replace("/*script_debug_replace*/","window.debug="+dojo.toString(data,true));
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
                         // a.push("<a href='"+o[C.MODULE_URL]+'>"+I18N[o[C.MODULE_NAME]]+"</a>");
                          a.push("</li>");
                        }
                }
                a.push("</ul>");
                a.push("<ul class='nav pull-right'>");
        	a.push("<li>");
                        a.push("<a href='/e/login'>"+I18N[C.LOGIN]+"</a>");
                        a.push("</li>");
                a.push("</ul>");
                return a.join("");
        }

});
