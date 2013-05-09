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
dojo.provide("com.easysoft.client.control.Table");
dojo.declare( "com.easysoft.client.control.Table" , "com.easysoft.client.control.Control" , {
	className:"",
	id:"",
	isUseTemplate:false,
	isCacheChildTable:true,
	struct:null,
	items:[],
	isCreateTemplate:true,
	tag_table:"div",
	tag_thead:"div",
	tag_tbody:"div",
	tag_tr:"div",
	tag_tbody_tr:"div",
	tag_tbody_next_tr:"div",
	tag_th:"div",
	tag_td:"div",
	isDrawTHead:true,
	isDrawHideTr:true,
	onRefreshEx:function(){},
	drawTable:function(){
		var dom =dojo.create(this.tag_table,{className:"table"},null);
		if(dojo.isString(this.items)) this.items = dojo.JSON.parse(this.items);
		if(!this.struct){
			if(dojo.isArray(this.items)){
				var map = this.items[0];
				if(map){
					this.struct=[];
					dojo.each(map,function(k,v,i){
						if(k[0]!=="_"){
							this.struct.push({field:k});
						}
					},this);
				}else{
					return dom;
				}
			}else{
				return dom;
			}
		}
		if(this.isDrawTHead){
			var nodeThead=dojo.create(this.tag_thead,{className:"thead"},dom);
			var nodeTr=dojo.create(this.tag_tr,{className:"tr"},nodeThead);
			dojo.each(this.struct,function(i,item){
				var fn =item.formatterTh;
				if(!fn){fn=this.formatterTh;}
				var nodeTd=dojo.create(this.tag_td,{className:"td "+item.field},nodeTr);
				fn.call(this,{field:item.field,colIndex:i,colLength:this.struct.length,val:item.label||item.field,item:item,nodeTr:nodeTr,nodeTd:nodeTd});
			},this);
			this.nodeMap.thead=nodeThead;
		}
		var node=dojo.create(this.tag_tbody,{className:"tbody"},dom);
		dojo.each(this.items,function(k,val,rowIndex){
			var nodeTr=dojo.create(this.tag_tbody_tr,{className:"tr"},node);
			if(this.isDrawHideTr){
				var nodeNextTr=dojo.create(this.tag_tbody_next_tr,{className:"nextTr hide"},node);
			}else{
				var nodeNextTr=null;
			}
			val._nodeNextTr=nodeNextTr;
			val._nodeTr=nodeTr;
			dojo.each(this.struct,function(k,v,colIndex){
				if(v.formatterTd){
					var fn=v.formatterTd;
				}else{
					var fn=this.formatterTd;
				}
				var nodeTd=dojo.create(this.tag_td,{className:"td "+v.field},nodeTr);
				fn.call(this,{rowObj:val,rowIndex:rowIndex,colIndex:colIndex,colLength:this.struct.length,field:v.field,val:val[v.field],nodeTr:nodeTr,nodeTd:nodeTd,nodeNextTr:nodeNextTr});
			},this);
		},this);
		this.nodeMap.tbody=node;
		return dom;
	},
	formatterTh:function(param){
		if($c.c_expand===param.field){
			var span=dojo.create("span",{className:"text",innerHTML:"&nbsp;"},param.nodeTd);
		}else{
			var span=dojo.create("span",{className:"text",innerHTML:$i18n.get(param.val)},param.nodeTd);
		}
		if(param.colIndex===0){
			dojo.addClass(param.nodeTd,$c.c_start);
		}
		if((param.colIndex+1)===param.colLength){
			dojo.addClass(param.nodeTd,$c.c_end);
		}
	},
	formatterTd:function(param){
		if(param.colIndex===0){
			dojo.addClass(param.nodeTd,$c.c_start);
		}
		if((param.colIndex+1)===param.colLength){
			dojo.addClass(param.nodeTd,$c.c_end);
		}
		if($c.c_expand===param.field){
			this.formatterExpand(param);
		}else{
			dojo.create("span",{className:"text",innerHTML:param.val||"&nbsp;"},param.nodeTd);
		}
	},
	formatterExpand:function(param){
		var _field_expand_href="dojo.run("+this.registerId+",'"+$c.c_onExpand+"','"+param.rowIndex+","+param.colIndex+"');";
		var _field_refresh_href="dojo.run("+this.registerId+",'"+$c.c_onRefresh+"','"+param.rowIndex+","+param.colIndex+"');";
		param.rowObj._field_expand_href=_field_expand_href;
		param.rowObj._field_refresh_href=_field_refresh_href;
		var o=dojo.create("a",{href:"javascript:"+_field_expand_href},param.nodeTd);
		o=dojo.create("div",{className:"ico-btn-fix"},o);
		param.rowObj._node_ico_btn=dojo.create("div",{className:"ico ico-btn ico-btn-unfold",innerHTML:"&nbsp;"},o);
	},
	onRefresh:function(rowIndex,colIndex){
		var rowObj = this.items[rowIndex];
		var f = this.struct[colIndex];
		this.onRefreshEx.call(this,rowObj);
	},
	onExpand:function(rowIndex,colIndex){
		if(!this.isDrawHideTr)return;
		var rowObj = this.items[rowIndex];
		var f = this.struct[colIndex];
		if(typeof rowObj._isExpanded === $c.c_undefined ){
			rowObj._isExpanded=true;
			rowObj._isLoading=true;
			if(rowObj._isLoading&&f.loadind){
				dojo.removeClass(rowObj._nodeNextTr,"hide");
				dojo.addClass(rowObj._nodeTr,"isExpand");
				dojo.removeClass(rowObj._node_ico_btn,"ico-btn-unfold");
				dojo.addClass(rowObj._node_ico_btn,"ico-btn-fold");
				rowObj._isLoading=false;
				rowObj._registerId=this.registerId;
				rowObj._rowIndex=rowIndex;
				rowObj._nodeNextTr.innerHTML="";
				f.loadind(rowObj);
			}
		}else{
			if(rowObj._isExpanded){
				dojo.removeClass(rowObj._nodeTr,"isExpand");
				dojo.addClass(rowObj._nodeNextTr,"hide");
				dojo.removeClass(rowObj._node_ico_btn,"ico-btn-fold");
				dojo.addClass(rowObj._node_ico_btn,"ico-btn-unfold");
				if(this.isCacheChildTable){
					rowObj._isExpanded=false;
				}else{
					rowObj._isExpanded=undefined;
				}
			}else{
				dojo.addClass(rowObj._nodeTr,"isExpand");
				dojo.removeClass(rowObj._nodeNextTr,"hide");
				dojo.removeClass(rowObj._node_ico_btn,"ico-btn-unfold");
				dojo.addClass(rowObj._node_ico_btn,"ico-btn-fold");
				rowObj._isExpanded=true;
			}
		}
	},
	__createTemplateDom:function(){
		return this.drawTable();
	},
	destroy:function(){
		dojo.each(this.items,function(k,v,i){
			dojo.each(v,function(k){
				if(k.indexOf("_node")>=0){
					v[k]=null;
				}
			});
		});
		this.apRoot.parentNode.innerHTML="";
	},
	createDeleteLink:function(p){
		var o=p.o;
		var wrap=p.wrap;
		dojo.create("span",{innerHTML:"&nbsp;|&nbsp;"},wrap);
		var s=[this.env.rootRegisterId,$c.c_onDel,o.rowObj.urlPath,this.env.registerId,this.env.rowIndex].join(",");
		var href="javascript:dojo.run('"+s+"');";
		dojo.create("a",{classname:$c.c_action_link,href:href,innerHTML:$i18n.get($c.c_delete)},wrap);
	},
	createEditLink:function(p){
		var o=p.o;
		var wrap=p.wrap;
		dojo.create("span",{innerHTML:"&nbsp;|&nbsp;"},wrap);
		var s=[this.env.rootRegisterId,$c.c_onEdit,o.rowObj[$c.c_urlPath],this.env.registerId,this.env.rowIndex].join(",");
		var href="javascript:dojo.run('"+s+"')";
		var n=dojo.create("a",{classname:$c.c_action_link,href:href,innerHTML:$i18n.get($c.c_edit)},wrap);
	},
	createPreviewLink:function(p){
		var o=p.o;
		var wrap=p.wrap;
		dojo.create("a",{
				classname:$c.c_action_link,
				target:"_blank",
				href:dojo.getBString($c.c_url_001_005,[$c.c_path,o.rowObj.urlPath]),
				innerHTML:$i18n.get($c.c_preview)
			},wrap);
	},
	createCloneLink:function(p){
		var o=p.o;
		var wrap=p.wrap;
		dojo.create("span",{innerHTML:"&nbsp;|&nbsp;"},wrap);
		var s=[this.env.rootRegisterId,$c.c_onClone,o.rowObj[$c.c_urlPath],this.env.registerId,this.env.rowIndex].join(",");
		var href="javascript:dojo.run('"+s+"');";
		dojo.create("a",{classname:$c.c_action_link,href:href,innerHTML:$i18n.get($c.c_clone)},wrap);
	},
	createClearLink:function(p){
		var o=p.o;
		var wrap=p.wrap;
		dojo.create("span",{innerHTML:"&nbsp;|&nbsp;"},wrap);
		var s=[this.env.rootRegisterId,$c.c_onClear,o.rowObj[$c.c_urlPath],this.env.registerId,this.env.rowIndex].join(",");
		var href="javascript:dojo.run('"+s+"');";
		dojo.create("a",{classname:$c.c_action_link,href:href,innerHTML:$i18n.get($c.c_clear)},wrap);
	},
	createNewWindowLink:function(p){
		var o=p.o;
		var wrap=p.wrap;
		dojo.create("span",{innerHTML:"&nbsp;|&nbsp;"},wrap);
		var href=dojo.getBString($c.c_url_001_705,[$c.c_path,o.rowObj.urlPath]);
		dojo.create("a",{classname:$c.c_action_link,target:"_blank",href:href,innerHTML:$i18n.get($c.c_new_window)},wrap);
	},
	createRefreshLink:function(p){
		var o=p.o;
		var wrap=p.wrap;
		dojo.create("span",{classname:$c.c_refresh,innerHTML:"&nbsp;|&nbsp;"},wrap);
		dojo.create("a",{classname:$c.c_action_link+" "+$c.c_refresh,href:"javascript:"+o.rowObj._field_refresh_href,innerHTML:$i18n.get($c.c_refresh)},wrap);
	},
	createAddLink:function(p){
		var o=p.o;
		var wrap=p.wrap;
		dojo.create("span",{innerHTML:"&nbsp;|&nbsp;"},wrap);
		var s=[this.env.rootRegisterId,$c.c_onAdd,o.rowObj[$c.c_urlPath],this.registerId,o.rowIndex].join(",");
		var href="javascript:dojo.run('"+s+"');";
		dojo.create("a",{classname:$c.c_action_link,href:href,innerHTML:$i18n.get($c.c_add)},wrap);
	},
	createHistoryLink:function(p){
		var o=p.o;
		var wrap=p.wrap;
		dojo.create("span",{innerHTML:"&nbsp;|&nbsp;"},wrap);
		var href=dojo.getBString($c.c_url_001_006,[$c.c_path,o.rowObj.urlPath]);
		dojo.create("a",{classname:$c.c_action_link,target:"_blank",href:href,innerHTML:$i18n.get($c.c_history)},wrap);
	}
});