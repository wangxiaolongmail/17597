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
dojo.provide("com.easysoft.client.home.Home");
dojo.declare( "com.easysoft.client.home.Home" , "com.easysoft.client.control.Control" , {
	templatePath:"com.easysoft.client.home.templates.Home",
	postCreate:function(){
		var obj = new com.easysoft.client.control.Table();
		//console.log(this.domNode);
		//this.domNode.appendChild(obj.domNode);
		//dojo.place(obj.domNode,this.domNode);
	}
});