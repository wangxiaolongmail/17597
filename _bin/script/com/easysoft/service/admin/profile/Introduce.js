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
dojo.provide("com.easysoft.service.admin.profile.Introduce");
dojo.declare( "com.easysoft.service.admin.profile.Introduce" , "com.easysoft.service.admin.Start" , {
	table_name:C.USER,
	postCreate:function(){
		var op=this.getsbo();
		op[C.TABLE_NAME] =this.table_name;
		op[C.STORED_METHOD] =C.ADMIN;
		this.exec(op);
	},
	_define_schema:function(k,v,i){
		if( v[C.FIELD]===C.USER_NAME ){
			v[C.FORMAT]=function(k,v,i,tn){
				var a=[];
				a.push("<div class=\"control-group\">");
				a.push("<label>");
				a.push(I18N[v[C.FIELD]]);
				a.push("</label>");
				a.push("<input type=\"text\" name=\""+v[C.FIELD]+"\" class=\"span3\" style=\"height:30px\">");
				a.push("</div>");
				return a.join("\n");
			}
		 }
	},
	postDrawEx:function($,data){
		var a=[];	
		var metadata=this.define_schema();
		dojo.each(metadata,function(k,v,i){
			if(v[C.FORMAT]){
				a.push(v[C.FORMAT].call(this,k,v,i,this.table_name,data[C.MID]));
			}			
		},this);
		$("#apBody").html(a.join("\n"));
	}
});
