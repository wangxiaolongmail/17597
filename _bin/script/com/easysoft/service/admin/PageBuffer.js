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
dojo.provide("com.easysoft.service.admin.PageBuffer");
dojo.declare( "com.easysoft.service.admin.PageBuffer" , "com.easysoft.service.Service" , {
	templatePath:"com.easysoft.service.admin.templates.PageBuffer",
	m_page_nav_widget_name:"com.easysoft.client.admin.Nav",
	m_page_body_widget_name:"com.easysoft.client.admin.article.managePageBuffer",
	m_page_footer_widget_name:"",
	m_projectName:"",
	str_body_param_list:dojo.toString({path:"/s/easysoft/PageBuffer"}),
	str_nav_param_list:"{}",
	str_footer_param_list:"{}",
	create:function(){ 
		var o=dojo.getObject(this.widgetName,false,dojo.mBuffer);
		if(o){
			this.dog.echoLast(o);
		}else{
			this.attachSession();
			if(this.isLoginErr){
				this.echo404();
			}else{
				this.postMixInProperties();
				this.attachTemplate();
				this.buildRendering();
				this.postCreate();
				var o = dojo.atm([$c.c_cache,this.template,$c.c_Last_Modified,dojo.getTimestamp()]);
				dojo.setObject(this.widgetName,o,dojo.mBuffer);
				this.dog.echoLast(o);
			}
		}
	}
});