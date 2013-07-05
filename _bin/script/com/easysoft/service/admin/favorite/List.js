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
dojo.provide("com.easysoft.service.admin.favorite.List");
dojo.declare( "com.easysoft.service.admin.favorite.List" , "com.easysoft.service.admin.Start" , {
	table_name:C.FAVORITE,
    postCreate:function(){
		var a=[],o={},op={};
		var op=this.getsbo();
		op[C.PAGE] =this.queryString[C.PAGE];
		op[C.CATEGORY] =this.queryString[C.CATEGORY];
		op[C.TABLE_NAME] =this.table_name;
		op[C.TABLE+C.TYPE] =C.FAVORITE_TYPE;
		op[C.STORED_METHOD] ='admin_List';
		this.exec(op);
    },
	drawFormEvent:function(){
		var a=[];
		a.push("");
		a.push("<script type='text/javascript'>");
		a.push("var fn="+this.clientFormEvent);
		a.push("$(document).ready(function(){");
			a.push("fn('"+this.sid+"','"+C.IS_DELETE+"');");
		a.push("});");
		a.push("</script>");
		a.push("");
		return a.join("\n");
	},
	clientFormEvent:function(sid,s1){
			$("select").change(function()
			{
				  location.href="?sid="+sid+"&category="+$(this).val();
			});
			$("a."+s1).on("click",function()
			{
				$("#list1 input[type=\'radio\']:checked").each(function(){
					var rmid=$(this).val();
					if(confirm("Is it delete record?")){
						location.href="Remove?sid="+sid+"&rmid="+rmid;
					}
				});
			});
	 },
	 drawButton:function(data){
			var a=[],o={};
			var cur_obj=this.cur_obj;
            a.push("<div id=\"tool_button\" class=\"btn-group\" style=\"padding-bottom:10px\">");
			if(cur_obj[C.IS_NEW]){
				a.push("<a class='btn "+C.IS_NEW+"' href='add?sid="+this.sid+"'>");
				a.push(I18N[C.ADD]);
				a.push("</a>"); 
			}
			if(cur_obj[C.IS_EDIT]){
				a.push("<a class='btn "+C.IS_EDIT+"' href='#'>");
				a.push(I18N[C.EDIT]);
				a.push("</a>"); 
			}
			if(cur_obj[C.IS_DELETE]){
				a.push("<a class='btn "+C.IS_DELETE+"' href='#'>");
				a.push(I18N[C.DELETE]);
				a.push("</a>"); 
			}
			a.push("</div>"); 
			return a.join("\n");
	 },
	 define_schema:function(data){
		 var a=this.get_schema_list();
		 dojo.each(a,function(k,v,i){
			 if(v[C.FIELD]===C.CATEGORY){
				 this.m_select=v;
				 v[C.FORMAT]=function(val){
					 return DICT[C.FAVORITE_TYPE][val];
				 }
			 }
			 if(v[C.FIELD]===C._ID){
				 v[C.FORMAT]=function(val){
					 return "<input name='_id' type='radio' value='"+val+"'/>";
				 }
			 }
			 if(v[C.FIELD]===C.NAME){
				 v[C.FORMAT]=function(val){
					 return val;
				 }
			 }
		 },this);
		 return a;
	 },
	 drawTable:function(data,metadata){
			var a=[],o={};
			var obj=data;
			var a=[];
			var list=obj.list;
			var len = list.length;
			a.push("<table id=\"list1\" class=\"table table-bordered table-striped\">");
			a.push("<thead>");
			a.push("<tr>");

			dojo.each(metadata,function(k,v,i){
				if(v[C.FORMAT]){
					a.push("<td>");
					a.push(I18N[v[C.FIELD]]);
					a.push("</td>");
				}
			});

			a.push("</tr>");
			a.push("</thead>");
			a.push("<tbody>");
			dojo.each(list,function(k,v,i){
				var o=v;
				a.push("<tr>");
					dojo.each(metadata,function(k,v,i){
						if(v[C.FORMAT]){
							a.push("<td>");
							a.push(v[C.FORMAT](o[v[C.FIELD]]));
							a.push("</td>");
						}
					});
				a.push("</tr>");

			});
			a.push("</tbody>");
			a.push("</table>");
			return a.join("\n");
	 },


	 drawPage:function(data){
			var a=[],o={};
			var obj=data;
			var a=[],
			pageCount=obj.pageCount,
			page=obj.page,
			category=obj.category,
			len = pageCount,
			sid = this.sid;
			a.push("<div id=\"pager\" class=\"pagination pagination-centered\">");
			a.push("<ul>");
			if(page==1){
				a.push("<li class='disabled'><a href='#'>«</a></li>");
			}else{
				a.push("<li><a href='?sid="+sid+"&page="+0+"'>«</a></li>");
			}
			for(var i=1;i<=len;i++){
				if(page==i){
					a.push("<li class='active'>");
					a.push("<a href='#'>"+i+"</a>");
					a.push("</li>");
				}else{
					a.push("<li>");
					a.push("<a href='?sid="+sid+"&category="+category+"&page="+i+"'>"+i+"</a>");
					a.push("</li>");
				}
			}
			if(page==pageCount){
				a.push("<li class='disabled'><a href='#'>»</a></li>");
			}else{
				a.push("<li><a href='?sid="+sid+"&page="+page+"'>»</a></li>");
			}
			a.push("</ul>");
			a.push("</div>");
			return a.join("\n");


	 },
	postDrawEx:function($,data){
		var metadata=this.define_schema(data);
		var s="";
		s+="<h4>"+data.tablename+"</h4>";
		s+=this.drawButton(data);
		s+=this.drawLinkSelect(this.m_select);
		s+="<div class=\"input-append\">";
		s+="<input class=\"span2\" id=\"appendedInputButton\" type=\"text\">";
		s+="<button class=\"btn\" type=\"button\">Go!</button>";
   		s+="</div>";
		s+=this.drawTable(data,metadata);
		s+=this.drawPage(data);
		$("#apBody").html(s);
	}
});
