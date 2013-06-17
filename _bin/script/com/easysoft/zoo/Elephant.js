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
dojo.import("com.easysoft.Widget");
dojo.import("com.easysoft.constant.Constant");
dojo.import("com.easysoft.zoo.Spider");
dojo.import("com.easysoft.zoo.Dog");
dojo.import("com.easysoft.schedule.Schedule");

dojo.provide("com.easysoft.zoo.Elephant");
dojo.declare("com.easysoft.zoo.Elephant","com.easysoft.Widget",{
	postCreate:function(){
		dojo.import("route");
		dojo.http.createServer(function(req,res){
			dojo.createObject("com.easysoft.zoo.Dog",{ req:req , res:res });
		}).listen(dojo.conf.port);
	}
});