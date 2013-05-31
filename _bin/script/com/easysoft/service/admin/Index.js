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
dojo.provide("com.easysoft.service.admin.Index");
dojo.declare( "com.easysoft.service.admin.Index" , "com.easysoft.service.Service" , {
        create:function(){
			var page=this.queryString.page||1;
			this.sid=this.queryString.sid;
			var category=this.queryString.category||'';
			var cmd = "main({stored_method:'admin_get_favorite',sid:'"+this.sid+"',category:'"+category+"',page:"+page+"})";
			console.log(cmd);
			dojo.db.eval(cmd, dojo.hitch(this,this.drawPage));
        },
		drawPage:function(err,obj){
			if(err){
				var o = dojo.atm([$c.c_cache,""+dojo.toString(err),$c.c_Last_Modified,dojo.getTimestamp()]);
				this.dog.echoLast(o);
				return;
			}
			if(!obj.ok){
				var o = dojo.atm([$c.c_cache,""+obj.err,$c.c_Last_Modified,dojo.getTimestamp()]);
				this.dog.echoLast(o);
				return;
			}
			this.m_obj=obj;
			if(dojo.wy_index_html){
				this.draw();
			}else{
				dojo.fs.readFile( dojo.dir+"/wy/index.html" , dojo.conf.default_charset , dojo.hitch( this , this.createEx));
			}
		},
		createEx:function(err,template){
			if( err ){
				this.echo404();
			}else{
				dojo.wy_index_html=template;
			}
			this.draw();
		},
		draw:function(){
			var obj=this.m_obj;
			var $ = dojo.cheerio.load(dojo.wy_index_html);
			$("#left_bar").remove();
			$("#right_bar").removeClass("span9").addClass("span12");
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
							a.push(dojo.i18n[metadata[ii].lable]);
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
			
			
			var a=[];
			var catlist=obj.catlist;
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
			a.push("<a class='btn btnDelete' href='#'>");
			a.push(dojo.i18n[dojo.cst.DELETE]);
			a.push("</a>");
			$(".btn-group").html(a.join(""));
			
			
			var s=$.html();
			var a=[];
			a.push('$("#select01").change(function()');
			a.push('{');
				  //a.push('alert($(this).val());');
				  a.push('location.href="/easysoft/admin/start?sid='+sid+'&category="+$(this).val();');
			a.push('});');
			a.push('$(".btnDelete").on("click",function()');
			a.push('{');
				a.push('var a=[];');
				a.push('$("#list1 input[type=\'checkbox\']:checked").each(function(){');
					a.push('a.push($(this).val());');
				a.push('});');
				a.push('if(confirm("is delete record?")){');
					a.push('alert("/easysoft/admin/favorite_del?sid='+sid+'&category='+category+'&page='+page+'&del_list="+a.join(","));');
					//a.push('location.href="/easysoft/admin/favorite_del?sid='+sid+'";');
				a.push('}');
			a.push('});');
			s=s.replace("/*script_body_replace*/",a.join("\n"));
			s=s.replace("/*script_debug_replace*/","window.debug="+dojo.toString(obj));
			var o = dojo.atm([$c.c_cache,s,$c.c_Last_Modified,dojo.getTimestamp()]);
			this.dog.echoLast(o);
		}

});
