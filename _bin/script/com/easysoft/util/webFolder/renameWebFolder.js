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
dojo.provide("com.easysoft.util.webFolder.renameWebFolder");
dojo.declare( "com.easysoft.util.webFolder.renameWebFolder","com.easysoft.Widget",{
	service:function(param){
		this.m_param=param;
		var arr=this.m_param.path.split("/");
		var lastName=arr.pop();
		var basepath=arr.join("/"); 
		this.renamepath=basepath+"/_"+lastName;
		dojo.fs_exists(dojo.dir+this.m_param.path, dojo.hitch(this,function(exists){
			if(exists){
				dojo.fs.rename(dojo.dir+this.m_param.path,dojo.dir+this.renamepath,dojo.hitch(this,function(err){
					if(err){
						this.m_param.fn("renameDir_service dojo.fs.rename err");
					}else{
						dojo.setObject(dojo.getPPath(this.m_param.path)+"/"+$c.c_mListobject,"",d.mBuffer,"/");
						this.m_param.fn("");
					}
				}));
			}else{
				this.m_param.fn("renameDir_service dojo.fs_exists err"); 
			}
		}));
	}
});