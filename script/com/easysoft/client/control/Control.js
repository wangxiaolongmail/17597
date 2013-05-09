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
 * Tempalte widget.
 * 
 * @author wxlwang
 */ 
dojo.require("com.easysoft.Widget");
dojo.provide("com.easysoft.client.control.Tempalte");
dojo.declare( "com.easysoft.client.control.Tempalte" , "com.easysoft.service.Tempalte" , {
	className:"",
	id:"",
	isCreateTemplate:false,
	nodeMap:{},
	eventArray:[],
	sid:0,
	navIndex:"",
	m_uri:"",
	__createTemplateDom:function(){
	},
	buildRendering:function(){
		var widgetName = this.widgetName || "";
		this.domNode = dojo.doc.createDocumentFragment();
		var hash={ widgetName:widgetName };
		if(this.id){hash.id=this.id;};
		if(this.className){ hash.className=this.className; }
		this.apRoot = dojo.create( "div", hash , this.domNode );
		if(this.isCreateTemplate){
			var dom = this.__createTemplateDom();
			if(dom){
				this.apRoot.appendChild(dom);
			}
		}else{
			this.apRoot.innerHTML = ""+this.template+"";
			var tempNode = dojo.create( "div", null, this.apRoot );
			tempNode.parentNode.removeChild(tempNode);
		}
	},
	eachNode:function(){
		var DOJO_ATTACH_POINT=$c.DOJO_ATTACH_POINT;
		dojo.eachNode( this.apRoot , function(node){
			if( node.nodeType == 1 ){
				if( node.getAttribute && node.getAttribute( DOJO_ATTACH_POINT )  ){
					var attr   = node.getAttribute( DOJO_ATTACH_POINT );
					this.nodeMap[attr] = node;
				}
			}
		},this );
	},
	bindEvent:function(attr,eventName,fn,context){
		var context=context||this;
		var node=this.nodeMap[attr];
		if(!node)return;
		var handlefn=dojo.hitch(context,fn);
		dojo.bindEvent(node,eventName,handlefn);
		this.eventArray.push({el:node,fn:handlefn,type:eventName});
	},
	unbindEvent:function(){
		dojo.each(this.eventArray,function(k,v){
			dojo.unbindEvent(v.el, v.type, v.fn);  
		}); 
	},
	attachTemplateClient:function(){
		var s = this.template;
		if(dojo.global.$i18n){
			s=this._myReplace(s,$i18n);
		}
		this.template = s;
	}
});
dojo.provide("com.easysoft.client.control.Control");
dojo.declare( "com.easysoft.client.control.Control" , "com.easysoft.client.control.Tempalte" , {
	create:function(){
		this.register();
		this.postMixInProperties();
		this.attachTemplate();
		this.attachTemplateClient();
		this.buildRendering();
		this.createEx();
	},
	createEx:function(){
		this.eachNode();
		this.postCreate();
	},
	destroy:function(){
	}
});

























