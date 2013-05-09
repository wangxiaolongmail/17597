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
dojo.provide("com.easysoft.service.admin.article.deleteArticle");
dojo.declare( "com.easysoft.service.admin.article.deleteArticle" , "com.easysoft.service.admin.Index" , {
	templatePath:$c.c_templ_easysoft_service_Blank,
	create:function(){  
		if(dojo.conf.isReadOnly==="true"){
			this.echo404("readOnly err"); 
		}else{
			dojo.createWebFolder($c.c_widget_util_renameWebFolder,{
				path:this.queryString[$c.c_path],
				fn:dojo.hitch(this,function( err ){
					if(err){
						this.echo404(err);
					}else{
						this.dog.echoLast();
					}
				})}
			);
		}
	}
});