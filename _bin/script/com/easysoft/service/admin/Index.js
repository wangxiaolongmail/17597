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
			console.log("com.easysoft.service.admin.Index::create");
			var a=[],o={},I18N=dojo.i18n,C=dojo.cst;
			this.sid=this.queryString.sid;
			o["sid"] =this.sid;
			o["page"] =this.queryString.page||1;
			o["category"] =this.queryString.category||C.ALL;
			o[C.CURRENT_URL]=this.dog.m_urlObject.pathname;
			o[C.STORED_METHOD] ='admin_get_favorite';
			var cmd = "main("+dojo.toString(o)+")";
			console.log('dojo.db.eval("'+cmd+'");');
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
			var a=[],o={},I18N=dojo.i18n,C=dojo.cst;
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
			a.push("<a class='btn "+C.ADD+"' href='#'>");
			a.push(I18N[C.ADD]);
			a.push("</a>"); 
			a.push("<a class='btn "+C.EDIT+"' href='#'>");
			a.push(I18N[C.EDIT]);
			a.push("</a>"); 
			a.push("<a class='btn "+C.DELETE+"' href='#'>");
			a.push(I18N[C.DELETE]);
			a.push("</a>"); 
			$(".btn-group").html(a.join(""));
			
			var a=[];
			var list=obj[C.MODULE_LIST];
			var len = list.length;
			for(var i=0;i<len;i++){
				var o=list[i];
				a.push("<ul class='nav'>");
					if(obj[C.CURRENT_MODULE]==o[C.MODULE_NAME]){
					  a.push("<li class='active'>");
					  a.push("<a href='#'>"+I18N[o[C.MODULE_NAME]]+"</a>");
					  a.push("</li>");
					}else{
					  a.push("<li>");
					  a.push("<a href='"+o[C.MODULE_URL]+"'>"+o[C.MODULE_NAME]+"</a>");
					  a.push("</li>");
					}
				a.push("</ul>");
			}
			$(".nav-collapse").html(a.join(""));
			
			
			var s=$.html();
			var a=[];
			a.push('$("#select01").change(function()');
			a.push('{');
				  //a.push('alert($(this).val());');
				  a.push('location.href="/easysoft/admin/start?sid='+sid+'&category="+$(this).val();');
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
			var o = dojo.atm([$c.c_cache,s,$c.c_Last_Modified,dojo.getTimestamp()]);
			this.dog.echoLast(o);
		}

});
