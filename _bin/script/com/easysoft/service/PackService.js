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
dojo.provide("com.easysoft.service.PackService");
dojo.declare( "com.easysoft.service.PackService" , "com.easysoft.service.Service" , {
	templatePath:$c.c_templ_easysoft_service_Blank,
	m_load_result:"",
	m_load_i:0,
	m_load_list:[],
	m_extname:dojo.EXT_HTML,
	create:function(){
		var o=dojo.getObject(this.widgetName,false,dojo.mBuffer);
		if(o){
			this._load_ok(o);
		}else{
			this._load();
		}
	},
	_load:function(){
		var i = this.m_load_i;
		var arr = this.m_load_list;
		if(i<arr.length){
			dojo.fs.readFile( dojo.dir+arr[i] , dojo.conf.default_charset , dojo.hitch( this , function ( err , data ) {
				if( err ){
					//console.log(err);
					this.echo404();
				}else{
					this.m_load_result+=data;
					this.m_load_i++;
					this._load();
				}
			}));
		}else{
			var s = this.m_load_result;
			var s = s.replace(/\t/g,"","g");
			s+=this._last_add_string();
			var o= dojo.atm([$c.c_cache,s,$c.c_Last_Modified,dojo.getLastModified()]);
			dojo.setObject(this.widgetName,o,dojo.mBuffer);
			this._load_ok(o);
		}
	},
	_load_ok:function(o){
		this.dog.echoLast(dojo.atm([$c.c_extname,this.m_extname,$c.c_cache,o[$c.c_cache],$c.c_Last_Modified,o[$c.c_Last_Modified]]));
	},
	_last_add_string:function(){
		return "";
	}
});