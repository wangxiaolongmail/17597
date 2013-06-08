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
	template_dir:"/wy/",
	template_file:"login.html",
	create:function(){
		this.m_fimename= dojo.dir+this.template_dir+this.template_file;
		var text=dojo.getObject(this.m_fimename, false, dojo.mBuffer,"/");
		if(text){
			this.draw(text);

		}else{
			dojo.fs.readFile( this.m_fimename , dojo.conf.default_charset , dojo.hitch( this , function ( err , text ) {
				if( !err ){
					dojo.setObject(this.m_fimename,text,dojo.mBuffer,"/");
					this.draw(text);
				}else{
					this.echoLast();
			        }
			}));
		}
	
        },
	draw:function(text){
		var a=[],
		I18N=dojo.i18n,
		C=dojo.cst;	
		var $ = dojo.cheerio.load(text);
		
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
});
