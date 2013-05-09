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
dojo.provide("com.easysoft.service.admin.memoryData");
dojo.declare( "com.easysoft.service.admin.memoryData" , "com.easysoft.service.Service" , {
	templatePath:"com.easysoft.service.admin.templates.memoryData",
	m_page_nav_widget_name:"com.easysoft.client.admin.Nav",
	m_page_body_widget_name:"",
	m_page_footer_widget_name:"",
	m_projectName:"",
	str_body_param_list:"{}",
	str_nav_param_list:"{}",
	str_footer_param_list:"{}",
	create:function(){ 
		
		this.attachSessionDb(dojo.hitch(this,function(err,item){
			if(!item){
				this.echo404();
			}else{
				this.postMixInProperties();
				this.attachTemplate();
				this.buildRendering();
				this.postCreate();
				var s=dojo.toString(dojo.mBuffer,true);
				this.template=this.template.replace("<!--ap_body-->",s);
				var o = dojo.atm([$c.c_cache,this.template,$c.c_Last_Modified,dojo.getTimestamp()]);
				this.dog.echoLast(o);
			}
		}));
		
	}
});