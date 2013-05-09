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
dojo.import("com.easysoft.service.Service");
dojo.provide("com.easysoft.service.Redirect");
dojo.declare( "com.easysoft.service.Redirect" , "com.easysoft.service.Service" , {
	redirect_url:"",
	set_redirect_url:function(url){
		this.redirect_url=url;
	},
	echo:function(){
		this.res.writeHead($c.httpStatusCode302, dojo.atm([$c.c_location,this.redirect_url])); 
		this.res.end(); 
	},
	create:function(){
		this.echo();
	}
});