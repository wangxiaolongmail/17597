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
			var a=[],o={},op={},C=dojo.C;
			var op=this.getsbo();
			op["page"] =this.queryString.page;
			op["category"] =this.queryString.category;
			op[C.TABLE_NAME] =this.table_name;
			op[C.CAT_TABLE_NAME] =C.FAVORITE_TYPE;
			op[C.STORED_METHOD] ='admin_Add';
			this.exec(op);
        },
	 get_metadata:function(data){
		 var C=dojo.C;
		 var a=dojo[C.METADATA][data[C.INPUT][C.TABLE_NAME]];
		 dojo.each(a,function(k,v,i){
			 if(v[C.FIELD]===C.CATEGORY){
				 v[C.FORMAT]=function(lable){
					var a=[];
					a.push("<label>");
					a.push(lable);
					a.push("</label>");
					a.push(this.drawSelectType({classname:"span3"}));
					return a.join("\n");
				 }
			 }
			 if(v[C.FIELD]===C._ID){
				 v[C.IS_HIDDEN]=true;
			 }
			 if(v[C.FIELD]===C.ARTICLE_PRI){
				 v[C.FORMAT]=function(lable){
					var a=[];
					a.push("<input value=\"0\" type=\"hidden\" class=\"span3\" name=\""+C.ARTICLE_PRI+"\">");
					return a.join("\n");
				 }
			 }
		 });
		 return a;
	 },
	postDraw:function(data){
			var a=[],o={},I18N=dojo.I18N,C=dojo.C;
			var $ = this.getDom();
			$(".nav-collapse").html(this.drawMainMenu(data));
			
			var metadata=this.get_metadata(data);
			a.push("<form class=\"well span3\" method=\"post\" action=\"save?sid="+this.sid+"\">");
			dojo.each(metadata,function(k,v,i){
				if(!v[C.IS_HIDDEN]){
						if(v[C.FORMAT]){
							var tmp = v[C.FORMAT].call(this,v[C.FIELD]);
							a.push(tmp);
						}else{
							a.push("<label>");
							a.push(v[C.FIELD]);
							a.push("</label>");
							a.push("<input type=\"text\" name=\""+v[C.FIELD]+"\" class=\"span3\" style=\"height:30px\">");
						}
				}
			},this);
			a.push("<button type=\'submit\' class=\'btn btn-primary\'>"+I18N[C.OK]+"</button>");
			a.push("</form>");
			$("#apbody").html(a.join("\n"));
			
			var s=$.html();
			return s;
		}


});
