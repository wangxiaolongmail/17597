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
dojo.require("com.easysoft.client.control.Control");
dojo.provide("com.easysoft.client.admin.MemoryLog");
dojo.declare( "com.easysoft.client.admin.MemoryLog" , "com.easysoft.client.control.Control" , {
	isCreateTemplate:true,
	isUseTemplate:false,
	__createTemplateDom:function(){
		var dom =dojo.create("div",{className:""},null);
		this.m_dom=dom;
		this.init();
		return dom;
	},
	init:function(){
		dojo.requestHttpGet(
			{
				self:this,
				uri:$c.c_url_001_011,
				params:dojo.getBObject(),
				onLoad:function(http){
					var items=dojo.JSON.parse(http.responseText);
					items.reverse();
					var obj=dojo.createTable({items:items});
					dojo.addWidget(obj,this.self.m_dom);
				},
				onError:function(){
				}
			}
		);
	}
});