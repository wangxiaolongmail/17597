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
dojo.import("com.easysoft.service.PackService");
dojo.provide("com.easysoft.service.admin.widget_min");
dojo.declare( "com.easysoft.service.admin.widget_min" , "com.easysoft.service.PackService" , {
	m_load_list:[	
					"/script/com/easysoft/client/login/Login.js",
					"/script/com/easysoft/client/admin/Nav.js",
					"/script/com/easysoft/client/admin/article/manageArticle.js",
					"/script/com/easysoft/client/admin/article/managePageBuffer.js"
				]
});