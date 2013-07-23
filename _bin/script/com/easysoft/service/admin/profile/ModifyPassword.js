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
dojo.provide("com.easysoft.service.admin.profile.ModifyPassword");
dojo.declare( "com.easysoft.service.admin.profile.ModifyPassword" , "com.easysoft.service.admin.Start" , {
	table_name:C.USER,
	postCreate:function(){
		var op=this.getsbo();
		op[C.TABLE_NAME] =this.table_name;
		op[C.STORED_METHOD] ="admin_Record";
		this.exec(op);
	},
	_define_schema:function(k,v,i){
		if( v[C.FIELD]===C.PASSWORD ){
			v[C.FORMAT]=function(k,v,i,tn,obj){
				var a=[];
				a.push("<label>");
				a.push(I18N[v[C.FIELD]]);
				a.push("</label>");
				a.push("<input type=\"text\" name=\""+v[C.FIELD]+"\" class=\"span3\" style=\"height:30px\">");
				return a.join("\n");
			}
		}
	},
	 drawButton:function(data){
			var a=[],o={};
            a.push("<div id=\"tool_button\" class=\"btn-group\" style=\"padding-bottom:10px\">");
				a.push("<a class='btn' href='"+C.MODIFY+C.PASSWORD+"?sid="+this.sid+"'>");
				a.push(I18N[C.MODIFY]+I18N[C.PASSWORD]);
				a.push("</a>"); 
			a.push("</div>"); 
			return a.join("\n");
	 },
	postDrawEx:function($,data){
		var a=[];
		var metadata=this.define_schema();

		a.push("<form class=\"well span3\" method=\"post\" action=\""+C.INSERT+C.SUBMIT+"?sid="+this.sid+"\">");

		dojo.each(metadata,function(k,v,i){
			if(v[C.FORMAT]){
				a.push(v[C.FORMAT].call(this,k,v,i,this.table_name,data[C.RECORD]));
			}			
		},this);
				a.push("<label>");
				a.push("新密码");
				a.push("</label>");
				a.push("<input type=\"text\" name=\"new\" class=\"span3\" style=\"height:30px\">");

				a.push("<label>");
				a.push("新密码");
				a.push("</label>");
				a.push("<input type=\"text\" name=\"new2\" class=\"span3\" style=\"height:30px\">");

		a.push("<button type=\'submit\' class=\'btn btn-primary\'>"+I18N[C.OK]+"</button>");
		a.push("</form>");


		var s="";
		s+=this.drawButton(data);
		s+=a.join("\n");
		$("#apBody").html(s);
	}
});
