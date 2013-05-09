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
dojo.provide("com.easysoft.service.admin.article.cloneArticle");
dojo.declare( "com.easysoft.service.admin.article.cloneArticle" , "com.easysoft.service.admin.Index" , {
	templatePath:$c.c_templ_easysoft_service_Blank,
	create:function(){   
		if(dojo.conf.isReadOnly==="true"){
			this.echo404("readOnly err"); 
		}else{
			dojo.createWebFolder($c.c_widget_util_addWebFolder,{
				path:dojo.getPPath(this.queryString[$c.c_path]),
				fn:dojo.hitch(this,function( err , data ){
					if(err){
						this.echo404();
					}else{
						this.src_path=this.queryString[$c.c_path];
						this.dst_path=data;
						var path=this.src_path;
						dojo.createWebFolder($c.c_widget_util_readWebFolder,{
							path:path,
							fn:dojo.hitch(this,function(err,o){
								if( err ){
									this.echo404();
								}else{
									dojo.createWebFolder($c.c_widget_util_writeWebFolder,{
										data:o.data,
										path:this.dst_path,
										fn:dojo.hitch(this,function(err){
											if(err){
												this.echo404("cloneArticle dojo.fs.writeFile err"); 
											}else{
												this.dog.echoLast();
											}
										})
									});
								}
							})
						});
					}
				})}
			);
		}
	}
});