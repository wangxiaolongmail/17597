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
 * Test widget.
 * 
 * @author wxlwang
 */
dojo.require("com.easysoft.client.admin.Nav");
dojo.provide("com.maodan.client.admin.Nav");
dojo.declare( "com.maodan.client.admin.Nav" , "com.easysoft.client.admin.Nav" , {
	m_url_list:[$c.c_url_maodan_admin_start,$c.c_url_maodan_admin_favorite,$c.c_url_maodan_admin_exit]
});