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
dojo.provide("com.easysoft.service.admin.article.KindEditorUploading");
dojo.declare( "com.easysoft.service.admin.article.KindEditorUploading" , "com.easysoft.service.admin.Index" , {
	templatePath:"com.easysoft.service.admin.article.templates.Uploading",
	createEx:function(){   
		if(dojo.conf.isReadOnly==="true"){
			this.echo404("readOnly err"); 
		}else{
			var path=this.queryString.path+"/"+this.queryString.dir;
			dojo.objUploadFile({path:path,uploadForm:this.uploadForm,fn:dojo.hitch(this,function(err,hash){
				if(err){
					this.echo404(); 
				}else{
					this.template=hash;
					this.echo();
				}
			})});
		}
	}
});