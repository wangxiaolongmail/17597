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
dojo.import("com.easysoft.util.MutiReqData");
dojo.provide("com.easysoft.service.Index");
dojo.declare( "com.easysoft.service.Index" , "com.easysoft.service.Service" , {
	templatePath:"theme.com.easysoft.service.Index.res",
	m_res_dojo_path:"/theme/com/easysoft/service",
	m_res_path:"/theme/com/easysoft/service/Index",
	m_group_count:5,
	m_line_char_count:40,
	m_ap_css1:"<!--ap_css1-->",
	m_ap_dojo:"<!--m_ap_dojo-->",
	m_ap_js1:"<!--ap_js1-->",
	m_ap_date:"<!--m_ap_date-->",
	m_ap1:"<!--ap_tcGeneral-->",
	m_ap2:"<!--ap_body-->",
	m_buf:[],
	
	read_css_file:function(){
		dojo.fs.readFile( dojo.dir+this.m_res_path+"/res.css" , dojo.conf.default_charset , dojo.hitch( this , function ( err , data ) {
			if( err ){
				this.echo404();
			}else{
				var reg=new RegExp("\./img/","gmi");
				var data = data.replace(reg,this.get_domain()+this.m_res_path+"/img/");
				var s ="<style type='text/css'>"+data+"</style>";
				this.template=this.template.replace(this.m_ap_css1,s);
				this.read_js_file_dojo();
			}
		}));
	},
	read_js_file_dojo:function(){
		dojo.fs.readFile( dojo.dir+this.m_res_dojo_path+"/dojo.js" , dojo.conf.default_charset , dojo.hitch( this , function ( err , data ) {
			if( err ){
				this.echo404();
			}else{
				var s ="<script type='text/javascript'>"+data+"</script>";
				this.template=this.template.replace(this.m_ap_dojo,s);
				this.read_js_file();
			}
		}));
	},
	read_js_file:function(){
		dojo.fs.readFile( dojo.dir+this.m_res_path+"/res.js" , dojo.conf.default_charset , dojo.hitch( this , function ( err , data ) {
			if( err ){
				this.echo404();
			}else{
				var s ="<script type='text/javascript'>"+data+"</script>";
				this.template=this.template.replace(this.m_ap_js1,s);
				this.fin_echo();
			}
		}));
	},
	fin_echo:function(){
		var s=this.template;
		//var s=this.template.replace(/\t/g,"").replace(/\n/g,"").replace(/\r/g,"").replace(this.m_ap_date,dojo.getTimestamp("","YYYY-MM-DD"));
		var o = dojo.atm([$c.c_index_buf,this.m_buf,$c.c_cache,s,$c.c_Last_Modified,dojo.getLastModified()]);
		dojo.setObject(this.widgetName,o,dojo.mBuffer);
		this.dog.echoLast(o);
	},
	make_link2:function(i,url,title,list){
		var index=(this.m_buf.push({i:i+"",url:url})-1);

		var s="";
		var cc=0;
		dojo.each(list,function(k,v,i){
			cc+=v.article_title.length;
			if(cc<this.m_line_char_count){
				s+=this.make_link(i,v.article_url,v.article_title);
			}else{
				return true;
			}
		},this);
		
		var ret="\t\t\t\t<div class='groups-inner'>\n\t\t\t\t\t<span class='g_fl'><a target='_blank' href='#' class='g_green'>"+title+"</a></span>"+s+"</div>\n";
		return ret;
	},
	make_link:function(i,url,title){
		if(title.length==2){
			title=title[0]+" "+title[1];
		}
		return "\n\t\t\t\t<span><a target='_blank' href='"+url+"'>"+title+"</a></span>";
	},
	drawPage:function(err,obj){
		var s="";
		var b=obj.values;
		dojo.each(b,function(k,v,i,len){
			if(i%this.m_group_count==0){
				if(i!=0){
					s+="</div>";
				}
				if((len-i)>this.m_group_count){
					s+="<div class='groups' >\n";
				}else{
					s+="<div class='groups last' >\n";
				}
			}
			s+=this.make_link2(k+1,v._id,v.article_title,v.list);
			if(i>=b.length-1){
				s+="</div>";
			}
		},this);
		this.template=this.template.replace(this.m_ap2,s);
		this.read_css_file();
	},
	create:function(){ 
		//var o=dojo.getObject(this.widgetName,false,dojo.mBuffer);
		//if(o){
		//	this.dog.echoLast(o);
		//}else{
			this.attachSession(); 
			this.postMixInProperties();
			this.attachTemplate();
			this.buildRendering();
			dojo.db.eval("get_view_favorite()", dojo.hitch(this,this.drawPage));
		//	return;
		//}
	}
});