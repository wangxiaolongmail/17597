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
dojo.provide("com.easysoft.service.Login");
dojo.declare( "com.easysoft.service.Login" , "com.easysoft.service.Service" , {
	templatePath:"com.easysoft.service.templates.Login",
	m_widgetName:"com.easysoft.client.login.Login",
	m_form_action_path:$c.c_url_001_702,
	create:function(){ 
		dojo.fs.readFile( dojo.dir+"/wy/login.html" , dojo.conf.default_charset , dojo.hitch( this , function ( err , data ) {
			if( err ){
				this.echo404();
			}else{
				var $ = dojo.cheerio.load(data);
			  	$("input[name='username']").val("admin");
			  	$("input[name='password']").val("password");
			  	$("form").attr("action",$c.c_url_001_702);
				var s=$.html();
				var o = dojo.atm([$c.c_cache,s,$c.c_Last_Modified,dojo.getTimestamp()]);
				this.dog.echoLast(o);
			}
		}));
	}
});