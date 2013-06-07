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
dojo.provide("com.easysoft.service.admin.Index");
dojo.declare( "com.easysoft.service.admin.Index" , "com.easysoft.service.Service" , {
        create:function(){
			console.log("com.easysoft.service.admin.Index::create");
			var a=[],o={},I18N=dojo.i18n,C=dojo.cst;
			this.sid=this.queryString.sid;
			o["sid"] =this.sid;
			o["page"] =this.queryString.page||1;
			o["category"] =this.queryString.category||C.ALL;
			o[C.CURRENT_URL]=this.dog.m_urlObject.pathname;
			o[C.REMOTE_ADDRESS]=this.dog.req.connection.remoteAddress;
			o[C.TABLE_NAME] ='favorite';
			o[C.CAT_TABLE_NAME] ='favorite_type';
			o[C.STORED_METHOD] ='admin_get_favorite';
			var cmd = "main("+dojo.toString(o)+")";
			console.log('dojo.db.eval("'+cmd+'");');
			dojo.db.eval(cmd, dojo.hitch(this,this.drawPage));
        },
		drawPage:function(err,obj){
			if(err){
				var o = dojo.atm([$c.c_cache,""+dojo.toString(err),$c.c_Last_Modified,dojo.getTimestamp()]);
				this.dog.echoLast(o);
				return;
			}
			if(!obj.ok){
				var o = dojo.atm([$c.c_cache,""+obj.err,$c.c_Last_Modified,dojo.getTimestamp()]);
				this.dog.echoLast(o);
				return;
			}
			this.m_obj=obj;
			if(dojo.wy_index_html){
				this.draw();
			}else{
				dojo.fs.readFile( dojo.dir+"/wy/index.html" , dojo.conf.default_charset , dojo.hitch( this , this.createEx));
			}
		},
		createEx:function(err,template){
			if( err ){
				this.echo404();
			}else{
				dojo.wy_index_html=template;
			}
			this.draw();
		},
		drawMainMenu:function($,sid){
			var obj=this.m_obj;
			var a=[],o={},I18N=dojo.i18n,C=dojo.cst;
			
			var a=[];
			this.cur_obj={};
			var list=obj[C.MODULE_LIST];
			var len = list.length;
			a.push("<ul class='nav'>");
			for(var i=0;i<len;i++){
				var o=list[i];
				if(obj[C.CURRENT_MODULE]==o[C.MODULE_NAME]){
				  this.cur_obj=o;
				  a.push("<li class='active'>");
				  a.push("<a href='#'>"+I18N[o[C.MODULE_NAME]]+"</a>");
				  a.push("</li>");
				}else{
				  a.push("<li>");
				  a.push("<a href='"+o[C.MODULE_URL]+"?sid="+sid+"'>"+I18N[o[C.MODULE_NAME]]+"</a>");
				  a.push("</li>");
				}
			}
			a.push("</ul>");
			a.push("<ul class='nav pull-right'>");
            a.push("<li>");
			a.push("<a href='/e/Logout?sid="+sid+"'>"+I18N[C.LOGOUT]+"</a>");
			a.push("</li>");
          	a.push("</ul>");
			$(".nav-collapse").html(a.join(""));
		},
		draw:function(){
			var obj=this.m_obj;
			var a=[],o={},I18N=dojo.i18n,C=dojo.cst;
			var $ = dojo.cheerio.load(dojo.wy_index_html);
			$("#left_bar").remove();
			$("#right_bar").removeClass("span9").addClass("span12");
			var sid=this.sid;
			
			this.drawMainMenu($,sid);
			
			var s=$.html();
			var a=[];
			s=s.replace("/*script_body_replace*/",a.join("\n"));
			s=s.replace("/*script_debug_replace*/","window.debug="+dojo.toString(obj,true));
			var o = dojo.atm([$c.c_cache,s,$c.c_Last_Modified,dojo.getTimestamp()]);
			this.dog.echoLast(o);
		}

});
