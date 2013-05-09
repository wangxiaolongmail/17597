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
dojo.provide("com.easysoft.service.admin.article.getArticle");
dojo.declare( "com.easysoft.service.admin.article.getArticle" , "com.easysoft.service.admin.Index" , {
	templatePath:$c.c_templ_easysoft_service_Blank,
	create:function(){
		dojo.createWebFolder($c.c_widget_util_readWebFolder,{
			path:this.queryString[$c.c_path],
			fn:dojo.hitch(this,function(err,data){
				if( err ){
					this.echo404(err);
				}else{ 
					this.dog.echoLast(dojo.atm([$c.c_cache,data[$c.c_cache]||"",$c.c_Last_Modified,data[$c.c_Last_Modified]]));
				}
			})
		});
	}
});