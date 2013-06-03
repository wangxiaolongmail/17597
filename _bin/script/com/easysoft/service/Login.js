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
				var a=[],
				I18N=dojo.i18n,
				C=dojo.cst;	
				var $ = dojo.cheerio.load(data);
				
					a.push('<h3>'+I18N[C.SITE_NAME]+'</h3>');
					a.push('<label>'+I18N[C.USER_NAME]+':</label>');
					a.push('<input style="height:30px" class="span3" name="'+C.USER_NAME+'" type="text">');
					a.push('<label>'+I18N[C.PASSWORD]+':</label>');
					a.push('<input style="height:30px" class="span3" name="'+C.PASSWORD+'" type="password">');
					a.push('<button type="submit" class="btn btn-primary">'+I18N[C.OK]+'</button>');
					$("form").attr("action",$c.c_url_001_702).html(a.join("\n"));
				
				var s=$.html();
				var o = dojo.atm([$c.c_cache,s,$c.c_Last_Modified,dojo.getTimestamp()]);
				this.dog.echoLast(o);
			}
		}));
	}
});
