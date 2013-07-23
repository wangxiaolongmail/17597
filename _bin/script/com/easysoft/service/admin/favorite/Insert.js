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
dojo.provide("com.easysoft.service.admin.favorite.Insert");
dojo.declare( "com.easysoft.service.admin.favorite.Insert" , "com.easysoft.service.admin.Start" , {
	table_name:C.FAVORITE,
	postCreate:function(){
		var op=this.getsbo();
		if(op.method=="get"){
			op[C.TABLE_NAME] =this.table_name;
			op[C.STORED_METHOD] ='admin';
		}else{
			op[C.INSERT+C.OBJECT] =this.get_form_obj();
			op[C.TABLE_NAME] =this.table_name;
			op[C.STORED_METHOD] ='admin_Insert';
		}
		this.exec(op);
	},
	_define_schema:function(k,v,i){
		if(v[C.FIELD]===C.CATEGORY){
			v[C.FORMAT]=function(k,v,i){
				var a=[];
				a.push("<label>");
				a.push(I18N[v[C.FIELD]]);
				a.push("</label>");
				a.push(this.drawLinkSelect(v));
				return a.join("\n");
			}
		}
		if(v[C.FIELD]===C.NAME || v[C.FIELD]===C.URL){
			v[C.FORMAT]=function(k,v,i,tn){
				var a=[];
				a.push("<label>");
				a.push(I18N[v[C.FIELD]]);
				a.push("</label>");
				a.push("<input type=\"text\" name=\""+v[C.FIELD]+"\" class=\"span3\" style=\"height:30px\">");
				return a.join("\n");
			}
		}	
		if(v[C.FIELD]===C.IS_PRIVATE){
			v[C.FORMAT]=function(k,v,i,tn){
				var a=[];
				a.push("<label class=\"radio\">");
				a.push("<input type=\"radio\" name=\""+v[C.FIELD]+"\" id=\"optionsRadios1\" value=\"false\" >");
				a.push(I18N[C.PUBLIC]);
				a.push("</label>");
				a.push("<label class=\"radio\">");
				a.push("<input type=\"radio\" name=\""+v[C.FIELD]+"\" id=\"optionsRadios2\" value=\"true\" checked >");
				a.push(I18N[C.PRIVATE]);
				a.push("</label>");
				
				return a.join("\n");
			}
		}	
		if(v[C.FIELD]===C.PRI){
			v[C.FORMAT]=function(k,v,i,tn){
				PRI[tn]=PRI[tn]+1;
				var i=PRI[tn];
				return "<input value=\""+i+"\" type=\"hidden\" class=\"span3\" name=\""+C.PRI+"\">";
			}
		}
	 },
	drawFormEvent:function(){
		var a=[];
		a.push("");
		a.push("<script type='text/javascript'>");
		a.push("var fn="+this.clientFormEvent);
		a.push("$(document).ready(function(){");
			a.push("fn("+dojo.toString(this.reqList)+");");
		a.push("});");
		a.push("</script>");
		a.push("");
		return a.join("\n");
	},
	clientFormEvent:function(a){
		$("input")[0].focus();
		$('form').submit(function(){
			var flag=true;
			$.each(a, function(i,v){
				  var n=$("input[name="+v+"]");
				  var s=n.val();
				  if(s===''){
					  flag=false;
					  n.parent().addClass("error");
					  return false;
				  }else{
					  return true;
				  }
			}); 
			return flag;
		});
		$.each(a, function(i,v){
			$("input[name="+v+"]").keyup(function(){
				$(this).parent().removeClass("error");
			});
		});
		$.each(a, function(i,v){
			$("input[name="+v+"]").change(function(){
				$(this).parent().removeClass("error");
			});
		});
	},
	draw_get_ex:function($,data){
		var a=[];
		var metadata=this.define_schema();
		a.push("<form class=\"well span3\" method=\"post\" action=\"?sid="+this.sid+"\">");
		dojo.each(metadata,function(k,v,i){
			if(v[C.FORMAT]){
				a.push("<div class=\"control-group\">");
				a.push(v[C.FORMAT].call(this,k,v,i,this.table_name));
				a.push("</div>");
			}
		},this);
		a.push("<button type=\'submit\' class=\'btn btn-primary\'>"+I18N[C.OK]+"</button>");
		a.push("</form>");
		$("#apBody").html(a.join("\n"));
	},
	draw_post:function(data){
		if(data[C.IS_DICT]){
			dojo.mixin(DICT,dojo.clone(data[C.DICT]));
		}
		this.redirect(C.LIST+"?"+C.SID+"="+data[C.SID]);
	}
});
