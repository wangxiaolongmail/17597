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
dojo.provide("com.easysoft.util.webFolder.addWebFolder");
dojo.declare( "com.easysoft.util.webFolder.addWebFolder","com.easysoft.Widget",{
	service:function(param){
		this.m_param=param;
		this.m_newUrlPath=this.m_param.path+"/"+dojo.getDefaultFileName();
		dojo.fs.mkdir(dojo.dir+this.m_newUrlPath,0755,dojo.hitch(this,function(){
			this.m_param.fn("",this.m_newUrlPath);
		}));
	}
});