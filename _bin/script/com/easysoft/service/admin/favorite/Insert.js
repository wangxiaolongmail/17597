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
dojo.provide("com.easysoft.service.admin.favorite.Insert");
dojo.declare( "com.easysoft.service.admin.favorite.Insert" , "com.easysoft.service.admin.favorite.Add" , {
        postCreate:function(){
		var a=[],o={},op={};
		var op=this.getsbo();
		var obj={};
		var a=this.get_schema_list();
		dojo.each(a,function(k,v,i){
			var field=v[C.FIELD];
			var type=v[C.TYPE];
			val=this.queryForm[field];
			if(typeof val != "undefined"){
				if(type==C.PRI){
					obj[field]= parseInt(val);
				}else if(type==C.URL){
					var s= val ;
					if(s.indexOf("http://")<0){
						s="http://"+s;
					}
					obj[field]= s;
				}else{
					obj[field]= val;
				}
			}
		},this);
		op[C.INSERT+C.OBJECT] =obj;
		op[C.TABLE_NAME] =this.table_name;
		op[C.STORED_METHOD] ='admin_Insert';
		this.exec(op);
        },
	postDraw:function(data){
		if(data[C.IS_DICT]){
			dojo.mixin(DICT,dojo.clone(data[C.DICT]));
		}
		var a=[],o={};
		var $ = this.getDom();
		$(".nav-collapse").html(this.drawMainMenu(data));
			
		$("#apbody").html("hello");
			
		var s=$.html();
		return s;
	}
});
