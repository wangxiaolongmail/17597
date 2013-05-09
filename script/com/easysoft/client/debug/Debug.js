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
dojo.provide("com.easysoft.client.debug.Debug");
dojo.declare( "com.easysoft.client.debug.Debug" , "com.easysoft.client.control.Control" , {
	className:"Debug",
	id:"Debug",
	count:0,
	capacity:1117,
	isUseTemplate:false,
	postCreate:function(){
	},
	log:function(s){
		if(this.count%this.capacity==0){
			this.apRoot.innerHTML = "";
		}
		if(typeof s === "string"){
			this.count++;
			dojo.create( "div", { innerHTML:s }, this.apRoot );
		}
		if(typeof s === "number"){
			this.count++;
			dojo.create( "div", { innerHTML:s+"" }, this.apRoot );
		}
	}
});