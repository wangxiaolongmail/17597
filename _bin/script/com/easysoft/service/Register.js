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
dojo.import("com.easysoft.service.Index");
dojo.provide("com.easysoft.service.Register");
dojo.declare( "com.easysoft.service.Register" , "com.easysoft.service.Index" , {
	table_name:C.USER,
	postCreate:function(){
		var op=this.getbo();
		if(op.method=="get"){
		}else{
			var o=this.get_form_obj();
			o[C.PASSWORD] =dojo.md5(o[C.PASSWORD]);
			o[C._ID] =o[C.USER_NAME];
			op[C.INSERT+C.OBJECT] =o;
			op[C.MID] =this.queryForm[C.MID];
			op[C.ROLE_NAME] =this.role_name;
		}
		op[C.STORED_METHOD] =C.REGISTER;
		this.exec(op);
	},
	_define_schema:function(k,v,i){
		if( v[C.FIELD]===C.USER_NAME ){
			v[C.FORMAT]=function(k,v,i,tn){
				var a=[];
				a.push("<div class=\"control-group\">");
				a.push("<label>");
				a.push(I18N[v[C.FIELD]]);
				a.push("</label>");
				a.push("<input type=\"text\" name=\""+v[C.FIELD]+"\" class=\"span3\" style=\"height:30px\">");
				a.push("</div>");
				return a.join("\n");
			}
		 }	
		if(v[C.FIELD]===C.PASSWORD){
			v[C.FORMAT]=function(k,v,i,tn){
				var a=[];
				a.push("<div class=\"control-group\">");
				a.push("<label>");
				a.push(I18N[v[C.FIELD]]);
				a.push("</label>");
				a.push("<input type=\"password\" name=\""+v[C.FIELD]+"\" class=\"span3\" style=\"height:30px\">");
				a.push("</div>");
				a.push("<div class=\"control-group\">");
				a.push("<label>");
				a.push(I18N[C.REPEAT]+I18N[v[C.FIELD]]);
				a.push("</label>");
				a.push("<input type=\"password\" name=\""+C.REPEAT+v[C.FIELD]+"\" class=\"span3\" style=\"height:30px\">");
				a.push("</div>");
				return a.join("\n");
			}
		 }		
		if(v[C.FIELD]===C.CHECK_CODE){
			v[C.FORMAT]=function(k,v,i,tn,mid){
				var a=[];
				a.push("<div class=\"control-group\">");
				a.push("<label>");
				a.push(I18N[v[C.FIELD]]);
				a.push("</label>");
				a.push("<input type=\"text\" name=\""+v[C.FIELD]+"\" class=\"span3\" style=\"height:30px\">");
				a.push("<img src=\'"+URL[C.EASYSOFT+C.CHECK_CODE]+"?mid="+mid+"\' />");
				a.push("<input value=\""+mid+"\" type=\"hidden\" class=\"span3\" name=\""+C.MID+"\">");
				a.push("</div>");
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
			a.push("fn("+dojo.toString(this.reqList)+",'"+C.PASSWORD+"','"+C.REPEAT+C.PASSWORD+"');");
		a.push("});");
		a.push("</script>");
		a.push("");
		return a.join("\n");
	},
	clientFormEvent:function(a,s1,s2){
		$("input")[0].focus();
		a.push(s2);
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
			if(flag){ 
				var v1=$("input[name="+s1+"]").val();
				var n2=$("input[name="+s2+"]");
				var v2=n2.val();
				if(v1!==v2){
					n2.parent().addClass("error");
					flag=false;
				}
			}
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
		a.push("<form class=\"well span3\" method=\"post\" action=\""+C.REGISTER+"\">");
		dojo.each(metadata,function(k,v,i){
			if(v[C.FORMAT]){
				a.push(v[C.FORMAT].call(this,k,v,i,this.table_name,data[C.MID]));
			}			
		},this);
		a.push("<button type=\'submit\' class=\'btn btn-primary\'>"+I18N[C.OK]+"</button>");
		a.push("</form>");
		$("#apBody").html(a.join("\n"));
	},
	draw_post_ex:function($,data){
		$("#apBody").html("ok");
	}
});
