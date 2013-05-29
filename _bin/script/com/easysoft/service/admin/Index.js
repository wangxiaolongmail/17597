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
			dojo.fs.readFile( dojo.dir+"/wy/index.html" , dojo.conf.default_charset , dojo.hitch( this , function ( err , template ) {
				if( err ){
					this.echo404();
				}else{
					this.m_template=template;
					dojo.db.eval("admin_get_favorite({page:"+this.queryString.page+"})", dojo.hitch(this,this.drawPage));
				}
			}));
        },
		drawPage:function(err,obj){
			if(err){
				var o = dojo.atm([$c.c_cache,""+dojo.toString(err),$c.c_Last_Modified,dojo.getTimestamp()]);
				this.dog.echoLast(o);
				return;
			}
			var $ = dojo.cheerio.load(this.m_template);
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
			var sid = this.queryString.sid;
			a.push("<ul>");
			if(page==0){
				a.push("<li class='disabled'><a href='#'>«</a></li>");
			}else{
				a.push("<li><a href='?sid="+sid+"&page="+0+"'>«</a></li>");
			}
			for(var i=0;i<len;i++){
				if(page==i){
					a.push("<li class='active'>");
					a.push("<a href='#'>"+(i+1)+"</a>");
					a.push("</li>");
				}else{
					a.push("<li>");
					a.push("<a href='?sid="+sid+"&page="+i+"'>"+(i+1)+"</a>");
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
			var s=$.html();
			var o = dojo.atm([$c.c_cache,s,$c.c_Last_Modified,dojo.getTimestamp()]);
			this.dog.echoLast(o);
		}

});
