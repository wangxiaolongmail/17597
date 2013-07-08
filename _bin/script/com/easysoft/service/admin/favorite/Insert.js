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
		var a=[],o={},op={};
		var op=this.getsbo();
		op[C.TABLE_NAME] =this.table_name;
		op[C.STORED_METHOD] ='admin';
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
	postDrawEx:function($,data){
		var a=[];
		var metadata=this.define_schema();
		a.push("<form class=\"well span3\" method=\"post\" action=\""+C.INSERT+C.SUBMIT+"?sid="+this.sid+"\">");
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
	}
});
