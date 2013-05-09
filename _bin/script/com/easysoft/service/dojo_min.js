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
dojo.provide("com.easysoft.service.dojo_min");
dojo.declare( "com.easysoft.service.dojo_min" , "com.easysoft.service.PackService" , {
	m_load_list:[	
					"/_bin/script/dojo.js",
					"/script/dojoc.js",
					"/_bin/script/com/easysoft/Widget.js",
					"/_bin/script/com/easysoft/constant/Constant.js",
					"/script/com/easysoft/client/i18n/I18n.js",
					"/_bin/script/com/easysoft/schedule/Schedule.js",
					"/script/com/easysoft/client/control/Control.js",
					"/script/com/easysoft/client/control/Table.js",
					"/script/com/easysoft/client/debug/Debug.js"
				]
});