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
		this.beginPaint();
		this.exec(op);
    },
	postDraw:function(){
		var a=[],o={},I18N=dojo.i18n,C=dojo.cst;
		var sid=this.sid;
		var $ = this.getDom();
		$("#left_bar").remove();
		$(".brand").html("");
		$("#right_bar").removeClass("span9").addClass("span12");
		var s=$.html();
		var a=[];
		s=s.replace("/*script_body_replace*/",a.join("\n"));
		s=s.replace("/*script_debug_replace*/","window.debug="+dojo.toString(this.obj,true));
		this.endPaint(s);
	}
});