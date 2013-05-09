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
dojo.provide("com.easysoft.service.admin.article.getList");
dojo.declare( "com.easysoft.service.admin.article.getList" , "com.easysoft.service.admin.Index" , {
	templatePath:$c.c_templ_easysoft_service_Blank,
	checkpath:function(path){
		if(path.indexOf(dojo.conf.default_article)===0||path.indexOf(dojo.conf.default_database)===0){
			return false;
		}else{
			return true;
		}
	},
	create:function(){
		var path=this.queryString[$c.c_path];
		if(this.checkpath(path)){
			this.echo404();
		}else{
			dojo.createWebFolder($c.c_widget_util_getWebFolderList,{
				path:path,
				fn:dojo.hitch(this,function(err , data ){
					if(err){
						this.echo404();
					}else{
						this.dog.echoLast(dojo.atm([$c.c_extname,dojo.EXT_JSON,$c.c_cache,dojo.toString(data[$c.c_cache]),$c.c_Last_Modified,data[$c.c_Last_Modified]]));
					}
				})}
			);
		}
	}
});