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
dojo.provide("com.easysoft.service.admin.favorite.Update");
dojo.declare( "com.easysoft.service.admin.favorite.Update" , "com.easysoft.service.admin.Start" , {
	table_name:C.FAVORITE,
	postCreate:function(){
		var op=this.getsbo();
		op[C.TABLE_NAME] =this.table_name;
		if(op.method=="post"){
			op[C.UPDATE+C.SUBMIT] =this.get_form_obj();
		}
		op[C.STORED_METHOD] ='admin_Update';
		this.exec(op); 
	},
	_define_schema:function(k,v,i){
		if(v[C.FIELD]===C.CATEGORY){
			v[C.FORMAT]=function(k,v,i,tn,obj){
				var a=[];
				a.push("<label>");
				a.push(I18N[v[C.FIELD]]);
				a.push("</label>");
				a.push(this.drawLinkSelect(v,obj[v[C.FIELD]]));
				return a.join("\n");
			}
		}
		if(v[C.FIELD]===C.NAME || v[C.FIELD]===C.URL){
			v[C.FORMAT]=function(k,v,i,tn,obj){
				var a=[];
				a.push("<label>");
				a.push(I18N[v[C.FIELD]]);
				a.push("</label>");
				a.push("<input value=\""+obj[v[C.FIELD]]+"\" type=\"text\" name=\""+v[C.FIELD]+"\" class=\"span3\" style=\"height:30px\">");
				return a.join("\n");
			}
		}	
		if(v[C.FIELD]===C.IS_PRIVATE){
			v[C.FORMAT]=function(k,v,i,tn,obj){
				var a=[];
				
				a.push("<label class=\"radio\">");
				a.push("<input type=\"radio\" name=\""+v[C.FIELD]+"\" id=\"optionsRadios1\" value=\"false\" ")
				if(!obj[v[C.FIELD]]){
					a.push(" checked ");
				}
				a.push(">");
				a.push(I18N[C.SHOW]);
				a.push("</label>");
				a.push("<label class=\"radio\">");
				a.push("<input type=\"radio\" name=\""+v[C.FIELD]+"\" id=\"optionsRadios2\" value=\"true\" ")
				if(obj[v[C.FIELD]]){
					a.push(" checked ");
				}
				a.push(" >");
				a.push(I18N[C.HIDDEN]);
				a.push("</label>");
				
				return a.join("\n");
			}
		}	
		if(v[C.FIELD]===C.PRI){
			v[C.FORMAT]=function(k,v,i,tn,obj){
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
		a.push("<form class=\"well span3\" method=\"post\" action=\"?sid="+this.sid+"&rmid="+data[C.RMID]+"\">");
		dojo.each(metadata,function(k,v,i){
			if(v[C.FORMAT]){
				a.push("<div class=\"control-group\">");
				a.push(v[C.FORMAT].call(this,k,v,i,this.table_name,data[C.UPDATE+C.OBJECT]));
				a.push("</div>");
			}
		},this);
		a.push("<button type=\'submit\' class=\'btn btn-primary\'>"+I18N[C.OK]+"</button>");
		a.push("</form>");
		$("#apBody").html(a.join("\n"));
	},
	draw_post:function(data){
		this.redirect(C.LIST+"?"+C.SID+"="+data[C.SID]);
	}
});
