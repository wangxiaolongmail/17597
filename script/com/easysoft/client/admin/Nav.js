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
dojo.require("com.easysoft.client.control.Control");
dojo.provide("com.easysoft.client.admin.Nav");
dojo.declare( "com.easysoft.client.admin.Nav" , "com.easysoft.client.control.Control" , {
	isCreateTemplate:true,
	isUseTemplate:false,
	m_style_list:["/theme/blue/styles/global.css","/theme/blue/styles/style.css","/theme/blue/styles/compress.css","/theme/blue/styles/skin_163blue.css","/theme/blue/styles/default.css","/theme/blue/styles/fixed.css"],
	m_style_list:[
		"http://mimg.127.net/xm/all/style_comm/css/global.css",
		"http://mimg.127.net/xm/all/netfolder/110812/css/style.css",
		"http://mimg.127.net/p/js4/4.5.0b1207131808/css/compress.css",
		"http://mimg.127.net/p/js4/4.5.0b1207131808/css/skin_163blue.css",
		"/theme/blue/styles/default.css",
		"/theme/blue/styles/fixed.css"
	],
	
	m_style_list:[],
	m_url_list:[
		$c.c_url_001_701,
		$c.c_url_001_705,
		$c.c_url_001_704,
		$c.c_url_001_706,
		$c.c_url_001_712,
		$c.c_url_001_713,
		$c.c_url_001_700
	],
	__createTemplateDom:function(){
		var dom =dojo.create("div",{className:"Menu"},null);
		var items=dojo.map(this.m_url_list,function(k,v,i){
			var o={};
			o[$c.c_url]=v;
			o[$c.c_label]=dojo.path.basename(v);
			return o;
		},this);
		var struct=[{
						field:$c.c_label,
						formatterTd:function(o){
							var node=dojo.create("div",{style:"padding-left:5px;padding-right:5px;"},o.nodeTd);
							var href=dojo.getBString(o.rowObj[$c.c_url],[$c.c_navIndex,o.rowIndex]);
							dojo.create("a",{href:href,className:$c.c_text,innerHTML:$i18n.get(o.val)},node);
							if(dojo.navIndex===o.rowIndex){
								dojo.addClass(o.nodeTr,$c.c_selected);
							}
						}
					}];
		var o=dojo.createTable({navIndex:dojo.navIndex,struct:struct,isDrawHideTr:false,isDrawTHead:false,items:items});
		dojo.place(o.domNode,dom);
		dojo.each(this.m_style_list,function(k,v,i){
			dojo.loadStyle(v);
		});
		return dom;
	}
});