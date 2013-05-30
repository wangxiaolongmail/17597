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
			var cmd = "stored_manager({stored_method:'admin_get_favorite',sid:'"+this.sid+"',page:"+page+"})";
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
			
			var a=[];
			var pageCount=obj.pageCount;
			var page=obj.page;
			var len = pageCount;
			var sid = this.sid;
			a.push("<ul>");
			if(page==0){
				a.push("<li class='disabled'><a href='#'>«</a></li>");
			}else{
				a.push("<li><a href='?sid="+sid+"&page="+0+"'>«</a></li>");
			}
			for(var i=1;i<=len;i++){
				if(page==i){
					a.push("<li class='active'>");
					a.push("<a href='?sid="+sid+"&page="+i+"'>"+i+"</a>");
					a.push("</li>");
				}else{
					a.push("<li>");
					a.push("<a href='?sid="+sid+"&page="+i+"'>"+i+"</a>");
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
			var category=obj.category;
			var len = category.length;
			for(var i=0;i<len;i++){
				a.push("<option value='"+category[i].category+"'>");
				a.push(category[i].article_title);
				a.push("</option>");
			}
			$("#select01").addClass("span1").html(a.join(""));
			$("h4").html(obj.tablename);
			
			var s=$.html();
			var a=[];
			a.push('$("#select01").change(function()');
			a.push('{');
				  a.push('alert("Hello");');
			a.push('});');
			s=s.replace("/*script_body_replace*/",a.join("\n"));
			var o = dojo.atm([$c.c_cache,s,$c.c_Last_Modified,dojo.getTimestamp()]);
			this.dog.echoLast(o);
		}

});
