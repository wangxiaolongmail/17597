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
dojo.provide("com.easysoft.service.admin.favorite.Add");
dojo.declare( "com.easysoft.service.admin.favorite.Add" , "com.easysoft.service.admin.favorite.List" , {
	template_file:"favorite_add.html",
    postCreate:function(){
			var a=[],o={},op={};
			var op=this.getsbo();
			op[C.TABLE_NAME] =this.table_name;
			op[C.STORED_METHOD] ='admin_Add';
		 	this.reqList=[];
			this.exec(op);
     },
     addReqList:function(v){
		if(v[C.IS_REQUIRED]){
			this.reqList.push(v[C.FIELD]);
		}
	 },
	 define_schema:function(){
		 var a=this.get_schema_list();
		 dojo.each(a,function(k,v,i){
			this.addReqList(v);
			if(v[C.TYPE]===C.CATEGORY){
				 v[C.FORMAT]=function(k,v,i){
					var a=[];
					a.push("<label>");
					a.push(v[C.FIELD]);
					a.push("</label>");
					a.push(this.drawLinkSelect(v));
					return a.join("\n");
				 }
			 }
			 if(v[C.TYPE]===C._ID){
				 v[C.IS_HIDDEN]=true;
			 }
			 if(v[C.TYPE]===C.PRI){
				 v[C.FORMAT]=function(k,v,i,tn){
					PRI[tn]=PRI[tn]+1;
					var i=PRI[tn];
					return "<input value=\""+i+"\" type=\"hidden\" class=\"span3\" name=\""+C.PRI+"\">";
				 }
			 }
		 },this);
		 return a;
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
	postDraw:function(data){
			var a=[],aa=[],o={};
			var $ = this.getDom();
			$(".nav-collapse").html(this.drawMainMenu(data));
			
			var metadata=this.define_schema();
			a.push("<form class=\"well span3\" method=\"post\" action=\"insert?sid="+this.sid+"\">");
			dojo.each(metadata,function(k,v,i){
				if(!v[C.IS_HIDDEN]){
						a.push("<div class=\"control-group\">");
						if(v[C.FORMAT]){
							a.push(v[C.FORMAT].call(this,k,v,i,this.table_name));
						}else{
							a.push("<label>");
							a.push(v[C.FIELD]);
							a.push("</label>");
							a.push("<input type=\"text\" name=\""+v[C.FIELD]+"\" class=\"span3\" style=\"height:30px\">");
						}
						a.push("</div>");
				}
			},this);
			a.push("<button type=\'submit\' class=\'btn btn-primary\'>"+I18N[C.OK]+"</button>");
			a.push("</form>");
			$("#apbody").html(a.join("\n"));
			
			var s=$.html();
			return s;
		}
});
