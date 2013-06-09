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
dojo.declare( "com.easysoft.service.admin.favorite.List" , "com.easysoft.service.admin.Index" , {
		template_file:"favorite_list.html",
        postCreate:function(){
			var a=[],o={},op={},I18N=dojo.i18n,C=dojo.cst;
			this.sid=this.queryString.sid;
			op["sid"] =this.sid;
			op["page"] =this.queryString.page;
			op["category"] =this.queryString.category;
			op[C.CURRENT_URL]=this.dog.m_urlObject.pathname;
			op[C.REMOTE_ADDRESS]=this.dog.req.connection.remoteAddress;
			op[C.TABLE_NAME] ='favorite';
			op[C.CAT_TABLE_NAME] ='favorite_type';
			op[C.STORED_METHOD] ='admin_favorite_List';
			this.beginPaint();
			this.exec(op);
        },
		postDraw:function(){
			var a=[],o={},I18N=dojo.i18n,C=dojo.cst;
			var $ = this.getDom();
			$("#left_bar").remove();
			$("#right_bar").removeClass("span9").addClass("span12");
			var obj=this.m_obj;
			var a=[];
			var list=obj.list;
			var len = list.length;
			var metadata=obj.metadata;
			a.push("<thead>");
			a.push("<tr>");


			a.push("<td>");
			a.push("&nbsp;");
			a.push("</td>");
			for(var ii=0;ii<metadata.length;ii++){
					if(!metadata[ii].ishidden){
							a.push("<td>");
							a.push(metadata[ii].lable);
							a.push("</td>");
					}
			}

			a.push("</tr>");
			a.push("</thead>");
			a.push("<tbody>");
			for(var i=0;i<len;i++){
				var o=list[i];
				a.push("<tr>");
					a.push("<td>");
					a.push("<input type='checkbox' value='"+o._id+"'/>");
					a.push("</td>");
					for(var ii=0;ii<metadata.length;ii++){
						if(!metadata[ii].ishidden){
							a.push("<td>");
							a.push(o[metadata[ii].field]);
							a.push("</td>");
						}
					}
				a.push("</tr>");
			}
			a.push("</tbody>");
			$("#list1").html(a.join(""));
			
			var a=[],
			pageCount=obj.pageCount,
			page=obj.page,
			category=obj.category,
			len = pageCount,
			sid = this.sid;
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
			
          	
			$("#pager").html(a.join(""));
			
			
			$(".nav-collapse").html(this.drawMainMenu());
			
			var a=[];
			var catlist=dojo.favorite_catlist;
			var len = catlist.length;
			for(var i=0;i<len;i++){
				var o=catlist[i];
				if(o.category==category){
					a.push("<option selected value='"+o.category+"'>");
				}else{
					a.push("<option value='"+o.category+"'>");
				}
				a.push(o.article_title);
				a.push("</option>");
			}
			$("#select01").addClass("span2").html(a.join(""));
			$("h4").html(obj.tablename);
			var a=[];
			var cur_obj=this.cur_obj
			if(cur_obj[C.ADD]){
				a.push("<a class='btn "+C.ADD+"' href='#'>");
				a.push(I18N[C.ADD]);
				a.push("</a>"); 
			}
			if(cur_obj[C.EDIT]){
				a.push("<a class='btn "+C.EDIT+"' href='#'>");
				a.push(I18N[C.EDIT]);
				a.push("</a>"); 
			}
			if(cur_obj[C.DELETE]){
				a.push("<a class='btn "+C.DELETE+"' href='#'>");
				a.push(I18N[C.DELETE]);
				a.push("</a>"); 
			}
			$(".btn-group").html(a.join(""));
			
			var s=$.html();
			var a=[];
			a.push('$("#select01").change(function()');
			a.push('{');
				  //a.push('alert($(this).val());');
				  a.push('location.href="?sid='+sid+'&category="+$(this).val();');
			a.push('});');
			a.push('$("a.'+C.DELETE+'").on("click",function()');
			a.push('{');
				a.push('$("#list1 input[type=\'checkbox\']:checked").each(function(){');
					//a.push('alert($(this).val());');
				a.push('});');
				a.push('if(confirm("Is it delete record?")){');
					a.push('location.href="/easysoft/admin/favorite_del?sid='+sid+'";');
				a.push('}');
			a.push('});');
			s=s.replace("/*script_body_replace*/",a.join("\n"));
			s=s.replace("/*script_debug_replace*/","window.debug="+dojo.toString(obj,true));
			this.endPaint(s);
		}

});
