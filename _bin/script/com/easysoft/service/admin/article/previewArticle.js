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
dojo.import("com.easysoft.service.Service");
dojo.provide("com.easysoft.service.admin.article.previewArticle");
dojo.declare( "com.easysoft.service.admin.article.previewArticle" , "com.easysoft.service.admin.Index" , {
	templatePath:"com.easysoft.service.admin.article.templates.previewArticle",
	create:function(){  
		var path=this.queryString[$c.c_path];
		dojo.createWebFolder($c.c_widget_util_readWebFolder,{
			path:path,
			fn:dojo.hitch(this,function(err,o){
				if( err ){
					this.echo404();
				}else{
					this.result=o[$c.c_cache];
					this.attachTemplate();
					this.dog.echoLast(dojo.atm([$c.c_cache,this.template]));
				}
			})
		});
	}
});