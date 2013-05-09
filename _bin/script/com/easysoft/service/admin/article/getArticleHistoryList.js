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
dojo.provide("com.easysoft.service.admin.article.getArticleHistoryList");
dojo.declare( "com.easysoft.service.admin.article.getArticleHistoryList" , "com.easysoft.service.Service" , {
	templatePath:"com.easysoft.service.admin.article.templates.getArticleHistoryList",
	create:function(){
		this.attachSession();
		var path=this.queryString[$c.c_path];
		if(!path){
			var o={};
			o[$c.c_article_title]=$c.c_root;
			o["_urlPath"]=dojo.conf.default_article;
			this.result = dojo.toString([o]);
			this.attachTemplate();
			this.buildRendering();
			this.postCreate();
			this.echo(); 
		}else{
			dojo.createWebFolder($c.c_widget_util_getWebFileList,{
				path:path,
				mapping:[$c.c_article_title],
				fn:dojo.hitch(this,function(err , _data ){
					var data=[];
					dojo.each(_data[$c.c_cache],function(k,v,i){
						var s = v.article_filename;
						var article_date = dojo.getDFileName(dojo.path.basename(s, dojo.path.extname(s)));
						if(!dojo.isToNumber(article_date)) article_date="";
						data.push({article_date:article_date,filename:v.filename,article_title:v.article_title,_urlPath:v.urlPath});
					});
					this.dog.echoLast(dojo.atm([$c.c_cache,data,$c.c_Last_Modified,_data[$c.c_Last_Modified]]));
				})}
			);
		} 
	}
});