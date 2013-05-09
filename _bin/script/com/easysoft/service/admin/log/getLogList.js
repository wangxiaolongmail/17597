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
dojo.provide("com.easysoft.service.admin.log.getLogList");
dojo.declare( "com.easysoft.service.admin.log.getLogList" , "com.easysoft.service.admin.Index" , {
	templatePath:$c.c_templ_easysoft_service_Blank,
	postMixInProperties:function(){
		this.result=dojo.toString(dojo.log_list);
	}
});