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
dojo.provide("com.easysoft.service.admin.favorite_type.Add");
dojo.declare( "com.easysoft.service.admin.favorite_type.Add" , "com.easysoft.service.admin.favorite_type.List" , {
	template_file:"favorite_add.html",
       postCreate:function(){
			var a=[],o={};
			var op=this.getsbo();
			op[C.TABLE_NAME] =this.table_name;
			op[C.STORED_METHOD] ='admin_Add';
			this.exec(op);
        },
	 define_schema:function(data){
		 var a=dojo.clone(SCHEMA[data[C.TABLE_NAME]]);
		 dojo.each(a,function(k,v,i){
			 if(v[C.FIELD]===C._ID){
				 v[C.IS_HIDDEN]=true;
			 }
			 if(v[C.FIELD]===C.PRI){
				 v[C.FORMAT]=function(){
					return "<input value=\"0\" type=\"hidden\" class=\"span3\" name=\""+C.PRI+"\">";
				 }
			 }
		 });
		 return a;
	 },
	postDraw:function(data){
			var a=[],o={};
			var $ = this.getDom();
			$(".nav-collapse").html(this.drawMainMenu(data));
			
			var metadata=this.define_schema(data);
			a.push("<form class=\"well span3\" method=\"post\" action=\"insert?sid="+this.sid+"\">");
			dojo.each(metadata,function(k,v,i){
				if(!v[C.IS_HIDDEN]){
						if(v[C.FORMAT]){
							a.push(v[C.FORMAT].call(this,v[C.FIELD]));
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
