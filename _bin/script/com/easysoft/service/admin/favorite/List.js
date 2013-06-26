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
		template_file:"favorite_list.html",
		table_name:"favorite",
        postCreate:function(){
			var a=[],o={},op={};
			var op=this.getsbo();
			op["page"] =this.queryString.page;
			op["category"] =this.queryString.category;
			op[C.TABLE_NAME] =this.table_name;
			op[C.TABLE+C.NAME+C.TYPE] =C.FAVORITE_TYPE;
			op[C.STORED_METHOD] ='admin_List';
			this.exec(op);
        },
	 drawSelectType:function(data){
			var a=[],o={};
			var data=data||{};
			var classname=data.classname||"span2";
			a.push("<select class=\""+classname+"\" name=\""+C.CATEGORY+"\">");
			dojo.each(DICT[C.FAVORITE_TYPE],function(k,v,i){
				if(k==data.category){
					a.push("<option selected value='"+k+"'>");
				}else{
					a.push("<option value='"+k+"'>");
				}
				a.push(v);
				a.push("</option>");
			});
			a.push("</select");
			return a.join("\n");
	 },
	 drawSelectTypeScript:function(data){
			var a=[],o={},sid=this.sid;
			a.push('$("select").change(function()');
			a.push('{');
				  //a.push('alert($(this).val());');
				  a.push('location.href="?sid='+sid+'&category="+$(this).val();');
			a.push('});');
			a.push('$("a.'+C.IS_DELETE+'").on("click",function()');
			a.push('{');
				a.push('$("#list1 input[type=\'checkbox\']:checked").each(function(){');
					//a.push('alert($(this).val());');
				a.push('});');
				a.push('if(confirm("Is it delete record?")){');
					a.push('location.href="del?sid='+sid+'";');
				a.push('}');
			a.push('});');
			return a.join("\n");
	 },

	 drawButton:function(data){
			var a=[],o={};
			var cur_obj=this.cur_obj;
			console.log(cur_obj);
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
			return a.join("");

	 },
	 get_metadata:function(data){
		 var a=dojo.clone(METADATA[data[C.TABLE_NAME]]);
		 dojo.each(a,function(k,v,i){
			 if(v[C.FIELD]===C.CATEGORY){
				 v[C.FORMAT]=function(val){
					 return DICT[C.FAVORITE_TYPE][val];
				 }
			 }
			 if(v[C.FIELD]===C._ID){
				 v[C.FORMAT]=function(val){
					 return "<input type='checkbox' value='"+val+"'/>";
				 }
			 }
			 if(v[C.FIELD]===C.ARTICLE_PRI){
				 v[C.IS_HIDDEN]=true;
			 }
		 });
		 return a;
	 },
	 drawTable:function(data){
			var a=[],o={};
			var obj=data;
			var a=[];
			var list=obj.list;
			var len = list.length;
			var metadata=this.get_metadata(data);

			a.push("<thead>");
			a.push("<tr>");

			dojo.each(metadata,function(k,v,i){
				if(!v[C.IS_HIDDEN]){
						a.push("<td>");
						a.push(v[C.FIELD]);
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
						if(!v[C.IS_HIDDEN]){
							a.push("<td>");
							if(v[C.FORMAT]){
								a.push(v[C.FORMAT](o[v[C.FIELD]]));
							}else{
								a.push(o[v[C.FIELD]]);
							}
							a.push("</td>");
						}
					});
				a.push("</tr>");

			});
			a.push("</tbody>");
			return a.join("");

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
			
          	
			return a.join("");


	 },



		postDraw:function(data){
			var a=[],o={};
			var $ = this.getDom();
			$("#left_bar").remove();
			$("#right_bar").removeClass("span9").addClass("span12");
			
			$("#list1").html(this.drawTable(data));
			
			$("#pager").html(this.drawPage(data));
			
			
			$(".nav-collapse").html(this.drawMainMenu(data));
			
			
			$("#selectWrap").html(this.drawSelectType(data));

			$("h4").html(data.tablename);

			
			$(".btn-group").html(this.drawButton(data));
			
			var s=$.html();
			s=s.replace("/*script_body_replace*/",this.drawSelectTypeScript(data));
			return s;
		}

});
