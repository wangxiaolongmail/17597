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
			this.exec(op);
        },

	 define_schema:function(data){
		 var a=this.get_schema_list(data[C.TABLE_NAME]);
		 this.reqList=[];
		 dojo.each(a,function(k,v,i){
			if(v[C.IS_REQUIRED]){
				this.reqList.push(v[C.FIELD]);
			}
			if(v[C.FIELD]===C.CATEGORY){
				 v[C.FORMAT]=function(k,v,i){
					var a=[];
					a.push("<label>");
					a.push(v[C.FIELD]);
					a.push("</label>");
					a.push(this.drawLinkSelect(v));
					return a.join("\n");
				 }
			 }
			 if(v[C.FIELD]===C._ID){
				 v[C.IS_HIDDEN]=true;
			 }
			 if(v[C.FIELD]===C.PRI){
				 v[C.FORMAT]=function(k,v,i,tn){
					PRI[tn]=PRI[tn]+1;
					var i=PRI[tn];
					return "<input value=\""+i+"\" type=\"hidden\" class=\"span3\" name=\""+C.PRI+"\">";
				 }
			 }
		 },this);
		 return a;
	 },
	onSubmit:function(){
		var a=[];
		a.push("<script type='text/javascript'>");
		a.push("$(document).ready(function(){");
			a.push("var a="+dojo.toString(this.reqList)+";");
			a.push("$('form').submit(function(){");
				a.push("var flag=true;");
				a.push("$.each(a, function(i,v){");
					  a.push("var n=$(\"input[name=\"+v+\"]\");");
					  a.push("var s=n.val();");
					  a.push("if(s===''){");
						  a.push("flag=false;");
						  a.push("n.parent().addClass(\""+C.ERROR+"\");");
						  a.push("return false;");
					  a.push("}else{");
						  a.push("return true;");
					  a.push("}");
				a.push("}); ");
				a.push("return flag;");
			a.push("});");
			a.push("$.each(a, function(i,v){");
				a.push("$(\"input[name=\"+v+\"]\").keyup(function(){");
					a.push("$(this).parent().removeClass(\""+C.ERROR+"\");");
				a.push("});");
			a.push("}); ");
		a.push("});");
		a.push("</script>");
		return a.join("\n");
	},
	postDraw:function(data){
			var a=[],aa=[],o={};
			var $ = this.getDom();
			$(".nav-collapse").html(this.drawMainMenu(data));
			
			var metadata=this.define_schema(data);
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
			var s=s+this.onSubmit();
			return s;
		}
});
