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
dojo.provide("com.maodan.service.Logining");
dojo.declare( "com.maodan.service.Logining" , "com.easysoft.service.Logining" , {
	success_redirect_url:$c.c_url_maodan_admin_start,
	error_redirect_url:$c.c_url_001_707,
	db_path:"/_d/easysoft/table/user"
});