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
dojo.provide("com.easysoft.service.Login");
dojo.declare( "com.easysoft.service.Login" , "com.easysoft.service.Tempalte" , {
	template_dir:"/wy/",
	template_file:"login.html",
	postCreate:function(){
		this.postDraw();
    },
	postDraw:function(){
		var a=[],
		I18N=dojo.i18n,
		C=dojo.cst;	
		var $ = this.getDom();
		
			a.push('<h3>'+I18N[C.SITE_NAME]+'</h3>');
			a.push('<label>'+I18N[C.USER_NAME]+':</label>');
			a.push('<input style="height:30px" class="span3" name="'+C.USER_NAME+'" type="text">');
			a.push('<label>'+I18N[C.PASSWORD]+':</label>');
			a.push('<input style="height:30px" class="span3" name="'+C.PASSWORD+'" type="password">');
			a.push('<button type="submit" class="btn btn-primary">'+I18N[C.OK]+'</button>');
			$("form").attr("action",$c.c_url_001_702).html(a.join("\n"));
		
		this.endPaint($.html());
	}
});
